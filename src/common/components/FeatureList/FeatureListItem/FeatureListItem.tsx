import React from 'react';
import styles from './FeatureListItem.module.css';
import { IFeatures } from '../../../types/feature-types';

interface IProps {
  name: string,
  feature: IFeatures['feature'],
}

export function FeatureListItem({name, feature}: IProps) {
  return (
    <li className={styles.item} id={`feature--${name}`}>
      {name}<br/>
      {feature.title}<br/>
      Meets critical threshold: {feature.supportStatusCritical}<br/>
      Meets non critical threshold: {feature.supportStatusNonCritical}<br/>
      <a href={feature.url} title={`Read more about ${feature.title} at caniuse.com`}>{feature.url}</a>
    </li>
  )
}
