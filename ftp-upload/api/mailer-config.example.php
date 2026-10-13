<?php

declare(strict_types=1);

return [
    // HeartInternet SMTP host
    'host' => 'mail.extendcp.co.uk',

    // Password-based authentication
    'username' => 'hello@sbdigitalstudios.co.uk',
    'password' => 'replace-with-your-mailbox-password',

    // Mailbox identity
    'from_email' => 'hello@sbdigitalstudios.co.uk',
    'from_name' => 'SB Digital Studios',
    'to_email' => 'hello@sbdigitalstudios.co.uk',
    'to_name' => 'SB Digital Studios',

    // Optional absolute URL shown at top of HTML email (e.g. https://sbdigitalstudios.co.uk/logo-email.png)
    'logo_url' => '',

    // Optional: reCAPTCHA v3 server-side verification.
    // Recommended source is RECAPTCHA_SECRET_KEY in .env.local on the web server.
    'recaptcha_secret' => '',
    'recaptcha_min_score' => 0.5,
    'recaptcha_expected_action' => 'contact_form_submit',

    // SMTP profile: 587 + STARTTLS.
    'smtp_profiles' => [
        ['port' => 587, 'encryption' => 'tls'],
    ],

    // TLS certificate checks (set allow_self_signed true only if host support confirms it)
    'smtp_verify_peer' => true,
    'smtp_verify_peer_name' => true,
    'smtp_allow_self_signed' => false,

    // If SMTP fails, optionally try PHP mail() as backup.
    // Keep false so SMTP failures are visible instead of silently falling back.
    'mail_fallback' => false,

    // Set true temporarily if you want detailed SMTP diagnostics in php.error.log.
    'smtp_debug' => false,
];
