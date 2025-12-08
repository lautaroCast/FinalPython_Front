/* CÓDIGO JS REVISADO (SIN CAMBIOS FUNCIONALES NECESARIOS) */
const slider = document.getElementById('main-carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 1;
const totalSlides = slides.length;

function goToSlide(n) {
    if (n > totalSlides) {
        currentSlide = 1;
    } else if (n < 1) {
        currentSlide = totalSlides;
    } else {
        currentSlide = n;
    }

    // Mover el slider: El cálculo es (diapositiva actual - 1) * -100%
    const offset = (currentSlide - 1) * -100;
    slider.style.transform = `translateX(${offset}%)`;

    // Actualizar los indicadores
    dots.forEach(dot => dot.classList.remove('active'));
    document.querySelector(`.dot[data-slide="${currentSlide}"]`).classList.add('active');
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        goToSlide(slideIndex);
    });
});


/* Asegúrate de que este código corre DESPUÉS de que el HTML cargue el carrusel */