import { loginUser } from "../../services/authService";
import * as types from "./actionTypes";
import { setToken, removeToken } from "../../utils/auth";

export const authLoginRequest = () => ({
  type: types.AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = (user, accessToken) => {
  setToken(accessToken);

  return {
    type: types.AUTH_LOGIN_SUCCESS,
    payload: user,
  };
};

export const authLoginFailure = (error) => ({
  type: types.AUTH_LOGIN_FAILURE,
  error,
});

export const authLogout = () => {
  removeToken();

  return {
    type: types.AUTH_LOGOUT,
  };
};

export const loginUserRequest = (credentials) => {
  return async (dispatch) => {
    dispatch(authLoginRequest());

    try {
      const data = await loginUser(
        credentials.username,
        credentials.password
      );

      const { user, accessToken } = data;

      dispatch(authLoginSuccess(user, accessToken));
    } catch (err) {
      dispatch(authLoginFailure(err?.message || "Login failed"));
      throw err;
    }
  };
};