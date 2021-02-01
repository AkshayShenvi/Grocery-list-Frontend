import { combineReducers } from "redux";
// Reducers
import listNamesReducer from "./Lists/listReducers";

import inputReducer from "./Inputs/inputReducers";
import registerReducer from "./Registeration/regReducers";
import navigationReducer from "./Navigation/navReducers";
import authenticationReducer from "./Authintication/authReducers";
import errorReducer from "./Authintication/errorReducer";

const rootReducer = combineReducers({
  listNames: listNamesReducer,

  listInputs: inputReducer,
  registeration: registerReducer,
  navigation: navigationReducer,
  auth: authenticationReducer,
  errors: errorReducer,
});

export default rootReducer;
