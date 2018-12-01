import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  posts: {},
  postOrder: [],
  loading: false,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.POSTS_GET:
      return { ...state, loading: true, error: false };

    case ActionTypes.POSTS_GET_FINISHED:
      return {
        ...state,
        loading: false,
        error: payload.error,
        postOrder: payload.posts.map(post => post.id),
        posts: payload.posts.reduce((accumulator, current) => {
          accumulator[current.id] = current;
          return accumulator;
        }, {}),
      };

    default:
      return state;
  }
};
