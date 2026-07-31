import anime from 'animejs';

/**
 * Reusable Anime.js Animation Helpers
 */

/**
 * Creates a subtle fade-up entrance animation for an element or group of elements.
 * @param {HTMLElement|string} target 
 * @param {Object} options 
 */
export const animateFadeUp = (target, options = {}) => {
  if (!target) return null;
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [35, 0],
    duration: options.duration || 900,
    delay: options.delay || 0,
    easing: options.easing || 'easeOutCubic',
    ...options
  });
};

/**
 * Creates a continuous floating animation for background elements.
 * @param {HTMLElement|string} target 
 * @param {Object} options 
 */
export const createFloatLoop = (target, options = {}) => {
  if (!target) return null;
  return anime({
    targets: target,
    translateY: options.translateY || [-8, 8],
    rotate: options.rotate || [-3, 3],
    duration: options.duration || 3000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    ...options
  });
};

/**
 * Generates a floating heart particle burst around a target coordinates.
 * @param {number} x 
 * @param {number} y 
 * @param {number} count 
 */
export const triggerHeartBurst = (x, y, count = 8) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.innerText = i % 2 === 0 ? '❤️' : '🌸';
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = `${12 + Math.random() * 10}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    document.body.appendChild(particle);
    particles.push(particle);
  }

  anime({
    targets: particles,
    translateX: () => anime.random(-60, 60),
    translateY: () => anime.random(-60, -110),
    scale: [
      { value: 1.3, duration: 200, easing: 'easeOutSine' },
      { value: 0, duration: 600, easing: 'easeInQuad' }
    ],
    opacity: [1, 0],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => {
      particles.forEach(p => p.remove());
    }
  });
};
