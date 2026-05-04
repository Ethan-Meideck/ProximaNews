import { displayArticles } from "./scaping_article.js";
import {getResearchUrl} from "./redirect.js";

async function loadHeader() {
    // Permet de charger le header
    try {
        // Permet de charger qu'une seule fois le header
        if (document.getElementById("mainHeader")) return;

        const response = await fetch("/components/header.html");
        const headerHTML = await response.text();
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
        populateCategories();

        document.getElementById("boutonConnexion").addEventListener("click", () => {
            window.location.href = "/components/construction.html";
        });

    } catch (error) {
        console.error("Erreur de chargement du header:", error);
    }
}

function getResearchPageUrl(keyword) {
    // Permet de faire une recherche à l'aide de l'URL
    const encodedKeyword = encodeURIComponent(keyword);
    const currentPath = window.location.pathname;

    // Redirection vers la page souhaité
    if (currentPath.endsWith("research.html")) {
        return `research.html?search=${encodedKeyword}`;
    }
    return `/components/research.html?search=${encodedKeyword}`

}

async function populateCategories() {
    // Ajout des catégories dans le menu burger du header
    const categories = [
        {label:"NASA", keyword:"nasa"},
        {label:"SpaceX", keyword:"spacex"},
        {label:"ESA", keyword:"esa"},
        {label:"Station Spatiale", keyword:"space station"},
        {label:"Artemis", keyword:"artemis"},
    ];

    const filtrerMenu = document.getElementById("filterCategories");
    
    // Création d'un bouton intégré dans une liste pour chaque catégorie
    categories.forEach(categorie => {
        const li = document.createElement("li");
        const bouton = document.createElement("button");
        
        bouton.type = "button";
        bouton.textContent = categorie.label;
        bouton.dataset.keyword = categorie.keyword;
        bouton.className = "btn btn-light w-100 text-start border-bottom";

        // Redirection vers la recherche effectué
        bouton.addEventListener("click", () => {
            window.location.href = getResearchPageUrl(categorie.keyword);
        });
        
        li.appendChild(bouton);
        filtrerMenu.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadHeader);