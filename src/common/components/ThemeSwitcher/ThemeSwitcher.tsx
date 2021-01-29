import React, { MouseEvent, useRef, useState } from 'react';
import styles from './ThemeSwitcher.module.css';
import { Icon } from '../Icon/Icon';

interface ICssPropertiesAlternateMapping {
  [key: string]: string;
}

const cssMappings: ICssPropertiesAlternateMapping = {
  '--color-background': '--color-background-alternate',
  '--color-foreground': '--color-foreground-alternate',
  '--color-primary': '--color-primary-alternate',
  '--color-shadow': '--color-shadow-alternate',
  '--color-text': '--color-text-alternate',
  '--color-anchor': '--color-anchor-alternate',
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const buttonEl = useRef<HTMLButtonElement>();

  function handleClick(e: MouseEvent) {    
    switchCssValues(cssMappings);
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function handleMouseLeave(e: MouseEvent) {
    // This might be a bad idea, UX wise?
    buttonEl.current.blur();
  }

  return (
    <button 
      className={styles.button}
      onClick={handleClick} 
      onMouseLeave={handleMouseLeave}
      ref={buttonEl}
    >
      <span className={styles.button__inner}>
        <span className={styles.button__text}>
          Switch<span className="sr"> to {theme === 'light' ? 'dark' : 'light'} color</span> theme
        </span>
        {
          theme === 'light' 
          ? <Icon icon="moon" color="hsl(var(--color-primary-alternate))" /> 
          : <Icon icon="sun" color="hsl(var(--color-primary-alternate))" />
        }
      </span>
    </button>
  );
}
