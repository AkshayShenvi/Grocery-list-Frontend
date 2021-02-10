import axios from "axios";
import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
} from "./listTypes";

export const fetchListsRequests = () => {
  return {
    type: FETCH_LIST_REQUEST,
  };
};

export const fetchListsSuccess = (listNames) => {
  return {
    type: FETCH_LIST_SUCCESS,
    payload: listNames,
  };
};

export const fetchListsError = (error) => {
  return {
    type: FETCH_LIST_FAILURE,
    payload: error,
  };
};

export const fetchListNames = (user) => {
    
    return (dispatch) => {
      dispatch(fetchListsRequests())
    axios.get("https://grocery-list-app-backend.herokuapp.com/lists/getlistnames", {
      params: {
        name: user,
      },
    }).then(response => { 
        let temp = [];
        for (let e of response.data) {
            temp.push({ listname: e.listname, id: e._id });
        }
        
        const listNames = temp
        dispatch(fetchListsSuccess(listNames))
    }

    ).catch(error => { 
        const errMessage = error.message;
        dispatch(fetchListsError(errMessage))
    })
  };
};
