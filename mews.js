document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mews-form');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter valores brutos dos inputs
        const pas = parseFloat(document.getElementById('pa-sistolica').value);
        const fc = parseFloat(document.getElementById('freq-cardiaca').value);
        const fr = parseFloat(document.getElementById('freq-respiratoria').value);
        const temp = parseFloat(document.getElementById('temperatura').value);
        const consciencia = parseInt(document.getElementById('consciencia').value);

        // Calcular pontuação para cada parâmetro
        const scorePAS = getScorePAS(pas);
        const scoreFC = getScoreFC(fc);
        const scoreFR = getScoreFR(fr);
        const scoreTemp = getScoreTemp(temp);
        
        // A pontuação da consciência já é o próprio valor do select
        const scoreConsciencia = consciencia;

        const pontuacaoTotal = scorePAS + scoreFC + scoreFR + scoreTemp + scoreConsciencia;

        // Determinar classificação e classe de cor
        let classificacao = '';
        let classeResultado = '';

        if (pontuacaoTotal >= 5) {
            classificacao = 'Alto Risco - Acionar equipe médica!';
            classeResultado = 'resultado-alto';
        } else {
            classificacao = 'Baixo Risco - Manter monitoramento de rotina.';
            classeResultado = 'resultado-baixo';
        }

        // Exibir resultado
        resultadoDiv.innerHTML = `
            <strong>Escore MEWS Total: ${pontuacaoTotal}</strong>
            <p>${classificacao}</p>
        `;
        resultadoDiv.className = '';
        resultadoDiv.classList.add(classeResultado);
        resultadoDiv.style.display = 'block';
    });

    // Funções auxiliares para calcular a pontuação de cada parâmetro
    function getScorePAS(valor) {
        if (valor <= 70) return 3;
        if (valor <= 80) return 2;
        if (valor <= 100) return 1;
        if (valor <= 199) return 0;
        return 2; // >= 200
    }

    function getScoreFC(valor) {
        if (valor <= 40) return 2;
        if (valor <= 50) return 1;
        if (valor <= 100) return 0;
        if (valor <= 110) return 1;
        if (valor <= 129) return 2;
        return 3; // >= 130
    }

    function getScoreFR(valor) {
        if (valor <= 8) return 2;
        if (valor <= 14) return 0;
        if (valor <= 20) return 1;
        if (valor <= 29) return 2;
        return 3; // >= 30
    }

    function getScoreTemp(valor) {
        if (valor <= 35.0) return 2;
        if (valor <= 36.0) return 1;
        if (valor <= 38.0) return 0;
        if (valor <= 38.5) return 1;
        return 2; // >= 38.6
    }
});