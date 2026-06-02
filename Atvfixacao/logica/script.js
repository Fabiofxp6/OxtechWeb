// 4. Lista Automática
const linguagens = ['JavaScript', 'Python', 'TypeScript', 'Rust', 'Go'];
const listaLinguagensEl = document.getElementById('lista-linguagens');

linguagens.forEach((linguagem) => {
    const li = document.createElement('li');
    li.textContent = linguagem;
    listaLinguagensEl.appendChild(li);
});

// 5. Carrinho de Compras
const carrinho = [
    { nome: 'Monitor', preco: 1200.00 },
    { nome: 'Teclado', preco: 350.00 },
    { nome: 'Mouse', preco: 250.00 }
];

let totalCompra = 0;
for (let i = 0; i < carrinho.length; i++) {
    totalCompra += carrinho[i].preco;
}

document.getElementById('total-carrinho').textContent = `O total da sua compra é R$ ${totalCompra}`;

// 6. Filtro Anti-Bug
const palavrasArray = [];
const inputPalavraEl = document.getElementById('input-palavra');
const btnAdicionarEl = document.getElementById('btn-adicionar');
const listaPalavrasEl = document.getElementById('lista-palavras');

btnAdicionarEl.addEventListener('click', () => {
    const palavra = inputPalavraEl.value.trim();
    if (!palavra) return;

    if (palavra.toLowerCase() === 'bug' || palavra.toLowerCase() === 'erro') {
        alert('Ação bloqueada!');
        return;
    }

    palavrasArray.push(palavra);
    inputPalavraEl.value = '';
    listaPalavrasEl.textContent = JSON.stringify(palavrasArray);
});

// Permitir adicionar ao apertar Enter
inputPalavraEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        btnAdicionarEl.click();
    }
});

// 7. Gerador de Cards Monocromáticos
const projetos = [
    { titulo: 'Projeto A', status: 'Concluído' },
    { titulo: 'Projeto B', status: 'Em progresso' },
    { titulo: 'Projeto C', status: 'Planejado' }
];

const containerCardsEl = document.getElementById('container-cards');

projetos.forEach((projeto) => {
    const card = document.createElement('div');
    // Cards com fundo preto (#000000), bordas e textos em cinza até #BDBDBD usando Tailwind
    card.className = 'bg-[#000000] border border-[#BDBDBD] text-[#BDBDBD] p-4 rounded text-sm';
    card.innerHTML = `
        <h3 class="font-bold">${projeto.titulo}</h3>
        <p class="text-xs mt-1">Status: ${projeto.status}</p>
    `;
    containerCardsEl.appendChild(card);
});
