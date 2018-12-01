import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CATEGORIES_GET:
      return { ...state, loading: true, error: false };

    case ActionTypes.CATEGORIES_GET_FINISHED:
      return {
        ...state,
        loading: false,
        error: payload.error,
        categories: payload.categories.map(cat => cat.name),
      };

    default:
      return state;
  }
};
