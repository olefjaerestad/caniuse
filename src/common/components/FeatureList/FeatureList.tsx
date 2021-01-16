import React from 'react';
import { FeatureListItem } from './FeatureListItem/FeatureListItem';
import { getFeatures } from '../../redux/feature/feature-selectors';
import { useSelector } from 'react-redux';

export function FeatureList() {
  const features = useSelector(getFeatures);
  // console.log('features');
  // console.log(features);

  return (
    <ul>
      {Object.entries(features).map(([name, feature]) => {
        return <FeatureListItem name={name} feature={feature} />
      })}
    </ul>
  )
}
