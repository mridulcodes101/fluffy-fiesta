import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './ScrollIndicator.module.css';
import { SECTION_IDS, SECTION_ORDER } from '../../../utils/constants';

/**
 * ScrollIndicator - Section-aware floating paper note on the right
 */
export const ScrollIndicator = () => {
  const [currentText, setCurrentText] = useState('keep scrolling :)');
  const noteRef = useRef(null);
  const textSpanRef = useRef(null);

  // Map Section ID to dynamic floating note prompt text
  const sectionPrompts = {
    [SECTION_IDS.HERO]: 'keep scrolling :)',
    [SECTION_IDS.LITTLE_THOUGHTS]: 'don\'t miss the notes 👀',
    [SECTION_IDS.SMILE_CARDS]: 'explore everything ✨',
    [SECTION_IDS.MINI_GAME]: 'captain, your mission awaits ✈️',
    [SECTION_IDS.SECRET_MESSAGE]: 'take your time 💌',
    [SECTION_IDS.TINY_PROMISE]: 'almost there 🌸',
    [SECTION_IDS.FINAL_QUESTION]: 'thank you 🤍',
    [SECTION_IDS.FOOTER]: 'thank you 🤍'
  };

  // Observe active section in viewport and update text smoothly
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const newPrompt = sectionPrompts[sectionId] || 'scroll slowly 🌸';
          
          setCurrentText(prevText => {
            if (prevText !== newPrompt && textSpanRef.current) {
              anime({
                targets: textSpanRef.current,
                opacity: [1, 0, 1],
                translateY: [0, -8, 0],
                duration: 400,
                easing: 'easeInOutSine'
              });
            }
            return newPrompt;
          });
        }
      });
    }, observerOptions);

    SECTION_ORDER.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Continuous bobbing animation
  useEffect(() => {
    if (!noteRef.current) return;

    const anim = anime({
      targets: noteRef.current,
      translateY: [
        { value: -8, duration: 2400, easing: 'easeInOutSine' },
        { value: 6, duration: 2800, easing: 'easeInOutSine' },
        { value: 0, duration: 2200, easing: 'easeInOutSine' }
      ],
      rotate: [
        { value: -3, duration: 3000, easing: 'easeInOutQuad' },
        { value: 2.5, duration: 3400, easing: 'easeInOutQuad' },
        { value: -1, duration: 2800, easing: 'easeInOutQuad' }
      ],
      loop: true
    });

    return () => anim.pause();
  }, []);

  const handleScrollNext = () => {
    const scrollPosition = window.scrollY + 100;
    
    for (const sectionId of SECTION_ORDER) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop;
        if (top > scrollPosition) {
          element.scrollIntoView({ behavior: 'smooth' });
          break;
        }
      }
    }
  };

  return (
    <div 
      ref={noteRef}
      className={styles.floatingNote} 
      onClick={handleScrollNext}
      aria-label="Scroll navigation hint"
    >
      <div className={styles.tape} />
      <span ref={textSpanRef}>{currentText}</span>
    </div>
  );
};

export default ScrollIndicator;
