import apiClient from "../../../services/apiClient";
import {USERS_ENDPOINT, USERS_ADD_ENDPOINT} from "../../../utils/endpoints";

export const getUsers = async (params = {}) => {
  const { page = 1, limit = 10, search = "", sortBy = "firstName", sortOrder = "asc" } = params;

  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));
  query.set("sortBy", sortBy);
  query.set("sortOrder", sortOrder);
  if (search.trim()) query.set("search", search.trim());
  console.log(`${USERS_ENDPOINT}?${query.toString()}`);

  return apiClient.get(`${USERS_ENDPOINT}?${query.toString()}`);
};

export const addUser = async (user) => {
  return apiClient.post(USERS_ADD_ENDPOINT, user);
};

export const deleteUser = async (id) => {
  return apiClient.delete(`${USERS_ENDPOINT}/${id}`);
};
