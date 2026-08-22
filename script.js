const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('nav.menu ul');

hero.addEventListener('mouseenter', function() {
    video.play();
});

hero.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
});

hero.addEventListener('touchstart', function() {
    video.play();
});

hero.addEventListener('touchend', function() {
    video.pause();
    video.currentTime = 0;
});

hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
});
