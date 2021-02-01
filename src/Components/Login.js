import React, { useState } from "react";
import SignIn from "./SignIn";
import Axios from "axios";
const axios = require("axios");
function Login() {
  let [userId, setUserId] = useState("");
  let [pass, setPass] = useState("");
  const login = () => {
    Axios({
      method: "POST",
      data: { username: userId, password: pass },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res);
    });
  };
  function userIdChange(event) {
    let userValue = event.target.value;
    setUserId(userValue);
  }
  function passwordChange(event) {
    let passValue = event.target.value;
    setPass(passValue);
  }
  function submit(event) {
    login();
  }
  return (
    <SignIn
      usernameChange={userIdChange}
      passwordChange={passwordChange}
      submit={submit}
      userId={userId}
      pass={pass}
    />
  );
}
export default Login;
