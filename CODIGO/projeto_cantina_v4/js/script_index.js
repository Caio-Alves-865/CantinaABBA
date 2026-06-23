// =========================================
// LÓGICA DO CARROSSEL DE IMAGENS
// =========================================
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
}, 4000); 


// =========================================
// LÓGICA DE PESQUISA E FILTROS DE PRODUTOS
// =========================================
const inputPesquisa = document.getElementById('input-pesquisa');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const cardsProdutos = document.querySelectorAll('.card-produto:not(.promo-slide)');

// Função para filtrar os produtos
function filtrarProdutos() {
    const termoPesquisa = inputPesquisa.value.toLowerCase();
    const filtroAtivo = document.querySelector('.btn-filtro.ativo').getAttribute('data-filtro');

    cardsProdutos.forEach(card => {
        const nomeProduto = card.querySelector('h4').textContent.toLowerCase();
        const categoriaProduto = card.getAttribute('data-categoria');

        // Verifica se o texto bate com a pesquisa E se a categoria está correta
        const correspondePesquisa = nomeProduto.includes(termoPesquisa);
        const correspondeCategoria = filtroAtivo === 'todos' || categoriaProduto === filtroAtivo;

        if (correspondePesquisa && correspondeCategoria) {
            card.style.display = 'flex'; // Mostra o card
        } else {
            card.style.display = 'none'; // Esconde o card
        }
    });
}

// Evento de digitação na barra de pesquisa
inputPesquisa.addEventListener('input', filtrarProdutos);

// Evento de clique nos botões de categoria
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'ativo' de todos os botões
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        
        // Adiciona a classe 'ativo' no botão clicado
        botao.classList.add('ativo');
        
        // Roda o filtro novamente
        filtrarProdutos();
    });
});

// =========================================
// LÓGICA DO CARROSSEL DE PROMOÇÕES (LATERAL)
// =========================================
let promoIndex = 0;
const promos = document.querySelectorAll('.promo-slide');

function mostrarPromo(index) {
    // Remove a classe 'ativo' de todos os cards de promoção
    promos.forEach(promo => promo.classList.remove('ativo'));
            
    // Lógica de loop
    if (index >= promos.length) promoIndex = 0;
    if (index < 0) promoIndex = promos.length - 1;
            
    // Adiciona a classe 'ativo' no card atual
    promos[promoIndex].classList.add('ativo');
}

function moverPromo(direcao) {
    promoIndex += direcao;
    mostrarPromo(promoIndex);
}

// Faz o carrossel de promoções girar sozinho a cada 5 segundos
setInterval(() => {
    if(promos.length > 0) {
        moverPromo(1);
    }
}, 5000);