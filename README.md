# SINTRACGR - Sitio Web Oficial

## Descripción del Proyecto
Sitio web institucional del **Sindicato Nacional de Trabajadores de la Contraloría General de la República del Perú (SINTRACGR)**. Plataforma digital que fortalece la identidad sindical, informa a los afiliados sobre sus derechos laborales, facilita la afiliación y sirve como herramienta de organización y defensa laboral en el sector público peruano.

## URLs
- **Repositorio GitHub**: https://github.com/Jagstv/Paginas-web
- **Demo Sandbox**: https://3000-idgjdqmjw4lgq1gpxc6jn-5185f4aa.sandbox.novita.ai

## Páginas del Sitio
| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Hero + todas las secciones principales |
| Nosotros | `/nosotros` | Historia, directiva, delegados por área |
| Derechos Laborales | `/derechos` | 7 secciones con tabs interactivos |
| Afiliación | `/afiliacion` | Formulario de afiliación + calculadora |
| Noticias | `/noticias` | Feed con filtros + calendario sindical |
| Transparencia | `/transparencia` | Finanzas, convenios, documentos |
| Contacto | `/contacto` | Contacto + formulario de denuncia confidencial |

## API Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/afiliacion` | Procesa solicitud de afiliación |
| POST | `/api/denuncia` | Registra denuncia laboral confidencial |
| POST | `/api/contacto` | Envía mensaje de contacto |

## Identidad Visual
- **Rojo institucional** `#C41E3A` — Lucha y dignidad sindical
- **Azul marino** `#0D47A1` — Seriedad y confianza institucional
- **Dorado** `#F9A825` — Logros y elementos destacados
- **Tipografía**: Montserrat (titulares) + Open Sans (cuerpo)

## Funcionalidades Principales
- ✅ Header sticky con menú responsive (hamburger en mobile)
- ✅ Sección Hero con contadores animados (2,500+ afiliados, 20+ años, 850+ casos)
- ✅ 5 beneficios de afiliación con tarjetas interactivas
- ✅ Sección de victorias con timeline histórico 2020-2024
- ✅ Panel de derechos laborales con 7 pestañas (Ley SERVIR, Jornada, Estabilidad, etc.)
- ✅ 4 testimonios de afiliados verificados
- ✅ 6 herramientas de acceso rápido para afiliados
- ✅ Feed de noticias con filtros por categoría
- ✅ Proceso de afiliación en 3 pasos visuales
- ✅ Sección de transparencia con gráfico de distribución de recursos
- ✅ Formulario de afiliación con validación en tiempo real
- ✅ Formulario de denuncia laboral confidencial
- ✅ Botón flotante de WhatsApp (emergencia 24/7)
- ✅ Popup de exit intent
- ✅ Back-to-top button
- ✅ Animaciones scroll reveal y contadores

## Stack Tecnológico
- **Framework**: Hono v4 (TypeScript)
- **Plataforma**: Cloudflare Pages
- **Build tool**: Vite + @hono/vite-build
- **Frontend**: HTML/CSS/JS puros + FontAwesome + Google Fonts
- **Estilos**: CSS custom con variables (sin Tailwind, total control)
- **Deploy CLI**: Wrangler v4

## Estructura del Proyecto
```
webapp/
├── src/
│   ├── index.tsx          # App principal — todas las páginas y rutas
│   └── renderer.tsx       # JSX renderer de Hono
├── public/
│   ├── static/
│   │   ├── style.css      # Estilos completos (~1,500 líneas)
│   │   └── app.js         # JavaScript interactivo (~400 líneas)
│   └── favicon.svg        # Favicon SVG institucional
├── ecosystem.config.cjs   # Configuración PM2
├── wrangler.jsonc          # Configuración Cloudflare
├── vite.config.ts          # Configuración Vite
└── package.json
```

## Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Build del proyecto
npm run build

# Iniciar servidor de desarrollo (PM2)
pm2 start ecosystem.config.cjs

# Iniciar sin PM2
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# Deploy a Cloudflare Pages
npm run deploy
```

## Deployment en Cloudflare Pages
```bash
# 1. Autenticar con Cloudflare
npx wrangler login

# 2. Build
npm run build

# 3. Crear proyecto (primera vez)
npx wrangler pages project create sintracgr --production-branch main

# 4. Deploy
npx wrangler pages deploy dist --project-name sintracgr
```

## Guía de Uso del Sitio
1. **Afiliarse**: Ir a `/afiliacion`, completar el formulario (3 minutos). Proceso gratuito y confidencial.
2. **Consultar derechos**: Ir a `/derechos`, seleccionar la pestaña del tema de interés. Cada sección incluye base legal y descargables.
3. **Presentar denuncia**: Ir a `/contacto`, usar el formulario de "Denuncia Laboral Confidencial".
4. **Ver convenios**: Ir a `/transparencia`, sección de Convenios Colectivos.
5. **Contactar delegado**: Ir a `/nosotros`, sección de Delegados por Área.

## Estado del Deployment
- **Plataforma**: Cloudflare Pages (ready to deploy)
- **Estado actual**: ✅ Activo en sandbox de desarrollo
- **Última actualización**: Marzo 2024
- **Autor**: Desarrollado para SINTRACGR — Defensa de los trabajadores de la CGR
