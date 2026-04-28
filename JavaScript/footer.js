async function loadFooter() {
    // Chargement du footer
    try {
        const footerPath = "../components/footer.html";
        const response = await fetch(footerPath);
        const footerHTML = await response.text();
        document.body.insertAdjacentHTML("beforeend", footerHTML);

    } catch (error) {
        console.error("Erreur de chargement du footer:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadFooter);