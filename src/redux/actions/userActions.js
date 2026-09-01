import { getUsers, addUser, deleteUser } from "../../services/userService";
import * as types from "./actionTypes";

export const fetchUsersRequest = () => ({ type: types.FETCH_USERS_REQUEST });

export const fetchUsersSuccess = ({ users, total }) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: { users, total },
});

export const fetchUsersFailure = (error) => ({
  type: types.FETCH_USERS_FAILURE,
  error,
});

export const addUserRequest = () => ({ type: types.ADD_USER_REQUEST });

export const addUserSuccess = (user) => ({
  type: types.ADD_USER_SUCCESS,
  payload: user,
});

export const addUserFailure = (error) => ({
  type: types.ADD_USER_FAILURE,
  error,
});

export const deleteUserRequest = (id) => ({
  type: types.DELETE_USER_REQUEST,
  payload: id,
});

export const deleteUserSuccess = (id) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: id,
});

export const deleteUserFailure = (error) => ({
  type: types.DELETE_USER_FAILURE,
  error,
});

export const setPage = (page) => ({ type: types.SET_PAGE, payload: page });
export const setLimit = (limit) => ({ type: types.SET_LIMIT, payload: limit });
export const setSearch = (term) => ({ type: types.SET_SEARCH, payload: term });
export const setSortBy = (field) => ({ type: types.SET_SORT_BY, payload: field });
export const setOrder = (order) => ({ type: types.SET_ORDER, payload: order });
export const toggleSort = (field) => ({ type: types.TOGGLE_SORT, payload: field });

export const clearActionError = () => ({ type: types.CLEAR_ACTION_ERROR });

export const fetchUsers = () => async (dispatch, getState) => {
  const { page, limit, search, sortBy, order } = getState().users;

  dispatch(fetchUsersRequest());
  try {
    const result = await getUsers({ page, limit, search, sortBy, order });

    if (Array.isArray(result)) {
      dispatch(fetchUsersSuccess({ users: result, total: result.length }));
    } else {
      dispatch(
        fetchUsersSuccess({
          users: result?.users ?? [],
          total: result?.total ?? 0,
        })
      );
    }
  } catch (err) {
    dispatch(fetchUsersFailure(err.message ?? "Failed to load users."));
  }
};

export const addUserAndRefresh = (newUser) => async (dispatch) => {
  dispatch(addUserRequest());
  try {
    const createdUser = await addUser(newUser);
    dispatch(addUserSuccess(createdUser));
    return createdUser;
  } catch (err) {
    dispatch(addUserFailure(err?.message));
    throw err;
  }
};

export const deleteUserAndRefresh = (id) => async (dispatch) => {
  dispatch(deleteUserRequest(id));
  try {
    await deleteUser(id);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure(err?.message ?? "Failed to delete user."));
    throw err;
  }
};

// Combined thunks

export const changePage = (page) => (dispatch) => {
  dispatch(setPage(page));
  dispatch(fetchUsers());
};

export const changeLimit = (limit) => (dispatch) => {
  dispatch(setLimit(Number(limit)));
  dispatch(fetchUsers());
};

export const changeSearch = (term) => (dispatch) => {
  dispatch(setSearch(term));
  dispatch(fetchUsers());
};

// toggles asc/desc 
export const changeSort = (field) => (dispatch) => {
  dispatch(toggleSort(field));
  dispatch(fetchUsers());
};

export const changeSortBy = (field) => (dispatch) => {
  dispatch(setSortBy(field));
  dispatch(fetchUsers());
};

export const changeOrder = (order) => (dispatch) => {
  dispatch(setOrder(order));
  dispatch(fetchUsers());
};
