import apiClient from "./apiClient";
import {USERS_ENDPOINT, USERS_ADD_ENDPOINT} from "../utils/endpoints";

export const getUsers = async (params = {}) => {
  const {
    skip = 0,
    limit = 10,
    search = "",
    sortBy = "id",
    order = "asc",
  } = params;

  // const resolvedOrder = order;
  // const skip = (page - 1) * limit;

  const query = new URLSearchParams();
  query.set("limit", String(limit));
  query.set("skip", String(skip));

  if (sortBy) {
    query.set("sortBy", sortBy);
  }
  if (order) {
    query.set("order", order);
  }

  if (search && search.trim()) {
    query.set("q", search.trim());
    return apiClient.get(`${USERS_ENDPOINT}/search?${query.toString()}`);
  }

  return apiClient.get(`${USERS_ENDPOINT}?${query.toString()}`);
};

export const addUser = async (user) => {
  return apiClient.post(USERS_ADD_ENDPOINT, user);
};

export const deleteUser = async (id) => {
  return apiClient.delete(`${USERS_ENDPOINT}/${id}`);
};
