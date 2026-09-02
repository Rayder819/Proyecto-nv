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
        archivo: 'videos/video3.mp4',
        boton: 'Reproducir nuestra película',
        texto: 'Contigo, hasta los días más sencillos se convierten en recuerdos que quiero volver a vivir.'
    },
    coleccionCollage1: {
        titulo: 'Pequeños instantes',
        meta: 'Collage · Recuerdos favoritos',
        tipo: 'collage',
        cantidad: 3,
        forma: 'three',
        archivos: [
            'fotosia/coleccion/collage1/video1.mp4', 
            'fotosia/coleccion/collage1/foto1.jpg',
            'fotosia/coleccion/collage1/video2.mp4'
        ],
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
        archivo: 'videos/video2.mp4',
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
enlaceRegreso.href = retorno === 'inicio' ? 'galeria.html' : `galeria.html#${retorno}`;
enlaceRegreso.textContent = retorno === 'inicio' ? '← Volver al inicio' : `← Volver a ${nombresSeccion[retorno]}`;
document.querySelector(`[data-seccion="${seccion}"]`).classList.add('activo');
document.querySelector('#titulo').textContent = historia.titulo;
document.querySelector('#meta').textContent = historia.meta;
document.querySelector('#dedicatoria').textContent = historia.texto;
document.title = `Loveflix | ${historia.titulo}`;

function crearControlesVideo(video, marcoVideo, botonReproducir) {
    const svgPlay = '<svg class="icono-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    const svgPause = '<svg class="icono-svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const svgVolOn = '<svg class="icono-svg" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    const svgVolOff = '<svg class="icono-svg" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    const svgPantalla = '<svg class="icono-svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';

    const controles = document.createElement('div');
    controles.className = 'controles-video';
    
    controles.innerHTML = `
        <div class="progreso-contenedor">
            <input class="barra-progreso" type="range" min="0" max="100" step="0.1" value="0" aria-label="Progreso del video">
        </div>
        <div class="controles-inferiores">
            <div class="controles-izquierda">
                <button class="control-video boton-pausa" type="button" aria-label="Reproducir video">${svgPlay}</button>
                <div class="control-volumen-grupo">
                    <button class="control-video boton-volumen" type="button" aria-label="Silenciar video">${svgVolOn}</button>
                    <input class="barra-volumen" type="range" min="0" max="100" value="100" aria-label="Volumen del video">
                </div>
                <span class="tiempo-video">0:00 / 0:00</span>
            </div>
            <div class="controles-derecha">
                <button class="control-video boton-pantalla" type="button" aria-label="Ver en pantalla completa">${svgPantalla}</button>
            </div>
        </div>
    `;

    const botonPausa = controles.querySelector('.boton-pausa');
    const barraProgreso = controles.querySelector('.barra-progreso');
    const tiempoVideo = controles.querySelector('.tiempo-video');
    const barraVolumen = controles.querySelector('.barra-volumen');
    const botonVolumen = controles.querySelector('.boton-volumen');
    
    let temporizadorControles;
    let estaArrastrando = false;

    const mostrarControles = function() {
        marcoVideo.classList.remove('controles-ocultos');
        clearTimeout(temporizadorControles);
        if (!video.paused) {
            temporizadorControles = setTimeout(function() {
                marcoVideo.classList.add('controles-ocultos');
            }, 2500);
        }
    };

    const alternarReproduccion = function() {
        if (marcoVideo.querySelector('.countdown-overlay')) return; 
        if (video.paused) video.play(); else video.pause();
    };

    botonPausa.addEventListener('click', alternarReproduccion);
    video.addEventListener('click', alternarReproduccion);

    document.addEventListener('keydown', function(evento) {
        if (evento.code === 'Space' && !marcoVideo.querySelector('.countdown-overlay')) {
            evento.preventDefault(); 
            alternarReproduccion();
            mostrarControles();
        }
    });

    video.addEventListener('play', function() {
        marcoVideo.classList.add('reproduciendo');
        mostrarControles();
        botonPausa.setAttribute('aria-label', 'Pausar video');
        botonPausa.innerHTML = svgPause;
    });

    video.addEventListener('pause', function() {
        mostrarControles();
        botonPausa.setAttribute('aria-label', 'Reproducir video');
        botonPausa.innerHTML = svgPlay;
    });

    video.addEventListener('timeupdate', function() {
        if (!estaArrastrando) {
            barraProgreso.value = video.duration ? (video.currentTime / video.duration) * 100 : 0;
        }
        
        const formateaTiempo = (tiempo) => {
            if (isNaN(tiempo)) return "0:00";
            const min = Math.floor(tiempo / 60);
            const seg = String(Math.floor(tiempo % 60)).padStart(2, '0');
            return `${min}:${seg}`;
        };
        tiempoVideo.textContent = `${formateaTiempo(video.currentTime)} / ${formateaTiempo(video.duration)}`;
    });

    barraProgreso.addEventListener('mousedown', () => estaArrastrando = true);
    barraProgreso.addEventListener('touchstart', () => estaArrastrando = true, {passive: true});
    
    barraProgreso.addEventListener('input', function() {
        if (video.duration) {
            video.currentTime = (barraProgreso.value / 100) * video.duration;
        }
    });

    barraProgreso.addEventListener('change', () => estaArrastrando = false);
    barraProgreso.addEventListener('touchend', () => estaArrastrando = false);
    barraProgreso.addEventListener('mouseup', () => estaArrastrando = false);

    botonVolumen.addEventListener('click', function() {
        video.muted = !video.muted;
        barraVolumen.value = video.muted ? 0 : video.volume * 100;
        this.innerHTML = video.muted ? svgVolOff : svgVolOn;
        this.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar video');
    });

    barraVolumen.addEventListener('input', function() {
        video.volume = barraVolumen.value / 100;
        video.muted = video.volume === 0;
        botonVolumen.innerHTML = video.muted ? svgVolOff : svgVolOn;
    });

    controles.querySelector('.boton-pantalla').addEventListener('click', function() {
        if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                marcoVideo.classList.add('pantalla-completa');
                marcoVideo.requestFullscreen().catch(() => {
                    marcoVideo.classList.remove('pantalla-completa');
                });
            }
        }
    });

    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) marcoVideo.classList.remove('pantalla-completa');
    });

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
    
    const archivos = historia.archivos || Array(historia.cantidad).fill(historia.portada);

    archivos.forEach((ruta, indice) => {
        const contenedor = document.createElement('div');
        contenedor.className = 'item-collage-elemento';

        if (ruta.toLowerCase().endsWith('.mp4')) {
            contenedor.classList.add('item-collage-video');
            const videoCollage = document.createElement('video');
            videoCollage.src = ruta;
            videoCollage.autoplay = true;
            videoCollage.muted = true;
            videoCollage.loop = true;
            videoCollage.playsInline = true;

            videoCollage.addEventListener('loadedmetadata', () => {
                if (videoCollage.videoHeight > videoCollage.videoWidth) {
                    contenedor.classList.add('es-vertical');
                } else {
                    contenedor.classList.add('es-horizontal');
                }
            });

            const btnAudio = document.createElement('button');
            btnAudio.className = 'btn-mini-audio';
            const svgVolOn = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
            const svgVolOff = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
            btnAudio.innerHTML = svgVolOff;

            btnAudio.addEventListener('click', (evento) => {
                evento.stopPropagation(); 
                videoCollage.muted = !videoCollage.muted;
                
                if (videoCollage.muted) {
                    btnAudio.innerHTML = svgVolOff;
                    btnAudio.style.color = 'white';
                } else {
                    btnAudio.innerHTML = svgVolOn;
                    btnAudio.style.color = '#e50914';
                }
            });
            
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement && videoCollage.muted) {
                    videoCollage.muted = true;
                    btnAudio.innerHTML = svgVolOff;
                    btnAudio.style.color = 'white';
                }
            });
            contenedor.addEventListener('click', () => {
                if (videoCollage.webkitEnterFullscreen) {
                    videoCollage.webkitEnterFullscreen();
                } else if (videoCollage.requestFullscreen) {
                    videoCollage.requestFullscreen();
                } else if (videoCollage.paused) {
                    videoCollage.play();
                } else {
                    videoCollage.pause();
                }
            });

            contenedor.append(videoCollage, btnAudio);
        } else {
            const imagen = document.createElement('img');
            imagen.src = ruta;
            imagen.alt = `Recuerdo ${indice + 1} de ${historia.titulo}`;
            

            contenedor.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.className = 'modal-imagen-completa';
                modal.innerHTML = `<img src="${ruta}" alt="Ampliada"><button class="cerrar-modal">&times;</button>`;
                document.body.append(modal);
                modal.addEventListener('click', () => modal.remove());
            });

            contenedor.append(imagen);
        }
        collage.append(contenedor);
    });
    contenido.append(collage);
    
}

if (historia.tipo === 'video') crearVideo();
else crearCollage();