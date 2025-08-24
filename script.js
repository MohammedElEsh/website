// JavaScript for Mohamed M. El Esh’s portfolio
// Handles mobile navigation toggle and dynamic footer year.

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const yearSpan = document.getElementById('year');

  // Set current year in footer
  if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
  }

  // Toggle navigation menu on small screens
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close the menu when a link is clicked (for single page navigation)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });
});