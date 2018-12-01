import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';

export const getCategories = () => (
  axios.get(`${SERVER_URL}/categories`));

export const getPosts = (category) => {
  if (category) {
    return axios.get(`${SERVER_URL}/categories/${category}/posts`);
  }
  return axios.get(`${SERVER_URL}/posts`);
};

export const addPost = post => (
  axios.post(`${SERVER_URL}/posts`, post));

export const getPost = postId => (
  axios.get(`${SERVER_URL}/posts/${postId}`));

export const votePost = (postId, option) => (
  axios.post(`${SERVER_URL}/posts/${postId}`, { option }));

export const editPost = (postId, postDetails) => (
  axios.put(`${SERVER_URL}/posts/${postId}`, postDetails));

export const deletePost = postId => (
  axios.delete(`${SERVER_URL}/posts/${postId}`));

export const getPostComments = postId => (
  axios.get(`${SERVER_URL}/posts/${postId}/comments`));

export const addComment = comment => (
  axios.post(`${SERVER_URL}/comments`, comment));

export const getComment = commentId => (
  axios.get(`${SERVER_URL}/comments/${commentId}`));

export const voteComment = (commentId, option) => (
  axios.post(`${SERVER_URL}/comments/${commentId}`, { option }));

export const editComment = (commentId, commentDetails) => (
  axios.put(`${SERVER_URL}/comments/${commentId}`, commentDetails));

export const deleteComment = commentId => (
  axios.delete(`${SERVER_URL}/comments/${commentId}`));
