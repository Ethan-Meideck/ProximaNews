// Load header component
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const headerHTML = await response.text();

        // Insert le header juste après le début du body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    } catch (error) {
        console.error('Erreur de chargement du header:', error);
    }
}

// Charge le header une fois que le DOM est prêt
document.addEventListener('DOMContentLoaded', loadHeader);