import * as ActionTypes from './types';
import * as API from '../utils/api';
import { action, successAction, errorAction } from '../utils/actionBuilder';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.POSTS_GET));
    const response = await API.getPosts();
    const { data } = response;
    dispatch(successAction(ActionTypes.POSTS_GET_FINISHED, { posts: data }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.POSTS_GET_FINISHED));
  }
};

export const voteOnPost = (postId, upVote = true) => async (dispatch) => {
  try {
    const option = upVote ? 'upVote' : 'downVote';
    dispatch(action(ActionTypes.POSTS_VOTE, { postId }));
    const response = await API.votePost(postId, option);
    const post = response.data;
    dispatch(successAction(ActionTypes.POSTS_VOTE_FINISHED, { post }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.POSTS_VOTE_FINISHED));
  }
};

export const deletePost = postId => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.POSTS_DELETE, { postId }));
    await API.deletePost(postId);
    dispatch(successAction(ActionTypes.POSTS_DELETE_FINISHED, { postId }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.POSTS_DELETE_FINISHED));
  }
};
