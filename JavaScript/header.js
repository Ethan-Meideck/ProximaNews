import { displayArticles } from "./scaping_article.js";

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

function updateAuthButton() {
    const session = getSession();
    const bouton  = document.getElementById("boutonConnexion");
    if (!bouton) return;

    const isInComponents = window.location.pathname.includes("/components/");
    const basePath = isInComponents ? "" : "components/";

    if (session) {
        // Remplace le bouton par : [nom d'utilisateur] [Déconnexion]
        bouton.outerHTML = `
            <a href="${basePath}favorites.html" class="btn btn-outline-success btn-sm" id="boutonProfil">
                <i class="bi bi-star-fill me-1"></i>${session.username}
            </a>
            <button class="btn btn-outline-danger btn-sm" id="boutonDeconnexion">
                <i class="bi bi-box-arrow-right"></i>
            </button>
        `;
        document.getElementById("boutonDeconnexion").addEventListener("click", () => {
            if (confirm(`Se déconnecter de "${session.username}" ?`)) {
                logout();
                window.location.href = isInComponents ? "../index.html" : "index.html";
            }
        });
    } else {
        // Non connecté → bouton Connexion
        bouton.textContent = "Connexion";
        bouton.addEventListener("click", () => {
            window.location.href = basePath + "login.html";
        });
    }
}

function getResearchPageUrl(keyword) {
    const encodedKeyword = encodeURIComponent(keyword);
    const currentPath = window.location.pathname;

    // Redirection vers la page souhaité
    if (currentPath.endsWith("research.html")) {
        return `research.html?search=${encodedKeyword}`;
    }
    return `/components/research.html?search=${encodedKeyword}`

}

async function populateCategories() {
    const categories = [
        { label: "NASA",             keyword: "nasa" },
        { label: "SpaceX",           keyword: "spacex" },
        { label: "ESA",              keyword: "esa" },
        { label: "Station Spatiale", keyword: "space station" },
        { label: "Artemis",          keyword: "artemis" },
    ];

    const filtrerMenu = document.getElementById("filterCategories");
    categories.forEach(categorie => {
        const li     = document.createElement("li");
        const bouton = document.createElement("button");
        bouton.type            = "button";
        bouton.textContent     = categorie.label;
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