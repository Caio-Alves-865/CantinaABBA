// Seleção de elementos do Modal
const btnFinalizar = document.querySelector('.btn-finalizar');
const modalOverlay = document.getElementById('modal-pagamento');
const modalJanela = document.querySelector('.modal-checkout');
const btnFecharModal = document.getElementById('fechar-modal');

// Telas do Modal
const formCheckout = document.getElementById('form-checkout');
const telaPix = document.getElementById('tela-pix');
const telaSucesso = document.getElementById('tela-sucesso');

// Controle do Timer para não bugar se abrir duas vezes
let timerInterval; 

// Abre o Modal (Sempre reseta para o estado inicial)
btnFinalizar.addEventListener('click', () => {
    modalOverlay.classList.add('ativo');
    resetarModal();
});

// Fecha o Modal e para o cronômetro se estiver rodando
function fecharModal() {
    modalOverlay.classList.remove('ativo');
    clearInterval(timerInterval);
}

btnFecharModal.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) fecharModal();
});

// Função para resetar o modal pro formulário caso o usuário feche e abra de novo
function resetarModal() {
    formCheckout.style.display = 'block';
    telaPix.style.display = 'none';
    telaSucesso.style.display = 'none';
    modalJanela.classList.remove('tema-verde');
    clearInterval(timerInterval);
    document.getElementById('cronometro-pix').textContent = "05:00";
}

// Lógica de Processamento ao clicar em "Confirmar e Pagar"
formCheckout.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // Descobre qual rádio está selecionado
    const metodoEscolhido = document.querySelector('input[name="pagamento"]:checked').value;

    // Esconde o formulário
    formCheckout.style.display = 'none';

    if (metodoEscolhido === 'pix') {
        // Mostra a tela do PIX
        telaPix.style.display = 'block';
        iniciarCronometroPix(5 * 60); // 5 minutos
        
    } else {
        // Cartão ou Balcão: Mostra tela verde de sucesso
        telaSucesso.style.display = 'block';
        modalJanela.classList.add('tema-verde');
    }
});

// Função do Cronômetro do PIX
function iniciarCronometroPix(duracaoEmSegundos) {
    let tempoRestante = duracaoEmSegundos;
    const display = document.getElementById('cronometro-pix');

    timerInterval = setInterval(() => {
        let minutos = Math.floor(tempoRestante / 60);
        let segundos = tempoRestante % 60;

        // Formata para ter 2 dígitos (ex: 04:09)
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        display.textContent = `${minutos}:${segundos}`;

        if (--tempoRestante < 0) {
            clearInterval(timerInterval);
            display.textContent = "Expirado";
            // Aqui poderia ter uma lógica para voltar ao form, etc.
        }
    }, 1000);
}

// Função para o botão "Copiar"
function copiarPix() {
    const inputPix = document.getElementById('codigo-pix');
    inputPix.select();
    document.execCommand("copy"); // Método simples para protótipos
    
    // Feedback visual rápido
    const btn = document.querySelector('.btn-copiar');
    btn.textContent = "Copiado!";
    btn.style.backgroundColor = "#E2ECE9";
    
    setTimeout(() => {
        btn.textContent = "Copiar";
        btn.style.backgroundColor = "var(--cor-destaque)";
    }, 2000);
}