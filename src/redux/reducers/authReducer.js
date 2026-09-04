import { AUTH } from "../../constants";
import { getToken } from "../../utils/auth";

const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case AUTH.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case AUTH.LOGOUT:
      return { ...state, isAuthenticated: false, user: null, token: null, error: null };
    default:
      return state;
  }
}