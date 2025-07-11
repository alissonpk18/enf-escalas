document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do DOM
    const form = document.getElementById('braden-form');
    const calcularBtn = document.getElementById('calcular-braden');
    const recalcularBtn = document.getElementById('recalcular-braden');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTextoDiv = document.getElementById('resultado-texto');

    // Adiciona o evento de clique ao botão de calcular
    calcularBtn.addEventListener('click', function() {
        // Pega os valores de todos os campos <select>
        const percepcao = parseInt(document.getElementById('percepcao_sensorial').value);
        const umidade = parseInt(document.getElementById('umidade').value);
        const atividade = parseInt(document.getElementById('atividade').value);
        const mobilidade = parseInt(document.getElementById('mobilidade').value);
        const nutricao = parseInt(document.getElementById('nutricao').value);
        const friccao = parseInt(document.getElementById('friccao_cisalhamento').value);

        // Validação simples para garantir que todos os campos foram preenchidos
        if (isNaN(percepcao) || isNaN(umidade) || isNaN(atividade) || isNaN(mobilidade) || isNaN(nutricao) || isNaN(friccao)) {
            alert('Por favor, selecione uma opção para todos os 6 critérios.');
            return;
        }

        // Calcula o escore total
        const escoreTotal = percepcao + umidade + atividade + mobilidade + nutricao + friccao;

        // Determina o nível de risco e a interpretação
        let nivelRisco = '';
        let classeResultado = '';
        let interpretacao = '';

        if (escoreTotal >= 15 && escoreTotal <= 18) {
            nivelRisco = 'Risco Leve';
            classeResultado = 'resultado-leve';
            interpretacao = 'Indica baixo risco. Recomenda-se implementar um plano de cuidados preventivo básico.';
        } else if (escoreTotal >= 13 && escoreTotal <= 14) {
            nivelRisco = 'Risco Moderado';
            classeResultado = 'resultado-medio';
            interpretacao = 'Indica risco moderado. Recomenda-se um plano de cuidados preventivo padrão.';
        } else if (escoreTotal >= 10 && escoreTotal <= 12) {
            nivelRisco = 'Risco Alto';
            classeResultado = 'resultado-grave';
            interpretacao = 'Indica risco elevado. Requer intervenções preventivas intensificadas e monitoramento frequente.';
        } else if (escoreTotal <= 9) {
            nivelRisco = 'Risco Muito Alto';
            classeResultado = 'resultado-grave';
            interpretacao = 'Indica risco muito elevado. Necessita de um plano de cuidados agressivo e especializado para prevenção de LPP.';
        }

        // Exibe o resultado
        resultadoTextoDiv.innerHTML = `
            <p style="margin:0; font-size: 1.2rem;">Escore Total:</p>
            <strong style="font-size: 2.5rem; display: block;">${escoreTotal}</strong>
            <p style="font-weight: bold;">${nivelRisco}</p>
            <p style="font-size: 1rem; max-width: 600px; margin: 0 auto;">${interpretacao}</p>
        `;
        
        // Remove classes de resultado anteriores e adiciona a nova
        resultadoTextoDiv.classList.remove('resultado-leve', 'resultado-medio', 'resultado-grave');
        resultadoTextoDiv.classList.add(classeResultado);

        // Oculta o formulário e o botão de calcular
        form.style.display = 'none';

        // Mostra a div de resultado e o botão de recalcular
        resultadoDiv.style.display = 'block';
        recalcularBtn.style.display = 'block';
    });

    // Adiciona o evento de clique ao botão de recalcular
    recalcularBtn.addEventListener('click', function() {
        // Reseta o formulário
        form.reset();

        // Mostra o formulário novamente
        form.style.display = 'block';

        // Oculta a div de resultado e o botão de recalcular
        resultadoDiv.style.display = 'none';
        recalcularBtn.style.display = 'none';

        // Limpa o texto do resultado
        resultadoTextoDiv.innerHTML = '';
        resultadoTextoDiv.classList.remove('resultado-leve', 'resultado-medio', 'resultado-grave');
    });
});