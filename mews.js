document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mews-form');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultado-texto');
    const btnRecalcular = document.getElementById('btn-recalcular');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter valores brutos dos inputs
        const pas = parseFloat(document.getElementById('pa-sistolica').value);
        const fc = parseFloat(document.getElementById('freq-cardiaca').value);
        const fr = parseFloat(document.getElementById('freq-respiratoria').value);
        const temp = parseFloat(document.getElementById('temperatura').value);
        const consciencia = parseInt(document.getElementById('consciencia').value);

        // Calcular pontuação total
        const pontuacaoTotal = 
            getScorePAS(pas) + 
            getScoreFC(fc) + 
            getScoreFR(fr) + 
            getScoreTemp(temp) + 
            consciencia;

        // Determinar classificação e classe de cor
        let classificacao = '';
        let classeResultado = '';

        if (pontuacaoTotal >= 5) {
            classificacao = 'Alto Risco - Acionar equipe médica!';
            classeResultado = 'resultado-alto';
        } else if (pontuacaoTotal >= 3) {
            classificacao = 'Risco Intermediário - Aumentar frequência de monitoramento.';
            classeResultado = 'resultado-medio'; // Supondo que você tenha essa classe no CSS
        } else {
            classificacao = 'Baixo Risco - Manter monitoramento de rotina.';
            classeResultado = 'resultado-baixo';
        }

        // Exibir resultado
        resultadoTexto.innerHTML = `
            <strong>Escore MEWS Total: ${pontuacaoTotal}</strong>
            <p>${classificacao}</p>
        `;
        resultadoTexto.className = classeResultado;
        
        // Esconde o formulário e mostra o resultado
        form.style.display = 'none';
        resultadoDiv.style.display = 'block';
    });

    btnRecalcular.addEventListener('click', function() {
        // Esconde o resultado e mostra o formulário novamente
        resultadoDiv.style.display = 'none';
        form.style.display = 'block';

        // Reseta o formulário para os valores padrão
        form.reset();
    });

    // Funções auxiliares para calcular a pontuação de cada parâmetro
    function getScorePAS(valor) {
        if (valor <= 70) return 3;
        if (valor >= 200) return 2;
        if (valor <= 80) return 2;
        if (valor <= 100) return 1;
        return 0; // 101-199
    }

    function getScoreFC(valor) {
        if (valor >= 130) return 3;
        if (valor <= 40) return 2;
        if (valor >= 111) return 2;
        if (valor <= 50) return 1;
        if (valor >= 101) return 1;
        return 0; // 51-100
    }

    function getScoreFR(valor) {
        if (valor >= 30) return 3;
        if (valor < 9) return 2;
        if (valor >= 21) return 2;
        return 0; // 9-20
    }

    function getScoreTemp(valor) {
        if (valor < 35.0) return 2;
        if (valor >= 38.5) return 2;
        return 0; // 35.0-38.4
    }
});