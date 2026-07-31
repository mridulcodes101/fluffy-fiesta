import { useEffect, useRef } from 'react';
import { animateFadeUp } from '../utils/animationHelpers';

/**
 * Custom hook to trigger Anime.js entrance animation when target ref enters the viewport.
 * @param {Object} options Configuration options for animation & observer threshold
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateFadeUp(entry.target, {
              duration: options.duration || 900,
              delay: options.delay || 0,
              easing: options.easing || 'easeOutCubic'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.threshold, options.duration, options.delay, options.easing, options.rootMargin]);

  return elementRef;
};

export default useScrollAnimation;
