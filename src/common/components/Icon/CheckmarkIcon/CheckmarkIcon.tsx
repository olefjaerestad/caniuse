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
export function CheckmarkIcon({color}: IProps) {
  return (
    <svg viewBox="0 0 100 100">
      <path fill="none" stroke={color} strokeWidth="15" strokeLinecap="round" d="
        M 8,50
        Q 30,65 40,80
        Q 45,50 92,8
      " />
    </svg>
  );
}
