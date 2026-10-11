const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('#service-select');
  if (select) {
    const desired = link.dataset.service;
    const matching = [...select.options].find(option => option.textContent.trim() === desired);
    if (matching) select.value = matching.value;
  }
}));

document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#quote-form');
const message = document.querySelector('#form-message');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  message.innerHTML = `<strong>Perfetto, ${escapeHtml(data.get('name'))}!</strong><br>La tua richiesta demo per <strong>${escapeHtml(data.get('service'))}</strong> è pronta. In un sito reale, qui si collegherebbe l'invio email o il gestionale dell'attività. <br><br><em>Nessun dato è stato inviato o salvato.</em>`;
  message.classList.add('visible');
  message.scrollIntoView({behavior: 'smooth', block: 'nearest'});
});
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
