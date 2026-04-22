document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.id === 'searchInput') {
        reasearch();
    }
});

async function reasearch() {
    const keyword = document.getElementById('searchInput').value;
    if (keyword.trim() !== '') {
        window.location.href = "components/research.html?search=" + encodeURIComponent(keyword);
    }
}