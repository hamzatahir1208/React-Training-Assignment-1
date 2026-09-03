import { FETCH_USERS, ADD_USER, DELETE_USER, TABLE_CONTROLS, CLEAR_ACTION_ERROR } from "../../constants";

const initialState = {
  data: [],
  total: 0,

  // page: 1,
  // limit: 10,
  // search: "",
  // sortBy: "id",
  // order: "asc",

  error: null,
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
        actionError: null,
      };

    case DELETE_USER.FAILURE:
      return { ...state, actionError: action.payload };

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
        return { ...state, order: state.order === "asc" ? "desc" : "asc", page: 1 };
      }
      return { ...state, sortBy: field, order: "asc", page: 1 };
    }

    default:
      return state;
  }
}