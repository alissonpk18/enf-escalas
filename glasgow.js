// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // Pega os elementos do formulário e do local de resultado
    const form = document.getElementById('glasgow-form');
    const resultadoDiv = document.getElementById('resultado');

    // Adiciona um "ouvinte" para o evento de envio do formulário
    form.addEventListener('submit', function(event) {
        // Impede que o formulário recarregue a página (comportamento padrão)
        event.preventDefault();

        // Pega os valores selecionados em cada campo e converte para número
        const pontuacaoOcular = parseInt(document.getElementById('ocular').value);
        const pontuacaoVerbal = parseInt(document.getElementById('verbal').value);
        const pontuacaoMotora = parseInt(document.getElementById('motora').value);

        // Soma os pontos para obter o total
        const pontuacaoTotal = pontuacaoOcular + pontuacaoVerbal + pontuacaoMotora;

        // Determina a classificação e a cor do resultado com base na pontuação
        let classificacao = '';
        let classeResultado = '';

        if (pontuacaoTotal >= 13) {
            classificacao = 'Trauma Leve';
            classeResultado = 'resultado-leve';
        } else if (pontuacaoTotal >= 9) {
            classificacao = 'Trauma Moderado';
            classeResultado = 'resultado-moderado';
        } else { // pontuacaoTotal <= 8
            classificacao = 'Trauma Grave';
            classeResultado = 'resultado-grave';
        }

        // Atualiza a div de resultado com a pontuação e a classificação
        resultadoDiv.innerHTML = `
            <strong>Pontuação Total: ${pontuacaoTotal}</strong>
            <p>${classificacao}</p>
        `;

        // Remove classes de cor anteriores e adiciona a nova
        resultadoDiv.className = ''; // Limpa classes existentes
        resultadoDiv.classList.add(classeResultado);

        // Torna a div de resultado visível
        resultadoDiv.style.display = 'block';
    });

});