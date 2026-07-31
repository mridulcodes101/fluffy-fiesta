import React, { useState, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './SecretMessage.module.css';

/**
 * SecretMessage Component - Handwritten intimate letter hidden inside the scrapbook
 */
export const SecretMessage = () => {
  const [isOpened, setIsOpened] = useState(false);

  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const afterReadingRef = useRef(null);

  // Envelope Opening Anime.js Timeline
  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);

    const waxSeal = envelopeRef.current?.querySelector(`.${styles.waxSeal}`);
    const envelopeBody = envelopeRef.current?.querySelector(`.${styles.envelopeBody}`);
    const letterCard = letterRef.current;
    const paragraphs = letterCard?.querySelectorAll(`.${styles.letterParagraph}`);
    const afterReading = afterReadingRef.current;

    // Set initial paragraph opacities to 0
    if (paragraphs) {
      paragraphs.forEach(p => { p.style.opacity = '0'; });
    }
    if (afterReading) {
      afterReading.style.opacity = '0';
    }

    const timeline = anime.timeline({
      easing: 'easeOutCubic'
    });

    timeline
      // 1. Envelope lifts & Wax seal breaks
      .add({
        targets: waxSeal,
        scale: [1, 1.4, 0],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeInOutQuad'
      })
      // 2. Envelope body fades out
      .add({
        targets: envelopeBody,
        scale: [1, 0.92],
        opacity: [1, 0],
        duration: 500
      }, '-=200')
      // 3. Letter card unfolds into view
      .add({
        targets: letterCard,
        opacity: [0, 1],
        scale: [0.92, 1],
        translateY: [40, 0],
        duration: 900,
        easing: 'easeOutCubic'
      })
      // 4. Sequential reveal of each letter paragraph
      .add({
        targets: paragraphs,
        opacity: [0, 1],
        translateY: [22, 0],
        delay: anime.stagger(1400),
        duration: 950,
        easing: 'easeOutQuad'
      })
      // 5. After Reading Bookmark & Turn Page Button
      .add({
        targets: afterReading,
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 800,
        easing: 'easeOutCubic'
      }, '+=500');
  };

  // Turn Page Bookmark Click Handler
  const handleTurnPage = () => {
    const nextSection = document.getElementById(SECTION_IDS.TINY_PROMISE);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageSection id={SECTION_IDS.SECRET_MESSAGE} className={styles.secretSection}>
      {/* Calm, Minimal Floating Background Doodles */}
      <div className={styles.calmDecorContainer}>
        {/* Floating Petal 1 */}
        <svg className={`${styles.calmDecor} ${styles.petal1}`} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC6D3" strokeWidth="2">
          <path d="M12 2C12 2 17 8 17 13C17 16.8 14.8 20 12 20C9.2 20 7 16.8 7 13C7 8 12 2 12 2Z" fill="#FFE5EC" />
        </svg>
        {/* Floating Petal 2 */}
        <svg className={`${styles.calmDecor} ${styles.petal2}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8FAB" strokeWidth="2">
          <path d="M12 2C12 2 17 8 17 13C17 16.8 14.8 20 12 20C9.2 20 7 16.8 7 13C7 8 12 2 12 2Z" fill="#FFC6D3" />
        </svg>
        {/* Tiny Moon */}
        <svg className={`${styles.calmDecor} ${styles.tinyMoon}`} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        {/* Tiny Star */}
        <svg className={`${styles.calmDecor} ${styles.tinyStar}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD166" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 1. CLOSED ENVELOPE (Click to Open) */}
        {!isOpened && (
          <div ref={envelopeRef} className={styles.envelopeWrapper} onClick={handleOpenEnvelope}>
            <div className={styles.envelopeBody}>
              <div className={styles.waxSeal}>💌</div>
              <div className={styles.envelopeLabel}>
                Open when you're smiling :)
              </div>
              <span className={styles.clickToOpenHint}>tap envelope to open 🌸</span>
            </div>
          </div>
        )}

        {/* 2. UNFOLDED LETTER PAPER CARD */}
        <div 
          ref={letterRef} 
          className={styles.letterPaperCard}
          style={{ display: isOpened ? 'flex' : 'none' }}
        >
          <div className={styles.washiTapeTop} />

          {/* Paragraph 1 */}
          <div className={styles.letterParagraph}>
            <h3 className={styles.letterHeader}>Hey Mishti,</h3>
            <p className={styles.handwrittenLine}>agar tum yahan tak aa gayi ho...</p>
            <p>to pehle ek chhota sa thank you.</p>
            <p>Seriously.</p>
            <p>Itna scroll karne ke liye bhi. 🌸</p>
          </div>

          {/* Paragraph 2 */}
          <div className={styles.letterParagraph}>
            <p className={styles.handwrittenLine}>Pata nahi kab...</p>
            <p>par tum meri daily routine ka ek cute sa part ban gayi.</p>
            <p>Kabhi ek random notification.</p>
            <p>Kabhi ek random message.</p>
            <p>Kabhi bas tumhari yaad.</p>
            <p>Aur honestly...</p>
            <p className={styles.handwrittenLine}>ye sab kaafi achha lagta hai.</p>
          </div>

          {/* Paragraph 3 */}
          <div className={styles.letterParagraph}>
            <p>Kabhi kabhi sochta hu...</p>
            <p>agar ek din tum bina bataye disappear ho gayi...</p>
            <p className={styles.handwrittenLine}>to shayad mujhe genuinely bura lagega.</p>
          </div>

          {/* Paragraph 4 */}
          <div className={`${styles.letterParagraph} ${styles.accentParagraph}`}>
            <p style={{ fontWeight: 700 }}>IHYK...</p>
            <p>I don't want to lose you...</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
              even though we're not in a relationship.
            </p>
          </div>

          {/* Paragraph 5 */}
          <div className={styles.letterParagraph}>
            <p>Bas itna hi.</p>
            <p>No pressure.</p>
            <p>No expectations.</p>
            <p className={styles.handwrittenLine}>Bas itna ki...</p>
            <p className={styles.handwrittenLine} style={{ color: 'var(--color-primary-pink)' }}>
              please meri life se gayab mat ho jaana.
            </p>
          </div>

          {/* Paragraph 6 */}
          <div className={styles.letterParagraph}>
            <p>Aur agar kabhi tumhara din kharab ho...</p>
            <p>ya tum bas kisi se baat karna chaho...</p>
            <p className={styles.handwrittenLine} style={{ fontSize: '1.6rem' }}>
              I'm here.
            </p>
            <p className={styles.handwrittenLine} style={{ fontSize: '1.6rem', color: 'var(--color-primary-pink)' }}>
              Always. 🌸
            </p>
          </div>

          {/* 3. AFTER READING: BOOKMARK & TURN PAGE BUTTON */}
          <div ref={afterReadingRef} className={styles.afterReadingArea}>
            <p className={styles.lastPageNote}>there's one last page...</p>
            <button className={styles.turnPageButton} onClick={handleTurnPage} type="button">
              <span>turn the page</span> ➜
            </button>
          </div>
        </div>

        {/* Quiet Mascot Cloud in Bottom Corner */}
        <div className={styles.quietMascot}>
          <svg className={styles.quietCloudSvg} viewBox="0 0 100 70" fill="none">
            <path 
              d="M20 50 C 10 50, 5 40, 10 30 C 5 20, 20 10, 35 15 C 45 5, 70 5, 80 15 C 92 10, 100 22, 95 35 C 102 45, 92 55, 80 50 Z" 
              fill="#FFFDF8" 
              stroke="#4A3F35" 
              strokeWidth="2.5" 
            />
            <ellipse className={styles.blinkEye} cx="38" cy="30" rx="3" ry="3.5" fill="#4A3F35" />
            <ellipse className={styles.blinkEye} cx="62" cy="30" rx="3" ry="3.5" fill="#4A3F35" />
            <circle cx="30" cy="36" r="3.5" fill="#FFC6D3" opacity="0.8" />
            <circle cx="70" cy="36" r="3.5" fill="#FFC6D3" opacity="0.8" />
            <path d="M44 36 Q 50 41, 56 36" stroke="#4A3F35" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

      </div>
    </PageSection>
  );
};

export default SecretMessage;
