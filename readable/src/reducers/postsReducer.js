import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  posts: {},
  postOrder: [],
  voting: false,
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

    case ActionTypes.POSTS_VOTE:
      return {
        ...state,
        voting: true,
      };

    case ActionTypes.POSTS_VOTE_FINISHED:
      if (!payload.post) {
        return { ...state, voting: false };
      }
      return {
        ...state,
        voting: false,
        posts: {
          ...state.posts,
          [payload.post.id]: payload.post,
        },
      };

    default:
      return state;
  }
};
