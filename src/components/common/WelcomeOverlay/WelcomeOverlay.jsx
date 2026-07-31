import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './WelcomeOverlay.module.css';

/**
 * WelcomeOverlay - Introductory envelope loading screen
 * "Someone left something for Mishti..." -> Opens -> "Open gently 🌸" -> Fades into Hero
 */
export const WelcomeOverlay = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const timeline = anime.timeline({
      easing: 'easeOutCubic',
      complete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    timeline
      // 1. Pause for 2s on envelope
      .add({
        targets: noteRef.current,
        opacity: [0, 1],
        translateY: [20, -35],
        duration: 900,
        delay: 2000
      })
      // 2. Wait 1s with note open
      .add({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 900,
        delay: 1100
      });

    return () => timeline.pause();
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className={styles.overlayContainer}>
      <div className={styles.envelopeCard}>
        <div ref={noteRef} className={styles.slidingNote}>
          Open gently 🌸
        </div>
        <div className={styles.waxSeal}>💌</div>
        <p className={styles.introText}>
          Someone left something for Mishti...
        </p>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
