import * as ActionTypes from './types';
import { action } from '../utils/actionBuilder';

export const setCommentFormState = (visible, commentParent, editingComment) => (
  action(
    ActionTypes.APP_SET_COMMENT_FORM, {
      visible,
      // If hiding form, reset editing comment to null
      commentParent: visible ? commentParent : null,
      comment: visible ? editingComment : null,
    },
  )
);

export const setPostFormState = (visible, editingPost) => {
  // If hiding form, reset editing post to null
  const post = visible ? editingPost : null;

  return action(ActionTypes.APP_SET_POST_FORM, { visible, post });
};
