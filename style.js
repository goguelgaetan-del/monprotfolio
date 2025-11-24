// style.js

document.addEventListener("DOMContentLoaded", () => {
    const body   = document.body;
    const toggle = document.getElementById("theme-toggle");
    const header = document.querySelector("header");

    /* -------------------------
       DARK MODE
    -------------------------- */
    if (toggle) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            body.classList.add("dark");
            toggle.textContent = "☀️";
        } else {
            body.classList.remove("dark");
            toggle.textContent = "🌙";
        }

        toggle.addEventListener("click", () => {
            body.classList.toggle("dark");

            if (body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                toggle.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                toggle.textContent = "🌙";
            }
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
                // on descend
                header.classList.add("hide");
            } else {
                // on remonte ou on est en haut
                header.classList.remove("hide");
            }

            lastScroll = currentScroll;
        });
    }
});
