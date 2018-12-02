import * as ActionTypes from './types';
import * as API from '../utils/api';
import { action, successAction, errorAction } from '../utils/actionBuilder';

export const getComments = postId => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.COMMENTS_GET));
    const response = await API.getPostComments(postId);
    const { data } = response;
    dispatch(successAction(ActionTypes.COMMENTS_GET_FINISHED, { comments: data, postId }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.COMMENTS_GET_FINISHED));
  }
};

export const voteOnComment = (commentId, upVote = true) => async (dispatch) => {
  try {
    const option = upVote ? 'upVote' : 'downVote';
    dispatch(action(ActionTypes.COMMENTS_VOTE, { commentId }));
    const response = await API.voteComment(commentId, option);
    const comment = response.data;
    dispatch(successAction(ActionTypes.COMMENTS_VOTE_FINISHED, { comment }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.COMMENTS_VOTE_FINISHED));
  }
};

export const deleteComment = commentId => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.COMMENTS_DELETE, { commentId }));
    await API.deleteComment(commentId);
    dispatch(successAction(ActionTypes.COMMENTS_DELETE_FINISHED, { commentId }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.COMMENTS_DELETE_FINISHED));
  }
};

export const createComment = comment => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.COMMENTS_CREATE));
    const response = await API.addComment(comment);
    const { data } = response;
    console.log(response);
    console.log(data);
    dispatch(successAction(ActionTypes.COMMENTS_CREATE_FINISHED, { comment: data }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.COMMENTS_GET_FINISHED));
  }
};
