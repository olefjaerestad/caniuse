import React from 'react';

interface IProps {
  color: string; // any valid css color value
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
 */
export function CrossIcon({color}: IProps) {
  return (
    <svg viewBox="0 0 100 100">
      <line x1="7.5" y1="7.5" x2="92.5" y2="92.5" stroke={color} strokeWidth="15" strokeLinecap="round" />
      <line x1="7.5" y1="92.5" x2="92.5" y2="7.5" stroke={color} strokeWidth="15" strokeLinecap="round" />
    </svg>
  );
}
