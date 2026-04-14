/* ================================================================
   TAMARGO SANDBLASTING — JAVASCRIPT PRINCIPAL
   ================================================================
   Módulos:
     1. Modo Claro / Oscuro (toggle + persistencia)
     2. Menú hamburguesa (móvil)
     3. Scroll Reveal (Intersection Observer API)
     4. Slider comparativo Antes/Después (mouse + touch)
     5. Partículas decorativas del Hero
   ================================================================ */


// ================================================================
// 1. MODO CLARO / OSCURO
// ================================================================
// Detecta la preferencia guardada del usuario o la del sistema
// operativo. Al hacer click en el toggle, cambia el atributo
// data-theme del <html> y guarda la elección en localStorage.
// ================================================================
(() => {
  'use strict';

  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;

  // Prioridad: 1) localStorage  2) preferencia del sistema
  const temaGuardado = localStorage.getItem('theme');
  if (temaGuardado) {
    html.setAttribute('data-theme', temaGuardado);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  // Evento click para cambiar tema
  toggle.addEventListener('click', () => {
    const actual    = html.getAttribute('data-theme');
    const siguiente = actual === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', siguiente);
    localStorage.setItem('theme', siguiente);

    // Actualizar el aria-label para accesibilidad
    toggle.setAttribute(
      'aria-label',
      siguiente === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  });
})();


// ================================================================
// 2. MENÚ HAMBURGUESA — NAVEGACIÓN MÓVIL
// ================================================================
// Controla la apertura/cierre del menú lateral en pantallas
// pequeñas. Al abrirse, bloquea el scroll del body y muestra
// un overlay semitransparente. Al cerrar, restaura todo.
// ================================================================
(() => {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  /**
   * Cierra el menú móvil y restaura el scroll del body.
   */
  const cerrarMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    // Actualizar accesibilidad
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
  };

  /**
   * Abre el menú móvil y bloquea el scroll del body.
   */
  const abrirMenu = () => {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.setAttribute('aria-hidden', 'false');
  };

  // Click en hamburguesa: alternar abrir/cerrar
  hamburger.addEventListener('click', () => {
    const abierto = navLinks.classList.contains('open');
    abierto ? cerrarMenu() : abrirMenu();
  });

  // Click en overlay: cerrar menú
  overlay.addEventListener('click', cerrarMenu);

  // Click en cualquier enlace del menú: cerrar y navegar
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', cerrarMenu);
  });

  // Tecla Escape: cerrar menú si está abierto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      cerrarMenu();
      hamburger.focus(); // Devolver foco al botón
    }
  });
})();


// ================================================================
// 3. SCROLL REVEAL — INTERSECTION OBSERVER API
// ================================================================
// Observa todos los elementos con la clase .reveal. Cuando un
// elemento entra al viewport (umbral 12%), añade la clase .visible
// que activa la animación CSS de aparición. Solo se anima una vez.
// ================================================================
(() => {
  'use strict';

  const elementos = document.querySelectorAll('.reveal');

  // Verificar soporte de IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar todo de inmediato si no hay soporte
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observador.unobserve(entry.target); // Dejar de observar
        }
      });
    },
    {
      threshold: 0.12,                // 12% visible para activar
      rootMargin: '0px 0px -40px 0px' // Pequeño offset inferior
    }
  );

  // Registrar cada elemento para observación
  elementos.forEach(el => observador.observe(el));
})();


// ================================================================
// 4. SLIDER COMPARATIVO ANTES / DESPUÉS
// ================================================================
// Implementación pura en Vanilla JS. El slider funciona con
// eventos de mouse (desktop) y touch (móvil). Al arrastrar,
// se calcula el porcentaje horizontal y se aplica como clip-path
// a la imagen "después", revelando más o menos de ella.
// ================================================================
(() => {
  'use strict';

  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach(slider => {
    const imgDespues = slider.querySelector('.img-despues');
    const handle     = slider.querySelector('.slider-handle');
    let activo       = false;

    /**
     * Calcula la posición relativa del cursor/dedo dentro del
     * slider y actualiza el clip-path y la posición del handle.
     * @param {number} clientX - Posición X del cursor en la ventana.
     */
    const actualizarPosicion = (clientX) => {
      const rect = slider.getBoundingClientRect();
      // Limitar X entre 0 y el ancho del slider
      let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const porcentaje = (x / rect.width) * 100;

      // Aplicar clip-path para revelar la imagen "después"
      imgDespues.style.clipPath = `inset(0 0 0 ${porcentaje}%)`;
      // Mover el handle a la misma posición
      handle.style.left = `${porcentaje}%`;
    };

    // --- Eventos de Mouse (Desktop) ---

    slider.addEventListener('mousedown', (e) => {
      activo = true;
      actualizarPosicion(e.clientX);
      e.preventDefault(); // Evitar selección de texto
    });

    // Escuchamos en window para permitir drag fuera del slider
    window.addEventListener('mousemove', (e) => {
      if (activo) actualizarPosicion(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      activo = false;
    });

    // --- Eventos Touch (Móvil / Tablet) ---

    slider.addEventListener('touchstart', (e) => {
      activo = true;
      actualizarPosicion(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (activo) {
        actualizarPosicion(e.touches[0].clientX);
        e.preventDefault(); // Evitar scroll vertical mientras se arrastra
      }
    }, { passive: false });

    slider.addEventListener('touchend', () => {
      activo = false;
    });

    // --- Accesibilidad: Teclado ---
    // Permitir mover el slider con las flechas izquierda/derecha
    slider.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const paso = rect.width * 0.02; // 2% por cada pulsación
      const posActual = parseFloat(handle.style.left) || 50;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nuevaPosicion = e.key === 'ArrowLeft'
          ? Math.max(0, posActual - 2)
          : Math.min(100, posActual + 2);

        imgDespues.style.clipPath = `inset(0 0 0 ${nuevaPosicion}%)`;
        handle.style.left = `${nuevaPosicion}%`;
      }
    });
  });
})();


// ================================================================
// 5. PARTÍCULAS DECORATIVAS DEL HERO
// ================================================================
// Genera dinámicamente pequeñas partículas amarillas que flotan
// de abajo hacia arriba en la sección hero, simulando el efecto
// del chorreo de arena. Cada partícula tiene posición, tamaño,
// duración y retraso aleatorios para un efecto orgánico.
// ================================================================
(() => {
  'use strict';

  const contenedor = document.getElementById('heroParticles');
  if (!contenedor) return;

  const CANTIDAD = 25; // Número de partículas

  for (let i = 0; i < CANTIDAD; i++) {
    const particula = document.createElement('div');
    particula.classList.add('particle');

    // Posición horizontal aleatoria (0% – 100%)
    particula.style.left = `${Math.random() * 100}%`;

    // Tamaño aleatorio entre 1px y 4px
    const tamano = Math.random() * 3 + 1;
    particula.style.width  = `${tamano}px`;
    particula.style.height = `${tamano}px`;

    // Duración de la animación: 6s – 14s
    particula.style.animationDuration = `${Math.random() * 8 + 6}s`;

    // Retraso aleatorio: 0s – 10s
    particula.style.animationDelay = `${Math.random() * 10}s`;

    contenedor.appendChild(particula);
  }
})();
