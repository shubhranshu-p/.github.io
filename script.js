/* ================================================
   Portfolio — Shubhranshu Sudeepta Panda
   Interactions: theme toggle, hamburger menu,
   spotlight cursor, smooth scroll
   ================================================ */

(function () {
  'use strict';

  // ---- Theme State ----
  let isDarkMode = true;

  const body = document.body;
  const sliderBg = document.getElementById('sliderBg');
  const knobEl = document.getElementById('knobEl');

  function applyTheme() {
    if (isDarkMode) {
      body.classList.remove('light');
      sliderBg.style.backgroundColor = '#333';
      knobEl.style.left = '2px';
    } else {
      body.classList.add('light');
      sliderBg.style.backgroundColor = '#ccc';
      knobEl.style.left = '38px';
    }
  }

  // Theme toggle — listen on checkbox change, not label click (avoids double-fire)
  const themeCheckbox = document.getElementById('themeCheckbox');
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', function () {
      isDarkMode = !isDarkMode;
      applyTheme();
      if (typeof updateSpotlightColor === 'function') updateSpotlightColor();
    });
  }

  applyTheme();

  // ---- Hamburger Menu ----
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  let menuOpen = false;

  if (hamburgerBtn && dropdownMenu) {
    hamburgerBtn.addEventListener('click', function () {
      menuOpen = !menuOpen;
      if (menuOpen) {
        hamburgerBtn.textContent = '✕';
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.backgroundColor = isDarkMode ? '#121212' : '#fff';
        dropdownMenu.style.color = isDarkMode ? '#fff' : '#121212';
        // Animate in
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        dropdownMenu.style.transition = 'opacity 0.3s, transform 0.3s';
        requestAnimationFrame(function () {
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.transform = 'translateY(0)';
        });
      } else {
        hamburgerBtn.textContent = '☰';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        setTimeout(function () {
          dropdownMenu.style.display = 'none';
        }, 300);
      }
    });

    // Close menu when clicking a link
    dropdownMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuOpen = false;
        hamburgerBtn.textContent = '☰';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        setTimeout(function () {
          dropdownMenu.style.display = 'none';
        }, 300);
      });
    });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Interactive Hero Photo (parallax) ----
  const heroSection = document.querySelector('.hero-section');
  const heroImage = document.getElementById('heroImage');

  if (heroSection && heroImage) {
    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) / rect.width * 40;
      const moveY = (e.clientY - centerY) / rect.height * 40;
      heroImage.style.transform = 'translate(calc(-50% + ' + moveX + 'px), calc(-50% + ' + moveY + 'px))';
    });

    heroSection.addEventListener('mouseleave', function () {
      heroImage.style.transform = 'translate(-50%, -50%)';
    });
  }

  // ---- Spotlight / Cursor Follower ----
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);

  function updateSpotlightColor() {
    spotlight.style.setProperty('--spotlight-bg', isDarkMode ? '#00FF9C' : '#1F67F1');
  }
  updateSpotlightColor();

  window.addEventListener('mousemove', function (e) {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    updateSpotlightColor();
  });

})();
