import { qs } from './utils.js';

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
      const formData = new FormData(form);
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
