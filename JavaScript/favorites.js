/* ══════════════════════════════════════════
   favorites.js — Page des favoris
══════════════════════════════════════════ */

function loadFavorites() {
    const session = getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }

    afficherArticles();
    initialiserBoutons(session);
}

function afficherArticles() {
    const favs    = getFavorites();
    const section = document.getElementById("favoris_section");
    const vide    = document.getElementById("aucunFavori");

    section.innerHTML = "";

    if (favs.length === 0) {
        vide.style.display = "block";
        mettreAJourJSON();
        return;
    }

    vide.style.display = "none";

    favs.forEach(article => {
        const col  = document.createElement("div");
        col.className = "col-md-4 mt-4 mb-4";

        const date = article.published_at
            ? new Date(article.published_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
            : "";

        col.innerHTML = `
            <div class="card h-100">
                <img src="${article.image_url || ""}" class="article-img-top" alt="${article.title}"
                     onerror="this.style.display='none'">
                <div class="article_corps d-flex flex-column h-100">
                    <span class="badge bg-secondary mb-1" style="width:fit-content">${article.news_site || ""}</span>
                    <h5 class="titre_article">${article.title.substring(0, 100)}...</h5>
                    <p class="texte_article">${(article.summary || "").substring(0, 250)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <small class="text-muted ms-2">${date}</small>
                        <div class="d-flex gap-1 me-2">
                            <a href="${article.url}" target="_blank" class="btn btn-primary btn-sm mb-2">Lire</a>
                            <button class="btn btn-warning btn-sm mb-2 btn-retirer" data-id="${article.id}" title="Retirer des favoris">
                                <i class="bi bi-star-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        col.querySelector(".btn-retirer").addEventListener("click", function() {
            toggleFavorite(article);   // Retire de localStorage
            col.remove();              // Retire la carte de la page
            mettreAJourJSON();         // Met à jour l'affichage JSON

            if (getFavorites().length === 0) {
                document.getElementById("aucunFavori").style.display = "block";
            }
        });

        section.appendChild(col);
    });

    mettreAJourJSON();
}

// Met à jour le bloc JSON visible sur la page
function mettreAJourJSON() {
    const bloc = document.getElementById("jsonViewer");
    if (!bloc) return;
    const favs = getFavorites();
    bloc.textContent = JSON.stringify(favs, null, 2);
}

function initialiserBoutons(session) {
    // Export JSON → télécharge le fichier
    document.getElementById("btnExportJSON").addEventListener("click", () => {
        const json = JSON.stringify(getFavorites(), null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = `favoris_${session.username}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    // Vider tous les favoris
    document.getElementById("btnViderFavoris").addEventListener("click", () => {
        if (!confirm("Supprimer tous vos favoris ?")) return;
        saveFavorites([]);
        afficherArticles();
    });

    // Afficher / masquer le viewer JSON
    document.getElementById("btnToggleJSON").addEventListener("click", function() {
        const panel = document.getElementById("jsonPanel");
        const visible = panel.style.display !== "none";
        panel.style.display = visible ? "none" : "block";
        this.textContent = visible ? "{ } Voir le JSON" : "{ } Masquer le JSON";
    });
}

document.addEventListener("DOMContentLoaded", loadFavorites);
