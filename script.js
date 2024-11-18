   document.getElementById("searchInput").addEventListener("input", function () {
        const searchValue = this.value.trim().toLowerCase(); // Récupère et normalise la valeur de recherche
        const narutoCard = document.getElementById("narutoCard"); // Cible la carte Naruto

        // Vérifie si "naruto" est dans le champ de recherche
        if (searchValue === "naruto") {
            narutoCard.style.display = "block"; // Affiche la carte
        } else {
            narutoCard.style.display = "none"; // Cache la carte
        }
    });

