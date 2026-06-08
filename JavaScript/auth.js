/* ══════════════════════════════════════════
   auth.js — Fonctions partagées
   Base de données : localStorage (JSON)

   Clés localStorage :
   - "pn_users"          → tableau des comptes
   - "pn_session"        → utilisateur connecté
   - "pn_favs_[email]"   → favoris par utilisateur
══════════════════════════════════════════ */

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── Utilisateurs ──
function getUsers() {
    return JSON.parse(localStorage.getItem("pn_users") || "[]");
}
function saveUsers(users) {
    localStorage.setItem("pn_users", JSON.stringify(users));
}

// ── Session ──
function getSession() {
    return JSON.parse(localStorage.getItem("pn_session") || "null");
}
function saveSession(user) {
    localStorage.setItem("pn_session", JSON.stringify(user));
}
function logout() {
    localStorage.removeItem("pn_session");
}

// ── Favoris ──
function getFavorites() {
    const session = getSession();
    if (!session) return [];
    return JSON.parse(localStorage.getItem("pn_favs_" + session.email) || "[]");
}

function saveFavorites(favs) {
    const session = getSession();
    if (!session) return;
    localStorage.setItem("pn_favs_" + session.email, JSON.stringify(favs));
}

// Comparaison en string pour éviter les erreurs de type (int vs string)
function isFavorite(articleId) {
    return getFavorites().some(f => String(f.id) === String(articleId));
}

function toggleFavorite(article) {
    const session = getSession();
    if (!session) {
        // null = non connecté → redirige vers login
        const inComponents = window.location.pathname.includes("/components/");
        window.location.href = inComponents ? "login.html" : "components/login.html";
        return null;
    }

    const favs  = getFavorites();
    const index = favs.findIndex(f => String(f.id) === String(article.id));

    if (index >= 0) {
        favs.splice(index, 1); // Retirer
        saveFavorites(favs);
        return false;          // false = retiré
    } else {
        favs.push(article);    // Ajouter
        saveFavorites(favs);
        return true;           // true = ajouté
    }
}

// ── Erreur formulaire ──
function showFormError(message) {
    let alert = document.getElementById("formAlert");
    if (!alert) {
        alert = document.createElement("div");
        alert.id = "formAlert";
        alert.className = "alert alert-danger mt-3";
        document.querySelector(".needs-validation").appendChild(alert);
    }
    alert.textContent = message;
}
