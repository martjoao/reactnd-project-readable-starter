import * as ActionTypes from './types';
import { action } from '../utils/actionBuilder';

export const setCommentFormState = (visible, commentParent, editingComment) => {
  // If hiding form, reset editing comment to null
  const comment = visible ? editingComment : null;

  return action(ActionTypes.APP_SET_COMMENT_FORM, { visible, commentParent, comment });
};

export const setPostFormState = (visible, editingPost) => {
  // If hiding form, reset editing post to null
  const post = visible ? editingPost : null;

  return action(ActionTypes.APP_SET_COMMENT_FORM, { visible, post });
};
