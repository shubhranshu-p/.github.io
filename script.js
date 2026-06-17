(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const storageKey = "ssp-portfolio-theme";
  const contactEmail = "shubhranshusudeeptapanda@gmail.com";

  function readStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    const storedTheme = readStoredTheme();
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    writeStoredTheme(theme);
    if (themeToggle) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
    }
  }

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navMenu.classList.remove("is-open");
    body.classList.remove("menu-open");
  }

  function toggleMenu() {
    if (!navToggle || !navMenu) return;
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navMenu.classList.toggle("is-open", !isOpen);
    body.classList.toggle("menu-open", !isOpen);
  }

  function updateActiveNav(activeId) {
    navLinks.forEach((link) => {
      const linkId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkId === activeId);
    });
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFieldState(field, isValid) {
    field.setAttribute("aria-invalid", String(!isValid));
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "dark";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle) return;
    const clickInsideMenu = navMenu.contains(event.target);
    const clickOnToggle = navToggle.contains(event.target);
    if (!clickInsideMenu && !clickOnToggle) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActiveNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.01
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const nameField = contactForm.elements.name;
      const emailField = contactForm.elements.email;
      const messageField = contactForm.elements.message;

      const validName = name.length > 1;
      const validEmail = validateEmail(email);
      const validMessage = message.length > 10;

      setFieldState(nameField, validName);
      setFieldState(emailField, validEmail);
      setFieldState(messageField, validMessage);

      if (!validName || !validEmail || !validMessage) {
        formStatus.textContent = "Please add your name, a valid email, and a message with at least 10 characters.";
        return;
      }

      const subject = "Portfolio contact from " + name;
      const bodyText = [
        "Name: " + name,
        "Email: " + email,
        "",
        message
      ].join("\n");
      const mailtoUrl = "mailto:" + contactEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyText);

      formStatus.textContent = "Opening your email app...";
      window.location.href = mailtoUrl;
    });

    contactForm.addEventListener("input", (event) => {
      if (event.target.matches("input, textarea")) {
        event.target.removeAttribute("aria-invalid");
        formStatus.textContent = "";
      }
    });
  }
})();
