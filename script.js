document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DO MODO NOTURNO (Bootstrap 5.3) ---
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const html = document.documentElement;
  const icon = darkModeToggle.querySelector("i");

  function setTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      icon.classList.remove("bi-moon-stars-fill");
      icon.classList.add("bi-sun-fill");
    } else {
      icon.classList.remove("bi-sun-fill");
      icon.classList.add("bi-moon-stars-fill");
    }
  }

  // Check Local Storage or System Preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(systemPrefersDark ? "dark" : "light");
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-bs-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // --- LÓGICA DA BUSCA ---
  const searchBox = document.getElementById("search-box");
  const cards = document.querySelectorAll(".card[data-title]");

  searchBox.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    cards.forEach((card) => {
      const title = card.dataset.title.toLowerCase();
      const col = card.closest(".escala-item"); // Encontra a coluna pai

      if (title.includes(searchTerm)) {
        col.classList.remove("d-none");
      } else {
        col.classList.add("d-none");
      }
    });
  });

  // --- LÓGICA DO MODAL DE INFORMAÇÕES (Bootstrap Event) ---
  const infoModal = document.getElementById("infoModal");
  if (infoModal) {
    infoModal.addEventListener("show.bs.modal", (event) => {
      // Botão que acionou o modal
      const button = event.relatedTarget;
      // Extrai a info do atributo data-*
      const infoId = button.getAttribute("data-info-id");
      const contentSource = document.getElementById(infoId);

      // Atualiza o corpo do modal
      const modalBody = infoModal.querySelector(".modal-body");
      if (contentSource) {
        modalBody.innerHTML = contentSource.innerHTML;
      } else {
        modalBody.innerHTML = "<p>Informações não disponíveis.</p>";
      }
    });
  }

  // --- REGISTRO DO SERVICE WORKER (PWA) ---
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) =>
          console.log(
            "ServiceWorker registrado com sucesso:",
            registration.scope
          )
        )
        .catch((error) =>
          console.log("Falha ao registrar o ServiceWorker:", error)
        );
    });
  }
});
