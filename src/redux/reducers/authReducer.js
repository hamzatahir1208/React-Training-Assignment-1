import { AUTH } from "../../constants";
import { getToken } from "../../utils/auth";

const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,
};

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case AUTH.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};