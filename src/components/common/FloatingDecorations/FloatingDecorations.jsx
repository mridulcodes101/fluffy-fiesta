import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './FloatingDecorations.module.css';

/**
 * FloatingDecorations - Ambient background floating doodles (flowers, stars, hearts, sparkles).
 */
export const FloatingDecorations = ({ variant = 'default' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(`.${styles.floatingItem}`);

    const anims = Array.from(items).map((el, index) => {
      const duration = 4500 + (index % 4) * 1200;
      const translateYVal = 10 + (index % 3) * 6;
      const rotateVal = 8 + (index % 5) * 4;

      return anime({
        targets: el,
        translateY: [
          { value: -translateYVal, duration: duration * 0.5, easing: 'easeInOutSine' },
          { value: translateYVal, duration: duration * 0.5, easing: 'easeInOutSine' }
        ],
        rotate: [
          { value: -rotateVal, duration: duration * 0.6, easing: 'easeInOutQuad' },
          { value: rotateVal, duration: duration * 0.6, easing: 'easeInOutQuad' }
        ],
        scale: [
          { value: 1.05, duration: duration * 0.4, easing: 'easeInOutSine' },
          { value: 0.95, duration: duration * 0.4, easing: 'easeInOutSine' }
        ],
        direction: 'alternate',
        loop: true,
        delay: index * 180
      });
    });

    return () => anims.forEach(a => a.pause());
  }, []);

  return (
    <div ref={containerRef} className={styles.decorContainer}>
      {/* Heart */}
      <svg className={`${styles.floatingItem} ${styles.topLeft}`} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF8FAB" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Star */}
      <svg className={`${styles.floatingItem} ${styles.topRight}`} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="2.2" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>

      {/* Flower */}
      <svg className={`${styles.floatingItem} ${styles.bottomLeft}`} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFC6D3" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" fill="#FFD166" />
        <path d="M12 5a3 3 0 0 0 0-6 3 3 0 0 0 0 6zm7 7a3 3 0 0 0 6 0 3 3 0 0 0-6 0zm-7 7a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm-7-7a3 3 0 0 0-6 0 3 3 0 0 0 6 0z" />
      </svg>

      {/* Sparkle */}
      <svg className={`${styles.floatingItem} ${styles.bottomRight}`} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF8FAB" strokeWidth="2">
        <path d="M12 3v18M3 12h18M6 6l12 12M6 18L18 6" />
      </svg>
    </div>
  );
};

export default FloatingDecorations;
