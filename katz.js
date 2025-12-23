document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('katz-form');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultado-texto');
    const btnRecalcular = document.getElementById('btn-recalcular');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Calcula o total de pontos (soma dos valores 'dependentes')
        const formData = new FormData(form);
        let pontuacao = 0;
        for (let value of formData.values()) {
            pontuacao += parseInt(value, 10);
        }

        // Determina a interpretação e a classe CSS com base na pontuação
        let interpretacao = '';
        let classeResultado = '';

        if (pontuacao === 0) {
            interpretacao = '<strong>Independência Total (6/6)</strong><p>O paciente é independente em todas as 6 atividades.</p>';
            classeResultado = 'resultado-leve';
        } else if (pontuacao <= 2) {
            interpretacao = `<strong>Dependência Leve (${6 - pontuacao}/6)</strong><p>O paciente é dependente em ${pontuacao} atividade(s).</p>`;
            classeResultado = 'resultado-leve';
        } else if (pontuacao <= 4) {
            interpretacao = `<strong>Dependência Moderada (${6 - pontuacao}/6)</strong><p>O paciente é dependente em ${pontuacao} atividades.</p>`;
            classeResultado = 'resultado-medio';
        } else {
            interpretacao = `<strong>Dependência Grave/Total (${6 - pontuacao}/6)</strong><p>O paciente é dependente em ${pontuacao} atividades.</p>`;
            classeResultado = 'resultado-grave';
        }

        // Exibe o resultado
        resultadoTexto.innerHTML = interpretacao;
        resultadoTexto.className = classeResultado; // Aplica a classe de cor

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

});