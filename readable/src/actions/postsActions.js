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

export const setSortOrder = (sortBy, sortOrder) => action(
  ActionTypes.POSTS_SET_SORT_ORDER, { sortBy, sortOrder },
);

export const createPost = post => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.POSTS_CREATE));
    const response = await API.addPost(post);
    const { data } = response;
    dispatch(successAction(ActionTypes.POSTS_CREATE_FINISHED, { post: data }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.POSTS_CREATE_FINISHED));
  }
};

export const updatePost = (postId, post) => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.POSTS_EDIT));
    const response = await API.editPost(postId, post);
    const { data } = response;
    dispatch(successAction(ActionTypes.POSTS_EDIT_FINISHED, { post: data }));
  } catch (error) {
    dispatch(errorAction(ActionTypes.POSTS_EDIT_FINISHED));
  }
};
