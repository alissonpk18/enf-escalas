document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('braden-form');
    const calcularBtn = document.getElementById('calcular-braden');
    const recalcularBtn = document.getElementById('recalcular-braden');
    const resultadoDiv = document.getElementById('resultado'); // Outer Container
    const resultadoAlertBox = document.getElementById('resultado-alert-box'); // Bootstrap Alert

    if (!form) return;

    calcularBtn.addEventListener('click', function() {
        const percepcao = parseInt(document.getElementById('percepcao_sensorial').value);
        const umidade = parseInt(document.getElementById('umidade').value);
        const atividade = parseInt(document.getElementById('atividade').value);
        const mobilidade = parseInt(document.getElementById('mobilidade').value);
        const nutricao = parseInt(document.getElementById('nutricao').value);
        const friccao = parseInt(document.getElementById('friccao_cisalhamento').value);

        if (isNaN(percepcao) || isNaN(umidade) || isNaN(atividade) || isNaN(mobilidade) || isNaN(nutricao) || isNaN(friccao)) {
            // Using Bootstrap Modal or simple alert
            alert('Por favor, selecione uma opção para todos os 6 critérios.');
            return;
        }

        const escoreTotal = percepcao + umidade + atividade + mobilidade + nutricao + friccao;

        let nivelRisco = '';
        let alertClass = '';
        let interpretacao = '';

        if (escoreTotal >= 15) { // 15-18 or 15-23 depending on scale version (usually max 23)
            nivelRisco = 'Risco Baixo (Leve)';
            alertClass = 'alert-success';
            interpretacao = 'Implementar cuidados preventivos básicos.';
        } else if (escoreTotal >= 13) { // 13-14
            nivelRisco = 'Risco Moderado';
            alertClass = 'alert-warning';
            interpretacao = 'Plano de cuidados preventivo padrão e reposicionamento.';
        } else if (escoreTotal >= 10) { // 10-12
            nivelRisco = 'Risco Alto';
            alertClass = 'alert-danger'; // Orange usually but danger works for attention
            interpretacao = 'Intervenções intensificadas e monitoramento frequente.';
        } else { // <= 9
            nivelRisco = 'Risco Muito Alto';
            alertClass = 'alert-danger';
            interpretacao = 'Plano agressivo de prevenção e superfícies especiais.';
        }

        const resultadoTexto = document.getElementById('resultado-texto');
        if (resultadoTexto) {
             resultadoTexto.innerHTML = `
                <h2 class="mb-2 fw-bold">${escoreTotal} Pontos</h2>
                <h4 class="mb-3">${nivelRisco}</h4>
                <p class="mb-0 small">${interpretacao}</p>
            `;
        }

        // Reset classes
        resultadoAlertBox.className = `alert ${alertClass}`;

        // Toggle visibility
        form.classList.add('d-none');
        resultadoDiv.style.display = 'block';
        recalcularBtn.style.display = 'inline-block';
    });

    recalcularBtn.addEventListener('click', function() {
        form.reset();
        form.classList.remove('d-none');
        resultadoDiv.style.display = 'none';
        recalcularBtn.style.display = 'none';
    });
});