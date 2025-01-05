// src/store/actions/userActions.js
export const login = (userID, token, refreshToken) => ({
    type: 'LOGIN',
    payload: { userID, token, refreshToken },
  });

  export const logout = () => ({
    type: 'LOGOUT',
  });
