// Aguarda o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('morse-form');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', function(event) {
        // Impede o recarregamento da página
        event.preventDefault();

        // Para botões de rádio, precisamos encontrar qual está selecionado em cada grupo
        const pontuacaoHistorico = parseInt(document.querySelector('input[name="historico"]:checked').value);
        const pontuacaoDiagnostico = parseInt(document.querySelector('input[name="diagnostico"]:checked').value);
        const pontuacaoAuxilio = parseInt(document.querySelector('input[name="auxilio"]:checked').value);
        const pontuacaoTerapiaEv = parseInt(document.querySelector('input[name="terapia_ev"]:checked').value);
        const pontuacaoMarcha = parseInt(document.querySelector('input[name="marcha"]:checked').value);
        const pontuacaoMental = parseInt(document.querySelector('input[name="mental"]:checked').value);

        // Soma todos os pontos
        const pontuacaoTotal = pontuacaoHistorico + pontuacaoDiagnostico + pontuacaoAuxilio + pontuacaoTerapiaEv + pontuacaoMarcha + pontuacaoMental;

        // Determina a classificação e a cor do resultado
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

        // Exibe o resultado na tela
        resultadoDiv.innerHTML = `
            <strong>Pontuação Total: ${pontuacaoTotal}</strong>
            <p>${classificacao}</p>
        `;

        // Limpa classes de cor antigas e adiciona a nova
        resultadoDiv.className = '';
        resultadoDiv.classList.add(classeResultado);
        
        // Torna a div de resultado visível
        resultadoDiv.style.display = 'block';
    });
});