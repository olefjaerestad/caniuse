import React from 'react';
import styles from './FeatureTable.module.css';
import { FeatureTableItem } from './FeatureTableItem/FeatureTableItem';
import { getFeatures } from '../../redux/feature/feature-selectors';
import { useSelector } from 'react-redux';

export function FeatureTable() {
  const features = useSelector(getFeatures);

  // TODO: Add sorting
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__row}>
          <div className={styles.header__data}>Feature</div>
          <div className={styles.header__data}>Meets critical threshold</div>
          <div className={styles.header__data}>Meets non-critical threshold</div>
        </div>
      </div>
      <table className={styles.table}>
        <tbody>
          {Object.entries(features).map(([name, feature]) => {
            return <FeatureTableItem name={name} feature={feature} />
          })}
        </tbody>
      </table>
    </>
  )
}
