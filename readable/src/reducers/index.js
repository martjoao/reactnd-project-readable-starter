import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import appStateReducer from './appStateReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  app: appStateReducer,
});
