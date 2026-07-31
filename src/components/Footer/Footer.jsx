import React from 'react';
import { SECTION_IDS } from '../../utils/constants';
import styles from './Footer.module.css';

/**
 * Footer Section Placeholder
 */
export const Footer = () => {
  return (
    <footer id={SECTION_IDS.FOOTER} className={`${styles.footer} anime-reveal-element`}>
      <div className={styles.footerContent}>
        <p className="handwritten-text" style={{ fontSize: '1.4rem', color: 'var(--color-muted)' }}>
          Made with lots of ❤️ for Mishti
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
          Stay cute, stay awesome ✨
        </p>
      </div>
    </footer>
  );
};

export default Footer;
