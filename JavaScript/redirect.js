function getResearchUrl(keyword) {
    const encodedKeyword = encodeURIComponent(keyword);
    const currentPath = window.location.pathname;

    if (currentPath.endsWith("research.html")) {
        return `research.html?search=${encodedKeyword}`;
    }

    return `components/research.html?search=${encodedKeyword}`;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.target.id === "searchInput") {
        const keyword = document.getElementById("searchInput").value.trim();
        if (!keyword) return;
        window.location.href = getResearchUrl(keyword);
    }
});