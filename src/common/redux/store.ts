import { combineReducers, createStore } from 'redux';
import { functionalityReducer } from './functionality/functionality-reducer';
import { StateType } from 'typesafe-actions';

function createRootReducer() {
  return combineReducers({
    functionality: functionalityReducer
  })
}

export type TRootState = StateType<ReturnType<typeof createRootReducer>>;

export const store = createStore(createRootReducer());
