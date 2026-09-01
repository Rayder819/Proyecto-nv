const historias = {
    coleccionVideo2: {
        titulo: 'Un momento para guardar',
        meta: 'Video especial · Solo para nosotros',
        tipo: 'video',
        archivo: 'videos/video2.mp4',
        boton: 'Reproducir nuestro momento',
        texto: 'Cada segundo de este video me recuerda lo bonito que es compartir la vida contigo. Feliz cumple mes, mi amor.'
    },
    coleccionVideo1: {
        titulo: 'Nuestra película',
        meta: 'Video especial · Nuestra colección',
        tipo: 'video',
        archivo: 'videos/video1.mp4',
        boton: 'Reproducir nuestra película',
        texto: 'Contigo, hasta los días más sencillos se convierten en recuerdos que quiero volver a vivir.'
    },
    coleccionCollage1: {
        titulo: 'Pequeños instantes',
        meta: 'Collage · Recuerdos favoritos',
        tipo: 'collage',
        cantidad: 3,
        forma: 'three',
        texto: 'No necesito una ocasión enorme para celebrar lo nuestro. Me basta con cada pequeño instante a tu lado.'
    },
    coleccionCollage2: {
        titulo: 'Tú y yo',
        meta: 'Collage · Dos corazones, una historia',
        tipo: 'collage',
        cantidad: 5,
        forma: 'four',
        texto: 'Gracias por ser mi lugar favorito, por tu forma de quererme y por hacer que todo se sienta más bonito.'
    },
    coleccionCollage3: {
        titulo: 'Para siempre volvería a elegirte',
        meta: 'Collage · Una dedicatoria',
        tipo: 'collage',
        cantidad: 5,
        forma: 'five',
        texto: 'Te elegiría en esta historia y en todas las que nos queden por vivir. Te amo muchísimo.'
    },
    nosotrosCollage1: {
        titulo: 'Lo que somos', meta: 'Collage · Nosotros', tipo: 'collage', cantidad: 6, forma: 'six',
        texto: 'Me encanta nuestra forma de ser, de reírnos y de construir recuerdos que solo nosotros entendemos.'
    },
    nosotrosVideo1: {
        titulo: 'Un día contigo', meta: 'Video · Nosotros', tipo: 'video', archivo: 'videos/video1.mp4',
        boton: 'Ver un día contigo',
        texto: 'Gracias por llenar mis días de calma, risas y momentos que guardo con todo mi corazón.'
    },
    nosotrosCollage2: {
        titulo: 'Nuestro rincón', meta: 'Collage · Nosotros', tipo: 'collage', cantidad: 4, forma: 'four',
        texto: 'Contigo cualquier lugar se siente como casa.'
    },
    nosotrosCollage3: {
        titulo: 'Momentos que quedan', meta: 'Collage · Nosotros', tipo: 'collage', cantidad: 3, forma: 'three',
        texto: 'Estos recuerdos son pequeños pedacitos de una historia enorme: la nuestra.'
    },
    nosotrosVideo2: {
        titulo: 'Siempre juntos', meta: 'Video · Nosotros', tipo: 'video',
        archivo: 'videos    /video2.mp4',
        boton: 'Reproducir siempre juntos',
        texto: 'Qué suerte la mía poder compartir este camino contigo.'
    },
    especialVideo1: {
        titulo: 'Un recuerdo especial', meta: 'Video · Especial', tipo: 'video', archivo: 'videos/video1.mp4',
        boton: 'Abrir este recuerdo',
        texto: 'Este momento merece su propia pantalla porque tú haces especial cada parte de mi vida.'
    },
    especialCollage1: {
        titulo: 'Solo tú', meta: 'Collage · Especial', tipo: 'collage', cantidad: 5, forma: 'five',
        texto: 'Mi persona favorita, mi lugar seguro y mi amor más bonito.'
    },
    especialCollage2: {
        titulo: 'Nuestra magia', meta: 'Collage · Especial', tipo: 'collage', cantidad: 6, forma: 'six',
        texto: 'Lo nuestro tiene una magia que aparece en los detalles más simples.'
    },
    especialVideo2: {
        titulo: 'Para volver a mirar', meta: 'Video · Especial', tipo: 'video', archivo: 'videos/video2.mp4',
        boton: 'Volver a vivirlo',
        texto: 'Pondría este recuerdo en repeat, igual que todos los días que paso contigo.'
    },
    especialCollage3: {
        titulo: 'Te amo', meta: 'Collage · Especial', tipo: 'collage', cantidad: 4, forma: 'four',
        texto: 'No hay collage suficiente para guardar todo lo que siento por ti.'
    }
};

