import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, USER_LOADING, SET_CURRENT_USER } from "./authTypes";

export const setErrors = (errorData) => {
  return {
    type: GET_ERRORS,
    payload: errorData,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const userloading = () => {
  return {
    type: USER_LOADING,
  };
};
// Register user

export const registerUser = (userData, history) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/users/register",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: userData,
    })
      // axios
      //   .post(
      //     `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/register`,
      //     userData
      //   )
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
      });
  };
};

// Login - get user token
export const loginUser = (userData) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/users/login",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: userData,
    })
      // axios
      //   .post(
      //     `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/login`,
      //     userData
      //   )
      .then((res) => {
        // console.log(res.data)
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        // console.log(decoded);
        dispatch(setCurrentUser(decoded));
      })
      .catch((err) => {
        // console.log(err.response.data)
        dispatch(setErrors(err.response.data));
      });
  };
};

// Log out user

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");

    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
};
