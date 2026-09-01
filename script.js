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
const portadas = window.portadas;

/* ========================================================
   1. LÓGICA DEL CATÁLOGO Y BUSCADOR
   ======================================================== */

document.querySelectorAll('.carta[data-titulo]').forEach(function(carta) {
    const historiaId = new URL(carta.href).searchParams.get('historia');
    if (portadas[historiaId]) carta.querySelector('img').src = portadas[historiaId];
});

cartas.forEach(function(carta) {
    const titulo = document.createElement('span');
    titulo.className = 'carta-titulo';
    titulo.textContent = carta.dataset.titulo;
    carta.append(titulo);
    carta.addEventListener('click', function(evento) {
        evento.preventDefault();
        document.body.classList.add('salir-a-detalle');
        sessionStorage.setItem('animarDetalle', 'true');
        const destino = new URL(carta.href, window.location.href);
        const seccionVisible = document.querySelector('.seccion-catalogo.activa');
        destino.searchParams.set('retorno', seccionVisible ? seccionVisible.dataset.seccion : 'inicio');
        window.setTimeout(function() {
            window.location.href = destino.href;
        }, 280);
    });
});

function filtrarHistorias() {
    const normalizar = function(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    };
    const consulta = normalizar(campoBusqueda.value.trim());
    const estaBuscando = consulta.length > 0;
    document.body.classList.toggle('vista-busqueda', estaBuscando);
    document.body.classList.remove('vista-seccion');
    seccionesCatalogo.forEach(function(seccion) {
        seccion.classList.remove('activa');
    });
    cartas.forEach(function(carta) {
        const coincide = normalizar(carta.dataset.titulo).includes(consulta);
        carta.classList.toggle('oculta', !coincide);
    });
    seccionesCatalogo.forEach(function(seccion) {
        const tieneResultados = seccion.querySelector('.carta:not(.oculta)');
        seccion.classList.toggle('sin-resultados', !tieneResultados);
    });
    if (!estaBuscando) {
        seccionesCatalogo.forEach(function(seccion) {
            seccion.classList.remove('sin-resultados');
        });
        filtrarSecciones('todos');
    }
}

function filtrarSecciones(filtro) {
    document.body.classList.remove('transicion-seccion');
    void document.body.offsetWidth;
    document.body.classList.add('transicion-seccion');
    document.body.classList.toggle('vista-seccion', filtro !== 'todos');
    seccionesCatalogo.forEach(function(seccion) {
        seccion.classList.toggle('oculta', filtro !== 'todos' && seccion.dataset.seccion !== filtro);
        seccion.classList.toggle('activa', filtro !== 'todos' && seccion.dataset.seccion === filtro);
    });
    enlacesFiltro.forEach(function(enlace) {
        enlace.classList.toggle('activo', enlace.dataset.filtro === filtro);
    });
    window.setTimeout(function() {
        document.body.classList.remove('transicion-seccion');
    }, 800);
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

enlacesInicio.forEach(function(enlace) {
    enlace.addEventListener('click', volverAlInicio);
});

enlacesFiltro.forEach(function(enlace) {
    enlace.addEventListener('click', function(evento) {
        evento.preventDefault();
        const filtro = enlace.dataset.filtro;
        filtrarSecciones(filtro);
        if (filtro !== 'todos') document.querySelector(`#${filtro}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        menu.classList.remove('active');
    });
});

const filtroInicial = window.location.hash.slice(1);
if (['coleccion', 'nosotros', 'especial'].includes(filtroInicial)) {
    filtrarSecciones(filtroInicial);
}

if (sessionStorage.getItem('animarRegreso') === 'true') {
    sessionStorage.removeItem('animarRegreso');
    document.body.classList.add('entrada-regreso');
    window.setTimeout(function() {
        document.body.classList.remove('entrada-regreso');
    }, 1100);
}

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

botonBusqueda.addEventListener('click', function() {
    buscador.classList.toggle('activo');
    if (buscador.classList.contains('activo')) campoBusqueda.focus();
});

campoBusqueda.addEventListener('input', filtrarHistorias);

botonNotificacion.addEventListener('click', function() {
    notificacionMensaje.classList.add('visible');
    notificacionMensaje.setAttribute('aria-hidden', 'false');
});

cerrarNotificacion.addEventListener('click', function() {
    notificacionMensaje.classList.remove('visible');
    notificacionMensaje.setAttribute('aria-hidden', 'true');
});

hero.addEventListener('mouseenter', function() {
    video.play();
    poster.style.display = 'none';
});

hero.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
    poster.style.display = 'block';
});

hero.addEventListener('touchstart', function() {
    video.play();
    poster.style.display = 'none';
});

hero.addEventListener('touchend', function() {
    video.pause();
    video.currentTime = 0;
    poster.style.display = 'block';
});

hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
});