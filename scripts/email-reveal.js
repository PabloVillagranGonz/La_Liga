// Reconstruye el email y lo hace clicable para evitar scraping simple
document.addEventListener('DOMContentLoaded',()=>{
  const el=document.getElementById('contact-email');
  if(!el) return;
  const user=el.dataset.user;
  const domain=el.dataset.domain;
  const email = user + '@' + domain;
  el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
});