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

function post_string(string $key, int $maxLength, bool $stripNewlines = true): string
{
    $value = (string) ($_POST[$key] ?? '');
    $value = $stripNewlines ? clean_input($value) : trim($value);
    return mb_substr($value, 0, $maxLength);
}

function verify_recaptcha(string $secret, string $token, ?string $remoteIp): array
{
    $postFields = [
        'secret' => $secret,
        'response' => $token,
    ];

    if ($remoteIp !== null && $remoteIp !== '') {
        $postFields['remoteip'] = $remoteIp;
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($postFields),
            'timeout' => 10,
        ],
    ]);

    $raw = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    if ($raw === false) {
        return ['ok' => false, 'reason' => 'verification_unreachable'];
    }

    $data = json_decode($raw, true);
    if (!is_array($data) || ($data['success'] ?? false) !== true) {
        return ['ok' => false, 'reason' => 'verification_failed'];
    }

    return [
        'ok' => true,
        'score' => (float) ($data['score'] ?? 0.0),
        'action' => (string) ($data['action'] ?? ''),
    ];
}

function load_mailer_config(): array
{
    $config = [];
    $configPaths = [
        __DIR__ . '/mailer-config.php',
        __DIR__ . '/mailer-config.local.php',
    ];

    foreach ($configPaths as $path) {
        if (is_file($path)) {
            $loaded = require $path;
            if (is_array($loaded)) {
                $config = array_merge($config, $loaded);
            }
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
        'recaptcha_secret' => getenv('RECAPTCHA_SECRET') ?: null,
    ];

    foreach ($envConfig as $key => $value) {
        if ($value !== null && $value !== '') {
            $config[$key] = $value;
        }
    }

    if (!isset($config['smtp_profiles']) || !is_array($config['smtp_profiles'])) {
        $config['smtp_profiles'] = [
            ['port' => 587, 'encryption' => 'tls'],
            ['port' => 465, 'encryption' => 'ssl'],
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

    if (!isset($config['recaptcha_action'])) {
        $config['recaptcha_action'] = 'contact_form_submit';
    }

    if (!isset($config['recaptcha_min_score'])) {
        $config['recaptcha_min_score'] = 0.5;
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

$name = post_string('name', 100);
$email = post_string('email', 255);
$service = post_string('service', 80);
$message = post_string('message', 2000, false);
$honeypot = post_string('company_hp', 255);

if ($honeypot === '') {
    $honeypot = post_string('website', 255);
}

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

$recaptchaSecret = trim((string) ($config['recaptcha_secret'] ?? ''));
if ($recaptchaSecret !== '') {
    $token = post_string('recaptcha_token', 4096);
    if ($token === '') {
        respond(422, ['ok' => false, 'message' => 'Security check failed. Please try again.']);
    }

    $recaptcha = verify_recaptcha($recaptchaSecret, $token, $_SERVER['REMOTE_ADDR'] ?? null);
    if (($recaptcha['ok'] ?? false) !== true) {
        respond(422, ['ok' => false, 'message' => 'Security check failed. Please try again.']);
    }

    $expectedAction = (string) ($config['recaptcha_action'] ?? 'contact_form_submit');
    $minScore = (float) ($config['recaptcha_min_score'] ?? 0.5);
    $actualAction = (string) ($recaptcha['action'] ?? '');
    $score = (float) ($recaptcha['score'] ?? 0.0);

    if ($actualAction !== $expectedAction || $score < $minScore) {
        respond(422, ['ok' => false, 'message' => 'Security check failed. Please try again.']);
    }
}

$requiredKeys = ['host', 'username', 'password', 'from_email', 'from_name', 'to_email', 'to_name'];

foreach ($requiredKeys as $key) {
    if (!isset($config[$key]) || $config[$key] === '') {
        respond(500, [
            'ok' => false,
            'message' => 'Mailer is not configured yet. Add your SMTP settings before using the form.'
        ]);
    }
}

$profiles = $config['smtp_profiles'];
$lastError = 'Unknown SMTP error.';
$sent = false;

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

        $mail->Subject = 'New website enquiry from ' . $name;
        $mail->Body = implode(PHP_EOL, [
            'New contact enquiry received.',
            '',
            'Name: ' . $name,
            'Email: ' . $email,
            'Service: ' . $service,
            '',
            'Project brief:',
            $message,
            '',
            'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
            'User Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
        ]);

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
        $body = implode(PHP_EOL, [
            'New contact enquiry received.',
            '',
            'Name: ' . $name,
            'Email: ' . $email,
            'Service: ' . $service,
            '',
            'Project brief:',
            $message,
            '',
            'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
            'User Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
        ]);

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

    $payload = [
        'ok' => false,
        'code' => 'smtp_failed',
        'message' => 'We could not send your brief right now. Please email hello@sbdigitalstudios.co.uk.'
    ];

    if ((bool) $config['smtp_debug'] === true) {
        $payload['detail'] = $lastError;
    }

    respond(500, $payload);
}

respond(200, [
    'ok' => true,
    'message' => 'Thanks. Your brief has been sent. We will reply within 1 business day.'
]);

