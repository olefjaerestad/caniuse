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
      <div className={styles.header} aria-hidden="true">
        <div className={styles.header__row}>
          <div className={styles.header__data}>Feature</div>
          <div className={styles.header__data}>Use as critical</div>
          <div className={styles.header__data}>Use as non-critical</div>
        </div>
      </div>
      <table className={styles.table}>
        <caption className="sr">Table displaying whether or not a specific feature can be used as a critical or non-critical feature.</caption>
        <thead className="sr">
          <tr>
            <th>Feature</th>
            <th>Use as critical</th>
            <th>Use as non-critical</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(features).map(([name, feature]) => {
            return <FeatureTableItem name={name} feature={feature} key={name} />
          })}
        </tbody>
      </table>
    </>
  )
}
