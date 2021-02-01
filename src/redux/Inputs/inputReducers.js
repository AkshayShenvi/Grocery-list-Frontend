import {
  CHANGE_INPUT,
  CHANGE_MESSAGE,
  TOGGLE_SNACKBAR,
  ERROR_STATUS,
} from "./inputType";

const initialState = {
  input: "",
  message: "",
  open: false,
  errorStatus: "success",
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    case CHANGE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case TOGGLE_SNACKBAR:
      return {
        ...state,
        open: action.payload,
      };
    case ERROR_STATUS:
      return {
        ...state,
        errorStatus: action.payload,
      };
    default:
      return { ...state };
  }
};

export default inputReducer;
