import { displayArticles } from "./scaping_article.js";

document.addEventListener("DOMContentLoaded", async function() {
    // Récupération du mot clé de la recherche
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("search");

    if (keyword) {
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?search=" + encodeURIComponent(keyword));
        const data = await response.json();
        displayArticles(data.results, "articles_recherche_section");
    }
});