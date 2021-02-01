import { UPDATE_EVENTKEY, CHANGE_THEME } from "./navTypes";

const initialState = {
  eventKey: 1,
  darkMode: true,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EVENTKEY:
      return {
        ...state,
        eventKey: action.payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        darkMode: action.payload, 
      };
    default:
      return {
        ...state,
      };
  }
};

export default navigationReducer;
