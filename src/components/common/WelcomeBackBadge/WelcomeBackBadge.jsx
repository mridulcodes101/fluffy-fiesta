import React, { useState, useEffect } from 'react';
import styles from './WelcomeBackBadge.module.css';

/**
 * WelcomeBackBadge - Displays "Welcome back 🌸" badge if user has visited before.
 */
export const WelcomeBackBadge = () => {
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem('mishti_visited');
      if (hasVisited) {
        setIsReturningVisitor(true);
      } else {
        localStorage.setItem('mishti_visited', 'true');
      }
    } catch (e) {}
  }, []);

  if (!isReturningVisitor) return null;

  return (
    <div className={styles.welcomeBackBadge}>
      Welcome back 🌸
    </div>
  );
};

export default WelcomeBackBadge;
