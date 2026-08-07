<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function clean_input(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function html_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function get_project_env_values(): array
{
    static $values = null;

    if (is_array($values)) {
        return $values;
    }

    $values = [];
    $path = dirname(__DIR__, 2) . '/.env.local';

    if (!is_file($path) || !is_readable($path)) {
        return $values;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return $values;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1]);
        if ($key === '') {
            continue;
        }

        if ((str_starts_with($value, '"') && str_ends_with($value, '"')) || (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
            $value = substr($value, 1, -1);
        }

        $values[$key] = $value;
    }

    return $values;
}

function get_project_env_value(string $key): ?string
{
    $fromSystem = getenv($key);
    if (is_string($fromSystem) && $fromSystem !== '') {
        return $fromSystem;
    }

    $values = get_project_env_values();
    if (isset($values[$key]) && $values[$key] !== '') {
        return $values[$key];
    }

    return null;
}

function verify_recaptcha(string $secret, string $token, string $remoteIp): array
{
    $payload = [
        'secret' => $secret,
        'response' => $token,
    ];

    if ($remoteIp !== '') {
        $payload['remoteip'] = $remoteIp;
    }

    $body = http_build_query($payload);
    $responseBody = null;

    if (function_exists('curl_init')) {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        if ($ch !== false) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
            $raw = curl_exec($ch);
            curl_close($ch);
            if (is_string($raw) && $raw !== '') {
                $responseBody = $raw;
            }
        }
    }

    if ($responseBody === null) {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $body,
                'timeout' => 10,
            ],
        ]);
        $raw = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
        if (is_string($raw) && $raw !== '') {
            $responseBody = $raw;
        }
    }

    if (!is_string($responseBody) || $responseBody === '') {
        return ['success' => false, 'score' => 0.0, 'action' => '', 'errors' => ['no-response']];
    }

    $decoded = json_decode($responseBody, true);
    if (!is_array($decoded)) {
        return ['success' => false, 'score' => 0.0, 'action' => '', 'errors' => ['invalid-json']];
    }

    return [
        'success' => (bool) ($decoded['success'] ?? false),
        'score' => (float) ($decoded['score'] ?? 0.0),
        'action' => (string) ($decoded['action'] ?? ''),
        'errors' => is_array($decoded['error-codes'] ?? null) ? $decoded['error-codes'] : [],
    ];
}

function load_mailer_config(): array
{
    $config = [];
    $localConfigPath = __DIR__ . '/mailer-config.local.php';

    if (is_file($localConfigPath)) {
        $loaded = require $localConfigPath;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    $envConfig = [
        'host' => getenv('SMTP_HOST') ?: null,
        'username' => getenv('SMTP_USERNAME') ?: null,
        'password' => getenv('SMTP_PASSWORD') ?: null,
        'from_email' => getenv('MAIL_FROM_EMAIL') ?: null,
        'from_name' => getenv('MAIL_FROM_NAME') ?: null,
        'to_email' => getenv('MAIL_TO_EMAIL') ?: null,
        'to_name' => getenv('MAIL_TO_NAME') ?: null,
        'logo_url' => getenv('MAIL_LOGO_URL') ?: null,
        'recaptcha_secret' => get_project_env_value('RECAPTCHA_SECRET_KEY'),
        'recaptcha_min_score' => get_project_env_value('RECAPTCHA_MIN_SCORE'),
        'recaptcha_expected_action' => get_project_env_value('RECAPTCHA_EXPECTED_ACTION'),
    ];

    foreach ($envConfig as $key => $value) {
        if ($value !== null && $value !== '') {
            $config[$key] = $value;
        }
    }

    if (!isset($config['smtp_profiles']) || !is_array($config['smtp_profiles'])) {
        $config['smtp_profiles'] = [
            ['port' => 587, 'encryption' => 'tls'],
        ];
    }

    if (!isset($config['smtp_verify_peer'])) {
        $config['smtp_verify_peer'] = true;
    }

    if (!isset($config['smtp_verify_peer_name'])) {
        $config['smtp_verify_peer_name'] = true;
    }

    if (!isset($config['smtp_allow_self_signed'])) {
        $config['smtp_allow_self_signed'] = false;
    }

    if (!isset($config['mail_fallback'])) {
        $config['mail_fallback'] = false;
    }

    if (!isset($config['smtp_debug'])) {
        $config['smtp_debug'] = false;
    }

    if (!isset($config['recaptcha_min_score']) || !is_numeric((string) $config['recaptcha_min_score'])) {
        $config['recaptcha_min_score'] = 0.5;
    }

    if (!isset($config['recaptcha_expected_action']) || trim((string) $config['recaptcha_expected_action']) === '') {
        $config['recaptcha_expected_action'] = 'contact_form_submit';
    }

    return $config;
}

function configure_mailer(PHPMailer $mail, array $config, int $port, string $encryption): void
{
    $mail->isSMTP();
    $mail->Host = (string) $config['host'];
    $mail->Port = $port;
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['username'];
    $mail->Password = (string) $config['password'];
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;

    if ((bool) $config['smtp_debug'] === true) {
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = static function (string $str, int $level): void {
            error_log(sprintf('PHPMailer debug[%d]: %s', $level, trim($str)));
        };
    }

    if ($encryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->SMTPSecure = '';
    }

    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => (bool) $config['smtp_verify_peer'],
            'verify_peer_name' => (bool) $config['smtp_verify_peer_name'],
            'allow_self_signed' => (bool) $config['smtp_allow_self_signed'],
        ],
    ];
}

