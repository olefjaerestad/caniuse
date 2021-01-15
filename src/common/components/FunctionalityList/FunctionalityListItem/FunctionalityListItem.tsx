import React from 'react';
import styles from './FunctionalityListItem.module.css';
import { IFunctionality } from '../../../types/functionality-types';

interface IProps {
  name: string,
  functionality: IFunctionality['functionality'],
}

export function FunctionalityListItem({name, functionality}: IProps) {
  return (
    <li className={styles.item} id={`feature--${name}`}>
      {name}<br/>
      {functionality.title}<br/>
      Meets critical threshold: {functionality.supportStatusCritical}<br/>
      Meets non critical threshold: {functionality.supportStatusNonCritical}<br/>
      <a href={functionality.url} title={`Read more about ${functionality.title} at caniuse.com`}>{functionality.url}</a>
    </li>
  )
}
