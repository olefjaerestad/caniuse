import React from 'react';
import styles from './FeatureList.module.css';
import { FeatureListItem } from './FeatureListItem/FeatureListItem';
import { getFeatures } from '../../redux/feature/feature-selectors';
import { useSelector } from 'react-redux';

export function FeatureList() {
  const features = useSelector(getFeatures);

  // TODO: Add sorting
  return (
    <ul className={styles.list}>
      <li className={styles.list__header}>
        <span>Feature</span>
        <span>Meets critical threshold</span>
        <span>Meets non-critical threshold</span>
      </li>
      {Object.entries(features).map(([name, feature]) => {
        return <FeatureListItem name={name} feature={feature} />
      })}
    </ul>
  )
}
