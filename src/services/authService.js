import apiClient from "./apiClient";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../utils/endpoints";

export const loginUser = async (username, password) => {
  return apiClient.post(LOGIN_ENDPOINT, { username, password }, { auth: false });
};

export const registerUser = async (userData) => {
  return apiClient.post(REGISTER_ENDPOINT, userData, { auth: false });
};