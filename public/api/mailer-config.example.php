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
