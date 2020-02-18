import { combineReducers } from "redux";
import fetch from "./fetch";
import user from "./user";

// combine reducers
const rootReducers = combineReducers({
  fetch,
  user
});

export default rootReducers;
