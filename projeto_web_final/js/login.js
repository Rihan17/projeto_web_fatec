function fazerLogin(evento) {
    evento.preventDefault();

    const dadosFormulario = new FormData(evento.target);
    const usuario = dadosFormulario.get('usuario');
    const senha = dadosFormulario.get('senha');

    if (usuario && senha) {
        alert(`Login realizado! Bem-vindo, ${usuario}!`);
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}