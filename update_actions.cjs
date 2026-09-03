const fs = require('fs');

const path = '/media/hamza/Study/Work/Hazelsofts/React-Training-Assignment-1/src/redux/actions/userActions.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'import { getUsers, addUser, deleteUser } from "../../services/userService";',
  'import { getUsers, addUser, deleteUser } from "../../services/userService";\nimport { startLoading, stopLoading } from "./loadingActions";'
);

content = content.replace(
  `export const addUserAndRefresh = (newUser) => async (dispatch) => {
  dispatch(addUserRequest());
  try {
    const createdUser = await addUser(newUser);
    dispatch(addUserSuccess(createdUser));
    return createdUser;
  } catch (err) {
    dispatch(addUserFailure(err?.message));
    throw err;
  }
};`,
  `export const addUserAndRefresh = (newUser) => async (dispatch) => {
  dispatch(addUserRequest());
  dispatch(startLoading("ADD_USER"));
  try {
    const createdUser = await addUser(newUser);
    dispatch(addUserSuccess(createdUser));
    return createdUser;
  } catch (err) {
    dispatch(addUserFailure(err?.message));
    throw err;
  } finally {
    dispatch(stopLoading("ADD_USER"));
  }
};`
);

fs.writeFileSync(path, content);
