import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  showPostForm: false,
  showCommentForm: false,

  // If forms are open in 'edit mode', these vars will hold the id of the resource being edited
  editingPost: null,
  editingComment: null,

  // If creating a comment, store comment's parent
  commentParent: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.APP_SET_COMMENT_FORM:
      return {
        ...state,
        showCommentForm: payload.visible,
        editingComment: payload.comment,
        commentParent: payload.commentParent,
      };

    case ActionTypes.APP_SET_POST_FORM:
      return {
        ...state,
        showPostForm: payload.visible,
        editingPost: payload.post,
      };

    default:
      return state;
  }
};
