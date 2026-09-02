import { getUsers, addUser, deleteUser } from "../../services/userService";
import { FETCH_USERS, ADD_USER, DELETE_USER, TABLE_CONTROLS, CLEAR_ACTION_ERROR } from "../../constants";

export const fetchUsersRequest = () => ({ type: FETCH_USERS.REQUEST });

export const fetchUsersSuccess = ({ users, total }) => ({
  type: FETCH_USERS.SUCCESS,
  payload: { users, total },
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS.FAILURE,
  error,
});

export const addUserRequest = () => ({ type: ADD_USER.REQUEST });

export const addUserSuccess = (user) => ({
  type: ADD_USER.SUCCESS,
  payload: user,
});

export const addUserFailure = (error) => ({
  type: ADD_USER.FAILURE,
  error,
});

export const deleteUserRequest = (id) => ({
  type: DELETE_USER.REQUEST,
  payload: id,
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER.SUCCESS,
  payload: id,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER.FAILURE,
  error,
});

export const setPage = (page) => ({ type: TABLE_CONTROLS.SET_PAGE, payload: page });
export const setLimit = (limit) => ({ type: TABLE_CONTROLS.SET_LIMIT, payload: limit });
export const setSearch = (term) => ({ type: TABLE_CONTROLS.SET_SEARCH, payload: term });
export const setSortBy = (field) => ({ type: TABLE_CONTROLS.SET_SORT_BY, payload: field });
export const setOrder = (order) => ({ type: TABLE_CONTROLS.SET_ORDER, payload: order });
export const toggleSort = (field) => ({ type: TABLE_CONTROLS.TOGGLE_SORT, payload: field });

export const clearActionError = () => ({ type: CLEAR_ACTION_ERROR });

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
