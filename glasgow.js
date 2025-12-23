document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('glasgow-form');
    // Outer container for visibility control
    const resultadoContainer = document.getElementById('resultado');
    // Alert info
    const scoreDisplay = document.getElementById('score-display');
    const msgDisplay = document.getElementById('msg-display');
    const alertBox = document.getElementById('alert-resultado');

    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const pontuacaoOcular = parseInt(document.getElementById('ocular').value);
        const pontuacaoVerbal = parseInt(document.getElementById('verbal').value);
        const pontuacaoMotora = parseInt(document.getElementById('motora').value);

        if (isNaN(pontuacaoOcular) || isNaN(pontuacaoVerbal) || isNaN(pontuacaoMotora)) {
            return; // Should be handled by 'required' attribute, but safety first
        }

        const pontuacaoTotal = pontuacaoOcular + pontuacaoVerbal + pontuacaoMotora;

        let classificacao = '';
        let alertClass = '';

        // Classification Logic
        if (pontuacaoTotal >= 13) {
            classificacao = 'Trauma Leve';
            alertClass = 'alert-success';
        } else if (pontuacaoTotal >= 9) {
            classificacao = 'Trauma Moderado';
            alertClass = 'alert-warning';
        } else {
            classificacao = 'Trauma Grave';
            alertClass = 'alert-danger';
        }

        // Update Text
        scoreDisplay.textContent = `Pontuação Total: ${pontuacaoTotal}`;
        msgDisplay.textContent = classificacao;

        // Reset and Set Alert Class
        alertBox.className = 'alert'; // Keep base class
        alertBox.classList.add(alertClass);

        // Show Result
        resultadoContainer.classList.remove('d-none');
        
        // Scroll to result (optional, good for mobile)
        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});