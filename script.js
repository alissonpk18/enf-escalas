document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODO NOTURNO ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            darkModeToggle.textContent = '🌙';
        }
    });

    // --- LÓGICA DA BUSCA ---
    const searchBox = document.getElementById('search-box');
    const escalaCards = document.querySelectorAll('.escala-card');

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        escalaCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            if (title.includes(searchTerm)) {
                card.parentElement.style.display = 'block'; // Mostra a seção que contém o card
            } else {
                card.parentElement.style.display = 'none'; // Esconde a seção
            }
        });
    });

    // --- LÓGICA DO MODAL DE INFORMAÇÕES ---
    const infoModal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const infoId = button.dataset.infoId;
            const content = document.getElementById(infoId);
            if (content) {
                modalBody.innerHTML = content.innerHTML;
                infoModal.style.display = 'flex';
            }
        });
    });

    const closeModal = () => {
        infoModal.style.display = 'none';
        modalBody.innerHTML = '';
    };

    modalCloseBtn.addEventListener('click', closeModal);
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            closeModal();
        }
    });

    // --- REGISTRO DO SERVICE WORKER (PWA) ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => console.log('ServiceWorker registrado com sucesso:', registration.scope))
                .catch(error => console.log('Falha ao registrar o ServiceWorker:', error));
        });
    }
});
