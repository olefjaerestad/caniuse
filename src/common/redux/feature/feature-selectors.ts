import { TRootState } from '../store';

export const getFeatures = (state: TRootState) => state.feature.features;
