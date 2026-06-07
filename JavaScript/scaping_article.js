let nombre_article = 0;

async function scrapingArticles() {
    const liste_articles = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12&offset=" + nombre_article);
    const data = await liste_articles.json();
    displayArticles(data.results, "articles_section");
    nombre_article += 12;

    if (!data.next) {
        const voirPlusBouton = document.getElementById("voir_plus");
        if (voirPlusBouton) voirPlusBouton.style.display = "none";
    }
}

function displayArticles(articles, idPage) {
    const section = document.getElementById(idPage);
    if (!section) return;

    articles.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4 mt-4 mb-4";

        const estFavori = isFavorite(article.id);

        col.innerHTML = `
            <div class="card h-100">
                <img src="${article.image_url}" class="article-img-top" alt="${article.title}">
                <div class="article_corps d-flex flex-column h-100">
                    <h5 class="titre_article">${article.title.substring(0, 100)}...</h5>
                    <p class="texte_article">${article.summary.substring(0, 250)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <a href="${article.url}" target="_blank" class="btn btn-primary mb-2 ms-2">Lire l'article</a>
                        <button
                            class="btn btn-sm ${estFavori ? "btn-warning" : "btn-outline-warning"} me-2 star-btn"
                            data-id="${article.id}"
                            title="${estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}"
                        ><i class="bi ${estFavori ? "bi-star-fill" : "bi-star"}"></i></button>
                    </div>
                </div>
            </div>
        `;

        col.querySelector(".star-btn").addEventListener("click", function() {
            const resultat = toggleFavorite(article);

            // null = non connecté, la page redirige déjà vers login
            if (resultat === null) return;

            const btn  = this;
            const icon = btn.querySelector("i");

            if (resultat === true) {
                // Article ajouté aux favoris
                btn.classList.replace("btn-outline-warning", "btn-warning");
                icon.classList.replace("bi-star", "bi-star-fill");
                btn.title = "Retirer des favoris";
            } else {
                // Article retiré des favoris
                btn.classList.replace("btn-warning", "btn-outline-warning");
                icon.classList.replace("bi-star-fill", "bi-star");
                btn.title = "Ajouter aux favoris";
            }
        });

        section.appendChild(col);
    });
}

document.addEventListener("DOMContentLoaded", scrapingArticles);

const voirPlusBouton = document.getElementById("voir_plus");
if (voirPlusBouton) {
    voirPlusBouton.addEventListener("click", scrapingArticles);
}

export { displayArticles };
