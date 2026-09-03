import { LOADING } from "../../constants";

const initialState = {
  loadingTypes: [],
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING.START:
      if (state.loadingTypes.includes(action.payload)) return state;
      return { ...state, loadingTypes: [...state.loadingTypes, action.payload] };
    case LOADING.STOP:
      return {
        ...state,
        loadingTypes: state.loadingTypes.filter((t) => t !== action.payload),
      };
    default:
      return state;
  }
}
export const createLoadingSelector = (loadingTypes) => (state) => {
  const typesToCheck = [].concat(loadingTypes);
  return typesToCheck.some((type) => state.loading.loadingTypes.includes(type));
};