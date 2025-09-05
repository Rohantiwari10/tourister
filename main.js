const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

/* ---------------- Navbar Toggle ---------------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

function toggleMenu(forceClose = false) {
  const icon = navToggle.querySelector("i");

  if (forceClose) {
    navMenu.classList.remove("show");
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
    return;
  }

  navMenu.classList.toggle("show");

  if (navMenu.classList.contains("show")) {
    icon.classList.remove("ri-menu-line");
    icon.classList.add("ri-close-line");
  } else {
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
  }
}

navToggle.addEventListener("click", () => toggleMenu());

// Close when clicking a link (mobile UX)
document.querySelectorAll(".nav__links .link a").forEach(link => {
  link.addEventListener("click", () => toggleMenu(true));
});

// Close on ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && navMenu.classList.contains("show")) {
    toggleMenu(true);
  }
});

/* ---------------- Theme Toggle ---------------- */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const icon = themeToggle.querySelector("i");

  if (body.classList.contains("light-theme")) {
    // Light theme → show moon
    icon.classList.remove("ri-sun-line");
    icon.classList.add("ri-moon-line");
  } else {
    // Dark theme → show sun
    icon.classList.remove("ri-moon-line");
    icon.classList.add("ri-sun-line");
  }
});

/* ---------------- ScrollReveal Animations ---------------- */
ScrollReveal().reveal(".header__container h1", scrollRevealOption);

ScrollReveal().reveal(".header__container h4", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// about container
ScrollReveal().reveal(".about__container .section__header", scrollRevealOption);
ScrollReveal().reveal(".about__container .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__container .about__flex", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__container .btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// discover container
ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card__content", {
  ...scrollRevealOption,
  interval: 500,
  delay: 200,
});

// blogs container
ScrollReveal().reveal(".blogs__card", {
  duration: 1000,
  interval: 400,
});

// journals container
ScrollReveal().reveal(".journals__card", {
  ...scrollRevealOption,
  interval: 400,
});
