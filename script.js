// JavaScript for Mohamed M. El Esh's portfolio
// Handles mobile navigation toggle, dark mode, and dynamic footer year.

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const yearSpan = document.getElementById('year');
  const themeToggle = document.getElementById('theme-toggle');

  // Set current year in footer
  if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
  }

  // Toggle navigation menu on small screens
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu when a link is clicked (for single page navigation)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  // Theme toggle functionality
  if (themeToggle) {
    // Check for a saved theme preference; default to light if none is stored
    const savedTheme = localStorage.getItem('theme');

    // Always default to the dark theme when no preference is stored
    // If a saved preference exists for light, apply it; otherwise use dark
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.setAttribute('aria-checked', 'false');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-checked', 'true');
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme;
      
      if (currentTheme === 'dark') {
        newTheme = 'light';
        themeToggle.setAttribute('aria-checked', 'false');
      } else {
        newTheme = 'dark';
        themeToggle.setAttribute('aria-checked', 'true');
      }
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Add keyboard support for theme toggle
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }
  
  // IntersectionObserver for scroll animations
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      } else {
        entry.target.classList.remove('animated');
      }
    });
  }, observerOptions);

  const animationTargets = document.querySelectorAll(
    '.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-slide-up, .animate-zoom-in'
  );

  animationTargets.forEach(el => {
    observer.observe(el);
  });
});