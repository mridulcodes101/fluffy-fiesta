import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PageSection from '../common/PageSection/PageSection';
import { SECTION_IDS } from '../../utils/constants';
import styles from './MiniGame.module.css';

/**
 * MiniGame Component - Paper Airplane Challenge ("mini challenge ✈️")
 */
export const MiniGame = () => {
  // Game states: 'PRE_GAME' | 'PLAYING' | 'COMPLETED'
  const [gameState, setGameState] = useState('PRE_GAME');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Active flying airplanes
  const [airplanes, setAirplanes] = useState([]);
  // Active floating +1 indicators
  const [plusOnes, setPlusOnes] = useState([]);

  // Mascot expression & dialogue state
  const [mascot, setMascot] = useState({ expression: '😄', dialogue: 'nice!!' });

  const sectionRef = useRef(null);
  const arenaRef = useRef(null);
  const airplaneIdCounter = useRef(0);

  // Update Mascot speech and expression based on score
  useEffect(() => {
    if (score >= 10) {
      setMascot({ expression: '🥳', dialogue: 'MISSION COMPLETE!! 🎉' });
    } else if (score >= 8) {
      setMascot({ expression: '🥳', dialogue: 'almost there!' });
    } else if (score >= 4) {
      setMascot({ expression: '🤩', dialogue: "you're doing great 🌸" });
    } else {
      setMascot({ expression: '😄', dialogue: 'nice!!' });
    }
  }, [score]);

  // Cosmetic Timer (counts down, stops at 0, no Game Over!)
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0; // Remains 0s, continuous play allowed
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Helper to spawn a new paper airplane
  const spawnAirplane = () => {
    const id = airplaneIdCounter.current++;
    const top = Math.random() * 70 + 10; // 10% to 80% height inside arena
    const speed = 3800 + Math.random() * 2200; // 3.8s to 6s flight time
    const size = 38 + Math.random() * 16; // size
    const rotation = -10 + Math.random() * 20;
    const tints = ['#FF8FAB', '#FFC6D3', '#FFD166', '#4A3F35'];
    const tint = tints[Math.floor(Math.random() * tints.length)];

    return { id, top, speed, size, rotation, tint };
  };

  // Start Mission Button Handler
  const handleStartGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setTimeLeft(30);

    // Initial 4 airplanes
    const initialPlanes = [spawnAirplane(), spawnAirplane(), spawnAirplane(), spawnAirplane()];
    setAirplanes(initialPlanes);
  };

  // Click Airplane Target Handler
  const handlePlaneClick = (planeId, e) => {
    e.stopPropagation();
    if (gameState !== 'PLAYING') return;

    // Get click position for +1 floating text & paper burst
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    const clickX = e.clientX - (arenaRect?.left || 0);
    const clickY = e.clientY - (arenaRect?.top || 0);

    // 1. Trigger Paper Burst Particles
    triggerPaperBurst(e.clientX, e.clientY);

    // 2. Add Floating +1 Indicator
    const plusId = Date.now();
    setPlusOnes(prev => [...prev, { id: plusId, left: clickX, top: clickY }]);
    setTimeout(() => {
      setPlusOnes(prev => prev.filter(p => p.id !== plusId));
    }, 800);

    // 3. Remove caught airplane & spawn replacement
    setAirplanes(prev => prev.filter(p => p.id !== planeId).concat(spawnAirplane()));

    // 4. Update Score
    const newScore = score + 1;
    setScore(newScore);

    // 5. Check Completion (10 airplanes caught)
    if (newScore >= 10) {
      setGameState('COMPLETED');
      triggerConfettiBurst();
    }
  };

  // Paper Particle Burst on Airplane Catch
  const triggerPaperBurst = (x, y) => {
    const particles = [];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('span');
      p.innerText = ['✈️', '✨', '🌸', '📄'][Math.floor(Math.random() * 4)];
      p.style.position = 'fixed';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.fontSize = '14px';
      p.style.pointerEvents = 'none';
      p.style.zIndex = '9999';
      document.body.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-60, 20),
      scale: [1.2, 0],
      opacity: [1, 0],
      duration: 650,
      easing: 'easeOutCubic',
      complete: () => particles.forEach(p => p.remove())
    });
  };

  // Celebration Confetti Burst on Mission Accomplished
  const triggerConfettiBurst = () => {
    const confettiCount = 35;
    const particles = [];

    for (let i = 0; i < confettiCount; i++) {
      const p = document.createElement('span');
      p.innerText = ['🎉', '✈️', '🌸', '✨', '💌', '💖'][Math.floor(Math.random() * 6)];
      p.style.position = 'fixed';
      p.style.left = `${50 + (Math.random() - 0.5) * 50}%`;
      p.style.top = '35%';
      p.style.fontSize = `${14 + Math.random() * 14}px`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '9999';
      document.body.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-260, 260),
      translateY: () => anime.random(-150, 350),
      rotate: () => anime.random(-360, 360),
      scale: [{ value: 1.4, duration: 200 }, { value: 0, duration: 1200 }],
      opacity: [1, 0],
      duration: 1600,
      easing: 'easeOutCubic',
      complete: () => particles.forEach(p => p.remove())
    });
  };

  // Scroll to SecretMessage Section Handler
  const handleOpenSecret = () => {
    const secretSection = document.getElementById(SECTION_IDS.SECRET_MESSAGE);
    if (secretSection) {
      secretSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageSection id={SECTION_IDS.MINI_GAME} className={styles.gameSection}>
      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Section Header */}
        <div className={styles.headerArea}>
          <h2 className={styles.mainTitle}>mini challenge ✈️</h2>
          <p className={styles.subtitle}>
            ek chhota sa game...<br />phir ek secret dikhaunga 🌸
          </p>
        </div>

        {/* Game Card Shell */}
        <div className={styles.gameCardShell}>
          <div className={styles.washiTapeLeft} />
          <div className={styles.washiTapeRight} />

          {/* 1. PRE-GAME STATE */}
          {gameState === 'PRE_GAME' && (
            <div className={styles.preGameArea}>
              <h3 className={styles.missionTitle}>
                Mission: 10 paper airplanes pakadne hain ✈️
              </h3>
              <p className={styles.missionSubtitle}>Ready, Captain? 😄</p>
              <button className={styles.startButton} onClick={handleStartGame} type="button">
                Start Mission 🚀
              </button>
            </div>
          )}

          {/* 2. PLAYING STATE */}
          {gameState === 'PLAYING' && (
            <div style={{ width: '100%' }}>
              {/* Scoreboard & Cosmetic Timer */}
              <div className={styles.scoreboard}>
                <div className={styles.scoreText}>
                  Airplanes caught: <strong>{score}</strong> / 10
                </div>
                <div className={styles.timerDisplay}>
                  ⏱️ {timeLeft > 0 ? `${timeLeft}s` : 'Bonus time! 🌸'}
                </div>
              </div>

              {/* Washi Tape Progress Bar */}
              <div className={styles.washiProgressBar}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span 
                    key={i} 
                    className={`${styles.progressCheck} ${i < score ? styles.filled : ''}`}
                  >
                    {i < score ? '✓' : '🌸'}
                  </span>
                ))}
              </div>

              {/* Flying Airplanes Arena */}
              <div ref={arenaRef} className={styles.gameArena}>
                {/* Mascot Flight Controller Cheerleader */}
                <div className={styles.mascotWrapper} title="Flight Controller Mascot">
                  <div className={styles.mascotBubble}>{mascot.dialogue}</div>
                  <svg className={styles.mascotSvg} viewBox="0 0 100 70" fill="none">
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

                {/* Flying Airplanes */}
                {airplanes.map((plane) => (
                  <div
                    key={plane.id}
                    className={styles.airplaneTarget}
                    style={{
                      top: `${plane.top}%`,
                      transform: `rotate(${plane.rotation}deg)`
                    }}
                    onClick={(e) => handlePlaneClick(plane.id, e)}
                  >
                    <svg 
                      className={styles.planeSvg} 
                      width={plane.size} 
                      height={plane.size} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={plane.tint} 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#FFFDF8" />
                    </svg>
                  </div>
                ))}

                {/* Floating +1 Text Indicators */}
                {plusOnes.map(p => (
                  <span key={p.id} className={styles.floatingPlusOne} style={{ left: p.left, top: p.top }}>
                    +1 ✈️
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3. COMPLETED STATE - Sealed Secret Envelope */}
          {gameState === 'COMPLETED' && (
            <div className={styles.completionArea}>
              <div className={styles.secretEnvelope}>
                <div className={styles.envelopeIcon}>💌</div>
                <h3 className={styles.envelopeText}>Secret unlocked 💌</h3>
                <p className="handwritten-text" style={{ fontSize: '1.2rem', color: 'var(--color-muted)' }}>
                  You caught all 10 airplanes!
                </p>
                <button className={styles.openSecretBtn} onClick={handleOpenSecret} type="button">
                  Open it 👉
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </PageSection>
  );
};

export default MiniGame;
