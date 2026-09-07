import { FETCH_USERS, ADD_USER, DELETE_USER } from "../../constants";

const initialState = {
  data: [],
  total: 0,
  deletedIds: [],
  error: null,
  actionError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS.SUCCESS:
      return {
        ...state,
        data: action.payload.users,
        total: action.payload.total,
        error: null,
      };

    case FETCH_USERS.FAILURE:
      return { ...state, error: action.payload };

    case ADD_USER.SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        total: state.total + 1,
        actionError: null,
      };

    case ADD_USER.FAILURE:
      return { ...state, actionError: action.payload };

    case DELETE_USER.SUCCESS:
      return {
        ...state,
        data: state.data.filter((u) => u.id !== action.payload),
        total: Math.max(0, state.total - 1),
        deletedIds: [...state.deletedIds, action.payload],
        actionError: null,
      };

    case DELETE_USER.FAILURE:
      return { ...state, actionError: action.payload };

    default:
      return state;
  }
}