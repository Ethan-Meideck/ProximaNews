async function loadFooter() {
    try {
        const footerPath = '../components/footer.html';
        const response = await fetch(footerPath);
        const footerHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        populateFooterCategories(); // Appelé après que le footer est inséré
    } catch (error) {
        console.error('Erreur de chargement du footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFooter); // Une seule fois