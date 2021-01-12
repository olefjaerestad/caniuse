import { getType } from 'typesafe-actions';
import { setFunctionalities } from './functionality-actions';
import { IFunctionalityState, TFunctionalityAction } from './functionality-types';

const initialState: IFunctionalityState = {
  functionalities: {}
}

export function functionalityReducer(state = initialState, action: TFunctionalityAction) {
  switch (action.type) {
    case getType(setFunctionalities):
      return {
        ...state,
        functionalities: action.payload,
      };
    default:
      return state;
  }
}
