import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  comments: {},
  voting: false,
  deleting: false,
  loading: false,
  error: false,
  creating: false,
  editing: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  // Auxiliary variable for some actions
  let newState = state;

  switch (type) {
    case ActionTypes.COMMENTS_GET:
      return { ...state, loading: true, error: false };

    case ActionTypes.COMMENTS_GET_FINISHED:
      return {
        ...state,
        loading: false,
        error: payload.error,
        comments: payload.comments.reduce((accumulator, current) => {
          accumulator[current.id] = current;
          return accumulator;
        }, {}),
      };

    case ActionTypes.COMMENTS_VOTE:
      return {
        ...state,
        voting: true,
      };

    case ActionTypes.COMMENTS_VOTE_FINISHED:
      if (!payload.comment) {
        return { ...state, voting: false };
      }
      return {
        ...state,
        voting: false,
        comments: {
          ...state.comments,
          [payload.comment.id]: payload.comment,
        },
      };

    case ActionTypes.COMMENTS_DELETE:
      return {
        ...state,
        deleting: true,
      };

    case ActionTypes.COMMENTS_DELETE_FINISHED:
      if (!payload.error) {
        newState = { ...state };
        delete newState.comments[payload.commentId];
      }
      return newState;

    case ActionTypes.COMMENTS_CREATE:
      return { ...state, creating: true };

    case ActionTypes.COMMENTS_EDIT:
      return { ...state, editing: true };

    case ActionTypes.COMMENTS_CREATE_FINISHED:
    case ActionTypes.COMMENTS_EDIT_FINISHED:
      return {
        ...state,
        error: payload.error,
        comments: {
          ...state.comments,
          [payload.comment.id]: payload.comment,
        },
      };

    default:
      return state;
  }
};
