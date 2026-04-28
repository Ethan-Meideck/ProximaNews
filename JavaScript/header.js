import { displayArticles } from "./scaping_article.js";

async function loadHeader() {
    try {
        const currentPath = window.location.pathname;
        const headerPath = currentPath.includes("/components/") ? "header.html" : "../components/header.html";
        const response = await fetch(headerPath);
        const headerHTML = await response.text();
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
        popullateCategories();
    } catch (error) {
        console.error("Erreur de chargement du header:", error);
    }
}

function getResearchPageUrl(keyword) {
    const encodedKeyword = encodeURIComponent(keyword);
    const currentPath = window.location.pathname;

    if (currentPath.endsWith("research.html")) {
        return `research.html?search=${encodedKeyword}`;
    }

    return `components/research.html?search=${encodedKeyword}`;
}

async function popullateCategories() {
    const categories = [
        {label:"NASA", keyword:"nasa"},
        {label:"SpaceX", keyword:"spacex"},
        {label:"ESA", keyword:"esa"},
        {label:"Space Station", keyword:"space station"},
        {label:"Artemis", keyword:"artemis"},
    ];

    const filtrerMenu = document.getElementById("filterCategories");
    
    categories.forEach(categorie => {
        const li = document.createElement("li");
        const bouton = document.createElement("button");
        
        bouton.type = "button";
        bouton.textContent = categorie.label;
        bouton.dataset.keyword = categorie.keyword;
        bouton.className = "btn btn-light w-100 text-start border-bottom";
        bouton.addEventListener("click", () => {
            window.location.href = getResearchPageUrl(categorie.keyword);
        });
        
        li.appendChild(bouton);
        filtrerMenu.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadHeader);