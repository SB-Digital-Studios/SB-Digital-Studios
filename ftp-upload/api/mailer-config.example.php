<?php

declare(strict_types=1);

return [
    // Primary SMTP host (mailbox domain endpoint)
    'host' => 'mail.sbdigitalstudios.co.uk',

    // Password-based authentication
    'username' => 'hello@sbdigitalstudios.co.uk',
    'password' => 'replace-with-your-mailbox-password',

    // Mailbox identity
    'from_email' => 'hello@sbdigitalstudios.co.uk',
    'from_name' => 'SB Digital Studios',
    'to_email' => 'hello@sbdigitalstudios.co.uk',
    'to_name' => 'SB Digital Studios',

    // SMTP profiles are tried in order: STARTTLS first, then SMTPS fallback.
    'smtp_profiles' => [
        ['port' => 587, 'encryption' => 'tls'],
        ['port' => 465, 'encryption' => 'ssl'],
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

    // Optional reCAPTCHA v3 server-side verification.
    // Leave blank/omit to disable verification.
    // 'recaptcha_secret' => 'replace-with-recaptcha-secret',
    // 'recaptcha_action' => 'contact_form_submit',
    // 'recaptcha_min_score' => 0.5,
];
