document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.target.id === "searchInput") {
        const keyword = document.getElementById("searchInput").value;
        window.location.href = "../components/research.html?search=" + encodeURIComponent(keyword);
    }
});