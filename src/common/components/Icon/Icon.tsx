import React from 'react';
import { CheckmarkIcon } from './CheckmarkIcon/CheckmarkIcon';
import { CrossIcon } from './CrossIcon/CrossIcon';
import { MoonIcon } from './MoonIcon/MoonIcon';
import { SunIcon } from './SunIcon/SunIcon';

export interface IProps {
  icon: 'checkmark' | 'cross' | 'moon' | 'sun';
  color?: string; // any valid css color value
}

type TIconComponent = (props: {color?: IProps['color']}) => JSX.Element;

export function Icon({color, icon}: IProps) {
  color = color || 'currentColor';
  let IconElement: TIconComponent = null;
  
  /* https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime */
  switch (icon) {
    case 'checkmark':
      IconElement = CheckmarkIcon;
      break;
    case 'cross':
      IconElement = CrossIcon;
      break;
    case 'moon':
      IconElement = MoonIcon;
      break;
    case 'sun':
      IconElement = SunIcon;
      break;
    default:
      IconElement = null;
      break;
  }

  return (
    <span className={`icon ${icon}`}>
      {IconElement && <IconElement color={color} />}
    </span>
  )
}
