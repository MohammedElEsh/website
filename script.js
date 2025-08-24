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

  // Close the menu when a link is clicked (for single page navigation)
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
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-checked', 'true');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.setAttribute('aria-checked', 'false');
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
  
  // Scroll reveal animations
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll animations
  function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale'
    );
    
    animatedElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
  }

  // Initial check for elements in viewport
  handleScrollAnimations();

  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations, { passive: true });
});