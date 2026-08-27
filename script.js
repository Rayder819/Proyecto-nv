const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburguesa');
const menu = document.querySelector('nav.menu ul');
const poster = document.querySelector('.hero-poster');
const header = document.querySelector('header');

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

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
