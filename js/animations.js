/**
 * For Mishti ❤️ - Reusable Animation Utilities & Hero Animations using Anime.js
 */

const MishtiAnimations = (function () {
  'use strict';

  /**
   * 1. Continuous gentle bobbing & rotation for the floating paper note ("Scroll slowly 🌸")
   */
  function initFloatingPaperNote() {
    const note = document.querySelector('.floating-paper-note');
    if (!note || typeof anime === 'undefined') return;

    anime({
      targets: note,
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
  }

  /**
   * 2. Slow continuous floating for decorative background SVGs (stars, hearts, flowers, paperclips)
   */
  function initFloatingDecorations() {
    const decors = document.querySelectorAll('.floating-decor');
    if (!decors.length || typeof anime === 'undefined') return;

    decors.forEach((el, index) => {
      const duration = 4500 + (index % 4) * 1200;
      const translateYVal = 10 + (index % 3) * 6;
      const rotateVal = 8 + (index % 5) * 4;

      anime({
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
        delay: index * 200
      });
    });
  }

  /**
   * 3. Viewport entrance fade-up animation for sections & cards using IntersectionObserver + Anime.js
   */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          if (typeof anime !== 'undefined') {
            anime({
              targets: target,
              opacity: [0, 1],
              translateY: [35, 0],
              duration: 900,
              easing: 'easeOutCubic',
              complete: function () {
                target.style.transform = 'none';
              }
            });
          } else {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }

          obs.unobserve(target);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
  }

  /**
   * 4. HERO SECTION STAGGERED ENTRANCE SEQUENCE
   * Sequence:
   * 1. Small label -> 2. Heading -> 3. Subtitle 1 -> 4. Subtitle 2 (delayed ~2s) -> 5. Illustration -> 6. Button -> 7. Sticky Notes
   */
  function animateHeroSequence() {
    if (typeof anime === 'undefined') return;

    // Set initial opacity to 0 for hero sequence items
    const heroItems = document.querySelectorAll('.hero-label, .hero-heading, .hero-sub1, .hero-sub2, .hero-illustration-container, .hero-button-wrapper, .sticky-note');
    heroItems.forEach(item => {
      item.style.opacity = '0';
    });

    const timeline = anime.timeline({
      easing: 'easeOutCubic'
    });

    timeline
      .add({
        targets: '.hero-label',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 750
      })
      .add({
        targets: '.hero-heading',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 750
      }, '-=400')
      .add({
        targets: '.hero-sub1',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700
      }, '-=350')
      .add({
        targets: '.hero-sub2',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
      }, '+=1100') // ~2 seconds after sub1 starts
      .add({
        targets: '.hero-illustration-container',
        opacity: [0, 1],
        scale: [0.92, 1],
        translateY: [20, 0],
        duration: 800
      }, '-=200')
      .add({
        targets: '.hero-button-wrapper',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700
      }, '-=300')
      .add({
        targets: '.sticky-note',
        opacity: [0, 1],
        scale: [0.7, 1],
        delay: anime.stagger(140),
        duration: 600,
        easing: 'easeOutBack'
      }, '-=300');
  }

  /**
   * 5. HERO BUTTON CLICK - BURST OF HEARTS & SMOOTH SCROLL
   */
  function initHeroButtonInteraction() {
    const btn = document.getElementById('hero-cta-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Spawn 10 tiny heart particles around button
      const numHearts = 10;
      const hearts = [];

      for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('span');
        heart.innerText = i % 2 === 0 ? '❤️' : '🌸';
        heart.style.position = 'fixed';
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.fontSize = `${12 + Math.random() * 10}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        hearts.push(heart);
      }

      if (typeof anime !== 'undefined') {
        anime({
          targets: hearts,
          translateX: () => anime.random(-70, 70),
          translateY: () => anime.random(-70, -120),
          scale: [
            { value: 1.4, duration: 200, easing: 'easeOutSine' },
            { value: 0, duration: 600, easing: 'easeInQuad' }
          ],
          opacity: [1, 0],
          easing: 'easeOutCubic',
          duration: 800,
          complete: () => {
            hearts.forEach(h => h.remove());
          }
        });
      }

      // Smooth scroll to next section (#little-thoughts) after a tiny delay
      setTimeout(() => {
        const nextSection = document.getElementById('little-thoughts');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    });
  }

  /**
   * 6. SUBTLE TRAILING HEART CURSOR EFFECT
   */
  function initTrailingHeartCursor() {
    let lastTime = 0;

    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTime < 90) return; // Throttle to prevent high CPU usage
      lastTime = now;

      const heart = document.createElement('span');
      heart.className = 'trailing-heart';
      heart.innerText = Math.random() > 0.4 ? '❤️' : '✨';
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      heart.style.opacity = '0.75';
      heart.style.fontSize = `${11 + Math.random() * 6}px`;

      document.body.appendChild(heart);

      if (typeof anime !== 'undefined') {
        anime({
          targets: heart,
          translateY: -25 - Math.random() * 20,
          translateX: (Math.random() - 0.5) * 20,
          opacity: [0.75, 0],
          scale: [1, 0.4],
          duration: 900,
          easing: 'easeOutQuad',
          complete: () => heart.remove()
        });
      } else {
        setTimeout(() => heart.remove(), 700);
      }
    });
  }

  /**
   * 7. HOVERING EMPTY BACKGROUND - OCCASIONAL POPPING FLOWER
   */
  function initBackgroundFlowerPop() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    let lastPop = 0;

    hero.addEventListener('mousemove', (e) => {
      // Trigger only when moving over background, not cards or buttons
      if (e.target !== hero && !e.target.classList.contains('decor-container')) return;

      const now = Date.now();
      if (now - lastPop < 1500) return; // Trigger at most every 1.5s
      lastPop = now;

      const flower = document.createElement('span');
      flower.className = 'popping-flower';
      flower.innerText = '🌸';
      flower.style.left = `${e.clientX}px`;
      flower.style.top = `${e.clientY}px`;

      document.body.appendChild(flower);

      if (typeof anime !== 'undefined') {
        anime({
          targets: flower,
          scale: [0, 1.2, 1, 0],
          translateY: -15,
          opacity: [0, 1, 1, 0],
          duration: 1400,
          easing: 'easeInOutCubic',
          complete: () => flower.remove()
        });
      } else {
        setTimeout(() => flower.remove(), 1200);
      }
    });
  }

  /**
   * Master initialization function
   */
  function initAll() {
    initFloatingPaperNote();
    initFloatingDecorations();
    initScrollReveal();
    animateHeroSequence();
    initHeroButtonInteraction();
    initTrailingHeartCursor();
    initBackgroundFlowerPop();
  }

  return {
    initAll: initAll,
    animateHeroSequence: animateHeroSequence,
    initHeroButtonInteraction: initHeroButtonInteraction,
    initTrailingHeartCursor: initTrailingHeartCursor,
    initBackgroundFlowerPop: initBackgroundFlowerPop
  };
})();
