import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './TinyPromise.module.css';

/**
 * TinyPromise Component - Cozy wooden table with 8 handwritten promise cards & sleeping cloud mascot
 */
export const TinyPromise = () => {
  // State for 8 promise cards (opened or closed)
  const [openedCards, setOpenedCards] = useState({});

  // State for Sleeping Mascot (isAwake)
  const [isMascotAwake, setIsMascotAwake] = useState(false);

  // State for Secret Sticky Note (isUnfolded)
  const [isSecretUnfolded, setIsSecretUnfolded] = useState(false);

  const sectionRef = useRef(null);

  // Viewport Scroll Entrance Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(`.${styles.promiseCard}`);
    cards.forEach(c => { c.style.opacity = '0'; });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [35, 0],
              scale: [0.92, 1],
              delay: anime.stagger(130),
              duration: 850,
              easing: 'easeOutCubic'
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Open Promise Card Handler with unique Anime.js interactions
  const handleCardClick = (idx, event, openType) => {
    if (openedCards[idx]) return;

    setOpenedCards(prev => ({ ...prev, [idx]: true }));
    const cover = event.currentTarget.querySelector(`.${styles.cardCover}`);

    if (!cover) return;

    switch (openType) {
      case 'slide':
        anime({
          targets: cover,
          translateY: '-100%',
          opacity: 0,
          duration: 650,
          easing: 'easeOutCubic'
        });
        break;

      case 'tape-peel':
        anime({
          targets: cover,
          rotateZ: [0, -12],
          translateY: [0, 100],
          opacity: 0,
          duration: 700,
          easing: 'easeInOutQuad'
        });
        break;

      case 'unfold':
        anime({
          targets: cover,
          scaleY: 0,
          opacity: 0,
          duration: 650,
          easing: 'easeOutBack'
        });
        break;

      case 'flip':
        anime({
          targets: cover,
          rotateY: 180,
          opacity: 0,
          duration: 750,
          easing: 'easeInOutQuad'
        });
        break;

      case 'letter':
        anime({
          targets: cover,
          scale: 0.5,
          opacity: 0,
          duration: 600,
          easing: 'easeOutBack'
        });
        break;

      case 'untie':
        anime({
          targets: cover,
          scaleX: 0,
          opacity: 0,
          duration: 650,
          easing: 'easeInOutSine'
        });
        break;

      default:
        anime({
          targets: cover,
          scale: [1, 1.15],
          opacity: [1, 0],
          duration: 600,
          easing: 'easeOutQuad'
        });
        break;
    }
  };

  // Sleeping Mascot Click Handler
  const handleMascotClick = () => {
    if (isMascotAwake) return;
    setIsMascotAwake(true);

    setTimeout(() => {
      setIsMascotAwake(false);
    }, 1400);
  };

  // Secret Sticky Note Click Handler
  const handleSecretStickyClick = () => {
    setIsSecretUnfolded(true);

    setTimeout(() => {
      const finalSection = document.getElementById(SECTION_IDS.FINAL_QUESTION);
      if (finalSection) {
        finalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1800);
  };

  // 8 Promises Data
  const promisesData = [
    {
      icon: "🤍",
      text: "main unnecessarily tang karunga...\npar ignore kabhi nahi.",
      openType: "slide",
      rotStyle: styles.rot1
    },
    {
      icon: "🌸",
      text: "tumhara birthday kabhi nahi bhoolunga.",
      openType: "tape-peel",
      rotStyle: styles.rot2
    },
    {
      icon: "☕",
      text: "chai ya coffee...\nmeri treat.",
      openType: "unfold",
      rotStyle: styles.rot3
    },
    {
      icon: "🎧",
      text: "random reels bhejna...\nband mat karna.",
      openType: "flip",
      rotStyle: styles.rot4
    },
    {
      icon: "📱",
      text: "agar kabhi tumhara din kharab ho...\nmessage kar dena.",
      openType: "letter",
      rotStyle: styles.rot5
    },
    {
      icon: "🌙",
      text: "late night overthinking?\nallowed.",
      openType: "untie",
      rotStyle: styles.rot6
    },
    {
      icon: "🌼",
      text: "tum haste rehna.\nbaaki dekh lenge.",
      openType: "slide",
      rotStyle: styles.rot7
    },
    {
      icon: "✨",
      text: "bas...\naise hi rehna.",
      openType: "unfold",
      rotStyle: styles.rot8
    }
  ];

  return (
    <PageSection id={SECTION_IDS.TINY_PROMISE} className={styles.promiseSection}>
      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header */}
        <div className={styles.headerArea}>
          <h2 className={styles.mainTitle}>before the last page...</h2>
          <p className={styles.subtitle}>bas kuch chhoti si baatein 🌸</p>
        </div>

        {/* Wooden Desk Container */}
        <div className={styles.woodenDeskContainer}>
          {/* Desk Ornaments */}
          <div className={styles.coffeeRing} />
          <span className={styles.pressedFlower}>🌸</span>
          <span className={styles.pencilDoodle}>✏️</span>

          {/* Polaroid Cards Grid */}
          <div className={styles.polaroidGrid}>
            {promisesData.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.promiseCard} ${item.rotStyle}`}
                onClick={(e) => handleCardClick(idx, e, item.openType)}
              >
                <div className={styles.cardTape} />

                {/* Closed State Cover */}
                {!openedCards[idx] && (
                  <div className={styles.cardCover}>
                    <div className={styles.coverIcon}>{item.icon}</div>
                    <span className={styles.tapPrompt}>open promise ✨</span>
                  </div>
                )}

                {/* Opened Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>{item.icon}</div>
                  <p 
                    className={styles.promiseText} 
                    dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br/>') }} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Secret Folded Sticky Note */}
          <div className={styles.secretStickyNote} onClick={handleSecretStickyClick}>
            {!isSecretUnfolded ? (
              <span className={styles.secretText}>secret note 📌 (tap)</span>
            ) : (
              <div>
                <p className={styles.secretText}>
                  okay...<br />last page.<br />promise.
                </p>
                <div className={styles.pointingArrow}>👇</div>
              </div>
            )}
          </div>
        </div>

        {/* Sleeping Cloud Mascot */}
        <div className={styles.sleepingMascotWrapper} onClick={handleMascotClick} title="Sleeping Cloud Mascot">
          <div className={styles.snoozeBubble}>
            {isMascotAwake ? '😮 oops!' : 'zZz...'}
          </div>
          <svg className={styles.cloudSvg} viewBox="0 0 100 70" fill="none">
            <path 
              d="M20 50 C 10 50, 5 40, 10 30 C 5 20, 20 10, 35 15 C 45 5, 70 5, 80 15 C 92 10, 100 22, 95 35 C 102 45, 92 55, 80 50 Z" 
              fill="#FFFDF8" 
              stroke="#4A3F35" 
              strokeWidth="3" 
            />
            {/* Eyes change when awake vs sleeping */}
            {!isMascotAwake ? (
              <>
                <path d="M34 32 Q 38 36, 42 32" stroke="#4A3F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M58 32 Q 62 36, 66 32" stroke="#4A3F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="38" cy="30" r="4" fill="#4A3F35" />
                <circle cx="62" cy="30" r="4" fill="#4A3F35" />
              </>
            )}
            <circle cx="30" cy="36" r="4" fill="#FFC6D3" opacity="0.9" />
            <circle cx="70" cy="36" r="4" fill="#FFC6D3" opacity="0.9" />
            <path d="M44 38 Q 50 43, 56 38" stroke="#4A3F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

      </div>
    </PageSection>
  );
};

export default TinyPromise;
