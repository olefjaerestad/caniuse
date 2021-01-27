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
export function MoonIcon({color}: IProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      role="img" 
      aria-label="Illustration of the moon and some stars"
    >
      <path 
        fill={color} 
        d="
          M 55,1
          C 80,15 70,90 5,85
          C 110,130 125,10 55,1
        " 
      />
      <path
        id="moonstar" 
        fill={color}
        d="
          M 25, 0
          Q 25,25 50,25
          Q 25,25 25,50
          Q 25,25 0,25
          Q 25,25 25,0
        "
      />
      <use href="#moonstar" x="18" y="27" />
    </svg>
  );
}
