import { loginUser } from "../../services/authService";
import { AUTH } from "../../constants";
import { setToken, removeToken } from "../../utils/auth";

export const authLoginRequest = () => ({
  type: AUTH.LOGIN_REQUEST,
});

export const authLoginSuccess = (user, accessToken) => {
  setToken(accessToken);

  return {
    type: AUTH.LOGIN_SUCCESS,
    payload: {
      user,
      token: accessToken,
    },
  };
};

export const authLoginFailure = (error) => ({
  type: AUTH.LOGIN_FAILURE,
  error,
});

export const authLogout = () => {
  removeToken();

  return {
    type: AUTH.LOGOUT,
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

      const { accessToken, ...user } = data;

      dispatch(authLoginSuccess(user, accessToken));
    } catch (err) {
      dispatch(authLoginFailure(err?.message));
      throw err;
    }
  };
};