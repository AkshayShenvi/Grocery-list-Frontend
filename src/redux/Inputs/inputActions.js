import {
  CHANGE_INPUT,
  CHANGE_MESSAGE,
  TOGGLE_SNACKBAR,
  ERROR_STATUS,
} from "./inputType";

export const changeInput = (input) => {
  return {
    type: CHANGE_INPUT,
    payload: input,
  };
};

export const changeMessage = (message) => {
  return {
    type: CHANGE_MESSAGE,
    payload: message,
  };
};

export const toggleSnackbar = (value) => {
  return {
    type: TOGGLE_SNACKBAR,
    payload: value,
  };
};

export const changeErrorStatus = (status) => {
  return {
    type: ERROR_STATUS,
    payload: status,
  };
};
