// authReducer.js

import { LOGIN_SUCCESS, LOGOUT } from './action';

const initialState = {
  token: null,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
