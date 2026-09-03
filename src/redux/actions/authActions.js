import { loginUser } from "../../services/authService";
import { AUTH, LOADING } from "../../constants";
import { setToken, removeToken } from "../../utils/auth";
import { action } from "./actions";

export const authLogout = () => {
  removeToken();
  return action(AUTH.LOGOUT);
};

export const loginUserRequest = (credentials) => {
  return async (dispatch) => {
    dispatch(action(LOADING.START, AUTH.LOGIN_REQUEST));

    try {
      const data = await loginUser(credentials.username, credentials.password);
      const { accessToken, ...user } = data;
      setToken(accessToken);

      dispatch( action(AUTH.LOGIN_SUCCESS, { user }));
    } catch (err) {
      dispatch(action(AUTH.LOGIN_FAILURE, err?.message));
      throw err;
    } finally {
      dispatch(action(LOADING.STOP, AUTH.LOGIN_REQUEST));
    }
  };
};