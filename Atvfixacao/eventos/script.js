// 1. O Interruptor
const btnInterruptor = document.getElementById('btn-interruptor');

// Configura o fundo inicial da página
document.body.style.backgroundColor = '#1a1a1a';
document.body.style.color = '#ffffff';

btnInterruptor.addEventListener('click', () => {
    const bg = document.body.style.backgroundColor;
    
    // Alterna a cor do fundo e do texto
    if (bg === 'rgb(26, 26, 26)' || bg === '#1a1a1a') {
        document.body.style.backgroundColor = '#BDBDBD';
        document.body.style.color = '#000000';
    } else {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
    }
});

// 2. Ecoador de Textos
const inputEco = document.getElementById('input-eco');
const outputEco = document.getElementById('output-eco');

inputEco.addEventListener('input', () => {
    // Coloca o valor digitado diretamente no parágrafo
    outputEco.textContent = inputEco.value;
});

// 3. Ocultar e Revelar
const btnMagica = document.getElementById('btn-magica');
const quadradoEscuro = document.getElementById('quadrado-escuro');

btnMagica.addEventListener('click', () => {
    // Alterna a exibição do quadrado (display block/none)
    if (quadradoEscuro.style.display === 'none') {
        quadradoEscuro.style.display = 'block';
    } else {
        quadradoEscuro.style.display = 'none';
    }
});
