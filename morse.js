document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('morse-form');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultado-texto');
    const btnRecalcular = document.getElementById('btn-recalcular');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os valores dos campos do formulário
        const pontuacaoHistorico = parseInt(document.querySelector('input[name="historico"]:checked').value);
        const pontuacaoDiagnostico = parseInt(document.querySelector('input[name="diagnostico"]:checked').value);
        const pontuacaoAuxilio = parseInt(document.querySelector('input[name="auxilio"]:checked').value);
        const pontuacaoTerapiaEv = parseInt(document.querySelector('input[name="terapia_ev"]:checked').value);
        const pontuacaoMarcha = parseInt(document.querySelector('input[name="marcha"]:checked').value);
        const pontuacaoMental = parseInt(document.querySelector('input[name="mental"]:checked').value);

        // Somar todos os pontos
        const pontuacaoTotal = pontuacaoHistorico + pontuacaoDiagnostico + pontuacaoAuxilio + pontuacaoTerapiaEv + pontuacaoMarcha + pontuacaoMental;

        // Determinar a classificação e a cor do resultado
        let classificacao = '';
        let classeResultado = '';

        if (pontuacaoTotal >= 45) {
            classificacao = 'Alto Risco de Queda';
            classeResultado = 'resultado-alto';
        } else if (pontuacaoTotal >= 25) {
            classificacao = 'Risco Médio de Queda';
            classeResultado = 'resultado-medio';
        } else { // pontuacaoTotal <= 24
            classificacao = 'Baixo Risco de Queda';
            classeResultado = 'resultado-baixo';
        }

        // Exibir o resultado no contêiner de texto
        resultadoTexto.innerHTML = `
            <strong>Pontuação Total: ${pontuacaoTotal}</strong>
            <p>${classificacao}</p>
        `;
        resultadoTexto.className = classeResultado;

        // Ocultar o formulário e exibir a área de resultado
        form.style.display = 'none';
        resultadoDiv.style.display = 'block';
    });

    btnRecalcular.addEventListener('click', function() {
        // Ocultar a área de resultado e exibir o formulário novamente
        resultadoDiv.style.display = 'none';
        form.style.display = 'block';

        // Limpar as seleções do formulário
        form.reset();
    });
});