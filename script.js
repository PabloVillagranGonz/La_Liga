// Script mínimo para La_Liga
// Smooth scroll para anchors
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target=document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })


  // Manejo mínimo del formulario para evitar envío real si no existe email.php
  const form=document.querySelector('form[action="email.php"]');
  if(form){
    form.addEventListener('submit',function(e){
      // Si no hay backend, mostrar alerta y prevenir envío real
      e.preventDefault();
      // Intentamos detectar si el endpoint está disponible por fetch (HEAD)
      fetch(form.action,{method:'HEAD'}).then(r=>{
        if(r.ok){
          form.submit();
        } else {
          alert('El formulario requiere un servidor PHP. Para pruebas locales ejecuta: php -S localhost:8000');
        }
      }).catch(()=>{
        alert('El formulario requiere un servidor PHP. Para pruebas locales ejecuta: php -S localhost:8000');
      })
    })
  }
  
  // Animaciones on-scroll con IntersectionObserver
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible')
      }
    })
  },{threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

  // Back to top
  const btt=document.querySelector('.back-to-top');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400) btt.classList.add('show'); else btt.classList.remove('show');
  });
  if(btt){btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}

  // Menu toggle mobile
  const menuBtn=document.querySelector('.menu-toggle');
  const nav=document.querySelector('nav');
  const mainContent=document.querySelector('#main');
  if(menuBtn && nav){
    const openNav = ()=>{
      nav.classList.add('open');
      document.body.classList.add('nav-open');
      menuBtn.setAttribute('aria-expanded','true');
      if(mainContent) mainContent.setAttribute('aria-hidden','true');
      // focus first link for keyboard users
      const firstLink = nav.querySelector('.mobile-panel a');
      if(firstLink) firstLink.focus();
    }
    const closeNav = ()=>{
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded','false');
      if(mainContent) mainContent.removeAttribute('aria-hidden');
      menuBtn.focus();
    }
    menuBtn.addEventListener('click',()=>{
      if(nav.classList.contains('open')) closeNav(); else openNav();
    })

    // Close when clicking a nav link
    nav.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{ closeNav(); }));
    // Close on Escape
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeNav(); })
    // Close when clicking outside the panel (overlay background).
    // Only close if the click is outside the .mobile-panel element so clicks on panel padding don't close it.
    nav.addEventListener('click',e=>{
      const panel = nav.querySelector('.mobile-panel');
      if(panel && !panel.contains(e.target)) closeNav();
    })
  }

  // Small CTA pulse on load
  const cta=document.querySelector('.btn');
  if(cta){
    cta.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:1200,iterations:1,easing:'ease-out'});
  }
  // Cargar reveal del email (si existe)
  const s=document.createElement('script');
  s.src='scripts/email-reveal.js';
  document.body.appendChild(s);
})
