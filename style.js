// style.js

document.addEventListener("DOMContentLoaded", () => {
    const body       = document.body;
    const toggle     = document.getElementById("theme-toggle");
    const header     = document.querySelector("header");
    const themeLabel = document.getElementById("theme-label");

    /* -------------------------
       SYSTÈME DE THÈMES MULTIPLES
    -------------------------- */

    // Liste des thèmes dispo (ordre de rotation)
    const themes = ["light", "dark", "solarized", "hacker"];

    // Récup thème sauvegardé, sinon light
    let currentTheme = localStorage.getItem("theme") || "light";
    if (!themes.includes(currentTheme)) {
        currentTheme = "light";
    }

    function applyTheme(theme) {
        // On enlève toutes les classes de thème
        themes.forEach(t => body.classList.remove(`theme-${t}`));

        // Enlever tous les thèmes
        themes.forEach(t => body.classList.remove(`theme-${t}`));

        // Ajouter la classe même pour light
        body.classList.add(`theme-${theme}`);


        // On sauvegarde
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
                case "solarized":
                    toggle.textContent = "🌅";
                    break;
                case "hacker":
                    toggle.textContent = "💻";
                    break;
            }
        }

        // Texte du thème + animation
        if (themeLabel) {
            let text = "";

            switch (theme) {
                case "light":
                    text = "Thème : Clair";
                    break;
                case "dark":
                    text = "Thème : Sombre";
                    break;
                case "solarized":
                    text = "Thème : Solaire";
                    break;
                case "hacker":
                    text = "Thème : Hacker";
                    break;
            }

            themeLabel.textContent = text;

            // relance l’anim à chaque changement
            themeLabel.classList.remove("theme-label-anim");
            // petit trick pour forcer le reflow
            void themeLabel.offsetWidth;
            themeLabel.classList.add("theme-label-anim");
        }
    }

    // Appliquer thème au chargement
    applyTheme(currentTheme);

    // Gestion du clic sur le bouton (rotation des thèmes + anim bouton)
    if (toggle) {
        toggle.addEventListener("click", () => {
            const currentIndex = themes.indexOf(currentTheme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            currentTheme = nextTheme;

            applyTheme(nextTheme);

            // Animation du bouton
            toggle.classList.add("theme-toggle-anim");
            setTimeout(() => {
                toggle.classList.remove("theme-toggle-anim");
            }, 250);
        });
    }

    /* -------------------------
       HIDE HEADER ON SCROLL
    -------------------------- */
    if (header) {
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScroll && currentScroll > 50) {
                // on descend -> cacher header
                header.classList.add("hide");
            } else {
                // on remonte -> montrer header
                header.classList.remove("hide");
            }

            lastScroll = currentScroll;
        });
    }
});
