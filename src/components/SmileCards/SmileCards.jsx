import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './SmileCards.module.css';

/**
 * SmileCards Component - "tiny museum of Mishti 🏛️🌸"
 */
export const SmileCards = () => {
  // State for 10 exhibits (opened or closed)
  const [openedExhibits, setOpenedExhibits] = useState({});

  // State for 5 collectible stars (persisted in localStorage)
  const [collectedStars, setCollectedStars] = useState(() => {
    try {
      const saved = localStorage.getItem('mishti_museum_stars');
      return saved ? JSON.parse(saved) : { s1: false, s2: false, s3: false, s4: false, s5: false };
    } catch (e) {
      return { s1: false, s2: false, s3: false, s4: false, s5: false };
    }
  });

  const [showAchievementBanner, setShowAchievementBanner] = useState(false);

  // Mascot Guide Dialogue state
  const [guideDialogueIndex, setGuideDialogueIndex] = useState(0);
  const [showGuideBubble, setShowGuideBubble] = useState(false);

  const guideDialogues = [
    "please don't run.",
    "no photography... jk 😂",
    "this exhibit is my favourite.",
    "10/10 visitor."
  ];

  const sectionRef = useRef(null);

  // Save collected stars to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mishti_museum_stars', JSON.stringify(collectedStars));
    } catch (e) {}

    // Check if all 5 stars collected
    const totalCollected = Object.values(collectedStars).filter(Boolean).length;
    if (totalCollected === 5 && !showAchievementBanner) {
      setShowAchievementBanner(true);
      triggerConfettiBurst();
    }
  }, [collectedStars]);

  // Viewport Scroll Entrance Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(`.${styles.exhibitCard}`);
    cards.forEach(card => { card.style.opacity = '0'; });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [40, 0],
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

  // Confetti Particle Burst for Achievement Unlocked
  const triggerConfettiBurst = () => {
    const confettiCount = 30;
    const particles = [];

    for (let i = 0; i < confettiCount; i++) {
      const p = document.createElement('span');
      p.innerText = ['🌸', '✨', '⭐', '💖', '🎀', '🎉'][Math.floor(Math.random() * 6)];
      p.style.position = 'fixed';
      p.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
      p.style.top = '30%';
      p.style.fontSize = `${14 + Math.random() * 12}px`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '99999';
      document.body.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-250, 250),
      translateY: () => anime.random(-150, 350),
      rotate: () => anime.random(-360, 360),
      scale: [
        { value: 1.4, duration: 200 },
        { value: 0, duration: 1200 }
      ],
      opacity: [1, 0],
      duration: 1600,
      easing: 'easeOutCubic',
      complete: () => particles.forEach(p => p.remove())
    });
  };

  // Open Exhibit Click Handler with unique Anime.js interactions
  const handleExhibitClick = (idx, event, openType) => {
    if (openedExhibits[idx]) return;

    setOpenedExhibits(prev => ({ ...prev, [idx]: true }));
    const overlay = event.currentTarget.querySelector(`.${styles.coverOverlay}`);

    if (!overlay) return;

    switch (openType) {
      case 'slide':
        anime({
          targets: overlay,
          translateY: '-100%',
          opacity: 0,
          duration: 700,
          easing: 'easeOutCubic'
        });
        break;

      case 'unfold':
        anime({
          targets: overlay,
          rotateX: 90,
          opacity: 0,
          duration: 750,
          easing: 'easeInOutQuad'
        });
        break;

      case 'untie':
        anime({
          targets: overlay,
          scale: 0.4,
          opacity: 0,
          duration: 650,
          easing: 'easeOutBack'
        });
        break;

      case 'curtain':
        anime({
          targets: overlay,
          scaleX: 0,
          opacity: 0,
          duration: 700,
          easing: 'easeInOutSine'
        });
        break;

      case 'drawer':
        anime({
          targets: overlay,
          translateX: '100%',
          opacity: 0,
          duration: 700,
          easing: 'easeOutCubic'
        });
        break;

      default:
        anime({
          targets: overlay,
          scale: [1, 1.2],
          opacity: [1, 0],
          duration: 600,
          easing: 'easeOutQuad'
        });
        break;
    }
  };

  // Guide Mascot Click Handler
  const handleGuideClick = () => {
    setShowGuideBubble(true);
    setGuideDialogueIndex(prev => (prev + 1) % guideDialogues.length);

    setTimeout(() => setShowGuideBubble(false), 2400);
  };

  // Star Collectible Click Handler
  const handleStarCollect = (starKey) => {
    setCollectedStars(prev => ({ ...prev, [starKey]: true }));
  };

  // 10 Museum Exhibits Data
  const exhibitsData = [
    {
      id: "01",
      coverIcon: "☕",
      coverTitle: "Exhibit #01",
      illustration: "☕",
      caption: "chai ho ya coffee...\nbaatein tumhare saath hi achhi lagti.",
      frameStyle: styles.woodenFrame,
      openType: "slide"
    },
    {
      id: "02",
      coverIcon: "🌙",
      coverTitle: "Exhibit #02",
      illustration: "🌙",
      caption: "raat me randomly yaad aa jaana...\ntumhari special skill hai kya?",
      frameStyle: styles.paperFrame,
      openType: "unfold"
    },
    {
      id: "03",
      coverIcon: "🌸",
      coverTitle: "Exhibit #03",
      illustration: "🌸",
      caption: "iska koi reason nahi.\nbas ye flower tumhari vibe deta hai.",
      frameStyle: styles.polaroidFrame,
      openType: "untie"
    },
    {
      id: "04",
      coverIcon: "🎧",
      coverTitle: "Exhibit #04",
      illustration: "🎧",
      caption: "songs sunte waqt\nkabhi kabhi tum yaad aa jaati ho.",
      frameStyle: styles.stickyFrame,
      openType: "fade"
    },
    {
      id: "05",
      coverIcon: "📱",
      coverTitle: "Exhibit #05",
      illustration: "📱",
      caption: "notification sound sunke\nek second ke liye lagta hai tum ho.",
      frameStyle: styles.tagFrame,
      openType: "curtain"
    },
    {
      id: "06",
      coverIcon: "☁️",
      coverTitle: "Exhibit #06",
      illustration: "☁️",
      caption: "overthinking department:\nfully active.",
      frameStyle: styles.woodenFrame,
      openType: "drawer"
    },
    {
      id: "07",
      coverIcon: "🧸",
      coverTitle: "Exhibit #07",
      illustration: "🧸",
      caption: "haan...\ntumhe ye pasand aata shayad.",
      frameStyle: styles.paperFrame,
      openType: "unfold"
    },
    {
      id: "08",
      coverIcon: "✨",
      coverTitle: "Exhibit #08",
      illustration: "✨",
      caption: "kabhi kabhi\nlog bas achhe lagte hain.\nbas.",
      frameStyle: styles.polaroidFrame,
      openType: "slide"
    },
    {
      id: "09",
      coverIcon: "📖",
      coverTitle: "Exhibit #09",
      illustration: "📖",
      caption: "agar tum book hoti...\nto probably meri favourite hoti.",
      frameStyle: styles.stickyFrame,
      openType: "untie"
    },
    {
      id: "10",
      coverIcon: "🎈",
      coverTitle: "Exhibit #10",
      illustration: "🎈",
      caption: "tum haste ho\nto atmosphere halka lagta hai.",
      frameStyle: styles.tagFrame,
      openType: "curtain"
    }
  ];

  return (
    <PageSection id={SECTION_IDS.SMILE_CARDS} className={styles.museumSection}>
      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Wall Garland Background Accent */}
        <div className={styles.wallGarland} />

        {/* Section Header */}
        <div className={styles.museumHeader}>
          <h2 className={styles.museumTitle}>tiny museum of Mishti 🏛️🌸</h2>
          <p className={styles.museumSubtitle}>
            welcome :)<br />please don't touch...<br />except you actually should.
          </p>
        </div>

        {/* Secret Collectible 5 Stars */}
        <span 
          className={`${styles.collectibleStar} ${styles.cStar1} ${collectedStars.s1 ? styles.collected : ''}`}
          onClick={() => handleStarCollect('s1')}
          title="Collect museum star ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.collectibleStar} ${styles.cStar2} ${collectedStars.s2 ? styles.collected : ''}`}
          onClick={() => handleStarCollect('s2')}
          title="Collect museum star ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.collectibleStar} ${styles.cStar3} ${collectedStars.s3 ? styles.collected : ''}`}
          onClick={() => handleStarCollect('s3')}
          title="Collect museum star ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.collectibleStar} ${styles.cStar4} ${collectedStars.s4 ? styles.collected : ''}`}
          onClick={() => handleStarCollect('s4')}
          title="Collect museum star ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.collectibleStar} ${styles.cStar5} ${collectedStars.s5 ? styles.collected : ''}`}
          onClick={() => handleStarCollect('s5')}
          title="Collect museum star ⭐"
        >
          ⭐
        </span>

        {/* Achievement Unlocked Banner Note */}
        {showAchievementBanner && (
          <div className={styles.achievementBanner}>
            Achievement unlocked:<br />
            <span style={{ color: 'var(--color-primary-pink)' }}>Professional Explorer 🌸</span>
          </div>
        )}

        {/* Museum Exhibits Grid */}
        <div className={styles.museumGrid}>
          {exhibitsData.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.exhibitCard} ${item.frameStyle}`}
              onClick={(e) => handleExhibitClick(idx, e, item.openType)}
            >
              {/* Museum Tag */}
              <span className={styles.museumTag}>{item.coverTitle}</span>

              {/* Cover Overlay (Closed State) */}
              {!openedExhibits[idx] && (
                <div className={styles.coverOverlay}>
                  <div className={styles.coverIcon}>{item.coverIcon}</div>
                  <span className={styles.clickPrompt}>tap to reveal ✨</span>
                </div>
              )}

              {/* Revealed Exhibit Content */}
              <div className={styles.exhibitContent}>
                <div className={styles.exhibitIllustration}>{item.illustration}</div>
                <p 
                  className={styles.exhibitCaption} 
                  dangerouslySetInnerHTML={{ __html: item.caption.replace(/\n/g, '<br/>') }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mascot Museum Guide Cloud */}
        <div className={styles.guideMascotWrapper} onClick={handleGuideClick}>
          {showGuideBubble && (
            <div className={styles.guideSpeechBubble}>
              {guideDialogues[guideDialogueIndex]}
            </div>
          )}
          <span className={styles.guideBadge}>Guide ☁️</span>
          <svg className={styles.guideCloudSvg} viewBox="0 0 100 70" fill="none">
            <path 
              d="M20 50 C 10 50, 5 40, 10 30 C 5 20, 20 10, 35 15 C 45 5, 70 5, 80 15 C 92 10, 100 22, 95 35 C 102 45, 92 55, 80 50 Z" 
              fill="#FFFDF8" 
              stroke="#4A3F35" 
              strokeWidth="3" 
            />
            <circle cx="38" cy="30" r="3.5" fill="#4A3F35" />
            <circle cx="62" cy="30" r="3.5" fill="#4A3F35" />
            <circle cx="30" cy="36" r="4" fill="#FFC6D3" opacity="0.9" />
            <circle cx="70" cy="36" r="4" fill="#FFC6D3" opacity="0.9" />
            <path d="M44 36 Q 50 42, 56 36" stroke="#4A3F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

      </div>
    </PageSection>
  );
};

export default SmileCards;
