import { createAction } from 'typesafe-actions';
import { IFunctionality } from '../../types/functionality-types';

export const setFunctionalities = createAction('SET_FUNCTIONALITIES')<IFunctionality>();
