import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
} from "./listTypes";

const initialState = {
  loading: false,
  listNames: [],
  error: "",
};

const listNamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listNames: action.payload,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
          return {...state};
  }
};

export default listNamesReducer;
