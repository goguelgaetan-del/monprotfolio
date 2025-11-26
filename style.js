// style.js

document.addEventListener("DOMContentLoaded", () => {
    const body       = document.body;
    const toggle     = document.getElementById("theme-toggle");
    const header     = document.querySelector("header");
    const themeLabel = document.getElementById("theme-label");

    /* =========================================================
       1. SYSTEME DE THEMES MULTIPLES (light / dark / hacker)
    ========================================================== */

    const themes = ["light", "dark", "hacker"];

    // Charger le thème sauvegardé
    let currentTheme = localStorage.getItem("theme") || "light";
    if (!themes.includes(currentTheme)) currentTheme = "light";

    function applyTheme(theme) {
        // Retirer toutes les classes existantes
        themes.forEach(t => body.classList.remove(`theme-${t}`));

        // Ajouter la classe du thème actif
        body.classList.add(`theme-${theme}`);

        // Sauvegarder
        localStorage.setItem("theme", theme);

        // Icône du bouton
        if (toggle) {
            switch (theme) {
                case "light":
                    toggle.textContent = "🌞";
                    break;
                case "dark":
                    toggle.textContent = "🌙";
                    break;
                case "hacker":
                    toggle.textContent = "💻";
                    break;
            }
        }

        // Label du thème + animation
        if (themeLabel) {
            let text = "";

            switch (theme) {
                case "light":
                    text = "Thème : Clair";
                    break;
                case "dark":
                    text = "Thème : Sombre";
                    break;
                case "hacker":
                    text = "Thème : Hacker";
                    break;
            }

            themeLabel.textContent = text;

            // relancer l'animation du label
            themeLabel.classList.remove("theme-label-anim");
            void themeLabel.offsetWidth; // forcer recalcul du DOM
            themeLabel.classList.add("theme-label-anim");
        }
    }

    // appliquer au chargement
    applyTheme(currentTheme);

    // click -> thème suivant
    if (toggle) {
        toggle.addEventListener("click", () => {
            const currentIndex = themes.indexOf(currentTheme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            currentTheme = nextTheme;

            applyTheme(nextTheme);

            // animation bouton
            toggle.classList.add("theme-toggle-anim");
            setTimeout(() => {
                toggle.classList.remove("theme-toggle-anim");
            }, 250);
        });
    }

    /* =========================================================
       2. HEADER QUI DISPARAIT EN SCROLL
    ========================================================== */

    if (header) {
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // on descend
            if (currentScroll > lastScroll && currentScroll > 50) {
                header.classList.add("hide");
            }
            // on remonte
            else {
                header.classList.remove("hide");
            }

            lastScroll = currentScroll;
        });
    }
});
