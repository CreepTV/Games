const slideshowLeft = document.getElementById('slideshow-left');
const slideshowRight = document.getElementById('slideshow-right');
const slideshowImage = document.getElementsByClassName('slideshow-image');

let slideshowOffset = 0;

slideshowLeft.addEventListener('click', function(){
    slideshowOffset = (slideshowOffset === 0) ? ((slideshowImage.length - 1) * 100) : (slideshowOffset -= 100);
    for (let i = 0; i < slideshowImage.length; i++) {
        slideshowImage[i].style.transform = 'translateX(-' + slideshowOffset + '%)';
    }
});

slideshowRight.addEventListener('click', function(){
    const maxOffset = ((slideshowImage.length - 1) * 100);
    slideshowOffset = (slideshowOffset === maxOffset) ? 0 : (slideshowOffset += 100);
    for (let i = 0; i < slideshowImage.length; i++) {
        slideshowImage[i].style.transform = 'translateX(-' + slideshowOffset + '%)';
    }
});
