import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Main page
app.get('/', (c) => {
  return c.html(homePage())
})

// Subpages
app.get('/nosotros', (c) => c.html(nosotrosPage()))
app.get('/derechos', (c) => c.html(derechosPage()))
app.get('/afiliacion', (c) => c.html(afiliacionPage()))
app.get('/noticias', (c) => c.html(noticiasPage()))
app.get('/transparencia', (c) => c.html(transparenciaPage()))
app.get('/contacto', (c) => c.html(contactoPage()))

// API endpoints
app.post('/api/afiliacion', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, message: 'Solicitud recibida', data: body })
})

app.post('/api/denuncia', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, message: 'Denuncia registrada confidencialmente', ref: `DEN-${Date.now()}` })
})

app.post('/api/contacto', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, message: 'Mensaje enviado correctamente' })
})

function baseLayout(title: string, content: string, extraScripts = '') {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="SINTRACGR - Sindicato Nacional de Trabajadores de la Contraloría General de la República del Perú. Defendiendo tus derechos laborales.">
  <title>${title} | SINTRACGR</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="/static/style.css" rel="stylesheet">
</head>
<body>

<!-- TOP BAR -->
<div class="top-bar">
  <div class="container top-bar-inner">
    <div class="top-bar-left">
      <span><i class="fas fa-phone"></i> Emergencia Laboral: <a href="tel:+51999999999">+51 999-999-999</a></span>
      <span><i class="fas fa-clock"></i> Lun-Vie: 9:00 - 17:00 hrs</span>
    </div>
    <div class="top-bar-right">
      <a href="https://www.facebook.com/Sintracgr/" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" title="Twitter/X"><i class="fab fa-x-twitter"></i></a>
      <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
      <a href="#" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
    </div>
  </div>
</div>

<!-- HEADER -->
<header class="header" id="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <div class="logo-icon">
        <div class="logo-shield">
          <span class="logo-letters">S</span>
        </div>
      </div>
      <div class="logo-text">
        <span class="logo-main">SINTRACGR</span>
        <span class="logo-sub">Sindicato Nacional de Trabajadores CGR</span>
      </div>
    </a>

    <nav class="nav-desktop">
      <ul>
        <li><a href="/" class="nav-link">Inicio</a></li>
        <li><a href="/nosotros" class="nav-link">Nosotros</a></li>
        <li><a href="/derechos" class="nav-link">Derechos Laborales</a></li>
        <li><a href="/afiliacion" class="nav-link">Afíliate</a></li>
        <li><a href="/noticias" class="nav-link">Noticias</a></li>
        <li><a href="/transparencia" class="nav-link">Transparencia</a></li>
        <li><a href="/contacto" class="nav-link">Contacto</a></li>
      </ul>
    </nav>

    <a href="/afiliacion" class="btn-affiliate">
      <i class="fas fa-user-plus"></i> Afíliate Ahora
    </a>

    <button class="hamburger" id="hamburger" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  </div>

  <!-- Mobile nav -->
  <nav class="nav-mobile" id="nav-mobile">
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/nosotros">Nosotros</a></li>
      <li><a href="/derechos">Derechos Laborales</a></li>
      <li><a href="/afiliacion">Afíliate</a></li>
      <li><a href="/noticias">Noticias</a></li>
      <li><a href="/transparencia">Transparencia</a></li>
      <li><a href="/contacto">Contacto</a></li>
      <li><a href="/afiliacion" class="mobile-cta">Afíliate Ahora</a></li>
    </ul>
  </nav>
</header>

${content}

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-main">
    <div class="container footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <div class="logo-icon logo-icon-sm">
            <div class="logo-shield logo-shield-white">
              <span class="logo-letters">S</span>
            </div>
          </div>
          <div class="logo-text">
            <span class="logo-main logo-main-white">SINTRACGR</span>
            <span class="logo-sub logo-sub-white">Sindicato Nacional de Trabajadores CGR</span>
          </div>
        </div>
        <p class="footer-desc">Defendemos los derechos de los servidores públicos de la Contraloría General de la República del Perú desde hace más de 20 años, con asesoría legal especializada y negociación colectiva.</p>
        <div class="footer-affiliation">
          <span class="affil-badge">CGTP</span>
          <span class="affil-badge">CUT Perú</span>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Contacto</h4>
        <ul class="footer-contact">
          <li><i class="fas fa-map-marker-alt"></i> Av. Jesús de Valle 106, Lima - Perú</li>
          <li><i class="fas fa-phone"></i> <a href="tel:+51999999999">+51 999-999-999</a></li>
          <li><i class="fab fa-whatsapp"></i> <a href="https://wa.me/51999999999?text=Hola%20SINTRACGR%2C%20necesito%20informaci%C3%B3n%20sobre..." target="_blank">WhatsApp: +51 999-999-999</a></li>
          <li><i class="fas fa-envelope"></i> <a href="mailto:info@sintracgr.org.pe">info@sintracgr.org.pe</a></li>
          <li><i class="fas fa-clock"></i> Lun-Vie: 9:00 - 17:00 hrs</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Enlaces Rápidos</h4>
        <ul class="footer-links">
          <li><a href="/afiliacion"><i class="fas fa-chevron-right"></i> Afiliación</a></li>
          <li><a href="/derechos"><i class="fas fa-chevron-right"></i> Derechos Laborales</a></li>
          <li><a href="#convenios"><i class="fas fa-chevron-right"></i> Convenios Colectivos</a></li>
          <li><a href="/noticias"><i class="fas fa-chevron-right"></i> Noticias</a></li>
          <li><a href="#faq"><i class="fas fa-chevron-right"></i> Preguntas Frecuentes</a></li>
          <li><a href="/transparencia"><i class="fas fa-chevron-right"></i> Transparencia</a></li>
          <li><a href="/contacto"><i class="fas fa-chevron-right"></i> Contacto</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Síguenos</h4>
        <div class="social-grid">
          <a href="https://www.facebook.com/Sintracgr/" target="_blank" class="social-btn fb"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
          <a href="#" class="social-btn tw"><i class="fab fa-x-twitter"></i><span>Twitter/X</span></a>
          <a href="#" class="social-btn ig"><i class="fab fa-instagram"></i><span>Instagram</span></a>
          <a href="#" class="social-btn yt"><i class="fab fa-youtube"></i><span>YouTube</span></a>
        </div>
        <div class="footer-newsletter">
          <h5>Recibe nuestros comunicados</h5>
          <form class="newsletter-form" onsubmit="subscribeNewsletter(event)">
            <input type="email" placeholder="Tu correo institucional" required>
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>© 2024 SINTRACGR - Todos los derechos reservados</p>
      <div class="footer-legal">
        <a href="#">Política de Privacidad</a>
        <a href="#">Términos de Uso</a>
        <a href="#">Mapa del Sitio</a>
      </div>
      <p class="footer-dev">Sitio desarrollado para la defensa de los trabajadores de la CGR</p>
    </div>
  </div>
</footer>

<!-- WHATSAPP FLOATING BUTTON -->
<a href="https://wa.me/51999999999?text=Hola%20SINTRACGR%2C%20necesito%20informaci%C3%B3n%20sobre..." 
   target="_blank" class="whatsapp-float" title="Escríbenos por WhatsApp">
  <i class="fab fa-whatsapp"></i>
  <span class="wa-tooltip">¿Necesitas ayuda?</span>
</a>

<!-- BACK TO TOP -->
<button class="back-to-top" id="backToTop" title="Volver arriba">
  <i class="fas fa-chevron-up"></i>
</button>

<script src="/static/app.js"></script>
${extraScripts}
</body>
</html>`
}

function homePage() {
  const content = `
<!-- HERO SECTION -->
<section class="hero">
  <div class="hero-bg">
    <div class="hero-overlay"></div>
    <div class="hero-pattern"></div>
  </div>
  <div class="container hero-content">
    <div class="hero-badge">
      <i class="fas fa-shield-alt"></i> Más de 20 años defendiendo tus derechos
    </div>
    <h1 class="hero-title">Defendiendo los Derechos de los <span class="highlight-red">Servidores Públicos</span> de la Contraloría General de la República</h1>
    <p class="hero-subtitle">La Contraloría fiscaliza al Estado. <strong>SINTRACGR defiende a quienes la hacen funcionar.</strong> Más de 2,500 trabajadores organizados luchando por mejores condiciones laborales, salarios justos y respeto a la carrera pública.</p>
    <div class="hero-actions">
      <a href="/afiliacion" class="btn-primary btn-lg">
        <i class="fas fa-user-plus"></i> Únete a SINTRACGR
      </a>
      <a href="/derechos" class="btn-secondary btn-lg">
        <i class="fas fa-balance-scale"></i> Conoce tus Derechos
      </a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="stat-number" data-target="2500">0</span><span>+</span>
        <span class="stat-label">Afiliados Activos</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="20">0</span><span>+</span>
        <span class="stat-label">Años de Lucha</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="850">0</span><span>+</span>
        <span class="stat-label">Casos Ganados</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number" data-target="98">0</span><span>%</span>
        <span class="stat-label">Satisfacción</span>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <a href="#beneficios"><i class="fas fa-chevron-down"></i></a>
  </div>
</section>

<!-- URGENT ALERT BANNER -->
<div class="alert-banner">
  <div class="container alert-inner">
    <i class="fas fa-bullhorn"></i>
    <span><strong>COMUNICADO URGENTE:</strong> Asamblea General Extraordinaria - Miércoles 27 de marzo, 18:00 hrs. Sede sindical.</span>
    <a href="/noticias" class="alert-link">Ver más <i class="fas fa-arrow-right"></i></a>
  </div>
</div>

<!-- BENEFITS SECTION -->
<section class="section benefits-section" id="beneficios">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">¿Por qué afiliarte?</span>
      <h2 class="section-title">Tu Sindicato Trabaja por Ti</h2>
      <p class="section-subtitle">SINTRACGR te brinda protección integral como servidor público de la Contraloría General de la República</p>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card benefit-card--primary">
        <div class="benefit-icon">
          <i class="fas fa-gavel"></i>
        </div>
        <h3>Defensa Legal Especializada</h3>
        <p>Asesoría jurídica gratuita en conflictos laborales del sector público. Abogados especializados en Ley SERVIR y normativa de la CGR.</p>
        <a href="/afiliacion" class="benefit-link">Solicitar asesoría <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="benefit-card benefit-card--secondary">
        <div class="benefit-icon">
          <i class="fas fa-handshake"></i>
        </div>
        <h3>Negociación Colectiva</h3>
        <p>Representación ante la CGR para mejoras salariales y condiciones laborales. Convenios colectivos renovados cada año.</p>
        <a href="/nosotros" class="benefit-link">Ver logros <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="benefit-card benefit-card--accent">
        <div class="benefit-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h3>Capacitación Continua</h3>
        <p>Talleres sobre derechos laborales, Ley SERVIR y carrera pública. Becas y certificaciones para el desarrollo profesional.</p>
        <a href="/noticias" class="benefit-link">Ver calendario <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="benefit-card benefit-card--primary">
        <div class="benefit-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h3>Protección contra Arbitrariedades</h3>
        <p>Respaldo en casos de acoso laboral, despidos irregulares y evaluaciones injustas. Intervención inmediata en emergencias laborales.</p>
        <a href="/contacto" class="benefit-link">Denunciar ahora <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="benefit-card benefit-card--secondary">
        <div class="benefit-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Red de Solidaridad</h3>
        <p>Comunidad de servidores públicos comprometidos con la justicia laboral. Apoyo mutuo y representación colectiva ante autoridades.</p>
        <a href="/afiliacion" class="benefit-link">Únete a la red <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="benefit-card benefit-card--accent cta-card">
        <div class="cta-card-inner">
          <i class="fas fa-user-plus cta-icon"></i>
          <h3>¿Eres servidor de la CGR?</h3>
          <p>Protege tus derechos hoy mismo. La afiliación es gratuita y el proceso solo toma 3 minutos.</p>
          <a href="/afiliacion" class="btn-primary">Afiliarme Ahora</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VICTORIES SECTION -->
<section class="section victories-section" id="victorias">
  <div class="container">
    <div class="section-header section-header--light">
      <span class="section-tag section-tag--gold">Nuestros Logros</span>
      <h2 class="section-title section-title--white">Victorias que Hablan por Sí Mismas</h2>
      <p class="section-subtitle section-subtitle--light">Resultados concretos para los trabajadores de la CGR 2023-2024</p>
    </div>
    <div class="victories-grid">
      <div class="victory-card">
        <div class="victory-icon"><i class="fas fa-trophy"></i></div>
        <div class="victory-number gold" data-target="12">0</div>
        <div class="victory-suffix">millones S/</div>
        <div class="victory-label">En incremento salarial negociado 2024</div>
      </div>
      <div class="victory-card">
        <div class="victory-icon"><i class="fas fa-user-shield"></i></div>
        <div class="victory-number gold" data-target="340">0</div>
        <div class="victory-suffix">trabajadores</div>
        <div class="victory-label">Protegidos de despidos arbitrarios</div>
      </div>
      <div class="victory-card">
        <div class="victory-icon"><i class="fas fa-file-contract"></i></div>
        <div class="victory-number gold" data-target="15">0</div>
        <div class="victory-suffix">beneficios</div>
        <div class="victory-label">Nuevos en convenio colectivo 2024</div>
      </div>
      <div class="victory-card">
        <div class="victory-icon"><i class="fas fa-balance-scale"></i></div>
        <div class="victory-number gold" data-target="856">0</div>
        <div class="victory-suffix">casos</div>
        <div class="victory-label">Ganados en defensa de derechos laborales</div>
      </div>
    </div>

    <div class="victories-timeline">
      <h3 class="timeline-title">Hitos Históricos SINTRACGR</h3>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-year">2024</div>
          <div class="timeline-content">
            <strong>Convenio Colectivo Histórico</strong>
            <p>Incremento del 15% en remuneraciones + bonificación por productividad para todos los afiliados</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2023</div>
          <div class="timeline-content">
            <strong>Protección Masiva</strong>
            <p>Reversión de 340 despidos irregulares durante el proceso de reorganización institucional</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2022</div>
          <div class="timeline-content">
            <strong>Reforma del Reglamento Interno</strong>
            <p>Modificación de normas de evaluación de desempeño con criterios justos y transparentes</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-year">2020</div>
          <div class="timeline-content">
            <strong>Pandemia COVID-19</strong>
            <p>Negociación exitosa de teletrabajo, EPPs y protección salarial durante la emergencia sanitaria</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RIGHTS SECTION PREVIEW -->
<section class="section rights-preview" id="derechos">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Información Clave</span>
      <h2 class="section-title">Conoce tus Derechos Laborales</h2>
      <p class="section-subtitle">Como servidor de la CGR tienes derechos específicos bajo la Ley SERVIR. ¿Los conoces?</p>
    </div>
    <div class="rights-grid">
      <div class="right-card" data-tab="servir">
        <div class="right-icon"><i class="fas fa-book-open"></i></div>
        <h3>Ley SERVIR</h3>
        <p>Conoce el marco legal que protege tu carrera en el servicio civil peruano</p>
        <a href="/derechos" class="right-link">Ver guía completa</a>
      </div>
      <div class="right-card" data-tab="jornada">
        <div class="right-icon"><i class="fas fa-clock"></i></div>
        <h3>Jornada Laboral</h3>
        <p>Tus derechos sobre horarios, horas extras y compensaciones en la CGR</p>
        <a href="/derechos" class="right-link">Ver detalles</a>
      </div>
      <div class="right-card" data-tab="estabilidad">
        <div class="right-icon"><i class="fas fa-home"></i></div>
        <h3>Estabilidad Laboral</h3>
        <p>Protección contra despidos arbitrarios y derechos bajo contrato CAS</p>
        <a href="/derechos" class="right-link">Más información</a>
      </div>
      <div class="right-card" data-tab="evaluacion">
        <div class="right-icon"><i class="fas fa-star"></i></div>
        <h3>Evaluación Justa</h3>
        <p>Tu derecho a una evaluación de desempeño transparente y con debida proceso</p>
        <a href="/derechos" class="right-link">Saber más</a>
      </div>
      <div class="right-card" data-tab="acoso">
        <div class="right-icon"><i class="fas fa-hand-paper"></i></div>
        <h3>Contra el Acoso</h3>
        <p>Protección y canales de denuncia ante acoso laboral o sexual en la institución</p>
        <a href="/derechos" class="right-link">Denunciar</a>
      </div>
      <div class="right-card" data-tab="licencias">
        <div class="right-icon"><i class="fas fa-calendar-alt"></i></div>
        <h3>Licencias y Permisos</h3>
        <p>Vacaciones, licencias por enfermedad, maternidad, paternidad y más</p>
        <a href="/derechos" class="right-link">Ver todos</a>
      </div>
    </div>
    <div class="rights-cta">
      <div class="alert-box">
        <i class="fas fa-exclamation-triangle"></i>
        <p>¿Te vulneraron alguno de estos derechos? <strong>No estás solo.</strong> SINTRACGR tiene abogados especializados listos para ayudarte.</p>
        <a href="/contacto" class="btn-primary">Solicitar Asesoría Legal Gratuita</a>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS SECTION -->
<section class="section testimonials-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Historias Reales</span>
      <h2 class="section-title">Lo que Dicen Nuestros Afiliados</h2>
      <p class="section-subtitle">Experiencias de servidores de la CGR que SINTRACGR defendió exitosamente</p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar" style="background: var(--blue)">J</div>
          <div class="testimonial-meta">
            <strong>Juan P.</strong>
            <span>Auditoría Gubernamental</span>
          </div>
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
        </div>
        <blockquote>
          "Cuando enfrenté un despido irregular, SINTRACGR me brindó asesoría legal inmediata. Gracias a su intervención, fui reincorporado con <strong>todos mis derechos respetados</strong> en menos de 30 días."
        </blockquote>
        <div class="testimonial-badge"><i class="fas fa-check-circle"></i> Caso verificado</div>
      </div>

      <div class="testimonial-card testimonial-card--featured">
        <div class="testimonial-header">
          <div class="testimonial-avatar" style="background: var(--red)">M</div>
          <div class="testimonial-meta">
            <strong>María C.</strong>
            <span>Control Interno</span>
          </div>
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
        </div>
        <blockquote>
          "Sufrí acoso laboral por parte de mi jefe directo por más de un año. SINTRACGR no solo me acompañó emocionalmente sino que inició el procedimiento legal correspondiente. Hoy trabajo en un ambiente digno y sano. <strong>Son mi familia sindical.</strong>"
        </blockquote>
        <div class="testimonial-badge"><i class="fas fa-check-circle"></i> Caso verificado</div>
      </div>

      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar" style="background: var(--gold)">R</div>
          <div class="testimonial-meta">
            <strong>Roberto A.</strong>
            <span>Sistemas de Información</span>
          </div>
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
        </div>
        <blockquote>
          "Gracias a la negociación colectiva de SINTRACGR, mi sueldo aumentó 18% en 2024. Además accedí a una beca de posgrado que jamás habría conseguido solo. <strong>La afiliación es la mejor inversión de mi carrera.</strong>"
        </blockquote>
        <div class="testimonial-badge"><i class="fas fa-check-circle"></i> Caso verificado</div>
      </div>

      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar" style="background: var(--green)">A</div>
          <div class="testimonial-meta">
            <strong>Ana L.</strong>
            <span>Recursos Humanos CGR</span>
          </div>
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
          </div>
        </div>
        <blockquote>
          "Mi evaluación de desempeño fue injusta y amenazaba mi continuidad laboral. SINTRACGR impugnó el proceso y demostró las irregularidades. Mi calificación fue revisada y mi estabilidad quedó garantizada."
        </blockquote>
        <div class="testimonial-badge"><i class="fas fa-check-circle"></i> Caso verificado</div>
      </div>
    </div>
  </div>
</section>

<!-- TOOLS / QUICK ACCESS -->
<section class="section tools-section" id="herramientas">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Herramientas Digitales</span>
      <h2 class="section-title">Servicios para Afiliados</h2>
      <p class="section-subtitle">Accede a todas las herramientas y recursos de SINTRACGR desde un solo lugar</p>
    </div>
    <div class="tools-grid">
      <a href="/afiliacion#calculadora" class="tool-card">
        <div class="tool-icon tool-icon--blue"><i class="fas fa-calculator"></i></div>
        <h3>Calculadora de Beneficios</h3>
        <p>Simula cuánto mejoraría tu situación como afiliado</p>
        <span class="tool-tag">Gratuito</span>
      </a>
      <a href="/contacto#denuncia" class="tool-card">
        <div class="tool-icon tool-icon--red"><i class="fas fa-flag"></i></div>
        <h3>Denuncia Laboral Online</h3>
        <p>Formulario seguro y 100% confidencial para reportar irregularidades</p>
        <span class="tool-tag tool-tag--red">Urgente</span>
      </a>
      <a href="/nosotros#delegados" class="tool-card">
        <div class="tool-icon tool-icon--gold"><i class="fas fa-address-book"></i></div>
        <h3>Directorio de Delegados</h3>
        <p>Encuentra tu representante sindical por área de la CGR</p>
        <span class="tool-tag">Disponible</span>
      </a>
      <a href="/noticias#calendario" class="tool-card">
        <div class="tool-icon tool-icon--blue"><i class="fas fa-calendar-check"></i></div>
        <h3>Calendario Sindical</h3>
        <p>Asambleas, capacitaciones y movilizaciones programadas</p>
        <span class="tool-tag">Actualizado</span>
      </a>
      <a href="/transparencia#convenios" class="tool-card">
        <div class="tool-icon tool-icon--green"><i class="fas fa-file-download"></i></div>
        <h3>Convenios Colectivos</h3>
        <p>Descarga documentos históricos y vigentes en PDF</p>
        <span class="tool-tag tool-tag--green">PDF Disponible</span>
      </a>
      <a href="/contacto#consulta" class="tool-card">
        <div class="tool-icon tool-icon--red"><i class="fas fa-user-tie"></i></div>
        <h3>Consultas Legales</h3>
        <p>Agenda cita con abogados especializados del sindicato</p>
        <span class="tool-tag tool-tag--red">Afiliados</span>
      </a>
    </div>
  </div>
</section>

<!-- NEWS SECTION PREVIEW -->
<section class="section news-section" id="noticias">
  <div class="container">
    <div class="section-header-row">
      <div>
        <span class="section-tag">Información Actualizada</span>
        <h2 class="section-title">Últimas Noticias y Comunicados</h2>
      </div>
      <a href="/noticias" class="btn-outline">Ver todas <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="news-grid">
      <article class="news-card news-card--featured">
        <div class="news-image">
          <div class="news-img-placeholder news-img-featured">
            <i class="fas fa-bullhorn"></i>
          </div>
          <span class="news-category cat-blue">Comunicado Oficial</span>
        </div>
        <div class="news-content">
          <div class="news-date"><i class="fas fa-calendar"></i> 20 de marzo de 2024</div>
          <h3>SINTRACGR logra la inclusión de 500 trabajadores CAS en el Convenio Colectivo 2024</h3>
          <p>Tras meses de negociación con la Gerencia de Recursos Humanos de la CGR, se ha conseguido la ampliación del convenio colectivo para incluir a trabajadores bajo régimen CAS, garantizando mejoras salariales y beneficios adicionales.</p>
          <a href="/noticias" class="news-read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card">
        <div class="news-image">
          <div class="news-img-placeholder">
            <i class="fas fa-trophy"></i>
          </div>
          <span class="news-category cat-green">Logro</span>
        </div>
        <div class="news-content">
          <div class="news-date"><i class="fas fa-calendar"></i> 15 de marzo de 2024</div>
          <h3>Fallo favorable en caso de despido arbitrario: 45 trabajadores reincorporados</h3>
          <p>El Tribunal del Servicio Civil emitió resolución favorable para 45 trabajadores...</p>
          <a href="/noticias" class="news-read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card">
        <div class="news-image">
          <div class="news-img-placeholder">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <span class="news-category cat-red">Convocatoria</span>
        </div>
        <div class="news-content">
          <div class="news-date"><i class="fas fa-calendar"></i> 10 de marzo de 2024</div>
          <h3>Taller: "Tus Derechos bajo Ley SERVIR" - Inscripciones abiertas</h3>
          <p>Capacitación gratuita para todos los afiliados sobre la aplicación práctica de la Ley del Servicio Civil...</p>
          <a href="/noticias" class="news-read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card">
        <div class="news-image">
          <div class="news-img-placeholder">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <span class="news-category cat-gold">Alerta</span>
        </div>
        <div class="news-content">
          <div class="news-date"><i class="fas fa-calendar"></i> 5 de marzo de 2024</div>
          <h3>Alerta: Nueva normativa de evaluación 2024 - Puntos a observar</h3>
          <p>SINTRACGR analiza la nueva directiva de evaluación de desempeño emitida por la Oficina de RRHH...</p>
          <a href="/noticias" class="news-read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- AFFILIATION PROCESS -->
<section class="section affiliation-section" id="afiliacion">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Únete a Nosotros</span>
      <h2 class="section-title">Proceso de Afiliación</h2>
      <p class="section-subtitle">Tres simples pasos para proteger tus derechos laborales en la CGR</p>
    </div>
    <div class="steps-container">
      <div class="step step--blue">
        <div class="step-number">01</div>
        <div class="step-icon"><i class="fas fa-file-alt"></i></div>
        <h3>Completa el Formulario</h3>
        <p>Ingresa tus datos como servidor de la CGR. El proceso es 100% confidencial y solo toma 3 minutos.</p>
      </div>
      <div class="step-arrow"><i class="fas fa-arrow-right"></i></div>
      <div class="step step--red">
        <div class="step-number">02</div>
        <div class="step-icon"><i class="fas fa-shield-alt"></i></div>
        <h3>Validación</h3>
        <p>Verificamos tu condición laboral en la CGR. El proceso toma entre 24 y 48 horas hábiles.</p>
      </div>
      <div class="step-arrow"><i class="fas fa-arrow-right"></i></div>
      <div class="step step--gold">
        <div class="step-number">03</div>
        <div class="step-icon"><i class="fas fa-id-card"></i></div>
        <h3>¡Bienvenido!</h3>
        <p>Recibe tu carnet sindical y accede inmediatamente a todos los beneficios y protecciones de SINTRACGR.</p>
      </div>
    </div>
    <div class="affiliation-cta">
      <a href="/afiliacion" class="btn-primary btn-xl">
        <i class="fas fa-user-plus"></i> Comenzar Mi Afiliación Ahora
      </a>
      <p class="affiliation-note"><i class="fas fa-lock"></i> Proceso completamente gratuito y confidencial</p>
    </div>
  </div>
</section>

<!-- TRANSPARENCY PREVIEW -->
<section class="section transparency-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Rendición de Cuentas</span>
      <h2 class="section-title">Transparencia Total</h2>
      <p class="section-subtitle">Cada sol de tu cuota se invierte en tu defensa. Conoce exactamente cómo usamos nuestros recursos.</p>
    </div>
    <div class="transparency-grid">
      <div class="transparency-card">
        <div class="trans-icon"><i class="fas fa-chart-pie"></i></div>
        <h3>Uso de Cuotas 2024</h3>
        <div class="budget-bars">
          <div class="budget-bar">
            <span class="budget-label">Asesoría Legal</span>
            <div class="bar-track"><div class="bar-fill bar-fill--red" style="width: 45%">45%</div></div>
          </div>
          <div class="budget-bar">
            <span class="budget-label">Capacitación</span>
            <div class="bar-track"><div class="bar-fill bar-fill--blue" style="width: 30%">30%</div></div>
          </div>
          <div class="budget-bar">
            <span class="budget-label">Administración</span>
            <div class="bar-track"><div class="bar-fill bar-fill--gold" style="width: 15%">15%</div></div>
          </div>
          <div class="budget-bar">
            <span class="budget-label">Movilizaciones</span>
            <div class="bar-track"><div class="bar-fill bar-fill--green" style="width: 10%">10%</div></div>
          </div>
        </div>
      </div>
      <div class="transparency-card">
        <div class="trans-icon"><i class="fas fa-file-invoice-dollar"></i></div>
        <h3>Documentos Descargables</h3>
        <ul class="doc-list">
          <li>
            <i class="fas fa-file-pdf pdf-icon"></i>
            <span>Estado Financiero 2024</span>
            <a href="#" class="doc-download"><i class="fas fa-download"></i></a>
          </li>
          <li>
            <i class="fas fa-file-pdf pdf-icon"></i>
            <span>Estado Financiero 2023</span>
            <a href="#" class="doc-download"><i class="fas fa-download"></i></a>
          </li>
          <li>
            <i class="fas fa-file-pdf pdf-icon"></i>
            <span>Convenio Colectivo 2024</span>
            <a href="#" class="doc-download"><i class="fas fa-download"></i></a>
          </li>
          <li>
            <i class="fas fa-file-pdf pdf-icon"></i>
            <span>Estatutos SINTRACGR</span>
            <a href="#" class="doc-download"><i class="fas fa-download"></i></a>
          </li>
          <li>
            <i class="fas fa-file-pdf pdf-icon"></i>
            <span>Plan de Trabajo 2024</span>
            <a href="#" class="doc-download"><i class="fas fa-download"></i></a>
          </li>
        </ul>
        <a href="/transparencia" class="btn-outline btn-sm">Ver todos los documentos</a>
      </div>
      <div class="transparency-card">
        <div class="trans-icon"><i class="fas fa-users-cog"></i></div>
        <h3>Directiva 2024-2026</h3>
        <div class="directiva-list">
          <div class="directiva-item">
            <div class="dir-avatar">SP</div>
            <div class="dir-info">
              <strong>Sr. [Secretario General]</strong>
              <span>Secretario General</span>
            </div>
          </div>
          <div class="directiva-item">
            <div class="dir-avatar">VP</div>
            <div class="dir-info">
              <strong>Sr. [Vice-Secretario]</strong>
              <span>Vice-Secretario</span>
            </div>
          </div>
          <div class="directiva-item">
            <div class="dir-avatar">ST</div>
            <div class="dir-info">
              <strong>Sr. [Sec. Tesorería]</strong>
              <span>Secretaría de Tesorería</span>
            </div>
          </div>
        </div>
        <a href="/nosotros#directiva" class="btn-outline btn-sm">Ver directiva completa</a>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA SECTION -->
<section class="section final-cta">
  <div class="container final-cta-inner">
    <div class="final-cta-text">
      <h2>¿Te vulneraron tus derechos laborales?</h2>
      <p>No esperes más. SINTRACGR está listo para defenderte hoy mismo. Asesoría legal gratuita, confidencial y especializada en el sector público peruano.</p>
    </div>
    <div class="final-cta-actions">
      <a href="/afiliacion" class="btn-primary btn-lg">
        <i class="fas fa-user-plus"></i> Afiliarme a SINTRACGR
      </a>
      <a href="/contacto" class="btn-secondary btn-lg">
        <i class="fas fa-phone"></i> Llamar Ahora
      </a>
    </div>
  </div>
</section>
`
  return baseLayout('Inicio - Defendiendo los Derechos de los Servidores Públicos de la CGR', content)
}

function nosotrosPage() {
  const content = `
<section class="page-hero page-hero--blue">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Nosotros</nav>
    <h1>Sobre SINTRACGR</h1>
    <p>Conoce nuestra historia, misión y los logros que hemos alcanzado para los trabajadores de la Contraloría</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="about-intro">
      <div class="about-text">
        <h2>¿Quiénes Somos?</h2>
        <p>El <strong>Sindicato Nacional de Trabajadores de la Contraloría General de la República (SINTRACGR)</strong> fue fundado por servidores públicos comprometidos con la dignidad laboral y el reconocimiento de los derechos de quienes hacen funcionar la institución fiscalizadora más importante del Perú.</p>
        <p>Durante más de 20 años, hemos representado los intereses de los trabajadores ante las autoridades de la CGR, el SERVIR y el Ministerio de Trabajo, logrando mejoras concretas en las condiciones laborales, salariales y de bienestar de nuestros afiliados.</p>
        <p>Somos parte de la <strong>Confederación General de Trabajadores del Perú (CGTP)</strong> y miembros activos de la Central Única de Trabajadores (CUT Perú), lo que nos otorga capacidad de negociación y respaldo a nivel nacional.</p>
      </div>
      <div class="about-values">
        <h3>Nuestros Valores</h3>
        <div class="value-item"><i class="fas fa-fist-raised" style="color:var(--red)"></i><div><strong>Solidaridad</strong><p>La fuerza del trabajador está en la unidad colectiva</p></div></div>
        <div class="value-item"><i class="fas fa-eye" style="color:var(--blue)"></i><div><strong>Transparencia</strong><p>Rendición de cuentas total ante nuestros afiliados</p></div></div>
        <div class="value-item"><i class="fas fa-balance-scale" style="color:var(--gold)"></i><div><strong>Justicia</strong><p>Defensa irrestricta de los derechos laborales</p></div></div>
        <div class="value-item"><i class="fas fa-medal" style="color:var(--green)"></i><div><strong>Excelencia</strong><p>Representación de alta calidad para cada afiliado</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light" id="directiva">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Directiva Nacional 2024-2026</h2>
      <p class="section-subtitle">Los líderes elegidos democráticamente por la asamblea de afiliados</p>
    </div>
    <div class="directiva-grid">
      <div class="dir-card dir-card--main">
        <div class="dir-card-avatar" style="background:var(--blue)">SG</div>
        <h3>Secretario General</h3>
        <p class="dir-area">Representación Máxima del Sindicato</p>
        <p class="dir-desc">Responsable de la representación institucional de SINTRACGR ante la CGR, SERVIR y entidades del Estado.</p>
      </div>
      <div class="dir-card">
        <div class="dir-card-avatar" style="background:var(--red)">VS</div>
        <h3>Vice-Secretario General</h3>
        <p class="dir-area">Coordinación Interna</p>
      </div>
      <div class="dir-card">
        <div class="dir-card-avatar" style="background:var(--gold)">ST</div>
        <h3>Sec. de Tesorería</h3>
        <p class="dir-area">Gestión Financiera</p>
      </div>
      <div class="dir-card">
        <div class="dir-card-avatar" style="background:var(--green)">SD</div>
        <h3>Sec. de Defensa</h3>
        <p class="dir-area">Defensa Laboral y Legal</p>
      </div>
      <div class="dir-card">
        <div class="dir-card-avatar" style="background:var(--blue)">SC</div>
        <h3>Sec. de Capacitación</h3>
        <p class="dir-area">Formación y Desarrollo</p>
      </div>
      <div class="dir-card">
        <div class="dir-card-avatar" style="background:var(--red)">SB</div>
        <h3>Sec. de Bienestar</h3>
        <p class="dir-area">Bienestar del Afiliado</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="delegados">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Delegados por Área</h2>
      <p class="section-subtitle">Encuentra tu representante sindical en tu área de trabajo</p>
    </div>
    <div class="delegados-grid">
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-search"></i></div><h4>Auditoría Gubernamental</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-desktop"></i></div><h4>Sistemas de Información</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-users"></i></div><h4>Recursos Humanos</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-chart-bar"></i></div><h4>Control Interno</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-gavel"></i></div><h4>Asesoría Legal</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
      <div class="delegado-card"><div class="del-icon"><i class="fas fa-building"></i></div><h4>Administración General</h4><p>Delegado disponible</p><a href="/contacto" class="del-contact"><i class="fas fa-phone"></i> Contactar</a></div>
    </div>
  </div>
</section>
`
  return baseLayout('Nosotros - Historia y Misión', content)
}

function derechosPage() {
  const content = `
<section class="page-hero page-hero--blue">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Derechos Laborales</nav>
    <h1>Tus Derechos como Servidor Público</h1>
    <p>Guía completa de derechos laborales para trabajadores de la Contraloría General de la República</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="rights-tabs">
      <div class="tabs-nav">
        <button class="tab-btn active" data-tab="servir"><i class="fas fa-book-open"></i> Ley SERVIR</button>
        <button class="tab-btn" data-tab="jornada"><i class="fas fa-clock"></i> Jornada Laboral</button>
        <button class="tab-btn" data-tab="estabilidad"><i class="fas fa-home"></i> Estabilidad</button>
        <button class="tab-btn" data-tab="evaluacion"><i class="fas fa-star"></i> Evaluación</button>
        <button class="tab-btn" data-tab="acoso"><i class="fas fa-hand-paper"></i> Acoso Laboral</button>
        <button class="tab-btn" data-tab="licencias"><i class="fas fa-calendar-alt"></i> Licencias</button>
        <button class="tab-btn" data-tab="disciplinario"><i class="fas fa-gavel"></i> Régimen Disciplinario</button>
      </div>

      <div class="tab-content active" id="tab-servir">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-book-open"></i> Ley SERVIR y tus Derechos</h2>
            <p>La <strong>Ley N° 30057 - Ley del Servicio Civil (SERVIR)</strong> establece el régimen único y exclusivo para las personas que prestan servicios en las entidades públicas del Estado peruano.</p>
            <div class="right-detail">
              <h3>Derechos Fundamentales bajo Ley SERVIR</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Igualdad de oportunidades sin discriminación</li>
                <li><i class="fas fa-check"></i> Derecho a la progresión en la carrera</li>
                <li><i class="fas fa-check"></i> Capacitación y desarrollo profesional continuo</li>
                <li><i class="fas fa-check"></i> Remuneración justa y equitativa</li>
                <li><i class="fas fa-check"></i> Acceso a seguridad social (EsSalud, CTS, pensiones)</li>
                <li><i class="fas fa-check"></i> Protección contra el despido arbitrario</li>
                <li><i class="fas fa-check"></i> Ambiente de trabajo seguro y saludable</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> Ley N° 30057 y su Reglamento D.S. N° 040-2014-PCM</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Descargar Guía SERVIR</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Te vulneraron este derecho? Denúncialo</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-jornada">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-clock"></i> Jornada Laboral y Compensaciones</h2>
            <p>Los servidores de la CGR tienen derechos específicos sobre su tiempo de trabajo y las compensaciones correspondientes.</p>
            <div class="right-detail">
              <h3>Tus derechos sobre jornada laboral</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Jornada máxima de 8 horas diarias / 48 horas semanales</li>
                <li><i class="fas fa-check"></i> Compensación por horas extras o tiempo compensatorio</li>
                <li><i class="fas fa-check"></i> Refrigerio de al menos 45 minutos no computable</li>
                <li><i class="fas fa-check"></i> Descanso semanal obligatorio (mínimo 24 horas continuas)</li>
                <li><i class="fas fa-check"></i> Trabajo remoto bajo acuerdo y protocolos establecidos</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> D.Leg. N° 1057, Ley N° 28015, D.S. N° 004-2013-PCM</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Descargar Guía Jornada Laboral</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Te vulneraron este derecho? Denúncialo</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-estabilidad">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-home"></i> Estabilidad Laboral y CAS</h2>
            <p>La protección contra el despido arbitrario es un derecho fundamental. Conoce las diferencias entre regímenes laborales y tus protecciones específicas.</p>
            <div class="right-detail">
              <h3>Protecciones frente a despidos irregulares</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Derecho a procedimiento previo antes de cualquier cese</li>
                <li><i class="fas fa-check"></i> Notificación escrita con causas específicas justificadas</li>
                <li><i class="fas fa-check"></i> Derecho a defensa y descargo formal ante el empleador</li>
                <li><i class="fas fa-check"></i> Reposición o indemnización en caso de despido arbitrario</li>
                <li><i class="fas fa-check"></i> Trabajadores CAS: Impugnación ante Tribunal del Servicio Civil</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> D.Leg. N° 1057 (CAS), Ley N° 30057 (SERVIR), Art. 27 Constitución Política del Perú</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Descargar Guía Estabilidad Laboral</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Te amenazaron con un despido? Actúa ahora</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-evaluacion">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-star"></i> Evaluación de Desempeño Justa</h2>
            <p>El proceso de evaluación de desempeño debe realizarse con criterios objetivos, transparentes y con garantía de debido proceso.</p>
            <div class="right-detail">
              <h3>Tus derechos en la evaluación</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Conocer previamente los criterios y metas de evaluación</li>
                <li><i class="fas fa-check"></i> Retroalimentación continua durante el período de evaluación</li>
                <li><i class="fas fa-check"></i> Derecho a impugnar resultados que consideres injustos</li>
                <li><i class="fas fa-check"></i> Evaluador debe ser tu supervisor directo con capacitación</li>
                <li><i class="fas fa-check"></i> Proceso de reconsideración y apelación ante instancias superiores</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> Ley N° 30057, D.S. N° 040-2014-PCM, Directiva de Evaluación SERVIR</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Descargar Guía de Evaluación</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Evaluación injusta? Impúgnala con nosotros</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-acoso">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-hand-paper"></i> Protección contra el Acoso Laboral</h2>
            <p>El acoso laboral y hostigamiento sexual son conductas prohibidas en el sector público. Conoce cómo identificarlos y cómo denunciarlos.</p>
            <div class="right-detail">
              <h3>Tipos de conductas prohibidas</h3>
              <ul class="rights-list">
                <li><i class="fas fa-times red"></i> Hostigamiento sexual: insinuaciones no deseadas, chantaje</li>
                <li><i class="fas fa-times red"></i> Acoso laboral: presión, humillaciones, aislamiento sistemático</li>
                <li><i class="fas fa-times red"></i> Discriminación por género, edad, discapacidad, creencias</li>
                <li><i class="fas fa-times red"></i> Represalias por denuncias o ejercicio de derechos sindicales</li>
              </ul>
              <h3>¿Cómo denunciar?</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Denuncia ante la Oficina de Recursos Humanos de la CGR</li>
                <li><i class="fas fa-check"></i> Denuncia ante SINTRACGR para acompañamiento legal</li>
                <li><i class="fas fa-check"></i> Denuncia ante el MTPE si hay hostigamiento sexual</li>
                <li><i class="fas fa-check"></i> Denuncia penal ante la Fiscalía si hay delito</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> Ley N° 27942 (Hostigamiento Sexual), Ley N° 29783 (SST)</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Protocolo de Denuncia</a>
            <a href="/contacto" class="alert-btn urgent"><i class="fas fa-exclamation-triangle"></i> ¡Denuncia Ahora! Es Confidencial</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-licencias">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-calendar-alt"></i> Licencias y Permisos</h2>
            <p>Como servidor público de la CGR tienes derecho a diversas licencias y permisos según las circunstancias.</p>
            <div class="right-detail">
              <div class="licenses-grid-inner">
                <div class="license-item"><strong>Vacaciones</strong><p>30 días calendario anuales remunerados</p></div>
                <div class="license-item"><strong>Licencia por Enfermedad</strong><p>Con goce de haber hasta 52 días; sin goce hasta 1 año</p></div>
                <div class="license-item"><strong>Licencia de Maternidad</strong><p>98 días (49 prenatal + 49 postnatal). Prorrogable</p></div>
                <div class="license-item"><strong>Licencia de Paternidad</strong><p>10 días hábiles remunerados al nacimiento del hijo</p></div>
                <div class="license-item"><strong>Licencia por Luto</strong><p>5 días hábiles por fallecimiento de familiar directo</p></div>
                <div class="license-item"><strong>Licencia Sindical</strong><p>Para actividades sindicales reconocidas por la CGR</p></div>
              </div>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> D.S. N° 005-90-PCM, Ley N° 26644, Ley N° 29409</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Guía Completa de Licencias</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Te negaron una licencia? Consúltanos</a>
          </div>
        </div>
      </div>

      <div class="tab-content" id="tab-disciplinario">
        <div class="rights-content">
          <div class="rights-info">
            <h2><i class="fas fa-gavel"></i> Régimen Disciplinario</h2>
            <p>Si eres objeto de un proceso disciplinario, tienes derechos fundamentales que deben ser respetados.</p>
            <div class="right-detail">
              <h3>Tus derechos en procesos disciplinarios</h3>
              <ul class="rights-list">
                <li><i class="fas fa-check"></i> Derecho al debido proceso y a ser escuchado</li>
                <li><i class="fas fa-check"></i> Notificación formal con cargos específicos y pruebas</li>
                <li><i class="fas fa-check"></i> Plazo razonable para presentar descargos</li>
                <li><i class="fas fa-check"></i> Acceso completo al expediente disciplinario</li>
                <li><i class="fas fa-check"></i> Derecho a ser asistido por abogado o delegado sindical</li>
                <li><i class="fas fa-check"></i> Apelación ante el Tribunal del Servicio Civil</li>
                <li><i class="fas fa-check"></i> Prescripción de infracciones según plazos legales</li>
              </ul>
            </div>
            <div class="law-ref"><i class="fas fa-balance-scale"></i> <strong>Base Legal:</strong> Ley N° 30057, D.S. N° 040-2014-PCM Título V</div>
          </div>
          <div class="rights-actions">
            <a href="#" class="download-btn"><i class="fas fa-file-pdf"></i> Guía de Procesos Disciplinarios</a>
            <a href="/contacto" class="alert-btn"><i class="fas fa-exclamation-triangle"></i> ¿Tienes un proceso disciplinario? Llámanos YA</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return baseLayout('Derechos Laborales - Guía Completa para Servidores de la CGR', content)
}

