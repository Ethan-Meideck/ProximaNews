// Chargement du footer
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const footerHTML = await response.text();

        document.body.insertAdjacentHTML('beforeend', footerHTML);

        // Ajout des catégories
        populateFooterCategories();
    } catch (error) {
        console.error('Erreur de chargement du footer:', error);
    }
}

// Ajouter des catégories
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

document.addEventListener('DOMContentLoaded', loadFooter);