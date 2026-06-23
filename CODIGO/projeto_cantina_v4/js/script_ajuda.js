// Seleciona todos os botões de pergunta
const botoesFaq = document.querySelectorAll('.faq-pergunta');

botoesFaq.forEach(botao => {
    botao.addEventListener('click', () => {
        // Pega o contêiner principal da pergunta que foi clicada
        const itemAtual = botao.parentElement;
        
        // Verifica se a pergunta clicada já está aberta
        const estaAberto = itemAtual.classList.contains('ativo');
        
        // Fecha TODAS as outras abas
        const todosItens = document.querySelectorAll('.faq-item');
        todosItens.forEach(item => {
            item.classList.remove('ativo');
        });

        // Se NÃO estava aberto, adiciona a classe ativo (abre)
        // Se já estava aberto, ele apenas fecha (pois já removemos tudo no forEach acima)
        if (!estaAberto) {
            itemAtual.classList.add('ativo');
        }
    });
});