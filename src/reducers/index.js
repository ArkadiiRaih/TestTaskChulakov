import { combineReducers } from "redux";

import { i18nReducer } from "react-redux-i18n";

import peopleReducer from "./peopleReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
  people: peopleReducer,
  filter: filterReducer,
  i18n: i18nReducer
});
