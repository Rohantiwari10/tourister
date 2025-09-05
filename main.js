const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Hamburger toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Dark/Light mode toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Switch icon
  if (body.classList.contains("light-theme")) {
    themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
  } else {
    themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
  }
});



// header container
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
