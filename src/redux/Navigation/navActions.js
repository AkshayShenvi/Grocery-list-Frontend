import { UPDATE_EVENTKEY, CHANGE_THEME } from "./navTypes";

export const changeEventKey = (eventKey) => {
  return {
    type: UPDATE_EVENTKEY,
    payload: eventKey,
  };
};

export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
