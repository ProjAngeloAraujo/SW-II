// Elementos principais do carrinho
const botaoCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const listaCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const quantidadeCarrinho = document.getElementById('contador-quantidade');

// Objeto para armazenar os produtos adicionados no carrinho
let carrinhoProdutos = {};

// Função auxiliar para formatar valores em R$
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Botões "Adicionar ao carrinho"
const botoesAdicionar = document.querySelectorAll('.botao-carrinho');
botoesAdicionar.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    const produto = botao.closest('.produto');
    const descricao = produto.querySelector('.descricao').textContent.trim();
    const precoTexto = produto.querySelector('.preco').textContent
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.')
      .trim();
    const preco = parseFloat(precoTexto);

    if (carrinhoProdutos[index]) {
      carrinhoProdutos[index].quantidade++;
    } else {
      carrinhoProdutos[index] = { descricao, preco, quantidade: 1 };
    }

    atualizarCarrinho();
    carrinho.classList.add('aberto');

    // 🎉 Dispara confete
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });
});

// Atualiza carrinho
function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let quantidadeTotal = 0;
  let total = 0;

  Object.entries(carrinhoProdutos).forEach(([id, item]) => {
    quantidadeTotal += item.quantidade;
    total += item.preco * item.quantidade;

    const divItem = document.createElement('div');
    divItem.classList.add('item-carrinho');
    divItem.innerHTML = `
      <div class="descricao-item">
        <div class="nome">${item.descricao}</div>
        <div class="preco">${formatarPreco(item.preco)} x ${item.quantidade} = ${formatarPreco(item.preco * item.quantidade)}</div>
      </div>
      <div class="acoes">
        <button class="btn-menor" data-id="${id}" data-acao="diminuir">-</button>
        <button class="btn-menor" data-id="${id}" data-acao="aumentar">+</button>
      </div>
    `;
    listaCarrinho.appendChild(divItem);
  });

  totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
  quantidadeCarrinho.textContent = quantidadeTotal;
  quantidadeCarrinho.style.display = quantidadeTotal > 0 ? 'inline-block' : 'none';

  configurarBotoesQuantidade();
}

// Configura botões + e -
function configurarBotoesQuantidade() {
  const botoes = document.querySelectorAll('.btn-menor');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const id = botao.dataset.id;
      const acao = botao.dataset.acao;

      if (acao === 'aumentar') carrinhoProdutos[id].quantidade++;
      if (acao === 'diminuir') {
        carrinhoProdutos[id].quantidade--;
        if (carrinhoProdutos[id].quantidade <= 0) delete carrinhoProdutos[id];
      }

      atualizarCarrinho();
    });
  });
}

// Abrir/fechar carrinho ao clicar no botão 🛒
botaoCarrinho.addEventListener('click', () => {
  if (carrinho.classList.contains('aberto')) {
    carrinho.classList.remove('aberto');
  } else {
    carrinho.classList.add('aberto');
  }
});

// Botão finalizar
const botaoFinalizar = document.getElementById('btn-finalizar');
botaoFinalizar.addEventListener('click', () => {
  window.location.href = 'finalizar-compra.html';
});

// Inicialização
function inicializarCarrinho() {
  atualizarCarrinho();
}
inicializarCarrinho();

// Carrossel
const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnAnterior = document.querySelector('.seta-anterior');
const btnProximo = document.querySelector('.seta-proximo');
let indiceAtual = 0;

function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;
}

if (btnAnterior && btnProximo) {
  btnAnterior.addEventListener('click', () => {
      indiceAtual = (indiceAtual === 0) ? imagens.length - 1 : indiceAtual - 1;
      atualizarCarrossel();
  });

  btnProximo.addEventListener('click', () => {
      indiceAtual = (indiceAtual === imagens.length - 1) ? 0 : indiceAtual + 1;
      atualizarCarrossel();
  });
}

function changeImage(src) {
  // Troca a imagem principal pela miniatura clicada
  document.getElementById("product-img").src = src;
}

function addToCart() {
  alert("Produto adicionado ao carrinho!");
}

function buyNow() {
  alert("Redirecionando para o pagamento...");
}
