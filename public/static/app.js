/* ===================================================
   SINTRACGR - JavaScript Principal
   Sindicato Nacional de Trabajadores de la CGR - Perú
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // HEADER SCROLL BEHAVIOR
  // ===================================================
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header && header.classList.add('scrolled');
      backToTop && backToTop.classList.add('visible');
    } else {
      header && header.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('visible');
    }
  });

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===================================================
  // HAMBURGER MENU
  // ===================================================
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('open');
  });

  // Close nav on link click
  navMobile && navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('open');
    });
  });

  // ===================================================
  // ACTIVE NAV LINKS
  // ===================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });

  // ===================================================
  // COUNTER ANIMATION
  // ===================================================
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString('es-PE');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('es-PE');
      }
    }, 16);
  }

  // Observe counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-target]').forEach(el => {
    el.textContent = '0';
    counterObserver.observe(el);
  });

  // ===================================================
  // FADE IN ANIMATIONS
  // ===================================================
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.benefit-card, .victory-card, .testimonial-card, .tool-card, .right-card, .news-card, .news-card-full, .step').forEach((el, i) => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // ===================================================
  // TABS (Derechos Page)
  // ===================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(`tab-${targetTab}`);
      if (target) target.classList.add('active');
    });
  });

  // ===================================================
  // NEWS FILTERS
  // ===================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsItems = document.querySelectorAll('.news-card-full');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      newsItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ===================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===================================================
  // NOTIFICATION TOAST
  // ===================================================
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    const style = toast.style;
    style.cssText = `
      position: fixed; top: 24px; right: 24px; z-index: 9999;
      background: ${type === 'success' ? '#2E7D32' : '#C41E3A'};
      color: white; padding: 16px 24px; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      display: flex; align-items: center; gap: 12px;
      font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px;
      max-width: 400px; animation: slideInRight 0.3s ease;
    `;
    toast.querySelector('button').style.cssText = 'background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:16px;margin-left:8px;';

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => toast.remove(), 5000);
  }

  // Make toast globally available
  window.showToast = showToast;

  // ===================================================
  // AFFILIATION FORM SUBMISSION
  // ===================================================
  window.submitAffiliation = async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.remove('hidden');
      showToast('¡Solicitud de afiliación enviada con éxito!', 'success');
    } catch (err) {
      showToast('Error al enviar. Por favor intente nuevamente.', 'error');
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  };

  // ===================================================
  // CONTACT FORM SUBMISSION
  // ===================================================
  window.submitContact = async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      form.style.display = 'none';
      document.getElementById('contactSuccess').classList.remove('hidden');
      showToast('¡Mensaje enviado correctamente!', 'success');
    } catch (err) {
      showToast('Error al enviar. Por favor intente nuevamente.', 'error');
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  };

  // ===================================================
  // DENUNCIA FORM SUBMISSION
  // ===================================================
  window.submitDenuncia = async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    btn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.style.display = 'none';
      document.getElementById('denunciaSuccess').classList.remove('hidden');
      showToast('¡Denuncia registrada de forma confidencial!', 'success');
    } catch (err) {
      showToast('Error al registrar. Por favor intente nuevamente.', 'error');
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  };

  // ===================================================
  // NEWSLETTER SUBSCRIPTION
  // ===================================================
  window.subscribeNewsletter = function(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    showToast(`¡Suscripción exitosa! Te notificaremos en ${input.value}`, 'success');
    input.value = '';
  };

  // ===================================================
  // PAGINATION (News)
  // ===================================================
  document.querySelectorAll('.pag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ===================================================
  // REAL-TIME FORM VALIDATION
  // ===================================================
  document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
    field.addEventListener('blur', () => {
      const parent = field.closest('.form-group');
      if (!parent) return;
      
      if (!field.value.trim()) {
        parent.classList.add('has-error');
        field.style.borderColor = 'var(--red)';
      } else {
        parent.classList.remove('has-error');
        field.style.borderColor = 'var(--green)';
      }
    });
    
    field.addEventListener('focus', () => {
      field.style.borderColor = 'var(--blue)';
    });
  });

  // DNI validation
  const dniInput = document.getElementById('dni');
  if (dniInput) {
    dniInput.addEventListener('input', () => {
      dniInput.value = dniInput.value.replace(/\D/g, '').substring(0, 8);
    });
  }

  // ===================================================
  // PROGRESS BAR ANIMATION (Budget)
  // ===================================================
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach(fill => {
          const width = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.transition = 'width 1.5s ease';
            fill.style.width = width;
          }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.budget-bars').forEach(el => barObserver.observe(el));

  // ===================================================
  // EXIT INTENT POPUP
  // ===================================================
  let exitPopupShown = false;
  
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10 && !exitPopupShown && window.location.pathname === '/') {
      exitPopupShown = true;
      
      const popup = document.createElement('div');
      popup.className = 'exit-popup';
      popup.innerHTML = `
        <div class="exit-popup-inner">
          <button class="exit-close" onclick="this.closest('.exit-popup').remove()"><i class="fas fa-times"></i></button>
          <div class="exit-icon"><i class="fas fa-shield-alt"></i></div>
          <h3>¿Te vas sin proteger tus derechos?</h3>
          <p>Afíliate gratis a SINTRACGR y accede a asesoría legal especializada, negociación colectiva y más de S/7,400 en beneficios anuales.</p>
          <a href="/afiliacion" class="exit-cta">Afiliarme Ahora — Es Gratis</a>
          <button class="exit-skip" onclick="this.closest('.exit-popup').remove()">No, gracias. Prefiero no protegerme.</button>
        </div>
      `;
      
      const popupStyle = `
        .exit-popup { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:99999; display:flex; align-items:center; justify-content:center; padding:20px; animation: fadeInOverlay 0.3s ease; }
        .exit-popup-inner { background:white; border-radius:16px; padding:40px; max-width:480px; width:100%; text-align:center; position:relative; animation: popIn 0.3s ease; }
        .exit-close { position:absolute; top:16px; right:16px; background:none; border:none; font-size:20px; color:#546E7A; cursor:pointer; }
        .exit-icon { font-size:56px; color:#0D47A1; margin-bottom:16px; }
        .exit-popup-inner h3 { font-family:'Montserrat',sans-serif; font-weight:800; font-size:1.5rem; color:#37474F; margin-bottom:12px; }
        .exit-popup-inner p { color:#546E7A; line-height:1.6; margin-bottom:24px; }
        .exit-cta { display:block; background:#C41E3A; color:white; padding:16px; border-radius:8px; font-family:'Montserrat',sans-serif; font-weight:700; font-size:16px; text-decoration:none; margin-bottom:12px; }
        .exit-cta:hover { background:#A01530; color:white; }
        .exit-skip { background:none; border:none; color:#9E9E9E; font-size:13px; cursor:pointer; }
        @keyframes fadeInOverlay { from {opacity:0} to {opacity:1} }
        @keyframes popIn { from {transform:scale(0.8); opacity:0} to {transform:scale(1); opacity:1} }
      `;
      
      const styleEl = document.createElement('style');
      styleEl.textContent = popupStyle;
      document.head.appendChild(styleEl);
      document.body.appendChild(popup);
      
      popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.remove();
      });
    }
  });

  // ===================================================
  // SCROLL REVEAL FOR SECTIONS
  // ===================================================
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.section-header, .victory-card, .transparency-card').forEach(el => {
    el.style.cssText = 'opacity:0; transform:translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease;';
    sectionObserver.observe(el);
  });

  console.log('%cSINTRACGR', 'font-size:24px; font-weight:bold; color:#C41E3A;');
  console.log('%cSindicato Nacional de Trabajadores de la CGR - Perú', 'font-size:14px; color:#0D47A1;');
  console.log('%cDefendiendo los derechos de los servidores públicos desde hace más de 20 años.', 'font-size:12px; color:#546E7A;');

});
