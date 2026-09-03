import { combineReducers } from "redux";
import users from "./userReducer";
import auth from "./authReducer";
import loading from "./loadingReducer";

const rootReducer = combineReducers({
  users,
  auth,
  loading,
});

export default rootReducer;
