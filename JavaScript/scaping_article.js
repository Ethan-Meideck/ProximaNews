let nombre_article = 0;

async function scrapingArticles() {
    const liste_articles = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12" + "&offset=" + nombre_article);
    const data = await liste_articles.json();
    displayArticles(data.results, "articles_section");

    nombre_article += 12;

    if (!data.next) {
       document.getElementById('voir_plus').style.display = 'none';
    }
}

function displayArticles(articles, idPage) {
    const section = document.getElementById(idPage);

    articles.forEach(article => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.classList.add('mt-4', 'mb-4');

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

document.addEventListener('DOMContentLoaded', scrapingArticles);
document.getElementById('voir_plus').addEventListener('click', scrapingArticles);
export { displayArticles };