const historiaId = new URLSearchParams(window.location.search).get('historia') || 'coleccionVideo2';
const historia = historias[historiaId] || historias.coleccionVideo2;
historia.portada = window.portadas[historiaId] || window.portadas.coleccionVideo2;
const parametros = new URLSearchParams(window.location.search);
const seccionHistoria = historiaId.startsWith('nosotros') ? 'nosotros' : historiaId.startsWith('especial') ? 'especial' : 'coleccion';
const retorno = ['inicio', 'coleccion', 'nosotros', 'especial'].includes(parametros.get('retorno')) ? parametros.get('retorno') : seccionHistoria;
const seccion = retorno === 'inicio' ? seccionHistoria : retorno;
const nombresSeccion = { coleccion: 'Colección', nosotros: 'Nosotros', especial: 'Especial' };
const contenido = document.querySelector('#contenido');

if (sessionStorage.getItem('animarDetalle') === 'true') {
    sessionStorage.removeItem('animarDetalle');
    document.body.classList.add('entrada-detalle');
}

const enlaceRegreso = document.querySelector('.volver');
enlaceRegreso.addEventListener('click', function() {
    sessionStorage.setItem('animarRegreso', 'true');
});
enlaceRegreso.href = retorno === 'inicio' ? 'index.html' : `index.html#${retorno}`;
enlaceRegreso.textContent = retorno === 'inicio' ? '← Volver al inicio' : `← Volver a ${nombresSeccion[retorno]}`;
document.querySelector(`[data-seccion="${seccion}"]`).classList.add('activo');
document.querySelector('#titulo').textContent = historia.titulo;
document.querySelector('#meta').textContent = historia.meta;
document.querySelector('#dedicatoria').textContent = historia.texto;
document.title = `Loveflix | ${historia.titulo}`;

