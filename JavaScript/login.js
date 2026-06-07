function loadLogin() {
    "use strict";
    const form = document.querySelector(".needs-validation");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        event.stopPropagation();

        const identifiant = document.getElementById("email").value.trim();
        const password    = document.getElementById("password").value;
        let isValid = true;

        if (!identifiant) {
            document.getElementById("email").classList.add("is-invalid");
            document.getElementById("emailError").textContent = "Veuillez entrer votre email ou nom d'utilisateur.";
            isValid = false;
        }
        if (!password) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("passwordError").textContent = "Le mot de passe est requis.";
            isValid = false;
        }
        if (!isValid) return;

        const users        = getUsers();
        const passwordHash = await sha256(password);

        // Accepte l'email OU le nom d'utilisateur
        const user = users.find(u =>
            (u.email === identifiant || u.username === identifiant) && u.passwordHash === passwordHash
        );

        if (!user) {
            showFormError("Identifiant ou mot de passe incorrect.");
            return;
        }

        saveSession({ username: user.username, email: user.email });
        window.location.href = "../index.html";
    });

    ["email", "password"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => el.classList.remove("is-invalid"));
    });
}

document.addEventListener("DOMContentLoaded", loadLogin);
