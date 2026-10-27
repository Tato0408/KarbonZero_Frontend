# KarbonZero — Panel Web Institucional

> Panel web para que las **empresas e instituciones** afiliadas a **KarbonZero** registren el consumo de sus recursos, visualicen su **huella de carbono (CO₂)** en dashboards, reportes y un mapa, y administren su canal dentro de la red KarbonZero.

---

## Contenido

- [Descripción](#descripción)
- [Ecosistema KarbonZero](#ecosistema-karbonzero)
- [Autores](#autores)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Librerías principales y su función](#librerías-principales-y-su-función)
- [Convenciones de nomenclatura](#convenciones-de-nomenclatura)
- [Rutas del panel](#rutas-del-panel)
- [Configuración de la API](#configuración-de-la-api)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Solución de problemas comunes](#solución-de-problemas-comunes)

---

## Descripción

Aplicación web (SPA con **JavaScript puro + Vite + Bootstrap**) que consume la API institucional ([KarbonZero_Backend](https://github.com/Tato0408/KarbonZero_Backend)). Tiene dos páginas de entrada: `login.html` (inicio de sesión y recuperación de contraseña) e `index.html` (el panel), protegido por sesión.

Módulos del panel:

- **Dashboard** — Indicadores y gráficos de consumo y emisiones de CO₂ de la empresa.
- **Consumos** — Registro, edición, eliminación y filtrado de consumos por recurso y rango de fechas.
- **Reportes** — Reportes de consumo y CO₂ exportables a **PDF** y **Excel**.
- **Mapa** — Mapa interactivo de emisiones de CO₂ por ubicación en Centroamérica (D3 + GeoJSON de la API central).
- **Recursos** — Recursos, purezas, medidas, unidades de medida y unidades de conversión.
- **Usuarios** — Usuarios y roles del personal de la empresa.
- **Perfil** — Datos del usuario autenticado y foto de perfil.
- **Canal** — Información del canal de la empresa y aprobación/eliminación de publicaciones.

---

## Ecosistema KarbonZero

| Repositorio | Función | Consume |
|---|---|---|
| [KarbonZero_BackendMobile](https://github.com/Tato0408/KarbonZero_BackendMobile) | API central: app móvil, panel de gestión, empresas y canales | Oracle Database (`Database/KarbonZero.sql`) |
| [KarbonZero_Backend](https://github.com/Tato0408/KarbonZero_Backend) | API institucional de una empresa (consumo de recursos y CO₂) | Su propia BD (`Database/KarbonZeroInstitucional.sql`) + la API central |
| **KarbonZero_Frontend** _(este)_ | Panel web institucional de la empresa | API institucional + API central (mapa) |
| [KarbonZeroManagment_Frontend](https://github.com/Tato0408/KarbonZeroManagment_Frontend) | Panel web de gestión (administradores) | API central |
| [KarbonZero_FrontendMobile](https://github.com/Tato0408/KarbonZero_FrontendMobile) | App móvil del usuario final (Framework7 + Capacitor) | API central |

### Ejecución local

Ninguno de los proyectos tiene actualmente un despliegue público activo: el ecosistema completo está preparado para ejecutarse en local. Puertos por defecto:

| Servicio | Repositorio | URL local |
|---|---|---|
| Base de datos (Oracle XE, `XEPDB1`) | Scripts en `KarbonZero_BackendMobile/Database` y `KarbonZero_Backend/Database` | `localhost:1521` |
| API central | KarbonZero_BackendMobile | http://localhost:8080 |
| API institucional | KarbonZero_Backend | http://localhost:8081 |
| Panel de gestión | KarbonZeroManagment_Frontend | http://localhost:5173 |
| Panel institucional | KarbonZero_Frontend | http://localhost:5174 |
| App móvil (navegador) | KarbonZero_FrontendMobile | http://localhost:5175 |

Orden de arranque: **base de datos → API central → API institucional → frontends**.

Cuentas de demostración incluidas en los scripts (contraseña `KarbonZero2026!` en todas):

| Dónde | Correo | Permisos |
|---|---|---|
| Panel de gestión | `gerardoajf@karbonzero.local` | Administrador (`status` 1) |
| App móvil | `freddy@karbonzero.local` | Usuario de la app |
| Panel institucional | `freddy@karbonzero.local` | Lectura y escritura (rol *Coordinador de finanzas*) |
| Panel institucional | `tato@karbonzero.local` | Solo lectura (rol *Coordinador de medio ambiente*) |

---

## Autores

| # | Autor | GitHub |
|---|-------|--------|
| 1 | Oscar Abel Velásquez Joyar | [@OscarAVJ](https://github.com/OscarAVJ) |
| 2 | Camila Mariana Quinteros Gómez | [@camila-mariana](https://github.com/Camila-mariana) |
| 3 | Freddy Ricardo Pérez Alvarenga | [@Tato0408](https://github.com/Tato0408) |
| 4 | Joshua Gilberto Marinero Hernández | [@Joshuaz](https://github.com/Joshuaz) |
| 5 | Gerardo Andrés Jovel Franco | [@GerardoAJF](https://github.com/GerardoAJF) |
| 6 | Edwin Geovanni Alfaro Alfaro | [@EdwinAlfaro123](https://github.com/EdwinAlfaro123) |

---

## Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Lenguaje** | HTML, CSS y JavaScript (ES Modules), sin framework |
| **Bundler / servidor de desarrollo** | Vite 7 (dos entradas: `index.html` y `login.html`) |
| **UI** | Bootstrap 5.3, Bootstrap Icons, Material Symbols |
| **Gráficos y mapa** | ApexCharts, D3 v7 |
| **Exportación** | html2pdf.js (PDF), ExcelJS (Excel) |
| **Alertas** | SweetAlert2 |
| **Despliegue** | Vercel |

---

## Requisitos previos

| Herramienta | Para qué |
|---|---|
| Node.js 18+ y npm | Instalar y correr Vite |
| Conexión a internet | Bootstrap, ApexCharts, D3, SweetAlert2, ExcelJS y html2pdf se cargan desde CDN |
| API institucional en ejecución (local o desplegada) | Datos del panel — ver [Configuración de la API](#configuración-de-la-api) |

---

## Arquitectura del Proyecto

```
KarbonZero_Frontend/
├── index.html                      # Panel (SPA protegida)
├── login.html                      # Inicio de sesión y recuperación de contraseña
├── css/                            # Un archivo por vista + layout, grids y spinner
├── assets/imgs/                    # Ícono del sitio
├── js/
│   ├── app.js                      # Inicialización del layout
│   ├── routes.js                   # Router por hash (#dashboard, #consumptions, ...) con guard de sesión
│   ├── index.js / login.js         # Puntos de entrada de cada página
│   ├── pages/                      # Una página por ruta: genera el HTML de la vista
│   ├── controllers/                # Lógica de cada vista (eventos, tablas, modales, validaciones)
│   │   ├── resourcesPageControllers/   # Recursos, purezas, medidas, unidades y conversiones
│   │   └── userPageControllers/        # Usuarios y roles
│   └── services/                   # Llamadas fetch a la API, una por dominio
├── utils/
│   ├── api_url.js                  # URLs de la API institucional y de la API central
│   └── alerts.js                   # Helpers de SweetAlert2
├── vite.config.js
└── package.json
```

> **Nota:** el proyecto sigue un patrón **Page → Controller → Service**: la página pinta la vista, el controlador maneja la interacción y el servicio es el único que habla con la API.

---

## Librerías principales y su función

| Librería | Uso |
|----------|-----|
| `vite` _(dev)_ | Servidor de desarrollo y build de producción |
| `bootstrap` + `bootstrap-icons` _(CDN)_ | Layout, componentes (modales, tablas, formularios) e íconos |
| `apexcharts` _(CDN)_ | Gráficos del dashboard y de reportes |
| `d3` _(CDN, ES module)_ | Renderizado del mapa a partir del GeoJSON |
| `sweetalert2` _(CDN)_ | Alertas, confirmaciones y notificaciones |
| `exceljs` _(CDN)_ | Exportación de reportes a Excel |
| `html2pdf.js` _(CDN)_ | Exportación de reportes a PDF |

---

## Convenciones de nomenclatura

| Convención | Dónde se usa |
|---|---|
| `camelCase` + sufijo | Archivos y módulos: `xxxPage.js`, `xxxController.js`, `xxxService.js`. |
| `camelCase` | Funciones y variables. |
| `UPPER_SNAKE_CASE` | URLs base de la API (`APIURL`, `APIGLOBAL`). |
| Hash en `camelCase` | Rutas del panel (`#dashboard`, `#userProfile`). |
| `kebab-case` | Clases CSS propias. |

---

## Rutas del panel

| Ruta | Vista |
|---|---|
| `#dashboard` _(por defecto)_ | Dashboard |
| `#consumptions` | Consumos |
| `#reports` | Reportes |
| `#map` | Mapa de emisiones |
| `#resources` | Recursos, medidas y conversiones |
| `#users` | Usuarios y roles |
| `#userProfile` | Perfil del usuario |
| `#channel` | Canal de la empresa |

Si la sesión no es válida, el router redirige a `login.html`. Una ruta inexistente muestra la página de error 404.

---

## Configuración de la API

Las URLs de las APIs están en `utils/api_url.js` y se leen de variables de entorno de Vite, con las APIs locales como valor por defecto:

| Variable | Constante | Por defecto | Descripción |
|---|---|---|---|
| `VITE_API_URL` | `APIURL` | `http://localhost:8081/` | API institucional de la empresa ([KarbonZero_Backend](https://github.com/Tato0408/KarbonZero_Backend)) |
| `VITE_API_GLOBAL_URL` | `APIGLOBAL` | `http://localhost:8080/` | API central de KarbonZero, usada por el mapa |

Para apuntar a otras APIs, copia `.env.example` como `.env.local` (ya está en `.gitignore`) y cambia los valores.

> Las URLs deben terminar en `/`, porque los servicios concatenan la ruta directamente (`${APIURL}apiAuth/login`).

---

## Ejecución del Proyecto

```bash
npm install
npm run dev          # http://localhost:5174
```

Build de producción:

```bash
npm run build        # genera dist/
npm run preview      # sirve el build localmente
```

---

## Solución de problemas comunes

| Síntoma | Causa | Solución |
|---|---|---|
| Siempre redirige a `login.html` | La cookie de sesión no llega a la API (dominio distinto o CORS) | Verifica que el origen del frontend esté permitido en `CorsConfig.java` de la API y que los `fetch` usen `credentials: "include"` |
| Error de CORS en la consola | El frontend no corre en `localhost` | Usa `npm run dev` (puerto 5174) o agrega el origen en `CorsConfig.java` de la API |
| El mapa se queda en "Espere mientras cargamos el mapa" | La API central no responde o no hay conexión para cargar D3 | Revisa `APIGLOBAL` y la conexión a internet |
| Botones o gráficos sin estilo | No cargaron las librerías por CDN | Verifica la conexión a internet o bloqueadores de contenido |
| Errores 404 al llamar a la API | `VITE_API_URL` sin `/` al final | Agrega la barra final en `.env.local` |
| No se puede iniciar sesión / `Failed to fetch` | La API institucional (8081) o la central (8080) no están corriendo | Arranca las APIs en el orden indicado en [Ejecución local](#ejecución-local) |

---

Este proyecto se distribuye bajo la licencia MIT. Ver [LICENSE](LICENSE).
