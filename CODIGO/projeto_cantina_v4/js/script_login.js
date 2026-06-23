// ==========================================
// CONTROLE DAS ABAS (Entrar / Cadastrar)
// ==========================================
function mudarAba(idTela, botaoClicado) {
    // Esconde todas as telas
    document.querySelectorAll('.tela-auth').forEach(tela => tela.classList.remove('ativa'));
    // Tira a classe 'ativo' de todos os botões de aba
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativo'));

    // Mostra a tela selecionada e ativa o botão
    document.getElementById(idTela).classList.add('ativa');
    if (botaoClicado) {
        botaoClicado.classList.add('ativo');
    }
}

// ==========================================
// LÓGICA DE CADASTRO COM VALIDAÇÃO
// ==========================================
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpa os erros antes de testar novamente
    limparErros();
    
    const nomeDigitado = document.getElementById('cad-nome').value.trim();
    const emailDigitado = document.getElementById('cad-email').value.trim();
    const senhaDigitada = document.getElementById('cad-senha').value.trim();
    let temErro = false;

    // 1. Validação do Nome
    if (!nomeDigitado) {
        mostrarErro('grupo-cad-nome', 'Como devemos te chamar? Preencha seu nome.');
        temErro = true;
    }

    // 2. Validação do E-mail e Verificação de Duplicidade
    if (!emailDigitado) {
        mostrarErro('grupo-cad-email', 'Precisamos do seu e-mail para o cadastro.');
        temErro = true;
    } else if (!emailDigitado.includes('@') || !emailDigitado.includes('.')) {
        mostrarErro('grupo-cad-email', 'Por favor, digite um formato de e-mail válido.');
        temErro = true;
    } else {
        // Verifica no "banco" se o e-mail já está em uso
        const usuarioSalvo = JSON.parse(localStorage.getItem('db_cantina_user'));
        if (usuarioSalvo && usuarioSalvo.email === emailDigitado) {
            mostrarErro('grupo-cad-email', 'Este e-mail já possui cadastro. Faça login ou recupere a senha.');
            temErro = true;
        }
    }

    // 3. Validação da Senha
    if (!senhaDigitada) {
        mostrarErro('grupo-cad-senha', 'Você precisa criar uma senha.');
        temErro = true;
    } else if (senhaDigitada.length < 6) {
        mostrarErro('grupo-cad-senha', 'A senha é muito curta. Mínimo de 6 caracteres.');
        temErro = true;
    }

    // Se bateu em alguma regra de erro, para a execução do código aqui
    if (temErro) return;

    // Se passou limpo, salva no "banco de dados" do protótipo
    const usuarioBanco = { nome: nomeDigitado, email: emailDigitado, senha: senhaDigitada };
    localStorage.setItem('db_cantina_user', JSON.stringify(usuarioBanco));

    // Chama o Toast elegante que criamos no lugar do alert()
    mostrarToast('Cadastro realizado com sucesso! Faça seu login.', 'sucesso');
    
    // Limpa os campos do formulário para não ficar salvo na tela
    document.getElementById('form-cadastro').reset();
    
    // Redireciona o usuário de volta para a aba de login
    mudarAba('tela-login', document.querySelector('.aba-btn')); 
});

// ==========================================
// FUNÇÕES AUXILIARES DE VALIDAÇÃO
// ==========================================

function mostrarErro(idGrupo, mensagem) {
    const grupo = document.getElementById(idGrupo);
    const spanErro = grupo.querySelector('.mensagem-erro');
    grupo.classList.add('erro');
    spanErro.textContent = mensagem;
}

function limparErros() {
    // Remove a classe de erro de todos os campos
    document.querySelectorAll('.grupo-input').forEach(grupo => {
        grupo.classList.remove('erro');
        const spanErro = grupo.querySelector('.mensagem-erro');
        if(spanErro) spanErro.textContent = '';
    });
}

// ==========================================
// LÓGICA DE LOGIN COM VALIDAÇÃO VISUAL
// ==========================================
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpa erros antigos toda vez que clica em Entrar
    limparErros();

    const emailDigitado = document.getElementById('login-email').value.trim();
    const senhaDigitada = document.getElementById('login-senha').value.trim();
    let temErro = false;

    // 1. Validação de campos vazios
    if (!emailDigitado) {
        mostrarErro('grupo-login-email', 'Por favor, preencha o seu e-mail.');
        temErro = true;
    }
    if (!senhaDigitada) {
        mostrarErro('grupo-login-senha', 'Por favor, digite a sua senha.');
        temErro = true;
    }

    // Se tiver campo vazio, para a execução do código aqui
    if (temErro) return; 

    // 2. Busca no "banco de dados" falso do protótipo
    const usuarioSalvo = JSON.parse(localStorage.getItem('db_cantina_user'));

    // 3. Validação de Credenciais
    if (!usuarioSalvo || usuarioSalvo.email !== emailDigitado) {
        // Usuário não existe ou e-mail errado
        mostrarErro('grupo-login-email', 'Usuário não encontrado. Verifique o e-mail ou cadastre-se.');
        
    } else if (usuarioSalvo.senha !== senhaDigitada) {
        // E-mail está certo, mas a senha está errada
        mostrarErro('grupo-login-senha', 'Senha incorreta. Tente novamente.');
        
    } else {
        // Sucesso total! Libera o acesso
        localStorage.setItem('usuario_cantina', usuarioSalvo.nome);
        window.location.href = 'index.html'; 
    }
});

