import * as ActionTypes from './types';
import * as API from '../utils/api';
import { action, successAction, errorAction } from '../utils/actionBuilder';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(action(ActionTypes.POSTS_GET));
    const response = await API.getPosts();
    const { data } = response;
    console.log(data);
    dispatch(successAction(ActionTypes.POSTS_GET_FINISHED, { posts: data }));
  } catch (error) {
    console.log(error);
    dispatch(errorAction(ActionTypes.POSTS_GET_FINISHED));
  }
};

export const getPost = 2;
