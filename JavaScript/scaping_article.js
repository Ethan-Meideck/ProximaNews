let nombre_article = 0;

async function scrapingArticles() {
    // Récupération des articles via l'API Spaceflight News

    const liste_articles = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12&offset=" + nombre_article);
    const data = await liste_articles.json();
    displayArticles(data.results, "articles_section");

    // Permet d'éviter que les mêmes articles reviennent en boucle
    nombre_article += 12;

    // Vérification de la présence d'article
    if (!data.next) {
        const voirPlusBouton = document.getElementById("voir_plus");
        if (voirPlusBouton) {
            voirPlusBouton.style.display = "none"; // Cache le bouton quand plus d'article
        }
    }
}

function displayArticles(articles, idPage) {
    // Affichage de tous les articles sur la page choisi
    const section = document.getElementById(idPage);
    if (!section) return;

    // Création de la section destiné aux articles
    articles.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.classList.add("mt-4", "mb-4");

        col.innerHTML = `
            <div class="card h-100">
                <img src="${article.image_url}" class="article-img-top" alt="${article.title}">
                <div class="article_corps d-flex flex-column h-100">
                    <h5 class="titre_article">${article.title.substring(0, 100)}...</h5>
                    <p class="texte_article">${article.summary.substring(0, 250)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <a href="${article.url}" target="_blank" class="btn btn-primary mb-2 ms-2">Lire l'article</a>
                        <button class="btn btn-sm btn-warning me-2 star-btn" id="favoris_${article.id}"><i class="bi bi-star-fill"></i></button>
                    </div>
                </div>
            </div>
        `;

        section.appendChild(col);
    });
}

document.addEventListener("DOMContentLoaded", scrapingArticles);

// Relancement de la recherche d'article
const voirPlusBouton = document.getElementById("voir_plus");
if (voirPlusBouton) {
    voirPlusBouton.addEventListener("click", scrapingArticles);
}

export { displayArticles };