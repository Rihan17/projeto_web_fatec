function fazerLogin(evento) {
    evento.preventDefault();

    const dadosFormulario = new FormData(evento.target);
    const usuario = (dadosFormulario.get('usuario') || '').trim();
    const senha = (dadosFormulario.get('senha') || '').trim();

    const usuariosValidos = { 'Rihan': '1234', 'Lucas': '1234' };

    if (usuariosValidos[usuario] && usuariosValidos[usuario] === senha) {
        sessionStorage.setItem('usuario', usuario);
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha inválidos.');
    }
}