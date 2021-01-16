import { getType } from 'typesafe-actions';
import { setFeatures } from './feature-actions';
import { IFeatureState, TFeatureAction } from './feature-types';

const initialState: IFeatureState = {
  features: {}
}

export function featureReducer(state = initialState, action: TFeatureAction) {
  switch (action.type) {
    case getType(setFeatures):
      return {
        ...state,
        features: action.payload,
      };
    default:
      return state;
  }
}