// ==========================================
// LÓGICA DE RECUPERAÇÃO DE SENHA (VALIDADA)
// ==========================================

function abrirRecuperacao(e) {
    e.preventDefault(); // Impede o link de recarregar a página
    mudarAba('tela-recuperacao', null);
    
    // Tira a linha de seleção das abas Entrar/Cadastrar
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativo'));
}

function voltarParaLogin() {
    // Volta para a primeira aba (Entrar)
    mudarAba('tela-login', document.querySelectorAll('.aba-btn')[0]);
}

// Simula o disparo do E-mail
document.getElementById('form-pedir-codigo').addEventListener('submit', function(e) {
    e.preventDefault();
    limparErros(); // Limpa as mensagens antigas

    const emailDigitado = document.getElementById('rec-email').value.trim();
    let temErro = false;

    // 1. Validações de formato do e-mail
    if (!emailDigitado) {
        mostrarErro('grupo-rec-email', 'Informe o seu e-mail para recuperar a senha.');
        temErro = true;
    } else if (!emailDigitado.includes('@') || !emailDigitado.includes('.')) {
        mostrarErro('grupo-rec-email', 'Formato de e-mail inválido.');
        temErro = true;
    } else {
        // 2. VERIFICAÇÃO NO "BANCO DE DADOS" (LocalStorage)
        const usuarioSalvo = JSON.parse(localStorage.getItem('db_cantina_user'));
        
        // Checa se o banco existe e se o e-mail bate com o que foi digitado
        if (!usuarioSalvo || usuarioSalvo.email !== emailDigitado) {
            mostrarErro('grupo-rec-email', 'E-mail não encontrado no sistema.');
            temErro = true; // Bloqueia o avanço
        }
    }

    if (temErro) return; // Se deu algum erro, a tela trava aqui!

    // Tudo certo! E-mail validado e encontrado. Avança para a tela do código.
    document.getElementById('form-pedir-codigo').style.display = 'none';
    document.getElementById('form-nova-senha').style.display = 'block';
});

// Simula a troca da senha
document.getElementById('form-nova-senha').addEventListener('submit', function(e) {
    e.preventDefault();
    limparErros();
    
    const codigoDigitado = document.getElementById('rec-codigo').value.trim();
    const novaSenha = document.getElementById('rec-nova-senha').value.trim();
    let temErro = false;
    
    // Valida o código
    if (!codigoDigitado) {
        mostrarErro('grupo-rec-codigo', 'Digite o código de validação recebido.');
        temErro = true;
    }
    
    // Valida a nova senha
    if (!novaSenha) {
        mostrarErro('grupo-rec-nova-senha', 'Crie uma nova senha.');
        temErro = true;
    } else if (novaSenha.length < 6) {
        mostrarErro('grupo-rec-nova-senha', 'A nova senha deve ter no mínimo 6 caracteres.');
        temErro = true;
    }

    if (temErro) return; // Trava aqui se houver erros

    // Lógica de "Banco de Dados" (Protótipo)
    const usuarioSalvo = JSON.parse(localStorage.getItem('db_cantina_user'));
    if (usuarioSalvo) {
        usuarioSalvo.senha = novaSenha;
        localStorage.setItem('db_cantina_user', JSON.stringify(usuarioSalvo));
    }

    mostrarToast('Senha redefinida com sucesso! Você já pode entrar.', 'sucesso');
    
    // Limpa os campos para garantir segurança visual
    document.getElementById('form-pedir-codigo').reset();
    document.getElementById('form-nova-senha').reset();
    
    // Volta pro estado inicial de login
    document.getElementById('form-pedir-codigo').style.display = 'block';
    document.getElementById('form-nova-senha').style.display = 'none';
    voltarParaLogin();
});

// ==========================================
// FUNÇÃO GERADORA DE NOTIFICAÇÕES (TOASTS)
// ==========================================
function mostrarToast(mensagem, tipo = 'sucesso') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Cria a caixinha div
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    
    // Escolhe o ícone com base no tipo
    const icone = tipo === 'sucesso' ? '✅' : '⚠️';
    
    toast.innerHTML = `<span>${icone}</span> <p style="margin:0;">${mensagem}</p>`;
    
    // Joga a caixinha na tela
    container.appendChild(toast);

    // O CSS faz sumir visualmente em 3s, mas precisamos limpar o HTML depois
    setTimeout(() => {
        toast.remove();
    }, 3500);
}