const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Apri menu');
  }));
}
const dateInput = document.querySelector('#date');
if (dateInput) { const now = new Date(); dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
const form = document.querySelector('#booking-form'); const feedback = document.querySelector('#feedback');
if (form && feedback) form.addEventListener('submit', event => {
  event.preventDefault(); if (!form.reportValidity()) return;
  const data = new FormData(form); const name = String(data.get('name') || '').trim();
  const service = String(data.get('service') || ''); const date = String(data.get('date') || ''); const time = String(data.get('time') || '');
  const niceDate = new Date(`${date}T12:00:00`).toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'});
  feedback.textContent = `Grazie${name ? ', ' + name : ''}! Hai provato la richiesta per "${service}" il ${niceDate} alle ${time}. È una demo: nessun appuntamento è stato creato e nessun dato è stato inviato.`;
  feedback.classList.add('visible');
});
const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
