function loadRegister() {
    // Active le mode strict de JS
    "use strict";
    const form = document.querySelector(".needs-validation");
    form.addEventListener("submit", function(event) {
        // Empèche l'envoi du formulaire si invalide
        event.preventDefault(); 
        event.stopPropagation();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let isValid = true;  // Flag pour détecter un champ vide

        // Vérification de la validité de chaque champs.
        if (!username.trim()) {
            document.getElementById("username").classList.add("is-invalid");
            isValid = false;
        }

        if (!email.trim()) {
            document.getElementById("email").classList.add("is-invalid");
            isValid = false;
        }

        if (!password.trim()) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("passwordError").textContent = "Le mot de passe est requis.";
            isValid = false;

        } else if (password.length < 8) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("passwordError").textContent = "Le mot de passe doit faire au moins 8 caractères.";
            isValid = false;
        }

        if (!password.trim()) {
            document.getElementById("confirmPassword").classList.add("is-invalid");
            isValid = false;

        } else if (password.length <=8) {
            document.getElementById("confirmPassword").classList.add("is-invalid");
            document.getElementById("passwordErrorConfirm").textContent = "Le mot de passe doit faire au moins 8 caractères.";
            isValid = false;
        }

        if (password !== confirmPassword) {
            document.getElementById("confirmPassword").classList.add("is-invalid");
            document.getElementById("confirmPassword").textContent = "Les mots de passes doivent être identiques.";
            isValid = false;
        }

        if (isValid) {
            form.classList.add("was-validated");
            console.log("Formulaire valide");
        }
    }); 
    // Retrait de l'invalidité après modification des champs 

    document.getElementById("username").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });

    document.getElementById("email").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });

    document.getElementById("password").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });

    document.getElementById("confirmPassword").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });
}

document.addEventListener("DOMContentLoaded", loadRegister);