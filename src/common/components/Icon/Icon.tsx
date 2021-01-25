import React from 'react';
import { CheckmarkIcon } from './CheckmarkIcon/CheckmarkIcon';
import { CrossIcon } from './CrossIcon/CrossIcon';

export interface IProps {
  icon: 'checkmark' | 'cross';
  color?: string; // any valid css color value
}

export function Icon({color, icon}: IProps) {
  color = color || 'currentColor';
  let iconElement: JSX.Element = null;
  
  switch (icon) {
    case 'checkmark':
      iconElement = <CheckmarkIcon color={color} />;
      break;
    case 'cross':
      iconElement = <CrossIcon color={color} />;
      break;
    default:
      iconElement = null;
      break;
  }

  return (
    <span className="icon">
      {iconElement}
    </span>
  )
}
