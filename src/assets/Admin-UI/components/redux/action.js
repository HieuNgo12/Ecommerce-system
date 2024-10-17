// actions.js

// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Action Creators
export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

export const logout = () => ({
  type: LOGOUT,
});
