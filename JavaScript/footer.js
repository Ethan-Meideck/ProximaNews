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

function populateFooterCategories() {
    const categories = [];
    const footerCategoriesList = document.getElementById('footerCategories');
    if (footerCategoriesList) {
        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'text-light text-decoration-none';
            a.textContent = category;
            li.appendChild(a);
            footerCategoriesList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadFooter); // Une seule fois