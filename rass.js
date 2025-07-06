document.addEventListener('DOMContentLoaded', function() {
    
    const tabela = document.getElementById('rass-table');

    // Verifica se a tabela existe na página
    if (tabela) {
        const linhas = tabela.querySelectorAll('tbody tr');

        // Adiciona um "ouvinte" de clique para cada linha da tabela
        linhas.forEach(linha => {
            linha.addEventListener('click', function() {
                
                // Primeiro, remove a classe 'selected' de qualquer outra linha que a tenha
                const linhaSelecionadaAnteriormente = tabela.querySelector('tr.selected');
                if (linhaSelecionadaAnteriormente) {
                    linhaSelecionadaAnteriormente.classList.remove('selected');
                }

                // Adiciona a classe 'selected' à linha que foi clicada
                this.classList.add('selected');
            });
        });
    }
});