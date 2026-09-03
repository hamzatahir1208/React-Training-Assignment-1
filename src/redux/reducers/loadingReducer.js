import { START_LOADING, STOP_LOADING } from "../../constants";

const initialState = {
  loadingTypes: [],
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      if (state.loadingTypes.includes(action.payload)) return state;
      return {
        ...state,
        loadingTypes: [...state.loadingTypes, action.payload],
      };
    case STOP_LOADING:
      return {
        ...state,
        loadingTypes: state.loadingTypes.filter((type) => type !== action.payload),
      };
    default:
      return state;
  }
}

export const createLoadingSelector = (loadingTypes) => (state) => {
  const typesToCheck = [].concat(loadingTypes);
  return typesToCheck.some((type) => state.loading.loadingTypes.includes(type));
};