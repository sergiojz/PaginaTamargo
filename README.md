# Tamargo Sandblasting — Landing Page

Landing page profesional para un servicio de chorreo de arena (sandblasting) ubicado en Santo Tomé.

---

## 📁 Estructura del proyecto

```
PaginaTamargo/
├── index.html              ← Página principal (HTML semántico)
├── css/
│   └── styles.css          ← Estilos (variables CSS, Grid, Flexbox, responsive)
├── js/
│   └── main.js             ← Lógica (modo oscuro, scroll reveal, slider, partículas)
├── assets/
│   └── img/                ← Imágenes del proyecto (agregar manualmente)
│       ├── logo.png        ← Logo de la empresa
│       ├── favicon.png     ← Icono del navegador
│       ├── hero-bg.jpg     ← Imagen de fondo del Hero
│       ├── og-image.jpg    ← Imagen para redes sociales (Open Graph)
│       ├── antes-1.jpg     ← Foto ANTES (slider 1)
│       ├── despues-1.jpg   ← Foto DESPUÉS (slider 1)
│       ├── antes-2.jpg     ← Foto ANTES (slider 2)
│       ├── despues-2.jpg   ← Foto DESPUÉS (slider 2)
│       ├── antes-3.jpg     ← Foto ANTES (slider 3)
│       └── despues-3.jpg   ← Foto DESPUÉS (slider 3)
└── README.md               ← Este archivo
```

---

## 🚀 Cómo usar

### 1. Abrir directamente
Abrí `index.html` en cualquier navegador moderno. No necesita instalación ni dependencias.

### 2. Con servidor local (recomendado para desarrollo)
```bash
# Usando Python
python -m http.server 8080

# Usando Node.js (si tenés npx)
npx serve .
```
Luego abrí `http://localhost:8080` en tu navegador.

---

## 🎨 Personalización

### Imágenes
Buscá en `index.html` los comentarios `REEMPLAZAR` para saber exactamente dónde colocar cada imagen:

| Archivo | Descripción | Dónde se usa |
|---------|-------------|--------------|
| `logo.png` | Logo de la empresa | Header (barra de navegación) |
| `hero-bg.jpg` | Imagen de fondo del Hero | Sección Hero |
| `antes-X.jpg` | Foto del trabajo SIN tratar | Slider comparativo |
| `despues-X.jpg` | Foto del trabajo TERMINADO | Slider comparativo |

### Teléfono de contacto
Buscá `342 400-0000` y `+5493424000000` en `index.html` y reemplazalos con el número real.

### Nombre de la empresa
Buscá `Tamargo` si necesitás cambiar el nombre de la empresa.

---

## ✨ Funcionalidades

| Funcionalidad | Tecnología | Archivo |
|---|---|---|
| Modo Claro / Oscuro | Variables CSS + localStorage | `styles.css` + `main.js` |
| Scroll Reveal | Intersection Observer API | `main.js` |
| Slider Antes/Después | CSS clip-path + eventos JS | `styles.css` + `main.js` |
| Menú responsivo | CSS Flexbox + JS toggle | `styles.css` + `main.js` |
| Partículas Hero | JS dinámico + CSS animation | `main.js` + `styles.css` |

---

## 📱 Responsive

La página sigue una estrategia **Mobile First** con tres breakpoints principales:

- **Móvil** (≤ 480px): 1 columna, menú hamburguesa
- **Tablet** (≤ 768px): 2 columnas, menú hamburguesa
- **Desktop** (> 768px): 4 columnas, menú horizontal

---

## ♿ Accesibilidad

- Atributos `aria-label`, `aria-hidden`, `aria-expanded` en elementos interactivos
- Roles ARIA: `banner`, `menubar`, `menuitem`, `slider`, `contentinfo`
- Soporte de navegación por teclado en sliders (flechas ← →)
- Cierre de menú con tecla `Escape`
- Contraste adecuado en ambos temas

---

## 🛠️ Tecnologías

- **HTML5** semántico
- **CSS3** (Variables, Grid, Flexbox, clip-path, backdrop-filter)
- **JavaScript** Vanilla (ES6+, Intersection Observer, eventos touch)
- **Font Awesome 6** (iconos vía CDN)
- **Google Fonts** (tipografía Outfit vía CDN)

Sin frameworks. Sin dependencias de instalación. Sin build tools.

---

## 📄 Licencia

© 2026 Tamargo Sandblasting. Todos los derechos reservados.
