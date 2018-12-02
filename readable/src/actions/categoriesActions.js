import * as ActionTypes from './types';
import * as API from '../utils/api';
import { action, successAction, errorAction } from '../utils/actionBuilder';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.CATEGORIES_GET));
    const response = await API.getCategories();
    const data = response.data.categories;
    dispatch(successAction(ActionTypes.CATEGORIES_GET_FINISHED, { categories: data }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.CATEGORIES_GET_FINISHED));
  }
};
