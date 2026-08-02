import { qs } from './utils.js';

export function initContactForm() {
  const form = qs('.contact__form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Message queued';
      button.disabled = true;
    }

    const status = qs('.contact__status', form);
    if (status) status.textContent = 'Thanks. We will get back to you within 1 business day.';

    form.reset();

    setTimeout(() => {
      if (!button) return;
      button.textContent = 'Send Brief';
      button.disabled = false;
    }, 1800);
  });
}
