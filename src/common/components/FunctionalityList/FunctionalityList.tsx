import React from 'react';
import { FunctionalityListItem } from './FunctionalityListItem/FunctionalityListItem';
import { getFunctionalities } from '../../redux/functionality/functionality-selectors';
import { useSelector } from 'react-redux';

export function FunctionalityList() {
  const functionalities = useSelector(getFunctionalities);
  // console.log('functionalities');
  // console.log(functionalities);

  return (
    <ul>
      {Object.entries(functionalities).map(([name, functionality]) => {
        return <FunctionalityListItem name={name} functionality={functionality} />
      })}
    </ul>
  )
}
