import { combineReducers, createStore } from 'redux';
import { functionalityReducer } from './functionality/functionality-reducer';
import { StateType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

export type TRootState = StateType<ReturnType<typeof createRootReducer>>;

export function createRootStore() {
  if (__IS_BROWSER__) {
    const store = createStore(
      createRootReducer(),
      window.__PRELOADED_STATE__ || {},
      composeWithDevTools()
    );

    delete window.__PRELOADED_STATE__; // Ready for garbage collection.

    return store;
  }
  
  return createStore(createRootReducer());
}

export const store = createRootStore();

function createRootReducer() {
  return combineReducers({
    functionality: functionalityReducer
  })
}
