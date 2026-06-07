/* ══════════════════════════════════════════
   login.js — Connexion
   Vérifie les identifiants dans localStorage
══════════════════════════════════════════ */

function loadLogin() {
    "use strict";
    const form = document.querySelector(".needs-validation");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        event.stopPropagation();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        let isValid = true;

        if (!email) {
            document.getElementById("email").classList.add("is-invalid");
            isValid = false;
        }
        if (!password) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("passwordError").textContent = "Le mot de passe est requis.";
            isValid = false;
        }
        if (!isValid) return;

        // Recherche de l'utilisateur dans localStorage
        const users        = getUsers();
        const passwordHash = await sha256(password);
        const user         = users.find(u => u.email === email && u.passwordHash === passwordHash);

        if (!user) {
            showFormError("Email ou mot de passe incorrect.");
            return;
        }

        // Sauvegarde la session et redirige vers l'accueil
        saveSession({ username: user.username, email: user.email });
        window.location.href = "../index.html";
    });

    // Retire l'invalidité quand l'utilisateur modifie un champ
    ["email", "password"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => el.classList.remove("is-invalid"));
    });
}

document.addEventListener("DOMContentLoaded", loadLogin);
