// =========================================
// LÓGICA DE PESQUISA DO CARDÁPIO COMPLETO
// =========================================

const inputPesquisaCardapio = document.getElementById('pesquisa-cardapio');
const titulosCategoria = document.querySelectorAll('.titulo-categoria');
const todosCards = document.querySelectorAll('.card-produto');
const todasSecoes = document.querySelectorAll('.secao-categoria');

inputPesquisaCardapio.addEventListener('input', function() {
    const termo = this.value.toLowerCase().trim();

    if (termo === '') {
        // Se a barra estiver vazia, volta a exibir os títulos e todos os cards
        titulosCategoria.forEach(titulo => titulo.style.display = 'block');
        todosCards.forEach(card => card.style.display = 'flex');
        todasSecoes.forEach(secao => secao.style.display = 'block');
    } else {
        // Se tem pesquisa, esconde os títulos para os itens parecerem um grupo só
        titulosCategoria.forEach(titulo => titulo.style.display = 'none');

        // Filtra os cards
        todosCards.forEach(card => {
            const nomeProduto = card.querySelector('h4').textContent.toLowerCase();
            
            if (nomeProduto.includes(termo)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Esconde completamente as seções que ficaram sem nenhum card visível 
        // para não sobrar espaços em branco gigantes na tela
        todasSecoes.forEach(secao => {
            const cardsVisiveis = secao.querySelectorAll('.card-produto[style="display: flex;"]');
            if (cardsVisiveis.length === 0) {
                secao.style.display = 'none';
            } else {
                secao.style.display = 'block';
            }
        });
    }
});