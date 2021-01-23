import React from 'react';
import styles from './FeatureTable.module.css';
import { FeatureTableItem } from './FeatureTableItem/FeatureTableItem';
import { getFeatures } from '../../redux/feature/feature-selectors';
import { useSelector } from 'react-redux';

export function FeatureTable() {
  const features = useSelector(getFeatures);

  // TODO: Add sorting
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Feature</td>
          <td>Meets critical threshold</td>
          <td>Meets non-critical threshold</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(features).map(([name, feature]) => {
          return <FeatureTableItem name={name} feature={feature} />
        })}
      </tbody>
    </table>
  )
}
