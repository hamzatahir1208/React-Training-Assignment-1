import { getUsers, addUser, deleteUser } from "../../services/userService";
import { action } from "./actions";
import { FETCH_USERS, ADD_USER, DELETE_USER, TABLE_CONTROLS, LOADING, LOADING_TYPES } from "../../constants";
//search feild not in redux
export const fetchUsers = ({ page, limit, search, sortBy, order }) => async (dispatch, getState) => {
  // const { page, limit, search, sortBy, order } = getState().users;

  dispatch(action(LOADING.START, LOADING_TYPES.FETCH_USERS));
  try {
    const result = await getUsers({ page, limit, search, sortBy, order });

    if (Array.isArray(result)) {
      dispatch(action(FETCH_USERS.SUCCESS, { users: result, total: result.length }));
    } else {
      dispatch(
        action(FETCH_USERS.SUCCESS, {
          users: result?.users ?? [],
          total: result?.total ?? 0,
        })
      );
    }
  } catch (err) {
    dispatch(action(FETCH_USERS.FAILURE, err.message ));
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
    dispatch(action(DELETE_USER.FAILURE, err?.message ?? "Failed to delete user."));
    throw err;
  } finally {
    dispatch(action(LOADING.STOP, loadingKey));
  }
};

// ---- combined thunks ----

// export const changePage = (page) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.SET_PAGE, page));
//   dispatch(fetchUsers());
// };

// export const changeLimit = (limit) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.SET_LIMIT, Number(limit)));
//   dispatch(fetchUsers());
// };

// export const changeSearch = (term) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.SET_SEARCH, term));
//   dispatch(fetchUsers());
// };

// // toggles asc/desc
// export const changeSort = (field) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.TOGGLE_SORT, field));
//   dispatch(fetchUsers());
// };

// export const changeSortBy = (field) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.SET_SORT_BY, field));
//   dispatch(fetchUsers());
// };

// export const changeOrder = (order) => (dispatch) => {
//   dispatch(action(TABLE_CONTROLS.SET_ORDER, order));
//   dispatch(fetchUsers());
// };