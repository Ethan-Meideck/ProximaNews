/* ══════════════════════════════════════════
   register.js — Inscription
   Sauvegarde le compte dans localStorage
══════════════════════════════════════════ */

function loadRegister() {
    "use strict";
    const form = document.querySelector(".needs-validation");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        event.stopPropagation();

        const username        = document.getElementById("username").value.trim();
        const email           = document.getElementById("email").value.trim();
        const password        = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        let isValid = true;

        // Vérification des champs
        if (!username) {
            document.getElementById("username").classList.add("is-invalid");
            isValid = false;
        }
        if (!email) {
            document.getElementById("email").classList.add("is-invalid");
            isValid = false;
        }
        if (!password || password.length < 8) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("passwordError").textContent = password
                ? "Le mot de passe doit faire au moins 8 caractères."
                : "Le mot de passe est requis.";
            isValid = false;
        }
        if (password !== confirmPassword) {
            document.getElementById("confirmPassword").classList.add("is-invalid");
            document.getElementById("passwordErrorConfirm").textContent = "Les mots de passe ne correspondent pas.";
            isValid = false;
        }
        if (!isValid) return;

        // Vérifie si l'email est déjà utilisé
        const users = getUsers();
        if (users.some(u => u.email === email)) {
            document.getElementById("email").classList.add("is-invalid");
            showFormError("Cette adresse email est déjà utilisée.");
            return;
        }

        // Hash du mot de passe + sauvegarde
        const passwordHash = await sha256(password);
        users.push({ username, email, passwordHash });
        saveUsers(users);

        // Redirection vers la connexion
        window.location.href = "login.html";
    });

    // Retire l'invalidité quand l'utilisateur modifie un champ
    ["username", "email", "password", "confirmPassword"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => el.classList.remove("is-invalid"));
    });
}

document.addEventListener("DOMContentLoaded", loadRegister);
