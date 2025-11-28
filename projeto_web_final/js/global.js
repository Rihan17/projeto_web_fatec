
document.addEventListener('DOMContentLoaded', () => {
    const botaoMenu = document.querySelector('.mobile-menu-btn');
    const navegacao = document.querySelector('nav');

    if (botaoMenu && navegacao) {
        botaoMenu.addEventListener('click', () => {
            // Alterna entre mostrar e esconder o menu 
            if (navegacao.style.display === 'flex') {
                navegacao.style.display = 'none';
            } else {
                navegacao.style.display = 'flex';
                navegacao.style.flexDirection = 'column';
                navegacao.style.position = 'absolute';
                navegacao.style.top = '64px';
                navegacao.style.left = '0';
                navegacao.style.width = '100%';
                navegacao.style.background = 'white';
                navegacao.style.padding = '1rem';
                navegacao.style.borderBottom = '1px solid var(--border)';
            }
        });
    }
});

// Função de Sair 
function fazerLogout() {
    if (confirm('Deseja realmente sair?')) {
        window.location.href = 'index.html';
    }
}