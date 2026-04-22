async function loadHeader() {
    try {
        const headerPath = '../components/header.html';
        const response = await fetch(headerPath);
        const headerHTML = await response.text();
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    } catch (error) {
        console.error('Erreur de chargement du header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);