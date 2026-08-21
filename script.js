const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');

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