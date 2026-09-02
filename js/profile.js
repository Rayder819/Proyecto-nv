const video = document.getElementById('intro-audio');
const entrar = document.getElementById('entrarPerfil');
const perfil = document.querySelector('.perfil-wrap');
const capa = document.querySelector('.capa');

if (video && entrar && perfil && capa) {
    entrar.addEventListener('click', function () {
        perfil.classList.add('fade-out');
        capa.classList.add('fade-negro');

        setTimeout(function () {
            video.classList.add('activo');
            video.muted = false;
            video.volume = 1;
            video.currentTime = 0;
            video.play().catch(function () {});

            video.addEventListener('ended', function () {
                window.location.href = 'galeria.html';
            }, { once: true });
        }, 1200);
    });
}