$name = clean_input((string) ($_POST['name'] ?? ''));
$email = clean_input((string) ($_POST['email'] ?? ''));
$service = clean_input((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$honeypot = trim((string) ($_POST['company_hp'] ?? ($_POST['website'] ?? '')));

if ($honeypot !== '') {
    respond(200, [
        'ok' => true,
        'message' => 'Thanks. Your brief has been sent.'
    ]);
}

if ($name === '' || mb_strlen($name) < 2) {
    respond(422, ['ok' => false, 'message' => 'Please enter your name.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'message' => 'Please enter a valid email address.']);
}

if ($service === '' || mb_strlen($service) < 2) {
    respond(422, ['ok' => false, 'message' => 'Please tell us the service you need.']);
}

if ($message === '' || mb_strlen($message) < 10) {
    respond(422, ['ok' => false, 'message' => 'Please share a bit more about your project.']);
}

$config = load_mailer_config();
$requiredKeys = ['host', 'username', 'password', 'from_email', 'from_name', 'to_email', 'to_name'];

foreach ($requiredKeys as $key) {
    if (!isset($config[$key]) || $config[$key] === '') {
        respond(500, [
            'ok' => false,
            'message' => 'Mailer is not configured yet. Add your SMTP settings before using the form.'
        ]);
    }
}

$recaptchaSecret = trim((string) ($config['recaptcha_secret'] ?? ''));
if ($recaptchaSecret !== '') {
    $recaptchaToken = trim((string) ($_POST['recaptcha_token'] ?? ''));
    if ($recaptchaToken === '') {
        respond(422, ['ok' => false, 'message' => 'Security check failed. Please refresh and try again.']);
    }

    $recaptchaResult = verify_recaptcha(
        $recaptchaSecret,
        $recaptchaToken,
        (string) ($_SERVER['REMOTE_ADDR'] ?? '')
    );

    $recaptchaMinScore = (float) $config['recaptcha_min_score'];
    $recaptchaExpectedAction = trim((string) $config['recaptcha_expected_action']);
    $recaptchaAction = (string) ($recaptchaResult['action'] ?? '');
    $recaptchaPassed = (bool) ($recaptchaResult['success'] ?? false)
        && (float) ($recaptchaResult['score'] ?? 0.0) >= $recaptchaMinScore
        && $recaptchaAction === $recaptchaExpectedAction;

    if (!$recaptchaPassed) {
        error_log('Contact reCAPTCHA blocked: ' . json_encode($recaptchaResult));
        respond(422, ['ok' => false, 'message' => 'Security check failed. Please refresh and try again.']);
    }
}

$profiles = $config['smtp_profiles'];
$lastError = 'Unknown SMTP error.';
$sent = false;

$submittedAtUtc = gmdate('d F Y H:i') . ' UTC';
$submittedAtServer = date('d F Y H:i T');

$plainBody = implode(PHP_EOL, [
    'New contact enquiry received.',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Service: ' . $service,
    '',
    'Project brief:',
    wordwrap($message, 78, PHP_EOL, true),
    '',
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
    'User Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
    'Submitted: UTC ' . $submittedAtUtc . ' | Server ' . $submittedAtServer,
]);

$logoPath = __DIR__ . '/../logo-email.svg';
$logoCid = 'logo-email';
$logoMarkup = '';
if (is_file($logoPath)) {
    $logoMarkup = '<img src="cid:' . $logoCid . '" alt="' . html_escape((string) $config['from_name']) . '" style="max-height:56px; width:auto; margin-bottom:12px;">';
}

$safeName = html_escape($name);
$safeEmail = html_escape($email);
$safeService = html_escape($service);
$safeMessage = nl2br(html_escape($message));
$safeIp = html_escape((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$safeUserAgent = html_escape((string) ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'));
$safeSubmittedAtUtc = html_escape($submittedAtUtc);
$safeSubmittedAtServer = html_escape($submittedAtServer);
$htmlBody = '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:24px;background:#0A0A0F;font-family:Arial,sans-serif;color:#F5F5F7;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:720px;max-width:720px;margin:0 auto;background:#12121A;border:1px solid #2A2A35;border-radius:14px;overflow:hidden;">'
    . '<tr><td style="padding:24px;border-bottom:1px solid #2A2A35;">'
    . $logoMarkup
    . '<h1 style="margin:0;font-size:22px;line-height:1.3;color:#F5F5F7;">New Website Enquiry</h1>'
    . '<p style="margin:8px 0 0;color:#8E8E93;font-size:14px;">Submitted from sbdigitalstudios.co.uk</p>'
    . '</td></tr>'
    . '<tr><td style="padding:24px;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">'
    . '<tr><td style="padding:8px 0;color:#8E8E93;width:140px;vertical-align:top;">Name</td><td style="padding:8px 0;color:#F5F5F7;">' . $safeName . '</td></tr>'
    . '<tr><td style="padding:8px 0;color:#8E8E93;width:140px;vertical-align:top;">Email</td><td style="padding:8px 0;color:#F5F5F7;">' . $safeEmail . '</td></tr>'
    . '<tr><td style="padding:8px 0;color:#8E8E93;width:140px;vertical-align:top;">Service</td><td style="padding:8px 0;color:#F5F5F7;">' . $safeService . '</td></tr>'
    . '<tr><td style="padding:8px 0;color:#8E8E93;width:140px;vertical-align:top;">Project brief</td><td style="padding:8px 0;color:#F5F5F7;line-height:1.6;word-break:break-word;overflow-wrap:anywhere;white-space:pre-wrap;">' . $safeMessage . '</td></tr>'
    . '</table>'
    . '</td></tr>'
    . '<tr><td style="padding:18px 24px;border-top:1px solid #2A2A35;color:#8E8E93;font-size:12px;line-height:1.5;">'
    . 'IP: ' . $safeIp . '<br>User Agent: ' . $safeUserAgent
    . '<div style="margin-top:10px;font-size:11px;line-height:1.4;color:#7A7A84;">'
    . 'Submitted: UTC ' . $safeSubmittedAtUtc . ' | Server ' . $safeSubmittedAtServer
    . '</div>'
    . '</td></tr>'
    . '</table></body></html>';

$thankYouHtml = '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:24px;background:#0A0A0F;font-family:Arial,sans-serif;color:#F5F5F7;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;margin:0 auto;background:#12121A;border:1px solid #2A2A35;border-radius:14px;overflow:hidden;">'
    . '<tr><td style="padding:24px;border-bottom:1px solid #2A2A35;">'
    . $logoMarkup
    . '<h1 style="margin:0;font-size:22px;line-height:1.3;color:#F5F5F7;">Thanks for getting in touch</h1>'
    . '<p style="margin:8px 0 0;color:#8E8E93;font-size:14px;">We have received your message and will reply within 1 business day.</p>'
    . '</td></tr>'
    . '<tr><td style="padding:24px;color:#F5F5F7;font-size:15px;line-height:1.7;">'
    . '<p style="margin:0 0 16px;">Hi ' . $safeName . ',</p>'
    . '<p style="margin:0 0 16px;">Thanks for contacting SB Digital Studios. We have your ' . $safeService . ' enquiry and will review the details shortly.</p>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border-collapse:separate;border-spacing:0;background:#0F0F14;border:1px solid #2A2A35;border-radius:12px;">'
    . '<tr><td style="padding:16px 18px;border-bottom:1px solid #2A2A35;color:#8E8E93;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">What happens next</td></tr>'
    . '<tr><td style="padding:18px;">'
    . '<p style="margin:0 0 10px;">1. We review your brief and check the details.</p>'
    . '<p style="margin:0 0 10px;">2. We reply with next steps or a follow-up question if needed.</p>'
    . '<p style="margin:0;">3. If it is a fit, we will outline the best approach and timeline.</p>'
    . '</td></tr>'
    . '</table>'
    . '<p style="margin:0 0 18px;">If you need to add anything before we reply, just send a quick follow-up to this email.</p>'
    . '<p style="margin:0;color:#8E8E93;font-size:13px;line-height:1.6;">Submitted: ' . $safeSubmittedAtUtc . '</p>'
    . '</td></tr>'
    . '</table></body></html>';

foreach ($profiles as $profile) {
    $port = (int) ($profile['port'] ?? 0);
    $encryption = strtolower((string) ($profile['encryption'] ?? ''));

    if ($port <= 0) {
        continue;
    }

    $mail = new PHPMailer(true);

    try {
        configure_mailer($mail, $config, $port, $encryption);

        $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
        $mail->addAddress((string) $config['to_email'], (string) $config['to_name']);
        $mail->addReplyTo($email, $name);
        if ($logoMarkup !== '') {
            $mail->addEmbeddedImage($logoPath, $logoCid, 'logo-email.png');
        }

        $mail->Subject = 'New website enquiry from ' . $name;
        $mail->isHTML(true);
        $mail->Body = $htmlBody;
        $mail->AltBody = $plainBody;

        $mail->send();
        $sent = true;
        break;
    } catch (Exception $exception) {
        $lastError = sprintf('SMTP %d/%s failed: %s', $port, $encryption, $exception->getMessage());
        error_log('Contact mailer error: ' . $lastError);
    }
}

if (!$sent) {
    if ((bool) $config['mail_fallback'] === true) {
        $subject = 'New website enquiry from ' . $name;
        $body = $plainBody;

        $headers = implode("\r\n", [
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . (string) $config['from_name'] . ' <' . (string) $config['from_email'] . '>',
            'Reply-To: ' . $name . ' <' . $email . '>',
        ]);

        if (@mail((string) $config['to_email'], $subject, $body, $headers)) {
            respond(200, [
                'ok' => true,
                'message' => 'Thanks. Your brief has been sent. We will reply within 1 business day.'
            ]);
        }
    }

    respond(500, [
        'ok' => false,
        'code' => 'smtp_failed',
        'message' => 'We could not send your brief right now. Please email hello@sbdigitalstudios.co.uk.'
    ]);
}

try {
    $thankYouMail = new PHPMailer(true);
    configure_mailer($thankYouMail, $config, 587, 'tls');
    $thankYouMail->setFrom('hello@sbdigitalstudios.co.uk', (string) $config['from_name']);
    $thankYouMail->addAddress($email, $name);
    if ($logoMarkup !== '') {
        $thankYouMail->addEmbeddedImage($logoPath, $logoCid, 'logo-email.png');
    }
    $thankYouMail->Subject = 'Thanks for contacting SB Digital Studios';
    $thankYouMail->isHTML(true);
    $thankYouMail->Body = $thankYouHtml;
    $thankYouMail->AltBody = implode(PHP_EOL, [
        'Thanks for getting in touch',
        '',
        'Hi ' . $name . ',',
        '',
        'Thanks for contacting SB Digital Studios. We have received your message and will reply within 1 business day.',
        '',
        'If you need to add anything before we reply, just send a quick follow-up to this email.',
        '',
        'Submitted: UTC ' . $submittedAtUtc,
    ]);
    $thankYouMail->send();
} catch (Exception $exception) {
    error_log('Contact mailer thank-you error: ' . $exception->getMessage());
}

respond(200, [
    'ok' => true,
    'message' => 'Thanks. Your brief has been sent. We will reply within 1 business day.'
]);
