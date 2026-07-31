import React from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import styles from './PageSection.module.css';

/**
 * PageSection - Reusable section wrapper component.
 * Handles viewport spacing and binds IntersectionObserver scroll reveal.
 */
export const PageSection = ({ id, children, className = '' }) => {
  const sectionRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`${styles.sectionContainer} anime-reveal-element ${className}`}
    >
      {children}
    </section>
  );
};

export default PageSection;
