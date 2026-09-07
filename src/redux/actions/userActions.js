import { getUsers, addUser, deleteUser } from "../../services/userService";
import { action } from "./actions";
import { FETCH_USERS, ADD_USER, DELETE_USER, LOADING, LOADING_TYPES } from "../../constants";

export const fetchUsers = ({ page, limit, search, sortBy, order }) => async (dispatch, getState) => {
  const { deletedIds } = getState().users;

  dispatch(action(LOADING.START, LOADING_TYPES.FETCH_USERS));
  try {
    const newLimit = page * limit + deletedIds.length;

    const result = await getUsers({ skip: 0, limit: newLimit, search, sortBy, order });

    const rawUsers = result?.users;
    const filtered = rawUsers.filter((u) => !deletedIds.includes(u.id));

    const startIndex = (page - 1) * limit;
    const pageUsers = filtered.slice(startIndex, startIndex + limit);

    const adjustedTotal = Math.max(0, result?.total - deletedIds.length);

    dispatch(action(FETCH_USERS.SUCCESS, { users: pageUsers, total: adjustedTotal }));
  } catch (err) {
    dispatch(action(FETCH_USERS.FAILURE, err.message));
  } finally {
    dispatch(action(LOADING.STOP, LOADING_TYPES.FETCH_USERS));
  }
};

export const addUserAndRefresh = (newUser) => async (dispatch) => {
  dispatch(action(LOADING.START, LOADING_TYPES.ADD_USER));
  try {
    const createdUser = await addUser(newUser);
    dispatch(action(ADD_USER.SUCCESS, createdUser));
  } catch (err) {
    dispatch(action(ADD_USER.FAILURE, err?.message));
    throw err;
  } finally {
    dispatch(action(LOADING.STOP, LOADING_TYPES.ADD_USER));
  }
};

export const deleteUserAndRefresh = (id) => async (dispatch) => {
  const loadingKey = `${LOADING_TYPES.DELETE_USER}_${id}`;

  dispatch(action(LOADING.START, loadingKey));
  try {
    await deleteUser(id);
    dispatch(action(DELETE_USER.SUCCESS, id));
  } catch (err) {
    dispatch(action(DELETE_USER.FAILURE, err?.message));
    throw err;
  } finally {
    dispatch(action(LOADING.STOP, loadingKey));
  }
};