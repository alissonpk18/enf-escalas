document.addEventListener('DOMContentLoaded', function() {

    const painScaleContainer = document.getElementById('pain-scale');
    const resultadoDiv = document.getElementById('resultado-dor');

    // Mapeamento de cores para cada nível de dor (Verde -> Amarelo -> Vermelho)
    const painColors = [
        '#28a745', '#5cb85c', '#8fd08f', '#c2e0c2', // Leve (0-3)
        '#ffc107', '#ffd54f', '#ffe082',            // Moderada (4-6)
        '#dc3545', '#e4606d', '#ec8a93', '#f4b5b9' // Intensa (7-10)
    ];

    // Cria os botões de 0 a 10
    for (let i = 0; i <= 10; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'pain-level';
        levelDiv.textContent = i;
        levelDiv.dataset.value = i;
        levelDiv.style.backgroundColor = painColors[i];
        
        // Adiciona o evento de clique a cada botão
        levelDiv.addEventListener('click', function() {
            handlePainSelection(i);
        });

        painScaleContainer.appendChild(levelDiv);
    }

    function handlePainSelection(value) {
        // Remove a seleção de outros botões
        const allLevels = document.querySelectorAll('.pain-level');
        allLevels.forEach(level => level.classList.remove('selected'));

        // Adiciona a seleção ao botão clicado
        const selectedLevel = document.querySelector(`.pain-level[data-value='${value}']`);
        selectedLevel.classList.add('selected');
        
        // Interpreta o valor
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
        
        // Mostra o resultado na tela
        resultadoDiv.innerHTML = `
            <span style="color: ${painColors[value]}">${value}</span>
            <p>${interpretacao}</p>
        `;
    }
});