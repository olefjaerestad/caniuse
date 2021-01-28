import React from 'react';
import styles from './LoadingSymbol.module.css';
import { useFetchProgress } from '../../custom-hooks/useFetchProgress';

/**
 * a radiusX,radiusY rotateX largeArcFlag,sweepFlag endX,endY
 * https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path#answer-10477334
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
 */
export function LoadingSymbol() {
  const progress = useFetchProgress(0);

  if (progress <= 0 || progress >= 100) {
    return null;
  }
  
  // Using path instead of circle to make sure path starts at top of circle.
  return (
    <svg viewBox="0 0 100 100" className={styles.symbol}>
      <circle 
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="hsl(var(--color-background))"
        strokeWidth="10"
      />
      <path 
        fill="none" 
        stroke={progress === 0 ? 'lighGray' : 'hsl(var(--color-info))'}
        strokeWidth="10"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - progress}
        d="
          M 50,50
          m 0, -45
          a 45,45 0 1,1 0,90
          a 45,45 0 1,1 0,-90
        "
      />
    </svg>
  );
}
