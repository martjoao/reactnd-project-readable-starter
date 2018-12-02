import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  posts: {},
  postOrder: [],
  voting: false,
  deleting: false,
  loading: false,
  error: false,
  sortBy: 'voteScore',
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

    case ActionTypes.POSTS_DELETE:
      return {
        ...state,
        deleting: true,
      };

    case ActionTypes.POSTS_DELETE_FINISHED:
      if (!payload.error) {
        newState = { ...state };
        delete newState.posts[payload.postId];
        newState.postOrder = newState
          .postOrder.filter(item => item !== payload.postId);
      }
      return newState;

    case ActionTypes.POSTS_SET_SORT_ORDER:
      return {
        ...state,
        sortBy: payload.sortBy || state.sortBy,
        sortOrder: payload.sortOrder || state.sortOrder,
      };

    default:
      return state;
  }
};
