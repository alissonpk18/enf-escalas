document.addEventListener('DOMContentLoaded', function() {

    const painScaleContainer = document.getElementById('pain-scale');
    const resultadoDiv = document.getElementById('resultado-dor');
    const resultadoTexto = document.getElementById('resultado-texto');
    const btnRecalcular = document.getElementById('btn-recalcular');

    const painColors = [
        '#28a745', '#5cb85c', '#8fd08f', '#c2e0c2', // Leve (0-3)
        '#ffc107', '#ffd54f', '#ffe082',            // Moderada (4-6)
        '#dc3545', '#e4606d', '#ec8a93', '#f4b5b9'  // Intensa (7-10)
    ];

    // Cria os botões da escala de 0 a 10
    for (let i = 0; i <= 10; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'pain-level';
        levelDiv.textContent = i;
        levelDiv.dataset.value = i;
        levelDiv.style.backgroundColor = painColors[i];
        
        levelDiv.addEventListener('click', function() {
            handlePainSelection(i);
        });

        painScaleContainer.appendChild(levelDiv);
    }

    // Função chamada ao selecionar um nível de dor
    function handlePainSelection(value) {
        // Remove a seleção de outros botões
        const allLevels = document.querySelectorAll('.pain-level');
        allLevels.forEach(level => level.classList.remove('selected'));

        // Adiciona a classe 'selected' ao botão clicado
        const selectedLevel = document.querySelector(`.pain-level[data-value='${value}']`);
        selectedLevel.classList.add('selected');
        
        // Interpreta o valor da dor
        let interpretacao = '';
        if (value === 0) {
            interpretacao = 'Sem Dor';
        } else if (value >= 1 && value <= 3) {
            interpretacao = 'Dor Leve';
        } else if (value >= 4 && value <= 6) {
            interpretacao = 'Dor Moderada';
        } else {
            interpretacao = 'Dor Intensa';
        }
        
        // Define o estilo de fundo da div de resultado
        const resultadoClass = getResultadoClass(value);
        resultadoDiv.className = resultadoClass; // Aplica a classe de cor de fundo

        // Mostra o resultado na tela
        resultadoTexto.innerHTML = `
            <span style="color: ${painColors[value]}">${value}</span>
            <p>${interpretacao}</p>
        `;
        
        // Exibe a div de resultado
        resultadoDiv.style.display = 'block';
    }

    // Função para definir a cor de fundo do resultado
    function getResultadoClass(value) {
        if (value >= 7) return 'resultado-grave';
        if (value >= 4) return 'resultado-medio';
        return 'resultado-leve';
    }

    // Função para resetar a escala para uma nova avaliação
    function resetarEscala() {
        // Oculta a div de resultado
        resultadoDiv.style.display = 'none';

        // Remove a seleção de todos os botões
        const allLevels = document.querySelectorAll('.pain-level');
        allLevels.forEach(level => level.classList.remove('selected'));
    }

    // Adiciona o evento de clique ao botão "Avaliar Novamente"
    btnRecalcular.addEventListener('click', resetarEscala);
});