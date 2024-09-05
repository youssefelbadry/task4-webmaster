let slideIndex = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let timer;

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.style.opacity = i === slideIndex ? '1' : '0';
    });

    dots.forEach((dot, i) => {
        dot.className = dot.className.replace(" active", "");
        if (i === slideIndex) {
            dot.className += " active";
        }
    });

    resetTimer();
}

function moveSlide(n) {
    showSlide(slideIndex + n);
}

function currentSlide(n) {
    showSlide(n - 1);
}

function autoSlide() {
    moveSlide(1);
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 3000); // Change image every 3 seconds
}

document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(timer); // Pause when hovering
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    resetTimer(); // Resume when not hovering
});

// Swipe functionality for touch screens
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX) {
        moveSlide(1);
    }
    if (touchEndX > touchStartX) {
        moveSlide(-1);
    }
}

showSlide(slideIndex);
resetTimer();
