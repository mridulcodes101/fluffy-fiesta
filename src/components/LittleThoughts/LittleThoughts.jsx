import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './LittleThoughts.module.css';

/**
 * LittleThoughts Component - Scattered interactive sticky notes and random wholesome thoughts.
 */
export const LittleThoughts = () => {
  // State for 3 hidden stars discovery
  const [clickedStars, setClickedStars] = useState({ star1: false, star2: false, star3: false });
  const [showObservantToast, setShowObservantToast] = useState(false);

  // State for Mascot Peeking Cloud Speech Bubble & Blush
  const [showMascotBubble, setShowMascotBubble] = useState(false);
  const [isMascotBlushing, setIsMascotBlushing] = useState(false);

  // State for revealed secret doodles per note index
  const [revealedDoodles, setRevealedDoodles] = useState({});

  const sectionRef = useRef(null);

  // Check if all 3 stars clicked
  useEffect(() => {
    if (clickedStars.star1 && clickedStars.star2 && clickedStars.star3) {
      setShowObservantToast(true);
      const timer = setTimeout(() => setShowObservantToast(false), 4200);
      return () => clearTimeout(timer);
    }
  }, [clickedStars]);

  // Staggered Entrance Animation on Viewport Scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(`.${styles.noteCard}`);
    cards.forEach(card => { card.style.opacity = '0'; });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [35, 0],
              scale: [0.9, 1],
              delay: anime.stagger(140),
              duration: 800,
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

  // Generic handler for note card clicks with unique Anime.js interactions
  const handleNoteClick = (index, event, type) => {
    const card = event.currentTarget;

    // Toggle revealed doodle
    setRevealedDoodles(prev => ({ ...prev, [index]: true }));

    // Trigger Anime.js interaction based on note type
    switch (type) {
      case 'unfold':
        anime({
          targets: card,
          scale: [0.95, 1.05, 1],
          rotateX: [0, -15, 0],
          duration: 650,
          easing: 'easeOutBack'
        });
        break;

      case 'flip':
        anime({
          targets: card,
          rotateY: [0, 180, 0],
          duration: 750,
          easing: 'easeInOutQuad'
        });
        break;

      case 'slide':
        anime({
          targets: card,
          translateX: [0, -12, 12, 0],
          duration: 600,
          easing: 'easeInOutSine'
        });
        break;

      case 'tape-peel':
        anime({
          targets: card,
          rotate: ['-2deg', '-8deg', '-2deg'],
          translateY: [0, 8, 0],
          duration: 700,
          easing: 'easeOutElastic(1, .5)'
        });
        break;

      case 'letter-open':
        anime({
          targets: card,
          scale: [1, 1.08, 1],
          rotateZ: [0, 5, 0],
          duration: 600,
          easing: 'easeOutBack'
        });
        break;

      case 'wiggle-spin':
        anime({
          targets: card,
          rotate: [0, 360],
          duration: 800,
          easing: 'easeInOutBack'
        });
        break;

      case 'heartbeat':
        anime({
          targets: card,
          scale: [1, 1.1, 0.98, 1],
          duration: 650,
          easing: 'easeInOutQuad'
        });
        break;

      case 'stamp':
        anime({
          targets: card,
          translateY: [0, -14, 0],
          boxShadow: [
            '0 6px 14px rgba(74,63,53,0.09)',
            '0 18px 30px rgba(74,63,53,0.18)',
            '0 6px 14px rgba(74,63,53,0.09)'
          ],
          duration: 650,
          easing: 'easeOutCubic'
        });
        break;

      case 'glow-pulse':
        anime({
          targets: card,
          scale: [1, 1.06, 1],
          duration: 600,
          easing: 'easeInOutSine'
        });
        break;

      case 'tear-wobble':
        anime({
          targets: card,
          rotate: [0, -8, 8, -4, 4, 0],
          duration: 700,
          easing: 'easeInOutSine'
        });
        break;

      default:
        break;
    }
  };

  // Handle Hidden Star Clicks
  const handleStarClick = (starKey) => {
    setClickedStars(prev => ({ ...prev, [starKey]: true }));
  };

  // Handle Mascot Cloud Click
  const handleMascotClick = (e) => {
    e.stopPropagation();
    setIsMascotBlushing(true);
    setShowMascotBubble(true);

    setTimeout(() => setIsMascotBlushing(false), 800);
    setTimeout(() => setShowMascotBubble(false), 2400);
  };

  // 10 Wholesome Short Thoughts
  const thoughtsData = [
    {
      text: "pata hai...\ntumhari notifications achhi lagti hain.",
      type: "unfold",
      doodle: "🌸",
      styleClass: styles.noteVar1
    },
    {
      text: "kabhi kabhi bas\ntumhari awaaz sunne ka mann karta hai.",
      type: "flip",
      doodle: "☁️",
      styleClass: styles.noteVar2,
      hasMascot: true // Peeking cloud mascot attached here!
    },
    {
      text: "aaj ka random thought:\n\nhope you're smiling. ✨",
      type: "slide",
      doodle: "⭐",
      styleClass: styles.noteVar3
    },
    {
      text: "waise...\n\nkhana time pe khaya? 🍲",
      type: "tape-peel",
      doodle: "🍲",
      styleClass: styles.noteVar4
    },
    {
      text: "aap khush to ho na?\n\nya meri kami mehsoos ho rhi h... 💭",
      type: "letter-open",
      doodle: "💌",
      styleClass: styles.noteVar5
    },
    {
      text: "tumse baat ho jaaye...\n\ndin thoda better lagta hai. 🌸",
      type: "wiggle-spin",
      doodle: "✨",
      styleClass: styles.noteVar6
    },
    {
      text: "waise...\n\ntum haste hue zyada cute lagte ho. 😊",
      type: "heartbeat",
      doodle: "🐱",
      styleClass: styles.noteVar7
    },
    {
      text: "thank you...\n\nrandomly meri life me aane ke liye. 💌",
      type: "stamp",
      doodle: "✈️",
      styleClass: styles.noteVar8
    },
    {
      text: "kabhi disappear mat ho jaana... 🥺",
      type: "glow-pulse",
      doodle: "💖",
      styleClass: styles.noteVar9
    },
    {
      text: "ye website banana\nexpected se zyada difficult tha 😭",
      type: "tear-wobble",
      doodle: "☕",
      styleClass: styles.noteVar10
    }
  ];

  return (
    <PageSection id={SECTION_IDS.LITTLE_THOUGHTS} className={styles.thoughtsSection}>
      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Section Header */}
        <div className={styles.headerArea}>
          <h2 className={styles.mainTitle}>random thoughts.exe</h2>
          <p className={styles.subtitle}>
            bas kuch random si baatein...<br />jo shayad bolni chahiye thi :)
          </p>
        </div>

        {/* Scattered Background Subtle Handwritten Text */}
        <span className={`${styles.bgScatterText} ${styles.bgText1}`}>hehe</span>
        <span className={`${styles.bgScatterText} ${styles.bgText2}`}>don't overthink</span>
        <span className={`${styles.bgScatterText} ${styles.bgText3}`}>found this 🌸</span>
        <span className={`${styles.bgScatterText} ${styles.bgText4}`}>important!!</span>
        <span className={`${styles.bgScatterText} ${styles.bgText5}`}>look here 👀</span>

        {/* Mini Discovery: 3 Hidden Clickable Stars */}
        <span 
          className={`${styles.hiddenStar} ${styles.starPos1} ${clickedStars.star1 ? styles.active : ''}`}
          onClick={() => handleStarClick('star1')}
          title="Click me! ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.hiddenStar} ${styles.starPos2} ${clickedStars.star2 ? styles.active : ''}`}
          onClick={() => handleStarClick('star2')}
          title="Click me! ⭐"
        >
          ⭐
        </span>
        <span 
          className={`${styles.hiddenStar} ${styles.starPos3} ${clickedStars.star3 ? styles.active : ''}`}
          onClick={() => handleStarClick('star3')}
          title="Click me! ⭐"
        >
          ⭐
        </span>

        {/* Observant Toast when all 3 stars found */}
        {showObservantToast && (
          <div className={styles.observantToast}>
            hehe...<br />tum kaafi observant ho 🌸
          </div>
        )}

        {/* Scrapbook Free-Flowing Note Grid */}
        <div className={styles.scrapbookGrid}>
          {thoughtsData.map((note, idx) => (
            <div
              key={idx}
              className={`${styles.noteCard} ${note.styleClass}`}
              onClick={(e) => handleNoteClick(idx, e, note.type)}
            >
              {/* Tape Accent */}
              <div className={styles.noteTape} />

              {/* Peeking Mascot Cloud on Note 2 */}
              {note.hasMascot && (
                <div 
                  className={`${styles.mascotContainer} ${isMascotBlushing ? styles.cloudBlush : ''}`} 
                  onClick={handleMascotClick}
                  title="Click the peeking cloud!"
                >
                  {showMascotBubble && (
                    <div className={styles.speechBubble}>hii ☁️</div>
                  )}
                  <svg className={styles.cloudSvg} viewBox="0 0 100 70" fill="none">
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
              )}

              {/* Short Thought Text */}
              <p className={styles.noteText} dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, '<br/>') }} />

              {/* Secret Doodle (Revealed on click) */}
              <span className={`${styles.secretDoodle} ${revealedDoodles[idx] ? styles.revealed : ''}`}>
                {note.doodle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default LittleThoughts;
