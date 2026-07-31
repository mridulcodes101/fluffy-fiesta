/**
 * For Mishti ❤️ - Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scrapbook animation system
  if (typeof MishtiAnimations !== 'undefined') {
    MishtiAnimations.initAll();
  }

  // Smooth scroll utility for internal links if needed in the future
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