function afiliacionPage() {
  const content = `
<section class="page-hero page-hero--red">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Afíliate</nav>
    <h1>Únete a SINTRACGR</h1>
    <p>Protege tus derechos laborales hoy mismo. El proceso es gratuito, sencillo y confidencial.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="affiliation-layout">
      <div class="affiliation-form-col">
        <div class="form-card">
          <h2><i class="fas fa-user-plus"></i> Formulario de Afiliación</h2>
          <p class="form-note"><i class="fas fa-lock"></i> Tus datos son completamente confidenciales y seguros</p>
          <form id="affiliationForm" onsubmit="submitAffiliation(event)">
            <div class="form-group">
              <label for="nombres">Nombres completos *</label>
              <input type="text" id="nombres" name="nombres" placeholder="Ingresa tus nombres" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="apellido_paterno">Apellido Paterno *</label>
                <input type="text" id="apellido_paterno" name="apellido_paterno" placeholder="Apellido paterno" required>
              </div>
              <div class="form-group">
                <label for="apellido_materno">Apellido Materno *</label>
                <input type="text" id="apellido_materno" name="apellido_materno" placeholder="Apellido materno" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="dni">DNI *</label>
                <input type="text" id="dni" name="dni" placeholder="N° de DNI" maxlength="8" pattern="[0-9]{8}" required>
              </div>
              <div class="form-group">
                <label for="telefono">Teléfono/Celular *</label>
                <input type="tel" id="telefono" name="telefono" placeholder="+51 9XX-XXX-XXX" required>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Correo Institucional *</label>
              <input type="email" id="email" name="email" placeholder="trabajador@contraloria.gob.pe" required>
            </div>
            <div class="form-group">
              <label for="area">Área / Gerencia *</label>
              <select id="area" name="area" required>
                <option value="">Selecciona tu área</option>
                <option>Auditoría Gubernamental</option>
                <option>Control Interno</option>
                <option>Sistemas de Información</option>
                <option>Recursos Humanos</option>
                <option>Asesoría Legal</option>
                <option>Administración General</option>
                <option>Contraloría Regional Lima</option>
                <option>Sede de Región</option>
                <option>Otra área</option>
              </select>
            </div>
            <div class="form-group">
              <label for="regimen">Régimen Laboral *</label>
              <select id="regimen" name="regimen" required>
                <option value="">Selecciona tu régimen</option>
                <option>Servicio Civil (Ley SERVIR)</option>
                <option>Contrato Administrativo de Servicios (CAS)</option>
                <option>Decreto Legislativo 276</option>
                <option>Locación de servicios</option>
              </select>
            </div>
            <div class="form-check">
              <input type="checkbox" id="terms" required>
              <label for="terms">Acepto el <a href="#">Estatuto de SINTRACGR</a> y la <a href="#">Política de Privacidad</a></label>
            </div>
            <button type="submit" class="btn-primary btn-full btn-lg">
              <i class="fas fa-user-plus"></i> Enviar Solicitud de Afiliación
            </button>
          </form>
          <div id="formSuccess" class="form-success hidden">
            <i class="fas fa-check-circle"></i>
            <h3>¡Solicitud Recibida!</h3>
            <p>Hemos recibido tu solicitud de afiliación. Verificaremos tus datos en 24-48 horas y te contactaremos para confirmar tu incorporación a SINTRACGR.</p>
          </div>
        </div>
      </div>

      <div class="affiliation-info-col">
        <div class="info-card" id="calculadora">
          <h3><i class="fas fa-calculator"></i> Calculadora de Beneficios</h3>
          <p>Estima el valor de tu afiliación a SINTRACGR:</p>
          <div class="calc-item"><span>✅ Asesoría legal especializada</span><strong>S/ 3,000+/año</strong></div>
          <div class="calc-item"><span>✅ Capacitaciones y talleres</span><strong>S/ 800+/año</strong></div>
          <div class="calc-item"><span>✅ Incrementos salariales negociados</span><strong>S/ 2,400+/año</strong></div>
          <div class="calc-item"><span>✅ Beneficios adicionales convenio</span><strong>S/ 1,200+/año</strong></div>
          <div class="calc-total"><span>Valor estimado total</span><strong class="calc-number">S/ 7,400+/año</strong></div>
        </div>

        <div class="info-card info-card--blue">
          <h3><i class="fas fa-shield-alt"></i> Beneficios Inmediatos</h3>
          <ul class="benefits-list-simple">
            <li><i class="fas fa-check"></i> Asesoría legal desde el primer día</li>
            <li><i class="fas fa-check"></i> Acceso a convenios colectivos vigentes</li>
            <li><i class="fas fa-check"></i> Representación ante RRHH de la CGR</li>
            <li><i class="fas fa-check"></i> Directorio de delegados por área</li>
            <li><i class="fas fa-check"></i> Newsletters y alertas legales</li>
            <li><i class="fas fa-check"></i> Red de solidaridad y apoyo mutuo</li>
          </ul>
        </div>

        <div class="info-card info-card--contact">
          <h3><i class="fas fa-phone"></i> ¿Tienes Dudas?</h3>
          <p>Nuestros delegados están disponibles para responder tus preguntas:</p>
          <a href="tel:+51999999999" class="contact-option"><i class="fas fa-phone"></i> +51 999-999-999</a>
          <a href="https://wa.me/51999999999" target="_blank" class="contact-option wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          <a href="mailto:info@sintracgr.org.pe" class="contact-option"><i class="fas fa-envelope"></i> info@sintracgr.org.pe</a>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return baseLayout('Afiliación - Únete a SINTRACGR', content)
}

function noticiasPage() {
  const content = `
<section class="page-hero page-hero--blue">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Noticias</nav>
    <h1>Noticias y Comunicados</h1>
    <p>Mantente informado sobre los logros, actividades y novedades de SINTRACGR</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="news-filters">
      <button class="filter-btn active" data-filter="all">Todos</button>
      <button class="filter-btn" data-filter="comunicado"><span class="dot dot-blue"></span>Comunicados</button>
      <button class="filter-btn" data-filter="logro"><span class="dot dot-green"></span>Logros</button>
      <button class="filter-btn" data-filter="convocatoria"><span class="dot dot-red"></span>Convocatorias</button>
      <button class="filter-btn" data-filter="alerta"><span class="dot dot-gold"></span>Alertas</button>
    </div>

    <div class="news-full-grid" id="newsGrid">
      <article class="news-card-full" data-cat="comunicado">
        <div class="ncf-image"><div class="ncf-img-placeholder"><i class="fas fa-bullhorn"></i></div><span class="news-category cat-blue">Comunicado Oficial</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 20 de Marzo, 2024</div>
          <h3>SINTRACGR logra la inclusión de 500 trabajadores CAS en el Convenio Colectivo 2024</h3>
          <p>Tras meses de intensa negociación con la Gerencia de Recursos Humanos de la Contraloría General de la República, SINTRACGR ha conseguido la histórica ampliación del convenio colectivo 2024 para incluir a trabajadores bajo régimen CAS, garantizando mejoras salariales del 12%, bonificaciones por productividad y acceso a beneficios adicionales.</p>
          <a href="#" class="news-read-more">Leer artículo completo <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card-full" data-cat="logro">
        <div class="ncf-image"><div class="ncf-img-placeholder ncf-green"><i class="fas fa-trophy"></i></div><span class="news-category cat-green">Logro</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 15 de Marzo, 2024</div>
          <h3>Fallo favorable en caso de despido arbitrario: 45 trabajadores reincorporados a sus puestos</h3>
          <p>El Tribunal del Servicio Civil emitió resolución favorable para 45 trabajadores de la CGR que fueron cesados irregularmente durante el proceso de reorganización administrativa de 2023. SINTRACGR acompañó el caso desde el inicio hasta la reincorporación efectiva.</p>
          <a href="#" class="news-read-more">Leer artículo completo <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card-full" data-cat="convocatoria">
        <div class="ncf-image"><div class="ncf-img-placeholder ncf-red"><i class="fas fa-graduation-cap"></i></div><span class="news-category cat-red">Convocatoria</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 10 de Marzo, 2024</div>
          <h3>Taller gratuito: "Tus Derechos bajo Ley SERVIR" - Inscripciones abiertas hasta el 25 de marzo</h3>
          <p>SINTRACGR organiza el taller mensual de capacitación en derechos laborales del servicio civil. La actividad es gratuita para afiliados y se realizará en la sede sindical. Cupos limitados a 50 participantes.</p>
          <a href="#" class="news-read-more">Inscribirme ahora <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card-full" data-cat="alerta">
        <div class="ncf-image"><div class="ncf-img-placeholder ncf-gold"><i class="fas fa-exclamation-circle"></i></div><span class="news-category cat-gold">Alerta</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 5 de Marzo, 2024</div>
          <h3>Alerta: Nueva directiva de evaluación de desempeño 2024 - Puntos críticos a observar</h3>
          <p>SINTRACGR analizó la nueva Directiva N° 002-2024-CG/RRHH sobre evaluación de desempeño. Identificamos varios artículos que podrían afectar negativamente los derechos de los trabajadores y ya presentamos observaciones formales.</p>
          <a href="#" class="news-read-more">Leer análisis completo <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card-full" data-cat="comunicado">
        <div class="ncf-image"><div class="ncf-img-placeholder"><i class="fas fa-file-alt"></i></div><span class="news-category cat-blue">Comunicado Oficial</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 28 de Febrero, 2024</div>
          <h3>SINTRACGR emite pronunciamiento sobre propuesta de reforma del régimen CAS</h3>
          <p>La directiva nacional de SINTRACGR emitió pronunciamiento oficial respecto a la propuesta legislativa de modificación del régimen CAS. El sindicato exige mejoras sustanciales en las condiciones de contratación y estabilidad laboral.</p>
          <a href="#" class="news-read-more">Ver pronunciamiento <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>

      <article class="news-card-full" data-cat="logro">
        <div class="ncf-image"><div class="ncf-img-placeholder ncf-green"><i class="fas fa-handshake"></i></div><span class="news-category cat-green">Logro</span></div>
        <div class="ncf-body">
          <div class="news-date"><i class="fas fa-calendar"></i> 15 de Febrero, 2024</div>
          <h3>Renovado convenio de cooperación con el Colegio de Abogados de Lima para asesoría legal</h3>
          <p>SINTRACGR renovó el convenio de cooperación con el Colegio de Abogados de Lima, garantizando asesoría legal especializada en derecho laboral público para todos los afiliados, incluyendo consultas presenciales y virtuales.</p>
          <a href="#" class="news-read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>
    </div>

    <div class="news-pagination">
      <button class="pag-btn active">1</button>
      <button class="pag-btn">2</button>
      <button class="pag-btn">3</button>
      <button class="pag-btn"><i class="fas fa-arrow-right"></i></button>
    </div>
  </div>
</section>

<section class="section bg-light" id="calendario">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Calendario Sindical - Marzo/Abril 2024</h2>
    </div>
    <div class="calendar-events">
      <div class="cal-event cal-event--red">
        <div class="cal-date"><span class="cal-day">27</span><span class="cal-month">MAR</span></div>
        <div class="cal-info"><h4>Asamblea General Extraordinaria</h4><p><i class="fas fa-map-marker-alt"></i> Sede SINTRACGR, 18:00 hrs | Agenda: Informe de negociación convenio</p></div>
        <span class="cal-badge urgente">Urgente</span>
      </div>
      <div class="cal-event">
        <div class="cal-date"><span class="cal-day">05</span><span class="cal-month">ABR</span></div>
        <div class="cal-info"><h4>Taller "Ley SERVIR en la Práctica"</h4><p><i class="fas fa-map-marker-alt"></i> Sede SINTRACGR, 9:00 - 13:00 hrs | Cupos: 50</p></div>
        <a href="/afiliacion" class="cal-register">Inscribirme</a>
      </div>
      <div class="cal-event">
        <div class="cal-date"><span class="cal-day">12</span><span class="cal-month">ABR</span></div>
        <div class="cal-info"><h4>Reunión Mesa de Trabajo - Evaluación Desempeño</h4><p><i class="fas fa-map-marker-alt"></i> Oficinas CGR - Con representantes de RRHH</p></div>
        <span class="cal-badge info">Directiva</span>
      </div>
      <div class="cal-event">
        <div class="cal-date"><span class="cal-day">20</span><span class="cal-month">ABR</span></div>
        <div class="cal-info"><h4>Movilización por el Día del Trabajo</h4><p><i class="fas fa-map-marker-alt"></i> Plaza San Martín - Lima Centro | 10:00 hrs</p></div>
        <span class="cal-badge convoc">Convocatoria</span>
      </div>
    </div>
  </div>
</section>
`
  return baseLayout('Noticias y Comunicados', content)
}

function transparenciaPage() {
  const content = `
<section class="page-hero page-hero--blue">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Transparencia</nav>
    <h1>Transparencia Sindical</h1>
    <p>Rendición de cuentas completa. Cada sol de tu cuota se invierte en tu defensa.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="trans-intro">
      <div class="trans-quote">
        <i class="fas fa-quote-left"></i>
        <p>"Cada sol de tu cuota se invierte en tu defensa. Conoce exactamente cómo usamos nuestros recursos: 45% asesoría legal, 30% capacitación, 15% gestión administrativa, 10% movilizaciones. Rendimos cuentas porque tú nos lo exiges."</p>
        <cite>— Directiva Nacional SINTRACGR</cite>
      </div>
    </div>

    <div class="trans-sections">
      <div class="trans-section" id="finanzas">
        <h2><i class="fas fa-chart-pie"></i> Estados Financieros</h2>
        <div class="finance-grid">
          <div class="finance-card">
            <h3>Distribución de Recursos 2024</h3>
            <div class="donut-chart">
              <svg viewBox="0 0 200 200" class="donut-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#ECEFF1" stroke-width="30"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#C41E3A" stroke-width="30" stroke-dasharray="226 276" stroke-dashoffset="0" class="donut-seg"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#0D47A1" stroke-width="30" stroke-dasharray="150 276" stroke-dashoffset="-226" class="donut-seg"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#F9A825" stroke-width="30" stroke-dasharray="75 276" stroke-dashoffset="-376" class="donut-seg"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#2E7D32" stroke-width="30" stroke-dasharray="50 276" stroke-dashoffset="-451" class="donut-seg"/>
                <text x="100" y="95" text-anchor="middle" class="donut-center-top">2024</text>
                <text x="100" y="112" text-anchor="middle" class="donut-center-bot">Recursos</text>
              </svg>
            </div>
            <div class="legend">
              <div class="legend-item"><span class="legend-dot" style="background:#C41E3A"></span>Asesoría Legal 45%</div>
              <div class="legend-item"><span class="legend-dot" style="background:#0D47A1"></span>Capacitación 30%</div>
              <div class="legend-item"><span class="legend-dot" style="background:#F9A825"></span>Administración 15%</div>
              <div class="legend-item"><span class="legend-dot" style="background:#2E7D32"></span>Movilizaciones 10%</div>
            </div>
          </div>
          <div class="finance-docs">
            <h3>Documentos Financieros</h3>
            <div class="doc-grid">
              <div class="doc-item"><div class="doc-icon"><i class="fas fa-file-pdf"></i></div><div class="doc-info"><strong>Estado Financiero 2024</strong><span>Auditado por firma independiente</span></div><a href="#" class="doc-dl"><i class="fas fa-download"></i> Descargar</a></div>
              <div class="doc-item"><div class="doc-icon"><i class="fas fa-file-pdf"></i></div><div class="doc-info"><strong>Estado Financiero 2023</strong><span>Auditado por firma independiente</span></div><a href="#" class="doc-dl"><i class="fas fa-download"></i> Descargar</a></div>
              <div class="doc-item"><div class="doc-icon"><i class="fas fa-file-pdf"></i></div><div class="doc-info"><strong>Estado Financiero 2022</strong><span>Auditado por firma independiente</span></div><a href="#" class="doc-dl"><i class="fas fa-download"></i> Descargar</a></div>
              <div class="doc-item"><div class="doc-icon"><i class="fas fa-file-pdf"></i></div><div class="doc-info"><strong>Plan de Trabajo 2024</strong><span>Aprobado en asamblea general</span></div><a href="#" class="doc-dl"><i class="fas fa-download"></i> Descargar</a></div>
            </div>
          </div>
        </div>
      </div>

      <div class="trans-section" id="convenios">
        <h2><i class="fas fa-file-contract"></i> Convenios Colectivos</h2>
        <div class="convenios-grid">
          <div class="convenio-card convenio-featured">
            <div class="convenio-year">2024</div>
            <h3>Convenio Colectivo 2024-2025</h3>
            <p>Vigente. Incluye incremento salarial del 12%, bonificación por productividad, ampliación de cobertura a trabajadores CAS y 15 nuevos beneficios.</p>
            <a href="#" class="btn-primary">Descargar PDF</a>
          </div>
          <div class="convenio-card">
            <div class="convenio-year">2023</div>
            <h3>Convenio Colectivo 2023</h3>
            <p>Incremento salarial 8%, capacitación obligatoria financiada por la CGR, implementación de teletrabajo permanente.</p>
            <a href="#" class="btn-outline btn-sm">Descargar</a>
          </div>
          <div class="convenio-card">
            <div class="convenio-year">2022</div>
            <h3>Convenio Colectivo 2022</h3>
            <p>Mejoras en compensaciones, reforma del reglamento de evaluación de desempeño.</p>
            <a href="#" class="btn-outline btn-sm">Descargar</a>
          </div>
          <div class="convenio-card">
            <div class="convenio-year">2021</div>
            <h3>Convenio Colectivo 2021</h3>
            <p>Protocolos COVID-19, teletrabajo de emergencia, protección salarial pandemia.</p>
            <a href="#" class="btn-outline btn-sm">Descargar</a>
          </div>
        </div>
      </div>

      <div class="trans-section">
        <h2><i class="fas fa-landmark"></i> Documentos Institucionales</h2>
        <div class="inst-docs">
          <div class="inst-doc"><i class="fas fa-scroll"></i><div><strong>Estatutos de SINTRACGR</strong><p>Documento fundacional con misión, valores y estructura organizativa</p></div><a href="#" class="btn-outline btn-sm">Descargar</a></div>
          <div class="inst-doc"><i class="fas fa-book"></i><div><strong>Reglamento Interno</strong><p>Normas de funcionamiento democrático del sindicato</p></div><a href="#" class="btn-outline btn-sm">Descargar</a></div>
          <div class="inst-doc"><i class="fas fa-file-alt"></i><div><strong>Actas de Asambleas 2024</strong><p>Resúmenes de decisiones tomadas en asambleas generales</p></div><a href="#" class="btn-outline btn-sm">Descargar</a></div>
          <div class="inst-doc"><i class="fas fa-chart-line"></i><div><strong>Informe de Gestión 2023</strong><p>Resultados y logros alcanzados durante la gestión anterior</p></div><a href="#" class="btn-outline btn-sm">Descargar</a></div>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return baseLayout('Transparencia Sindical', content)
}

