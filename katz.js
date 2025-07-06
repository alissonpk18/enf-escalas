document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('katz-form');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Conta quantos itens foram marcados como 'Dependente' (valor "1")
        const dependencias = 
            parseInt(document.querySelector('input[name="banho"]:checked').value) +
            parseInt(document.querySelector('input[name="vestir"]:checked').value) +
            parseInt(document.querySelector('input[name="higiene"]:checked').value) +
            parseInt(document.querySelector('input[name="transferencia"]:checked').value) +
            parseInt(document.querySelector('input[name="continencia"]:checked').value) +
            parseInt(document.querySelector('input[name="alimentacao"]:checked').value);

        // Determina a classificação e a classe de cor
        let classificacao = '';
        let classeResultado = '';

        switch(dependencias) {
            case 0:
                classificacao = 'A - Independente em todas as 6 funções.';
                classeResultado = 'resultado-baixo';
                break;
            case 1:
                classificacao = 'B - Dependente em 1 função.';
                classeResultado = 'resultado-baixo';
                break;
            case 2:
                classificacao = 'C - Dependente em 2 funções.';
                classeResultado = 'resultado-medio';
                break;
            case 3:
                classificacao = 'D - Dependente em 3 funções.';
                classeResultado = 'resultado-medio';
                break;
            case 4:
                classificacao = 'E - Dependente em 4 funções.';
                classeResultado = 'resultado-alto';
                break;
            case 5:
                classificacao = 'F - Dependente em 5 funções.';
                classeResultado = 'resultado-alto';
                break;
            case 6:
                classificacao = 'G - Dependente em todas as 6 funções.';
                classeResultado = 'resultado-alto';
                break;
            default:
                classificacao = 'Erro no cálculo. Verifique as seleções.';
                classeResultado = 'resultado-alto';
        }

        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <strong>Índice de Katz: ${classificacao.substring(0, 1)}</strong>
            <p>${classificacao.substring(4)}</p>
        `;
        resultadoDiv.className = '';
        resultadoDiv.classList.add(classeResultado);
        resultadoDiv.style.display = 'block';
    });
});