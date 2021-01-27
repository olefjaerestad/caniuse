import React from 'react';

interface IProps {
  color: string; // any valid css color value
}

/**
 * C controlpoint1, controlpoint2, end
 * Q controlpoint1, end
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
 */
export function SunIcon({color}: IProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      role="img" 
      aria-label="Illustration of the sun"
    >
      <circle r="20" cx="50" cy="50" fill={color} />
      <line x1="50" y1="25" x2="50" y2="0" stroke={color} strokeWidth="10" />
      <line x1="75" y1="50" x2="100" y2="50" stroke={color} strokeWidth="10" />
      <line x1="50" y1="75" x2="50" y2="100" stroke={color} strokeWidth="10" />
      <line x1="25" y1="50" x2="0" y2="50" stroke={color} strokeWidth="10" />
      {/* Diagonal lines: */}
      <line x1="67.5" y1="32.5" x2="80" y2="20" stroke={color} strokeWidth="10" />
      <line x1="67.5" y1="67.5" x2="80" y2="80" stroke={color} strokeWidth="10" />
      <line x1="32.5" y1="67.5" x2="20" y2="80" stroke={color} strokeWidth="10" />
      <line x1="32.5" y1="32.5" x2="20" y2="20" stroke={color} strokeWidth="10" />
    </svg>
  );
}
