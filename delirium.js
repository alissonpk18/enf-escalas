document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos Comuns ---
    const choiceContainer = document.getElementById('choice-container');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTextoDiv = document.getElementById('resultado-texto');
    const voltarBtn = document.getElementById('voltar-escolha');

    // --- Elementos da Calculadora 4AT ---
    const calculator4AT = document.getElementById('calculator-4at');
    const show4ATBtn = document.getElementById('show-4at');
    const calcular4ATBtn = document.getElementById('calcular-4at');
    const form4AT = document.getElementById('form-4at');

    // --- Elementos da Calculadora CAM-ICU ---
    const calculatorCamIcu = document.getElementById('calculator-cam-icu');
    const showCamIcuBtn = document.getElementById('show-cam-icu');
    const verificarCamIcuBtn = document.getElementById('verificar-cam-icu');
    const formCamIcu = document.getElementById('form-cam-icu');

    // --- Funções de UI ---
    function showScreen(screen) {
        choiceContainer.style.display = 'none';
        calculator4AT.style.display = 'none';
        calculatorCamIcu.style.display = 'none';
        resultadoDiv.style.display = 'none';

        screen.style.display = 'block';
    }

    function showResult(htmlContent, resultClass) {
        resultadoTextoDiv.innerHTML = htmlContent;
        resultadoTextoDiv.classList.remove('resultado-leve', 'resultado-medio', 'resultado-grave');
        resultadoTextoDiv.classList.add(resultClass);
        showScreen(resultadoDiv);
    }
    
    // --- Event Listeners para Escolha Inicial ---
    show4ATBtn.addEventListener('click', () => showScreen(calculator4AT));
    showCamIcuBtn.addEventListener('click', () => showScreen(calculatorCamIcu));
    
    voltarBtn.addEventListener('click', () => {
        form4AT.reset();
        formCamIcu.reset();
        showScreen(choiceContainer);
    });

    // --- Lógica da Calculadora 4AT ---
    calcular4ATBtn.addEventListener('click', function() {
        const item1 = parseInt(document.getElementById('item1-alerta').value);
        const item2 = parseInt(document.getElementById('item2-amt4').value);
        const item3 = parseInt(document.getElementById('item3-atencao').value);
        const item4 = parseInt(document.getElementById('item4-mudanca-aguda').value);

        const score = item1 + item2 + item3 + item4;
        let interpretation, resultClass;

        if (score >= 4) {
            interpretation = "<strong>Provável Delirium.</strong> Recomenda-se avaliação médica completa.";
            resultClass = 'resultado-grave';
        } else if (score >= 1 && score <= 3) {
            interpretation = "<strong>Possível disfunção cognitiva.</strong> Pode indicar delirium, demência ou outra condição. Requer avaliação adicional.";
            resultClass = 'resultado-medio';
        } else { // score = 0
            interpretation = "<strong>Delirium/Disfunção Cognitiva Improvável.</strong>";
            resultClass = 'resultado-leve';
        }

        const html = `
            <p style="font-size: 1.2rem;">Escore 4AT:</p>
            <strong style="font-size: 2.5rem; display: block;">${score}</strong>
            <p>${interpretation}</p>`;
        
        showResult(html, resultClass);
    });

    // --- Lógica do Algoritmo CAM-ICU ---
    verificarCamIcuBtn.addEventListener('click', function() {
        const feature1 = parseInt(document.getElementById('cam-feature1').value) === 1;
        const feature2 = parseInt(document.getElementById('cam-feature2').value) === 1;
        const feature3 = parseInt(document.getElementById('cam-feature3').value) === 1;
        const feature4 = parseInt(document.getElementById('cam-feature4').value) === 1;

        let isPositive = feature1 && feature2 && (feature3 || feature4);
        let result, resultClass, interpretation;

        if(isPositive) {
            result = "POSITIVO para Delirium";
            resultClass = 'resultado-grave';
            interpretation = "O paciente atende aos critérios para delirium. Iniciar protocolos institucionais.";
        } else {
            result = "NEGATIVO para Delirium";
            resultClass = 'resultado-leve';
            interpretation = "O paciente não atende aos critérios para delirium no momento da avaliação.";
        }
        
        const html = `
            <p style="font-size: 1.2rem;">Resultado CAM-ICU:</p>
            <strong style="font-size: 2.2rem; display: block;">${result}</strong>
            <p>${interpretation}</p>`;
            
        showResult(html, resultClass);
    });
});