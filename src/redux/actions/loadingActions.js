import { START_LOADING, STOP_LOADING } from "../../constants/actionTypes";

export const startLoading = (loadingType) => ({
  type: START_LOADING,
  payload: loadingType,
});

export const stopLoading = (loadingType) => ({
  type: STOP_LOADING,
  payload: loadingType,
});
