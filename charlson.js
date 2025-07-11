document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('charlson-form');
    const resultadoDiv = document.getElementById('resultado');
    const calculadoraContainer = document.querySelector('.calculadora-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // --- Lógica de Cálculo ---
        let score = 0;
        const idade = parseInt(document.getElementById('idade').value);

        // Pontuação por idade
        if (idade >= 50 && idade <= 59) score += 1;
        else if (idade >= 60 && idade <= 69) score += 2;
        else if (idade >= 70 && idade <= 79) score += 3;
        else if (idade >= 80) score += 4;

        // Pontuação por comorbidades
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            score += parseInt(checkbox.value);
        });

        // Estimativa de sobrevida (exemplo)
        const sobrevidaEstimada = {
            0: '98%', 1: '96%', 2: '90%', 3: '77%', 4: '53%', 5: '21%',
        };
        // Para scores > 5, a estimativa é geralmente muito baixa
        const sobrevida = score <= 5 ? sobrevidaEstimada[score] : '< 21%';

        // --- Exibição do Resultado ---
        resultadoDiv.innerHTML = `
            <h3>Resultado do Índice</h3>
            <p><strong>Escore de Charlson:</strong> ${score}</p>
            <p><strong>Estimativa de Sobrevida em 10 Anos:</strong> ${sobrevida}</p>
            <button type="button" id="btn-recalcular" class="btn-recalcular">Calcular Novamente</button>
        `;
        resultadoDiv.style.display = 'block';

        // --- Funcionalidade do Botão "Calcular Novamente" ---
        const btnRecalcular = document.getElementById('btn-recalcular');
        btnRecalcular.addEventListener('click', function() {
            // Limpa o formulário
            form.reset();
            // Esconde a div de resultados
            resultadoDiv.style.display = 'none';
            resultadoDiv.innerHTML = '';
            // Rola a tela de volta para o topo da calculadora
            calculadoraContainer.scrollIntoView({ behavior: 'smooth' });
        });

        // Rola para ver o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    });
});