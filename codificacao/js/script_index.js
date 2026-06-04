
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlide(index) {
    // Remove a classe 'ativo' de todos os slides
    slides.forEach(slide => slide.classList.remove('ativo'));
            
    // Faz o loop: se passar do último, volta pro primeiro e vice-versa
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
            
    // Mostra apenas o slide atual com uma transição suave
    slides[slideIndex].classList.add('ativo');
}

function moverSlide(direcao) {
    slideIndex += direcao;
    mostrarSlide(slideIndex);
}

// Configura a rotação automática a cada 4 segundos (4000 milissegundos)
setInterval(() => {
    moverSlide(1);
}, 3000);