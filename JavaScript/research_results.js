import { displayArticles } from "scaping_article.js";

async function displaySearchResults() {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('search');

    if (!keyword) {
        document.getElementById('articles__recherche_section').innerHTML = '<p>Aucun terme de recherche fourni.</p>';
        return;
    }

    try {
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?search=" + keyword);
        const data = await response.json();
        
        if (data.results.length === 0) {
            document.getElementById('articles__recherche_section').innerHTML = '<p>Aucun résultat trouvé pour votre recherche.</p>';
        } else {
            displayArticles(data.results, "articles__recherche_section");
        }
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        document.getElementById('articles__recherche_section').innerHTML = '<p>Une erreur est survenue lors de la recherche.</p>';
    }
}

document.addEventListener('DOMContentLoaded', displaySearchResults);
