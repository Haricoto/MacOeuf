document.addEventListener("DOMContentLoaded", () => {
    const finder = document.getElementById("finder");
    const finderMenu = document.getElementById("finder-menu");
    const logoMenu = document.getElementById("logo-menu");
    const logoDropdown = document.getElementById("logo-dropdown");
    const openSettingsButton = document.getElementById("open-settings");
    const modal = document.getElementById("settings-modal");
    const closeModalButton = document.getElementById("close-modal");

    // Gestion des menus déroulants
    finder.addEventListener("click", () => {
        finderMenu.style.display = finderMenu.style.display === "block" ? "none" : "block";
    });

    logoMenu.addEventListener("click", () => {
        logoDropdown.style.display = logoDropdown.style.display === "block" ? "none" : "block";
    });

    // Fermer les menus déroulants en cliquant ailleurs
    document.addEventListener("click", (e) => {
        if (!finder.contains(e.target) && !finderMenu.contains(e.target)) {
            finderMenu.style.display = "none";
        }
        if (!logoMenu.contains(e.target) && !logoDropdown.contains(e.target)) {
            logoDropdown.style.display = "none";
        }
    });

    // Gestion de la fenêtre des paramètres
    openSettingsButton.addEventListener("click", () => {
        modal.style.display = "flex"; // Affiche la modale
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"; // Cache la modale
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Cache la modale si on clique en dehors
        }
    });

    // Mise à jour de l'heure
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        document.getElementById("clock").textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000); // Mise à jour toutes les secondes
    updateClock(); // Initialisation immédiate
});
