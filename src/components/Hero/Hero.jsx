import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import FloatingDecorations from '../common/FloatingDecorations/FloatingDecorations';
import { SECTION_IDS } from '../../utils/constants';
import { triggerHeartBurst } from '../../utils/animationHelpers';
import styles from './Hero.module.css';

/**
 * Hero Component - First page of the handmade scrapbook "For Mishti 🌸"
 */
export const Hero = () => {
  const cardRef = useRef(null);
  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const introLine2Ref = useRef(null);

  // Staggered Entrance Animation Timeline
  useEffect(() => {
    if (!cardRef.current) return;

    // Elements to animate in sequence
    const smallLabel = cardRef.current.querySelector(`.${styles.smallLabel}`);
    const mainHeading = cardRef.current.querySelector(`.${styles.mainHeading}`);
    const introLine1 = cardRef.current.querySelector(`.${styles.introLine1}`);
    const introLine2 = introLine2Ref.current;
    const illustration = cardRef.current.querySelector(`.${styles.illustrationWrapper}`);
    const buttonWrapper = cardRef.current.querySelector(`.${styles.heroButtonWrapper}`);
    const stickyNotes = heroRef.current?.querySelectorAll(`.${styles.stickyNote}`);

    // Set initial opacity to 0
    const animElements = [smallLabel, mainHeading, introLine1, introLine2, illustration, buttonWrapper];
    animElements.forEach(el => {
      if (el) el.style.opacity = '0';
    });
    if (stickyNotes) {
      stickyNotes.forEach(n => { n.style.opacity = '0'; });
    }

    const timeline = anime.timeline({
      easing: 'easeOutCubic'
    });

    timeline
      // 1. Label
      .add({
        targets: smallLabel,
        opacity: [0, 1],
        translateY: [22, 0],
        duration: 750
      })
      // 2. Heading
      .add({
        targets: mainHeading,
        opacity: [0, 1],
        translateY: [22, 0],
        duration: 750
      }, '-=400')
      // 3. First Sentence
      .add({
        targets: introLine1,
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 700
      }, '-=350')
      // 4. Illustration
      .add({
        targets: illustration,
        opacity: [0, 1],
        scale: [0.92, 1],
        translateY: [18, 0],
        duration: 800
      }, '-=200')
      // 5. Hidden Handwritten Note (~1.8s delay from start)
      .add({
        targets: introLine2,
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 850
      }, '+=1000')
      // 6. Button
      .add({
        targets: buttonWrapper,
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 700
      }, '-=300')
      // 7. Sticky Notes
      .add({
        targets: stickyNotes,
        opacity: [0, 1],
        scale: [0.7, 1],
        delay: anime.stagger(130),
        duration: 600,
        easing: 'easeOutBack'
      }, '-=300');

    return () => timeline.pause();
  }, []);

  // Micro-interaction: Hovering empty background spawns occasional blooming flower
  const handleBackgroundMouseMove = (e) => {
    if (e.target !== heroRef.current) return;
    
    const now = Date.now();
    if (!heroRef.current.lastPopTime) heroRef.current.lastPopTime = 0;
    if (now - heroRef.current.lastPopTime < 1600) return;
    heroRef.current.lastPopTime = now;

    const flower = document.createElement('span');
    flower.innerText = '🌸';
    flower.style.position = 'fixed';
    flower.style.left = `${e.clientX}px`;
    flower.style.top = `${e.clientY}px`;
    flower.style.pointerEvents = 'none';
    flower.style.zIndex = '12';
    flower.style.fontSize = '1.4rem';
    flower.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(flower);

    anime({
      targets: flower,
      scale: [0, 1.2, 1, 0],
      translateY: -16,
      opacity: [0, 1, 1, 0],
      duration: 1300,
      easing: 'easeInOutCubic',
      complete: () => flower.remove()
    });
  };

  // Button Click Handler: Heart burst + smooth scroll to LittleThoughts
  const handleButtonClick = (e) => {
    e.preventDefault();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      triggerHeartBurst(centerX, centerY, 10);
    }

    setTimeout(() => {
      const nextSection = document.getElementById(SECTION_IDS.LITTLE_THOUGHTS);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 380);
  };

  return (
    <PageSection 
      id={SECTION_IDS.HERO} 
      className={styles.heroWrapper}
    >
      <div 
        ref={heroRef}
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onMouseMove={handleBackgroundMouseMove}
      >
        {/* Layer 1: Background Scattered Sticky Notes */}
        <div className={styles.stickyNotesContainer}>
          <div className={`${styles.stickyNote} ${styles.note1}`}>hehe</div>
          <div className={`${styles.stickyNote} ${styles.note2}`}>don't judge the design 🙈</div>
          <div className={`${styles.stickyNote} ${styles.note3}`}>100% effort</div>
          <div className={`${styles.stickyNote} ${styles.note4}`}>pls smile 🌸</div>
          <div className={`${styles.stickyNote} ${styles.note5}`}>professional overthinker 🧠</div>
          <div className={`${styles.stickyNote} ${styles.note6}`}>trust the process ✨</div>
        </div>

        {/* Ambient Floating SVGs */}
        <FloatingDecorations />

        {/* Layer 2: Main Scrapbook Paper Card */}
        <div ref={cardRef} className={styles.heroCard}>
          <div className={styles.washiTapeLeft} />
          <div className={styles.washiTapeRight} />

          {/* Small Handwritten Label */}
          <div className={styles.smallLabel}>
            made with unnecessary amount of overthinking ✨
          </div>

          {/* Main Heading */}
          <h1 className={styles.mainHeading}>
            Hi Mishti <span className={styles.flowerEmoji}>🌸</span>
          </h1>

          {/* Subtitle / Introduction Line 1 */}
          <p className={styles.introLine1}>
            ek minute... bas thoda sa time chahiye tumhara.
          </p>

          {/* Subtitle / Introduction Line 2 (revealed dynamically) */}
          <p ref={introLine2Ref} className={styles.introLine2}>
            maine kuch banaya hai...<br />sirf tumhare liye :)
          </p>

          {/* Hand-Drawn SVG Doodle Illustration */}
          <div className={styles.illustrationWrapper} title="Hover for extra sparkles! ✨">
            <div className={styles.illustrationSparkles}>
              <span className={`${styles.popSparkle} ${styles.sparkle1}`}>✨</span>
              <span className={`${styles.popSparkle} ${styles.sparkle2}`}>⭐</span>
              <span className={`${styles.popSparkle} ${styles.sparkle3}`}>🌟</span>
            </div>

            <svg className={styles.doodleSvg} viewBox="0 0 340 180" width="340" height="180" fill="none">
              {/* Floating Smiling Cloud */}
              <g className={styles.floatingCloud}>
                <path 
                  d="M70 120 C 50 120, 35 100, 45 80 C 40 60, 60 40, 85 45 C 100 25, 145 25, 160 45 C 180 35, 205 50, 200 75 C 215 85, 210 115, 190 120 Z" 
                  fill="#FFFDF8" 
                  stroke="#4A3F35" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                {/* Blinking Eyes */}
                <ellipse className={styles.blinkEye} cx="95" cy="72" rx="3" ry="4" fill="#4A3F35" />
                <ellipse className={styles.blinkEye} cx="145" cy="72" rx="3" ry="4" fill="#4A3F35" />
                {/* Blushing Cheeks */}
                <circle cx="85" cy="80" r="5" fill="#FFC6D3" opacity="0.8" />
                <circle cx="155" cy="80" r="5" fill="#FFC6D3" opacity="0.8" />
                {/* Smile Mouth */}
                <path d="M112 80 Q 120 90, 128 80" stroke="#4A3F35" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>

              {/* Drifting Paper Airplane */}
              <g className={styles.driftPlane}>
                <path d="M210 50 Q 230 45, 255 35" stroke="#FF8FAB" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M255 35 L 295 20 L 275 55 L 265 42 Z" fill="#FFFDF8" stroke="#4A3F35" strokeWidth="2" strokeLinejoin="round" />
                <path d="M255 35 L 295 20 L 265 42" stroke="#4A3F35" strokeWidth="1.5" />
              </g>

              {/* Coffee Mug with Steam */}
              <g transform="translate(230, 95)">
                <rect x="10" y="20" width="30" height="35" rx="5" fill="#FFC6D3" stroke="#4A3F35" strokeWidth="2" />
                <path d="M 40 27 C 48 27, 48 48, 40 48" stroke="#4A3F35" strokeWidth="2" fill="none" />
                <path className={styles.steamLine} d="M 18 12 Q 22 6, 18 0" stroke="#8A7D74" strokeWidth="1.5" fill="none" />
                <path className={styles.steamLine} d="M 30 14 Q 34 8, 30 2" stroke="#8A7D74" strokeWidth="1.5" fill="none" />
                <path d="M23 35 C21 32 17 33 17 36 C17 39 25 43 25 43 C25 43 33 39 33 36 C33 33 29 32 27 35 Z" fill="#FF8FAB" />
              </g>

              {/* Twinkling Stars */}
              <g className={styles.twinkleStar} transform="translate(35, 30)">
                <polygon points="10 0 13 7 20 10 13 13 10 20 7 13 0 10 7 7" fill="#FFD166" />
              </g>
              <g className={styles.twinkleStar} transform="translate(200, 130)">
                <polygon points="8 0 10 5 16 8 10 11 8 16 6 11 0 8 6 5" fill="#FF8FAB" />
              </g>
              <g className={styles.twinkleStar} transform="translate(285, 80)">
                <polygon points="6 0 8 4 12 6 8 8 6 12 4 8 0 6 4 4" fill="#FFD166" />
              </g>

              {/* Slow Beating Heart */}
              <g className={styles.heartBeat} transform="translate(160, 130)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF8FAB" />
              </g>

              {/* Little Flower */}
              <g transform="translate(20, 130)">
                <circle cx="10" cy="10" r="3" fill="#FFD166" />
                <circle cx="10" cy="5" r="2.5" fill="#FFC6D3" />
                <circle cx="15" cy="10" r="2.5" fill="#FFC6D3" />
                <circle cx="10" cy="15" r="2.5" fill="#FFC6D3" />
                <circle cx="5" cy="10" r="2.5" fill="#FFC6D3" />
              </g>
            </svg>
          </div>

          {/* Main Button */}
          <div className={styles.heroButtonWrapper}>
            <button 
              ref={buttonRef}
              className={styles.heroButton} 
              onClick={handleButtonClick}
              type="button"
            >
              <span>okay... dikhao 👉</span>
              <span className={styles.btnSparkle}>✨</span>
            </button>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default Hero;
