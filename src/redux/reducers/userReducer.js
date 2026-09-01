import * as types from "../actions/actionTypes";

const initialState = {
  users: [],
  total: 0,

  page: 1,
  limit: 10,
  search: "",
  sortBy: "firstName",
  order: "asc",

  loading: true,
  error: null,

  isAdding: false,
  deletingId: null,
  actionError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        total: action.payload.total,
      };

    case types.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case types.ADD_USER_REQUEST:
      return { ...state, isAdding: true, actionError: null };

    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        isAdding: false,
        users: [action.payload, ...state.users],
        total: state.total + 1,
      };

    case types.ADD_USER_FAILURE:
      return { ...state, isAdding: false, actionError: action.error };

    case types.DELETE_USER_REQUEST:
      return { ...state, deletingId: action.payload, actionError: null };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        deletingId: null,
        users: state.users.filter((u) => u.id !== action.payload),
        total: Math.max(0, state.total - 1),
      };

    case types.DELETE_USER_FAILURE:
      return { ...state, deletingId: null, actionError: action.error };

    case types.SET_PAGE:
      return { ...state, page: Math.max(1, action.payload) };

    case types.SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };

    case types.SET_SEARCH:
      return { ...state, search: action.payload, page: 1 };

    case types.SET_SORT_BY:
      return { ...state, sortBy: action.payload, page: 1 };

    case types.SET_ORDER:
      return { ...state, order: action.payload, page: 1 };

    case types.TOGGLE_SORT: {
      const field = action.payload;
      if (state.sortBy === field) {
        return {
          ...state,
          order: state.order === "asc" ? "desc" : "asc",
          page: 1,
        };
      }
      return { ...state, sortBy: field, order: "asc", page: 1 };
    }

    case types.CLEAR_ACTION_ERROR:
      return { ...state, actionError: null };

    default:
      return state;
  }
}
