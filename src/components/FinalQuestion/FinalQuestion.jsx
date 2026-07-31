import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './FinalQuestion.module.css';

/**
 * FinalQuestion Component - Final emotional scrapbook page & poetic sign-off screen
 */
export const FinalQuestion = () => {
  // State for Music Audio Toggle
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => {
    try {
      return localStorage.getItem('mishti_music_pref') === 'playing';
    } catch (e) {
      return false;
    }
  });

  // State for interactive button responses
  const [userChoice, setUserChoice] = useState(null); // 'HAAN' | 'DOST'

  // State for Mascot float away & Poetic Final Ending Screen Reveal
  const [isMascotFloatingAway, setIsMascotFloatingAway] = useState(false);
  const [showPoeticEnding, setShowPoeticEnding] = useState(false);

  const sectionRef = useRef(null);
  const audioContextRef = useRef(null);

  // Toggle Music & persist in localStorage
  const handleMusicToggle = () => {
    const nextState = !isPlayingMusic;
    setIsPlayingMusic(nextState);
    try {
      localStorage.setItem('mishti_music_pref', nextState ? 'playing' : 'muted');
    } catch (e) {}

    if (nextState) {
      playGentleLoFiTone();
    } else if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Play gentle background synth tone for cozy atmosphere
  const playGentleLoFiTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
    } catch (e) {}
  };

  // Viewport Scroll Entrance Animation Sequence via Anime.js
  useEffect(() => {
    if (!sectionRef.current) return;

    const introSentence = sectionRef.current.querySelector(`.${styles.introSentence}`);
    const introThankYou = sectionRef.current.querySelector(`.${styles.introThankYou}`);
    const diaryPageCard = sectionRef.current.querySelector(`.${styles.diaryPageCard}`);
    const diaryHeading = sectionRef.current.querySelector(`.${styles.diaryHeading}`);
    const bodyLines = sectionRef.current.querySelectorAll(`.${styles.diaryBodyLine}`);
    const questionLine = sectionRef.current.querySelector(`.${styles.questionLine}`);
    const buttonsArea = sectionRef.current.querySelector(`.${styles.buttonsArea}`);
    const optionalNote = sectionRef.current.querySelector(`.${styles.optionalNote}`);
    const finalPageCard = sectionRef.current.querySelector(`.${styles.finalPageCard}`);

    const timeline = anime.timeline({
      easing: 'easeOutCubic',
      autoplay: false
    });

    timeline
      .add({
        targets: introSentence,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800
      })
      .add({
        targets: introThankYou,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 850
      }, '+=600')
      .add({
        targets: diaryPageCard,
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.94, 1],
        duration: 900
      }, '+=800')
      .add({
        targets: diaryHeading,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 700
      })
      .add({
        targets: bodyLines,
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(700),
        duration: 700
      })
      .add({
        targets: questionLine,
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [15, 0],
        duration: 900
      }, '+=600')
      .add({
        targets: buttonsArea,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 750
      }, '+=400')
      .add({
        targets: optionalNote,
        opacity: [0, 1],
        duration: 800
      }, '+=300')
      .add({
        targets: finalPageCard,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 950,
        complete: () => {
          // After final sign-off reveals, wait 5 seconds then trigger poetic final screen
          setTimeout(() => {
            setShowPoeticEnding(true);
            setIsMascotFloatingAway(true);
          }, 5000);
        }
      }, '+=800');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeline.play();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Button 1 Click: "haan... ❤️"
  const handleChoiceHaan = () => {
    setUserChoice('HAAN');
    triggerSoftConfetti();
    setIsMascotFloatingAway(true);
    setTimeout(() => setShowPoeticEnding(true), 3500);
  };

  // Button 2 Click: "hamesha dost ❤️"
  const handleChoiceDost = () => {
    setUserChoice('DOST');
    triggerFlowerBloom();
    setIsMascotFloatingAway(true);
    setTimeout(() => setShowPoeticEnding(true), 3500);
  };

  // Soft Paper Confetti Animation
  const triggerSoftConfetti = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('span');
      p.innerText = ['🌸', '💖', '✨', '❤️', '💌'][Math.floor(Math.random() * 5)];
      p.style.position = 'fixed';
      p.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
      p.style.top = '40%';
      p.style.fontSize = `${14 + Math.random() * 12}px`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '9999';
      document.body.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-220, 220),
      translateY: () => anime.random(-120, 300),
      rotate: () => anime.random(-360, 360),
      scale: [{ value: 1.3, duration: 200 }, { value: 0, duration: 1200 }],
      opacity: [1, 0],
      duration: 1500,
      easing: 'easeOutCubic',
      complete: () => particles.forEach(p => p.remove())
    });
  };

  // Flower Bloom Animation
  const triggerFlowerBloom = () => {
    const petals = [];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      p.innerText = ['🌼', '🌸', '✨', '💛'][Math.floor(Math.random() * 4)];
      p.style.position = 'fixed';
      p.style.left = `${50 + (Math.random() - 0.5) * 35}%`;
      p.style.top = '45%';
      p.style.fontSize = `${14 + Math.random() * 12}px`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '9999';
      document.body.appendChild(p);
      petals.push(p);
    }

    anime({
      targets: petals,
      translateX: () => anime.random(-180, 180),
      translateY: () => anime.random(-100, 250),
      rotate: () => anime.random(-180, 180),
      scale: [{ value: 1.3, duration: 200 }, { value: 0, duration: 1200 }],
      opacity: [1, 0],
      duration: 1400,
      easing: 'easeOutCubic',
      complete: () => petals.forEach(p => p.remove())
    });
  };

  return (
    <PageSection id={SECTION_IDS.FINAL_QUESTION} className={styles.finalSection}>
      {/* Floating Cassette Music Toggle Button */}
      <button 
        className={styles.musicToggleBtn} 
        onClick={handleMusicToggle}
        title="Toggle background music ♫"
        type="button"
      >
        <span>♫</span>
        <span>{isPlayingMusic ? 'Music: ON 🌸' : 'Music: OFF'}</span>
      </button>

      {/* Minimal Background Ornaments */}
      <div className={styles.minimalDecorContainer}>
        <svg className={`${styles.minimalDecor} ${styles.driftingPetal}`} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFC6D3" strokeWidth="2">
          <path d="M12 2C12 2 17 8 17 13C17 16.8 14.8 20 12 20C9.2 20 7 16.8 7 13C7 8 12 2 12 2Z" fill="#FFE5EC" />
        </svg>
        <svg className={`${styles.minimalDecor} ${styles.star1}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <svg className={`${styles.minimalDecor} ${styles.star2}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8FAB" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span className={`${styles.minimalDecor} ${styles.pressedFlower}`}>🌸</span>
      </div>

      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Intro Handwriting Area */}
        <div className={styles.introArea}>
          <p className={styles.introSentence}>agar tum yahan tak aa gayi ho...</p>
          <h2 className={styles.introThankYou}>
            thank you. seriously. <span className={styles.introSmile}>😊</span>
          </h2>
        </div>

        {/* Folded Diary Page Card */}
        <div className={styles.diaryPageCard}>
          <div className={styles.washiTapeTop} />

          <h3 className={styles.diaryHeading}>one last question...</h3>

          <p className={styles.diaryBodyLine}>Pata nahi future kya hoga.</p>
          <p className={styles.diaryBodyLine}>Pata nahi life hume kaha le jaayegi.</p>
          <p className={styles.diaryBodyLine}>Par ek baat bolni thi.</p>
          <p className={styles.diaryBodyLine}>Tum meri life ka ek bahut hi pyaara part ban gayi ho.</p>
          <p className={styles.diaryBodyLine}>Aur honestly...</p>
          <p className={styles.diaryBodyLine} style={{ fontWeight: 600 }}>
            main chahta hu ki ye connection kabhi na kho jaaye. 🌸
          </p>

          <p className={styles.questionLine}>
            mere banoge kya... mere rahoge kya?
          </p>

          {/* Interactive Response Paper Buttons */}
          <div className={styles.buttonsArea}>
            <button 
              className={`${styles.paperBtn} ${styles.btnOption1}`} 
              onClick={handleChoiceHaan}
              type="button"
            >
              <span>🌸</span>
              <span>haan... ❤️</span>
            </button>

            <button 
              className={`${styles.paperBtn} ${styles.btnOption2}`} 
              onClick={handleChoiceDost}
              type="button"
            >
              <span>🌼</span>
              <span>hamesha dost ❤️</span>
            </button>
          </div>

          {/* Response Note Popup */}
          {userChoice === 'HAAN' && (
            <div className={styles.responseNote}>
              hehe...<br />you just made someone's day. 🌸
            </div>
          )}
          {userChoice === 'DOST' && (
            <div className={styles.responseNote} style={{ background: '#FFF3B0', borderColor: 'var(--color-warm-yellow)' }}>
              and honestly...<br />that would still mean a lot to me. 🌼
            </div>
          )}

          {/* Optional Note */}
          <p className={styles.optionalNote}>
            you don't have to decide anything today.<br />i just wanted you to know.
          </p>
        </div>

        {/* Final Sign-off Page Card */}
        <div className={styles.finalPageCard}>
          <p className={styles.finalMessageText}>
            Thank you for reading till the end.<br /><br />
            I hope this made you smile...<br />
            even if just for a minute. 🌸
          </p>

          <p className={styles.signatureText}>
            — Made with lots of chai, overthinking, and affection.<br />
            <strong>For Mishti.</strong>
          </p>
        </div>

        {/* Poetic Final Ending Screen (Fades in after 5s or after choice) */}
        {showPoeticEnding && (
          <div className={styles.poeticEndingOverlay}>
            <h2 className={styles.poeticText1}>take care, Mishti 🌸</h2>
            <p className={styles.poeticText2}>and thank you... for being you.</p>
            <div className={styles.mridulSignature}>
              <span>— Mridul</span>
              <span className={styles.bloomingFlower}>🌸</span>
            </div>
          </div>
        )}

        {/* Cloud Mascot Waving Goodbye */}
        <div className={`${styles.wavingMascot} ${isMascotFloatingAway ? styles.mascotFloatAway : ''}`}>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1.5px solid var(--color-text)', fontFamily: 'var(--font-handwritten)', fontSize: '1.1rem', fontWeight: 700 }}>
            byeee ☁️
          </div>
          <svg width="48" height="35" viewBox="0 0 100 70" fill="none">
            <path 
              d="M20 50 C 10 50, 5 40, 10 30 C 5 20, 20 10, 35 15 C 45 5, 70 5, 80 15 C 92 10, 100 22, 95 35 C 102 45, 92 55, 80 50 Z" 
              fill="#FFFDF8" 
              stroke="#4A3F35" 
              strokeWidth="2.5" 
            />
            <circle cx="38" cy="30" r="3.5" fill="#4A3F35" />
            <circle cx="62" cy="30" r="3.5" fill="#4A3F35" />
            <circle cx="30" cy="36" r="3.5" fill="#FFC6D3" opacity="0.9" />
            <circle cx="70" cy="36" r="3.5" fill="#FFC6D3" opacity="0.9" />
            <path d="M44 36 Q 50 42, 56 36" stroke="#4A3F35" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

      </div>
    </PageSection>
  );
};

export default FinalQuestion;
