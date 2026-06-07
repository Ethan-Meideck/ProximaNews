async function loadFooter() {
    try {
        const inComponents = window.location.pathname.includes("/components/");
        const footerPath = inComponents ? "footer.html" : "../components/footer.html";
        const response = await fetch(footerPath);
        const footerHTML = await response.text();
        document.body.insertAdjacentHTML("beforeend", footerHTML);
        updateFooterAuth();
    } catch (error) {
        console.error("Erreur de chargement du footer:", error);
    }
}

function updateFooterAuth() {
    const session = getSession();
    const compteUl = document.getElementById("footerCompte");
    const inComponents = window.location.pathname.includes("/components/");
    const basePath = inComponents ? "" : "components/";

    if (session) {
        compteUl.innerHTML = `
            <li>
                <a href="${basePath}favorites.html" class="text-light text-decoration-none">
                    ⭐ Mes favoris
                </a>
            </li>
            <li>
                <a href="#" class="text-light text-decoration-none" id="footerLogout">
                    Déconnexion (${session.username})
                </a>
            </li>
        `;
        document.getElementById("footerLogout").addEventListener("click", (e) => {
            e.preventDefault();
            logout();
            window.location.href = inComponents ? "../index.html" : "index.html";
        });
    } else {
        compteUl.innerHTML = `
            <li>
                <a href="${basePath}login.html" class="text-light text-decoration-none">Connexion</a>
            </li>
            <li>
                <a href="${basePath}register.html" class="text-light text-decoration-none">Inscription</a>
            </li>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadFooter);