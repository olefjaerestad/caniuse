import { createAction } from 'typesafe-actions';
import { IFeatures } from '../../types/feature-types';

export const setFeatures = createAction('SET_FEATURES')<IFeatures>();
