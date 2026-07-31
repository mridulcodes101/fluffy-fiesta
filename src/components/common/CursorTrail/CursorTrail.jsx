import React from 'react';
import useCursorTrail from '../../../hooks/useCursorTrail';
import styles from './CursorTrail.module.css';

/**
 * CursorTrail - Handles trailing heart particles following the mouse.
 */
export const CursorTrail = ({ enabled = true }) => {
  useCursorTrail(enabled);

  return <div className={styles.cursorContainer} aria-hidden="true" />;
};

export default CursorTrail;
