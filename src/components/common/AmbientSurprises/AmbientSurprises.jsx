import React, { useEffect } from 'react';
import anime from 'animejs';
import styles from './AmbientSurprises.module.css';

/**
 * AmbientSurprises - Triggers a tiny random surprise every 20-40 seconds.
 */
export const AmbientSurprises = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let timeoutId = null;

    const scheduleNextSurprise = () => {
      const delay = (20 + Math.random() * 20) * 1000; // 20-40 seconds
      timeoutId = setTimeout(() => {
        triggerRandomSurprise();
        scheduleNextSurprise();
      }, delay);
    };

    const triggerRandomSurprise = () => {
      const surprises = ['petal', 'sneeze', 'plane', 'star', 'wiggle'];
      const choice = surprises[Math.floor(Math.random() * surprises.length)];

      switch (choice) {
        case 'petal': {
          const petal = document.createElement('span');
          petal.className = styles.surpriseElement;
          petal.innerText = '🌸';
          petal.style.left = `${Math.random() * 90}%`;
          petal.style.top = '-40px';
          document.body.appendChild(petal);

          anime({
            targets: petal,
            translateY: [0, window.innerHeight + 80],
            translateX: [0, (Math.random() - 0.5) * 120],
            rotate: [0, 360],
            opacity: [0.9, 0],
            duration: 8000,
            easing: 'easeInOutSine',
            complete: () => petal.remove()
          });
          break;
        }

        case 'plane': {
          const plane = document.createElement('span');
          plane.className = styles.surpriseElement;
          plane.innerText = '✈️';
          plane.style.left = '-50px';
          plane.style.top = `${20 + Math.random() * 60}%`;
          document.body.appendChild(plane);

          anime({
            targets: plane,
            translateX: [0, window.innerWidth + 100],
            translateY: [0, (Math.random() - 0.5) * 80],
            duration: 7000,
            easing: 'easeInOutSine',
            complete: () => plane.remove()
          });
          break;
        }

        case 'star': {
          const star = document.createElement('span');
          star.className = styles.surpriseElement;
          star.innerText = '⭐';
          star.style.left = `${10 + Math.random() * 80}%`;
          star.style.top = `${10 + Math.random() * 80}%`;
          document.body.appendChild(star);

          anime({
            targets: star,
            scale: [0, 1.4, 0],
            rotate: [0, 180],
            opacity: [0, 1, 0],
            duration: 2500,
            easing: 'easeInOutSine',
            complete: () => star.remove()
          });
          break;
        }

        case 'sneeze': {
          const cloudMsg = document.createElement('span');
          cloudMsg.className = styles.surpriseElement;
          cloudMsg.innerText = 'achoo! ☁️';
          cloudMsg.style.fontFamily = 'var(--font-handwritten)';
          cloudMsg.style.fontSize = '1.3rem';
          cloudMsg.style.fontWeight = '700';
          cloudMsg.style.right = '20px';
          cloudMsg.style.bottom = '80px';
          cloudMsg.style.background = 'var(--bg-secondary)';
          cloudMsg.style.padding = '0.3rem 0.7rem';
          cloudMsg.style.borderRadius = '12px';
          cloudMsg.style.border = '1px solid var(--color-text)';

          document.body.appendChild(cloudMsg);

          anime({
            targets: cloudMsg,
            scale: [0.7, 1.1, 1, 0],
            translateY: [10, 0, -10],
            opacity: [0, 1, 1, 0],
            duration: 2200,
            easing: 'easeInOutCubic',
            complete: () => cloudMsg.remove()
          });
          break;
        }

        default:
          break;
      }
    };

    scheduleNextSurprise();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return <div className={styles.ambientContainer} aria-hidden="true" />;
};

export default AmbientSurprises;
