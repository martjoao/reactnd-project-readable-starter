import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  posts: {},
  voting: false,
  deleting: false,
  loading: false,
  creating: false,
  editing: false,
  error: false,
  sortBy: 'timestamp',
  sortOrder: 'desc',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  // Auxiliary variable for some actions
  let newState = state;

  switch (type) {
    case ActionTypes.POSTS_GET:
      return { ...state, loading: true, error: false };

    case ActionTypes.POSTS_GET_FINISHED:
      return {
        ...state,
        loading: false,
        error: payload.error,
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

    case ActionTypes.POSTS_DELETE:
      return {
        ...state,
        deleting: true,
      };

    case ActionTypes.POSTS_DELETE_FINISHED:
      if (!payload.error) {
        newState = { ...state };
        delete newState.posts[payload.postId];
      }
      return newState;

    case ActionTypes.POSTS_SET_SORT_ORDER:
      return {
        ...state,
        sortBy: payload.sortBy || state.sortBy,
        sortOrder: payload.sortOrder || state.sortOrder,
      };

    case ActionTypes.POSTS_CREATE:
      return { ...state, creating: true };

    case ActionTypes.POSTS_EDIT:
      return { ...state, editing: true };

    case ActionTypes.POSTS_CREATE_FINISHED:
    case ActionTypes.POSTS_EDIT_FINISHED:
      return {
        ...state,
        error: payload.error,
        posts: {
          ...state.posts,
          [payload.post.id]: payload.post,
        },
      };

    default:
      return state;
  }
};
