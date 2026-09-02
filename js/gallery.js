const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburguesa');
const menu = document.querySelector('nav.menu ul');
const poster = document.querySelector('.hero-poster');
const header = document.querySelector('header');
const botonBusqueda = document.querySelector('#boton-busqueda');
const buscador = document.querySelector('.buscador-nav');
const campoBusqueda = document.querySelector('#busqueda');
const cartas = document.querySelectorAll('.carta[data-titulo]');
const enlacesFiltro = document.querySelectorAll('.menu a[data-filtro]');
const seccionesCatalogo = document.querySelectorAll('.seccion-catalogo[data-seccion]');
const enlacesInicio = document.querySelectorAll('[data-inicio], .menu a[data-filtro="todos"]');
const botonNotificacion = document.querySelector('#boton-notificacion');
const notificacionMensaje = document.querySelector('#notificacion-mensaje');
const cerrarNotificacion = document.querySelector('#cerrar-notificacion');
const portadas = window.portadas || {};

const normalizarTexto = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

const actualizarPortadas = () => {
    document.querySelectorAll('.carta[data-titulo]').forEach((carta) => {
        const historiaId = new URL(carta.href).searchParams.get('historia');
        if (portadas[historiaId]) {
            carta.querySelector('img').src = portadas[historiaId];
        }
    });
};

const prepararCartas = () => {
    cartas.forEach((carta) => {
        const titulo = document.createElement('span');
        titulo.className = 'carta-titulo';
        titulo.textContent = carta.dataset.titulo;
        carta.append(titulo);

        carta.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.add('salir-a-detalle');
            sessionStorage.setItem('animarDetalle', 'true');

            const destino = new URL(carta.href, window.location.href);
            const seccionVisible = document.querySelector('.seccion-catalogo.activa');
            destino.searchParams.set('retorno', seccionVisible ? seccionVisible.dataset.seccion : 'inicio');

            window.setTimeout(() => {
                window.location.href = destino.href;
            }, 280);
        });
    });
};

function filtrarHistorias() {
    const consulta = normalizarTexto(campoBusqueda.value.trim());
    const estaBuscando = consulta.length > 0;

    document.body.classList.toggle('vista-busqueda', estaBuscando);
    document.body.classList.remove('vista-seccion');

    seccionesCatalogo.forEach((seccion) => {
        seccion.classList.remove('activa');
    });

    cartas.forEach((carta) => {
        const coincide = normalizarTexto(carta.dataset.titulo).includes(consulta);
        carta.classList.toggle('oculta', !coincide);
    });

    seccionesCatalogo.forEach((seccion) => {
        const tieneResultados = seccion.querySelector('.carta:not(.oculta)');
        seccion.classList.toggle('sin-resultados', !tieneResultados);
    });

    if (!estaBuscando) {
        seccionesCatalogo.forEach((seccion) => {
            seccion.classList.remove('sin-resultados');
        });
        filtrarSecciones('todos');
    }
}

function filtrarSecciones(filtro) {
    document.body.classList.toggle('vista-seccion', filtro !== 'todos');

    seccionesCatalogo.forEach((seccion) => {
        const coincide = filtro !== 'todos' && seccion.dataset.seccion === filtro;
        seccion.classList.toggle('oculta', filtro !== 'todos' && !coincide);
        seccion.classList.toggle('activa', coincide);
    });

    enlacesFiltro.forEach((enlace) => {
        enlace.classList.toggle('activo', enlace.dataset.filtro === filtro);
    });
}

function volverAlInicio(evento) {
    evento.preventDefault();
    campoBusqueda.value = '';
    filtrarHistorias();
    filtrarSecciones('todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.classList.remove('animar-inicio');
    void document.body.offsetWidth;
    document.body.classList.add('animar-inicio');
}

const manejarFiltroInicial = () => {
    const filtroInicial = window.location.hash.slice(1);
    if (['coleccion', 'nosotros', 'especial'].includes(filtroInicial)) {
        filtrarSecciones(filtroInicial);
    }
};

const manejarRegreso = () => {
    if (sessionStorage.getItem('animarRegreso') === 'true') {
        sessionStorage.removeItem('animarRegreso');
        document.body.classList.add('entrada-regreso');
        window.setTimeout(() => {
            document.body.classList.remove('entrada-regreso');
        }, 1100);
    }
};

const initHeader = () => {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
};

const initBuscador = () => {
    if (!botonBusqueda || !buscador || !campoBusqueda) return;

    botonBusqueda.addEventListener('click', () => {
        buscador.classList.toggle('activo');
        if (buscador.classList.contains('activo')) campoBusqueda.focus();
    });

    campoBusqueda.addEventListener('input', filtrarHistorias);
};

const initNotificacion = () => {
    if (!botonNotificacion || !notificacionMensaje || !cerrarNotificacion) return;

    botonNotificacion.addEventListener('click', () => {
        notificacionMensaje.classList.add('visible');
        notificacionMensaje.setAttribute('aria-hidden', 'false');
    });

    cerrarNotificacion.addEventListener('click', () => {
        notificacionMensaje.classList.remove('visible');
        notificacionMensaje.setAttribute('aria-hidden', 'true');
    });
};

const initHeroVideo = () => {
    if (!hero || !video || !poster) return;

    hero.addEventListener('mouseenter', () => {
        video.play();
        poster.style.display = 'none';
    });

    hero.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        poster.style.display = 'block';
    });

    hero.addEventListener('touchstart', () => {
        video.play();
        poster.style.display = 'none';
    });

    hero.addEventListener('touchend', () => {
        video.pause();
        video.currentTime = 0;
        poster.style.display = 'block';
    });
};

const initMenu = () => {
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
};

const init = () => {
    actualizarPortadas();
    prepararCartas();
    initHeader();
    initBuscador();
    initNotificacion();
    initHeroVideo();
    initMenu();
    manejarFiltroInicial();
    manejarRegreso();

    enlacesInicio.forEach((enlace) => {
        enlace.addEventListener('click', volverAlInicio);
    });

    enlacesFiltro.forEach((enlace) => {
        enlace.addEventListener('click', (evento) => {
            evento.preventDefault();
            const filtro = enlace.dataset.filtro;
            filtrarSecciones(filtro);

            if (filtro !== 'todos') {
                document.querySelector(`#${filtro}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            if (menu) menu.classList.remove('active');
        });
    });
};

init();
