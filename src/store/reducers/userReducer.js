// src/store/reducers/userReducer.js
const initialState = {
    userID: null,
    token: null,
    refreshToken: null,
    loggedIn: false,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userID: action.payload.userID,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
          loggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          userID: null,
          token: null,
          refreshToken: null,
          loggedIn: false,
        };
      default:
        return state;
    }
  };

  export default userReducer;
