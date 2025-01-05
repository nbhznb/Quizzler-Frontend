// src/store/reducers/quizReducer.js
const initialState = {
    category: null,
    score: 0,
  };

  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return {
          ...state,
          category: action.payload,
        };
      case 'SET_SCORE':
        return {
          ...state,
          score: action.payload,
        };
      default:
        return state;
    }
  };

  export default quizReducer;