function contactoPage() {
  const content = `
<section class="page-hero page-hero--blue">
  <div class="container">
    <nav class="breadcrumb"><a href="/">Inicio</a> <i class="fas fa-chevron-right"></i> Contacto</nav>
    <h1>Contáctanos</h1>
    <p>Estamos aquí para ayudarte. Consulta a nuestros especialistas hoy mismo.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-layout">
      <div class="contact-form-col">
        <div class="form-card">
          <h2><i class="fas fa-envelope"></i> Envíanos un Mensaje</h2>
          <form id="contactForm" onsubmit="submitContact(event)">
            <div class="form-row">
              <div class="form-group">
                <label>Nombre Completo *</label>
                <input type="text" placeholder="Tu nombre" required>
              </div>
              <div class="form-group">
                <label>Teléfono *</label>
                <input type="tel" placeholder="+51 9XX-XXX-XXX" required>
              </div>
            </div>
            <div class="form-group">
              <label>Correo Electrónico *</label>
              <input type="email" placeholder="tu.email@contraloria.gob.pe" required>
            </div>
            <div class="form-group">
              <label>Tipo de Consulta *</label>
              <select required>
                <option value="">Selecciona el tipo</option>
                <option>Consulta sobre afiliación</option>
                <option>Asesoría legal urgente</option>
                <option>Denuncia laboral</option>
                <option>Convenio colectivo</option>
                <option>Información general</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group" id="denuncia">
              <label>Mensaje / Descripción de tu Caso *</label>
              <textarea rows="5" placeholder="Describe tu situación o consulta con el mayor detalle posible. Toda la información es confidencial." required></textarea>
            </div>
            <div class="form-group">
              <label>¿Eres afiliado de SINTRACGR?</label>
              <div class="radio-group">
                <label class="radio-label"><input type="radio" name="afiliado" value="si"> Sí, soy afiliado</label>
                <label class="radio-label"><input type="radio" name="afiliado" value="no"> No soy afiliado</label>
                <label class="radio-label"><input type="radio" name="afiliado" value="interesado"> Estoy interesado en afiliarme</label>
              </div>
            </div>
            <button type="submit" class="btn-primary btn-full btn-lg"><i class="fas fa-paper-plane"></i> Enviar Consulta</button>
          </form>
          <div id="contactSuccess" class="form-success hidden">
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje Enviado!</h3>
            <p>Hemos recibido tu consulta. Un especialista de SINTRACGR te contactará en un plazo máximo de 24 horas hábiles.</p>
          </div>
        </div>

        <div class="form-card" id="consulta">
          <h2><i class="fas fa-flag"></i> Denuncia Laboral Confidencial</h2>
          <p class="form-note urgent"><i class="fas fa-lock"></i> Tu denuncia es completamente anónima y confidencial. Solo el equipo legal de SINTRACGR tiene acceso.</p>
          <form id="denunciaForm" onsubmit="submitDenuncia(event)">
            <div class="form-group">
              <label>Tipo de Irregularidad *</label>
              <select required>
                <option value="">Selecciona el tipo</option>
                <option>Despido arbitrario o irregular</option>
                <option>Acoso laboral / mobbing</option>
                <option>Hostigamiento sexual</option>
                <option>Discriminación laboral</option>
                <option>Evaluación de desempeño irregular</option>
                <option>No pago de beneficios</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label>Descripción del hecho *</label>
              <textarea rows="4" placeholder="Describe los hechos con fechas, personas involucradas y evidencias disponibles." required></textarea>
            </div>
            <div class="form-group">
              <label>Correo para seguimiento (opcional)</label>
              <input type="email" placeholder="Para notificarte del avance de tu caso">
            </div>
            <button type="submit" class="btn-primary btn-full" style="background:var(--red)"><i class="fas fa-flag"></i> Presentar Denuncia Confidencial</button>
          </form>
          <div id="denunciaSuccess" class="form-success hidden">
            <i class="fas fa-check-circle"></i>
            <h3>Denuncia Registrada</h3>
            <p>Tu denuncia ha sido registrada de forma confidencial. Se le asignará un número de seguimiento y será atendida por nuestro equipo legal en las próximas 24 horas.</p>
          </div>
        </div>
      </div>

      <div class="contact-info-col">
        <div class="contact-info-card">
          <h3><i class="fas fa-building"></i> Sede Central SINTRACGR</h3>
          <div class="contact-detail"><i class="fas fa-map-marker-alt"></i><div><strong>Dirección</strong><p>Av. Jesús de Valle 106, Lima - Perú (Cercado de Lima)</p></div></div>
          <div class="contact-detail"><i class="fas fa-phone"></i><div><strong>Teléfono</strong><p><a href="tel:+51999999999">+51 999-999-999</a></p></div></div>
          <div class="contact-detail"><i class="fab fa-whatsapp"></i><div><strong>WhatsApp</strong><p><a href="https://wa.me/51999999999" target="_blank">+51 999-999-999</a></p></div></div>
          <div class="contact-detail"><i class="fas fa-envelope"></i><div><strong>Email</strong><p><a href="mailto:info@sintracgr.org.pe">info@sintracgr.org.pe</a></p></div></div>
          <div class="contact-detail"><i class="fas fa-clock"></i><div><strong>Horario de Atención</strong><p>Lunes a Viernes: 9:00 - 17:00 hrs<br>Emergencias laborales: 24/7 vía WhatsApp</p></div></div>
        </div>

        <div class="contact-emergency">
          <h3><i class="fas fa-exclamation-triangle"></i> Atención de Emergencias</h3>
          <p>¿Enfrentas una situación urgente? Contáctanos inmediatamente:</p>
          <a href="https://wa.me/51999999999?text=EMERGENCIA%20LABORAL:%20" target="_blank" class="emergency-btn">
            <i class="fab fa-whatsapp"></i> WhatsApp de Emergencia
          </a>
          <p class="emergency-note">Disponible 24/7 para casos urgentes</p>
        </div>

        <div class="contact-map">
          <h3><i class="fas fa-map"></i> Cómo Llegar</h3>
          <div class="map-placeholder">
            <i class="fas fa-map-marker-alt"></i>
            <p>Av. Jesús de Valle 106</p>
            <p>Lima - Perú</p>
            <a href="https://maps.google.com/?q=Av.+Jesús+de+Valle+106+Lima+Peru" target="_blank" class="map-btn"><i class="fas fa-external-link-alt"></i> Ver en Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return baseLayout('Contacto - SINTRACGR', content)
}

export default app
