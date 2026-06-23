// ==========================================
// CONTROLE DE SESSÃO NO CABEÇALHO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = localStorage.getItem('usuario_cantina');
    
    const itensRestritos = document.querySelectorAll('.item-restrito');
    const navLogin = document.getElementById('nav-login');
    const navUsuario = document.getElementById('nav-usuario');
    const nomeUsuarioHeader = document.getElementById('nome-usuario-header');
    const btnPerfil = document.getElementById('btn-perfil');
    const dropdownLogout = document.getElementById('dropdown-logout');

    if (usuarioLogado) {
        // --- USUÁRIO ESTÁ LOGADO ---
        
        // 1. Mostra os links restritos (Pedidos, Cardápio, Contato)
        itensRestritos.forEach(item => item.style.display = 'block');
        
        // 2. Esconde o botão de Entrar e mostra o Nome do Usuário
        if(navLogin) navLogin.style.display = 'none';
        if(navUsuario) navUsuario.style.display = 'block';
        if(nomeUsuarioHeader) nomeUsuarioHeader.textContent = usuarioLogado;
        
    } else {
        // --- USUÁRIO NÃO ESTÁ LOGADO ---
        
        // 1. Esconde os links restritos
        itensRestritos.forEach(item => item.style.display = 'none');
        
        // 2. Mostra o botão de Entrar e esconde o Nome
        if(navLogin) navLogin.style.display = 'block';
        if(navUsuario) navUsuario.style.display = 'none';
    }

    // --- LÓGICA DE ABRIR/FECHAR O DROPDOWN DE LOGOUT ---
    if (btnPerfil) {
        btnPerfil.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique feche imediatamente
            dropdownLogout.classList.toggle('mostrar');
            btnPerfil.classList.toggle('aberto');
        });
    }

    // Fecha o dropdown se o usuário clicar em qualquer outro lugar da tela
    document.addEventListener('click', () => {
        if (dropdownLogout && dropdownLogout.classList.contains('mostrar')) {
            dropdownLogout.classList.remove('mostrar');
            btnPerfil.classList.remove('aberto');
        }
    });
});

// ==========================================
// FUNÇÃO DE DESLOGAR
// ==========================================
function fazerLogout() {
    // Remove o usuário da memória do navegador
    localStorage.removeItem('usuario_cantina');
    
    // Redireciona o usuário para a página inicial (ou recarrega se já estiver nela)
    window.location.href = '../html/index.html';
}

// ==========================================
// MODO ESCURO (DARK MODE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.getElementById('btn-tema');
    
    if (btnTema) {
        // A classe inicial já foi colocada no <head> pelo script anti-piscar.
        // Aqui nós só precisamos gerenciar o clique do botão.
        
        btnTema.addEventListener('click', () => {
            // Alterna a classe diretamente no elemento raiz (<html>)
            document.documentElement.classList.toggle('tema-escuro');
            
            // Salva a nova preferência na memória do navegador
            if (document.documentElement.classList.contains('tema-escuro')) {
                localStorage.setItem('tema_cantina', 'escuro');
            } else {
                localStorage.setItem('tema_cantina', 'claro');
            }
        });
    }
});