import {
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD2,
  CHANGE_ERRORS,
} from "./regTypes";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  errors: {},
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case CHANGE_PASSWORD2:
      return {
        ...state,
        password2: action.payload,
      };
    // case CHANGE_ERRORS:
    //   return {
    //     ...state,
    //     errors: action.payload,
    //   };
    default:
      return {
        ...state,
      };
  }
};

export default registerReducer;
