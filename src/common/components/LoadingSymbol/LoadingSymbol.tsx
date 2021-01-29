import React, { useEffect, useState } from 'react';
import styles from './LoadingSymbol.module.css';
import { useFetchProgress } from '../../custom-hooks/useFetchProgress';

/**
 * a radiusX,radiusY rotateX largeArcFlag,sweepFlag endX,endY
 * https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path#answer-10477334
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
 */
export function LoadingSymbol() {
  const [isStarted, progress] = useFetchProgress(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Force displaying at least 250ms (in case of progress starting at 100)
  useEffect(() => {
    // How will this work with multiple simultaneous fetch requests?
    if (progress >= 100) {
      setTimeout(() => setIsFinished(true), 250);
    }

    return () => setIsFinished(false);
  }, [progress]);

  if (!isStarted || isFinished) {
    return null;
  }
  
  // Using path instead of circle to make sure path starts at top of circle.
  return (
    <svg viewBox="0 0 100 100" className={styles.symbol}>
      <circle 
        cx="50"
        cy="50"
        r="45"
        fill="hsl(var(--color-background))"
        stroke="hsl(var(--color-background))"
        strokeWidth="10"
      />
      <path 
        fill="none" 
        stroke={progress === 0 ? 'hsl(var(--color-background))' : 'hsl(var(--color-info))'}
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
      <text 
        fill="hsl(var(--color-text))"
        x="53" 
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="25"
      >
        {progress}%
      </text>
    </svg>
  );
}
