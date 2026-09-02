import { combineReducers } from "redux";
import users from "./userReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  users,
  auth,
});

export default rootReducer;
