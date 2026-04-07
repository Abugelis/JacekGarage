// ------------------------ NAV TOGGLE ------------------------
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");
const sections = document.querySelectorAll("section[id]");
const allLinks = document.querySelectorAll("#navMenu a");

// Open mobile menu
function openMenu() {
    nav.classList.add("active");
    toggle.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
}

// Close mobile menu
function closeMenu() {
    nav.classList.remove("active");
    toggle.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

// Toggle menu on hamburger click
toggle.addEventListener("click", () => {
    nav.classList.contains("active") ? closeMenu() : openMenu();
});

// Close menu if overlay is clicked
overlay.addEventListener("click", closeMenu);

// Close menu when any top-level nav link is clicked
const links = nav.querySelectorAll("#navMenu > ul > li > a");
links.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ------------------------ ACTIVE LINK HIGHLIGHT ------------------------


// Normalize current path
const currentPath = window.location.pathname
    .replace(/\/$/, "")
    .replace("index.html", "");

// ---------------- PAGE LINKS ----------------
allLinks.forEach(link => {
    const href = link.getAttribute("href");

    // Skip anchor links (#contact etc.) for page load logic
    if (href.startsWith("#")) return;

    const linkPath = new URL(link.href, window.location.origin).pathname
        .replace(/\/$/, "")
        .replace("index.html", "");

    if (currentPath === linkPath || (currentPath === "" && linkPath === "")) {
        link.classList.add("active"); // This will also apply to mobile nav
    }
});

// ---------------- SCROLL LINKS ----------------
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    allLinks.forEach(link => {
        const href = link.getAttribute("href");

        // ONLY handle anchor links here
        if (!href.startsWith("#")) return;

        link.classList.remove("active");

        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
});