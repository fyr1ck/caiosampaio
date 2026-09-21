// WhatsApp: preencha com DDI + DDD + número, só dígitos (ex.: '5511999999999').
// Enquanto estiver vazio, os botões "Quero começar" levam ao Instagram.
const WHATSAPP = '';
const WHATSAPP_MSG = 'Olá, Caio! Quero começar meu treino.';

if (WHATSAPP) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((a) => { a.href = url; });
}

// Menu mobile
const header = document.getElementById('header');
const toggle = header.querySelector('.menu-toggle');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.documentElement.classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Entrada das seções
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Header ao rolar + parallax leve
const layers = [...document.querySelectorAll('[data-parallax]')];
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

function update() {
  header.classList.toggle('is-scrolled', scrollY > 40);
  if (!still) {
    const vh = innerHeight;
    layers.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const offset = (r.top + r.height / 2 - vh / 2) * -el.dataset.parallax;
      el.style.setProperty('--py', `${offset.toFixed(1)}px`);
    });
  }
  ticking = false;
}

addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}, { passive: true });
addEventListener('resize', update);
update();
