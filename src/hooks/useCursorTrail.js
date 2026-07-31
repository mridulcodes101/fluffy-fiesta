import { useEffect } from 'react';
import anime from 'animejs';

/**
 * Custom hook to spawn trailing heart particles following the mouse cursor.
 * Respects prefers-reduced-motion settings.
 * @param {boolean} enabled Whether the cursor trail is active
 */
export const useCursorTrail = (enabled = true) => {
  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!enabled || prefersReducedMotion) return;

    let lastTime = 0;
    const pastelHearts = ['❤️', '🌸', '✨', '💖', '⭐'];

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 90) return; // Throttle spawn rate to 11fps for lightweight execution
      lastTime = now;

      const heart = document.createElement('span');
      heart.innerText = pastelHearts[Math.floor(Math.random() * pastelHearts.length)];
      heart.style.position = 'fixed';
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.fontSize = `${11 + Math.random() * 5}px`;
      heart.style.opacity = '0.8';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.userSelect = 'none';

      document.body.appendChild(heart);

      anime({
        targets: heart,
        translateY: -20 - Math.random() * 16,
        translateX: (Math.random() - 0.5) * 16,
        rotate: (Math.random() - 0.5) * 30,
        opacity: [0.8, 0],
        scale: [1, 0.3],
        duration: 700,
        easing: 'easeOutQuad',
        complete: () => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);
};

export default useCursorTrail;