function crearControlesVideo(video, marcoVideo, botonReproducir) {
    const controles = document.createElement('div');
    controles.className = 'controles-video';
    controles.innerHTML = '<button class="control-video boton-pausa" type="button" aria-label="Pausar video"><span class="icono-pausa"></span></button><input class="barra-progreso" type="range" min="0" max="100" value="0" aria-label="Progreso del video"><span class="tiempo-video">0:00</span><button class="control-video boton-volumen" type="button" aria-label="Silenciar video"><span class="icono-volumen"></span></button><input class="barra-volumen" type="range" min="0" max="100" value="100" aria-label="Volumen del video"><button class="control-video boton-pantalla" type="button" aria-label="Ver en pantalla completa"><span class="icono-pantalla"></span></button>';

    const botonPausa = controles.querySelector('.boton-pausa');
    const barraProgreso = controles.querySelector('.barra-progreso');
    const tiempoVideo = controles.querySelector('.tiempo-video');
    const barraVolumen = controles.querySelector('.barra-volumen');
    let temporizadorControles;
    const mostrarControles = function() {
        marcoVideo.classList.remove('controles-ocultos');
        clearTimeout(temporizadorControles);
        if (!video.paused) {
            temporizadorControles = setTimeout(function() {
                marcoVideo.classList.add('controles-ocultos');
            }, 1500);
        }
    };

    botonPausa.addEventListener('click', function() {
        if (video.paused) video.play(); else video.pause();
    });
    video.addEventListener('play', function() {
        marcoVideo.classList.add('reproduciendo');
        mostrarControles();
        botonPausa.setAttribute('aria-label', 'Pausar video');
        botonPausa.innerHTML = '<span class="icono-pausa"></span>';
    });
    video.addEventListener('pause', function() {
        mostrarControles();
        botonPausa.setAttribute('aria-label', 'Reproducir video');
        botonPausa.innerHTML = '<span class="triangulo-reproducir"></span>';
    });
    video.addEventListener('timeupdate', function() {
        barraProgreso.value = video.duration ? (video.currentTime / video.duration) * 100 : 0;
        const minutos = Math.floor(video.currentTime / 60);
        const segundos = String(Math.floor(video.currentTime % 60)).padStart(2, '0');
        tiempoVideo.textContent = `${minutos}:${segundos}`;
    });
    barraProgreso.addEventListener('input', function() {
        if (video.duration) video.currentTime = (barraProgreso.value / 100) * video.duration;
    });
    controles.querySelector('.boton-volumen').addEventListener('click', function() {
        video.muted = !video.muted;
        barraVolumen.value = video.muted ? 0 : video.volume * 100;
        this.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar video');
    });
    barraVolumen.addEventListener('input', function() {
        video.volume = barraVolumen.value / 100;
        video.muted = video.volume === 0;
    });
    controles.querySelector('.boton-pantalla').addEventListener('click', function() {
        if (document.fullscreenElement) document.exitFullscreen();
        else {
            marcoVideo.classList.add('pantalla-completa');
            marcoVideo.requestFullscreen().catch(function() {
                marcoVideo.classList.remove('pantalla-completa');
            });
        }
    });
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) marcoVideo.classList.remove('pantalla-completa');
    });
    video.addEventListener('click', mostrarControles);
    marcoVideo.addEventListener('mouseenter', mostrarControles);
    marcoVideo.addEventListener('mousemove', mostrarControles);
    marcoVideo.addEventListener('mouseleave', function() {
        if (!video.paused) {
            clearTimeout(temporizadorControles);
            temporizadorControles = setTimeout(function() {
                marcoVideo.classList.add('controles-ocultos');
            }, 1500);
        }
    });
    marcoVideo.append(video, botonReproducir, controles);
}

function crearVideo() {
    const marcoVideo = document.createElement('div');
    marcoVideo.className = 'marco-video';
    const video = document.createElement('video');
    video.className = 'detalle-media';
    video.playsInline = true;
    video.preload = 'auto';
    video.poster = historia.portada;
    video.src = historia.archivo;

    const botonReproducir = document.createElement('button');
    botonReproducir.className = 'boton-reproducir';
    botonReproducir.type = 'button';
    botonReproducir.innerHTML = '<span class="triangulo-reproducir" aria-hidden="true"></span><span>' + historia.boton + '</span>';
    botonReproducir.setAttribute('aria-label', `Reproducir ${historia.titulo}`);
    botonReproducir.addEventListener('click', function() {
        // Mostrar overlay de countdown
        const overlay = document.createElement('div');
        overlay.className = 'countdown-overlay';
        marcoVideo.append(overlay);

        const contador = document.createElement('div');
        contador.className = 'countdown-numero';
        overlay.append(contador);

        let numero = 3;
        contador.textContent = numero;
        contador.classList.add('mostrar');

        const intervalo = setInterval(function() {
            numero -= 1;
            if (numero > 0) {
                contador.classList.remove('mostrar');
                setTimeout(function() {
                    contador.textContent = numero;
                    contador.classList.add('mostrar');
                }, 100);
            } else {
                clearInterval(intervalo);
                // Después del countdown, esperar 0.8 segundos en negro y luego reproducir
                contador.textContent = '';
                setTimeout(function() {
                    overlay.remove();
                    video.play();
                    marcoVideo.classList.add('reproduciendo');
                }, 800);
            }
        }, 1000);
    });
    crearControlesVideo(video, marcoVideo, botonReproducir);
    contenido.append(marcoVideo);
    video.load();
}

function crearCollage() {
    const collage = document.createElement('div');
    collage.className = `collage collage--${historia.forma}`;
    for (let indice = 0; indice < historia.cantidad; indice += 1) {
        const imagen = document.createElement('img');
        imagen.src = historia.portada;
        imagen.alt = `Recuerdo ${indice + 1} de ${historia.titulo}`;
        collage.append(imagen);
    }
    contenido.append(collage);
}

if (historia.tipo === 'video') crearVideo();
else crearCollage();
