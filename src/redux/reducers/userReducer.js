import { FETCH_USERS, ADD_USER, DELETE_USER, TABLE_CONTROLS, CLEAR_ACTION_ERROR } from "../../constants";

const initialState = {
  data: [],
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
    case FETCH_USERS.REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_USERS.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.users,
        total: action.payload.total,
      };

    case FETCH_USERS.FAILURE:
      return { ...state, loading: false, error: action.error };

    case ADD_USER.REQUEST:
      return { ...state, isAdding: true, actionError: null };

    case ADD_USER.SUCCESS:
      return {
        ...state,
        isAdding: false,
        data: [action.payload, ...state.data],
        total: state.total + 1,
      };

    case ADD_USER.FAILURE:
      return { ...state, isAdding: false, actionError: action.error };

    case DELETE_USER.REQUEST:
      return { ...state, deletingId: action.payload, actionError: null };

    case DELETE_USER.SUCCESS:
      return {
        ...state,
        deletingId: null,
        data: state.data.filter((u) => u.id !== action.payload),
        total: Math.max(0, state.total - 1),
      };

    case DELETE_USER.FAILURE:
      return { ...state, deletingId: null, actionError: action.error };

    case TABLE_CONTROLS.SET_PAGE:
      return { ...state, page: Math.max(1, action.payload) };

    case TABLE_CONTROLS.SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };

    case TABLE_CONTROLS.SET_SEARCH:
      return { ...state, search: action.payload, page: 1 };

    case TABLE_CONTROLS.SET_SORT_BY:
      return { ...state, sortBy: action.payload, page: 1 };

    case TABLE_CONTROLS.SET_ORDER:
      return { ...state, order: action.payload, page: 1 };

    case TABLE_CONTROLS.TOGGLE_SORT: {
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

    case CLEAR_ACTION_ERROR:
      return { ...state, actionError: null };

    default:
      return state;
  }
}
