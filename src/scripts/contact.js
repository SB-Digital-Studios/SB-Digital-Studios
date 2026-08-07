import { qs } from './utils.js';

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let recaptchaReadyPromise;

function loadRecaptcha(siteKey) {
  if (!siteKey) return null;
  if (recaptchaReadyPromise) return recaptchaReadyPromise;

  recaptchaReadyPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(resolve);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA failed to initialize.'));
        return;
      }
      window.grecaptcha.ready(resolve);
    };
    script.onerror = () => reject(new Error('reCAPTCHA could not be loaded.'));
    document.head.appendChild(script);
  });

  return recaptchaReadyPromise;
}

export function initContactForm() {
  const form = qs('.contact__form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = qs('.contact__status', form);

    if (status) status.textContent = '';

    if (button) {
      button.textContent = 'Sending...';
      button.disabled = true;
    }

    try {
      if (recaptchaSiteKey) {
        await loadRecaptcha(recaptchaSiteKey);
      }

      const formData = new FormData(form);

      if (recaptchaSiteKey) {
        const token = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: 'contact_form_submit'
        });
        formData.set('recaptcha_token', token);
      }

      const response = await fetch(form.getAttribute('action') || '/api/contact.php', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || 'We could not send your message right now.');
      }

      if (status) status.textContent = payload.message || 'Thanks. Your brief has been sent.';
      form.reset();
    } catch (error) {
      if (status) {
        status.textContent =
          error instanceof Error ? error.message : 'There was a problem sending your brief. Please try again.';
      }
    } finally {
      if (!button) return;
      button.textContent = 'Send Brief';
      button.disabled = false;
    }
  });
}
