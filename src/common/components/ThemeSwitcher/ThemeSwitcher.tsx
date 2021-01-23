import React, { KeyboardEvent, MouseEvent } from 'react';

interface ICssPropertiesAlternateMapping {
  [key: string]: string;
}

const cssMappings: ICssPropertiesAlternateMapping = {
  '--color-background': '--color-background-alternate',
  '--color-foreground': '--color-foreground-alternate',
  '--color-primary': '--color-primary-alternate',
  '--color-shadow': '--color-shadow-alternate',
  '--color-text': '--color-text-alternate',
}

function switchCssValues(propertyMapping: ICssPropertiesAlternateMapping) {
  /* https://www.joshwcomeau.com/css/css-variables-for-react-devs/ */

  // We're just switching values here, we could do something more fancy if we need to.
  Object.entries(propertyMapping).forEach(([current, next]) => {
    const currentVal = getComputedStyle(document.documentElement).getPropertyValue(current);
    const nextVal = getComputedStyle(document.documentElement).getPropertyValue(next);

    document.documentElement.style.setProperty(current, nextVal);
    document.documentElement.style.setProperty(next, currentVal);
  });
}

export function ThemeSwitcher() {
  function handleClick(e: MouseEvent | KeyboardEvent) {
    if ( e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') {
      return;
    }
    
    switchCssValues(cssMappings);
  }

  return <button onClick={handleClick} onKeyUp={handleClick}>Switch theme</button>
}
