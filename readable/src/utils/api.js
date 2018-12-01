import AxiosLib from 'axios';

const SERVER_URL = 'http://localhost:3001';
const AUTHORIZATION_TOKEN = 'REACTND_RANDOM_AUTH_TOKEN_HERE';

const axios = AxiosLib.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

axios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.headers.authorization = AUTHORIZATION_TOKEN;
    return newConfig;
  },
  error => Promise.reject(error),
);

export const getCategories = () => (
  axios.get('/categories'));

export const getPosts = (category) => {
  if (category) {
    return axios.get(`/categories/${category}/posts`);
  }
  return axios.get('/posts');
};

export const addPost = post => (
  axios.post('/posts', post));

export const getPost = postId => (
  axios.get(`/posts/${postId}`));

export const votePost = (postId, option) => (
  axios.post(`/posts/${postId}`, { option }));

export const editPost = (postId, postDetails) => (
  axios.put(`/posts/${postId}`, postDetails));

export const deletePost = postId => (
  axios.delete(`/posts/${postId}`));

export const getPostComments = postId => (
  axios.get(`/posts/${postId}/comments`));

export const addComment = comment => (
  axios.post('/comments', comment));

export const getComment = commentId => (
  axios.get(`/comments/${commentId}`));

export const voteComment = (commentId, option) => (
  axios.post(`/comments/${commentId}`, { option }));

export const editComment = (commentId, commentDetails) => (
  axios.put(`/comments/${commentId}`, commentDetails));

export const deleteComment = commentId => (
  axios.delete(`/comments/${commentId}`));
