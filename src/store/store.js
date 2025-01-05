// src/store/store.js
import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import quizReducer from './reducers/quizReducer';

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
});

const store = createStore(rootReducer);

export default store;
