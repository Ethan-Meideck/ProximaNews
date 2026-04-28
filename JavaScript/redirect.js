function getResearchUrl(keyword) {
    // Permet de rediriger vers la page recherché
    const encodedKeyword = encodeURIComponent(keyword);
    const currentPath = window.location.pathname;

    // Permet d'éviter les injections en vérifiant la fin de la page
    if (currentPath.endsWith("research.html")) {
        return `components/research.html?search=${encodedKeyword}`;
    }
}

// Permet la recherche depuis la barre de recherche
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.target.id === "searchInput") {
        const keyword = document.getElementById("searchInput").value.trim();
        if (!keyword) return;
        window.location.href = getResearchUrl(keyword);
    }
});

export {getResearchUrl};