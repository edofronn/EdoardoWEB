const menuData = {
  antipasti: [
    {name:"La bruschetta dell'orto",description:"Pane rustico, pomodorini, basilico fresco",price:"€ 8"},
    {name:"Stracciatella e pomodori",description:"Stracciatella cremosa, pomodori di stagione",price:"€ 11"},
    {name:"Polpette della tradizione",description:"Ricetta di casa, salsa al pomodoro",price:"€ 10"},
    {name:"Verdure croccanti",description:"Selezione di verdure, erbe aromatiche",price:"€ 9"}
  ],
  primi: [
    {name:"Tagliatelle al ragù lento",description:"Pasta fresca, ragù della casa",price:"€ 15"},
    {name:"Ravioli ricotta e spinaci",description:"Burro, salvia e una spolverata di grana",price:"€ 14"},
    {name:"Risotto di stagione",description:"Riso carnaroli, ingredienti del mercato",price:"€ 16"},
    {name:"Spaghetti al pomodoro",description:"Pomodoro dolce, basilico e olio al basilico",price:"€ 12"}
  ],
  dolci: [
    {name:"Tiramisù della casa",description:"Mascarpone, caffè e cacao amaro",price:"€ 7"},
    {name:"Crostata del giorno",description:"Pasta frolla e confettura di stagione",price:"€ 6"},
    {name:"Panna cotta",description:"Vaniglia, coulis di frutti rossi",price:"€ 7"},
    {name:"Gelato artigianale",description:"Due gusti del giorno",price:"€ 5"}
  ]
};

const menuList = document.querySelector("#menu-list");
const menuTabs = document.querySelectorAll(".menu-tab");
function renderMenu(category) {
  if (!menuList || !menuData[category]) return;
  menuList.innerHTML = menuData[category].map(item => `<article class="menu-item"><div><h3>${item.name}</h3><p>${item.description}</p></div><strong>${item.price}</strong></article>`).join("");
}
menuTabs.forEach(tab => tab.addEventListener("click", () => {
  menuTabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderMenu(tab.dataset.category);
}));

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Chiudi il menu" : "Apri il menu");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Apri il menu");
  }));
}

const dateInput = document.querySelector("#guest-date");
const reservationForm = document.querySelector("#reservation-form");
const feedback = document.querySelector("#form-feedback");
if (dateInput) {
  const today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
if (reservationForm && feedback) reservationForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;
  const data = new FormData(reservationForm);
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "");
  const time = String(data.get("time") || "");
  const guests = String(data.get("guests") || "2");
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("it-IT", {day:"numeric",month:"long",year:"numeric"});
  feedback.textContent = `Perfetto${name ? ", " + name : ""}! Questa è solo una simulazione: avresti richiesto un tavolo per ${guests} ${guests === "1" ? "persona" : "persone"} il ${formattedDate} alle ${time}. Nessuna prenotazione è stata inviata.`;
  feedback.classList.add("visible");
});
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
