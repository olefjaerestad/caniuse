import * as functionalityActions from './functionality-actions';
import { ActionType } from 'typesafe-actions';
import { IFunctionality } from '../../types/functionality-types';

export interface IFunctionalityState {
  functionalities: IFunctionality
}

export type TFunctionalityAction = ActionType<typeof functionalityActions>;
