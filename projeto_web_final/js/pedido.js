const produtos = [
    {
        id: 1,
        nome: 'Clássico Burger',
        descricao: 'Carne 180g, queijo cheddar, alface, tomate e molho especial.',
        preco: 28.90,
        imagem: 'imgs/classico.jpg'
    },
    {
        id: 2,
        nome: 'Bacon Supreme',
        descricao: 'Carne 200g, bacon crocante, cebola caramelizada e cheddar duplo.',
        preco: 34.90,
        imagem: 'imgs/bacon.jpg'
    },
    {
        id: 3,
        nome: 'Veggie Grill',
        descricao: 'Hambúrguer vegetal, rúcula, maionese de alho e cebola roxa.',
        preco: 26.90,
        imagem: 'imgs/veggie.jpg'
    }
];


let carrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    carregarCarrinho();
});

function carregarProdutos() {
    const container = document.getElementById('lista-produtos');
    if (!container) return;

    container.innerHTML = produtos.map(produto => `
      <div class="card produto-item">
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-image">
        <div class="produto-content">
          <div>
            <div class="produto-header">
              <h3 class="produto-name">${produto.nome}</h3>
              <span class="produto-price">R$ ${produto.preco.toFixed(2)}</span>
            </div>
            <p class="produto-description">${produto.descricao}</p>
          </div>
          <button class="btn btn-primary btn-full" onclick="adicionarAoCarrinho(${produto.id})">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    `).join('');
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    carregarCarrinho();
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    carregarCarrinho();
}

function atualizarQuantidade(idProduto, mudanca) {
    const item = carrinho.find(item => item.id === idProduto);
    if (item) {
        item.quantidade = Math.max(0, item.quantidade + mudanca);
        if (item.quantidade === 0) {
            removerDoCarrinho(idProduto);
        } else {
            carregarCarrinho();
        }
    }
}

function carregarCarrinho() {
    const conteudoCarrinho = document.getElementById('conteudo-carrinho');
    const contadorCarrinho = document.getElementById('contador-carrinho');

    if (!conteudoCarrinho || !contadorCarrinho) return;

    if (carrinho.length === 0) {
        conteudoCarrinho.innerHTML = `
        <div class="carrinho-empty">
          <div class="carrinho-empty-icon">🛒</div>
          <p style="color: var(--muted-foreground);">Seu carrinho está vazio</p>
        </div>
      `;
        contadorCarrinho.textContent = 'Nenhum item adicionado';
        return;
    }

    const qtdItens = carrinho.length;
    contadorCarrinho.textContent = `${qtdItens} ${qtdItens === 1 ? 'item' : 'itens'}`;

    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    conteudoCarrinho.innerHTML = `
      <div class="carrinho-items">
        ${carrinho.map(item => `
          <div class="carrinho-item">
            <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-image">
            <div class="carrinho-item-info">
              <h4 class="carrinho-item-name">${item.nome}</h4>
              <p class="carrinho-item-price">R$ ${item.preco.toFixed(2)}</p>
              <div class="carrinho-item-controls">
                <button class="quantity-btn" onclick="atualizarQuantidade(${item.id}, -1)">−</button>
                <span class="quantity-display">${item.quantidade}</span>
                <button class="quantity-btn" onclick="atualizarQuantidade(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removerDoCarrinho(${item.id})">Remover</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="carrinho-separator"></div>
      <div class="carrinho-total">
        <span>Total:</span>
        <span class="carrinho-total-value">R$ ${total.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary btn-lg btn-full" onclick="finalizarPedido()">
        Finalizar Pedido
      </button>
    `;
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Adicione itens ao carrinho primeiro!');
        return;
    }
    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    alert(`Pedido finalizado! Total: R$ ${total.toFixed(2)}`);
    carrinho = [];
    carregarCarrinho();
}