import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Hook to create and control an Anime.js timeline instance.
 * @param {Object} timelineConfig Anime.js timeline configuration
 */
export const useAnimeTimeline = (timelineConfig = {}) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    timelineRef.current = anime.timeline({
      autoplay: false,
      easing: 'easeOutCubic',
      ...timelineConfig
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, []);

  const play = () => {
    if (timelineRef.current) timelineRef.current.play();
  };

  const restart = () => {
    if (timelineRef.current) timelineRef.current.restart();
  };

  return {
    timeline: timelineRef.current,
    timelineRef,
    play,
    restart
  };
};

export default useAnimeTimeline;
