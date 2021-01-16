import * as featureActions from './feature-actions';
import { ActionType } from 'typesafe-actions';
import { IFeatures } from '../../types/feature-types';

export interface IFeatureState {
  features: IFeatures
}

export type TFeatureAction = ActionType<typeof featureActions>;
