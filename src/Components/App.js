import React, { useState, useEffect } from "react";

// ----------------------------- Redux Imports ---------------------------------------
import { connect } from "react-redux";
// ----------------------------- Component Imports -----------------------------------
import SignIn from "./SignIn";
import List from "./List";
import CardList from "./CardList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
require("dotenv").config();
const axios = require("axios");
// const url = "http://" + process.env.DATA_URL + ":" + process.env.PORT;
function App({ auth }) {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  // console.log(history)
  // console.log(path, url);
  // let [username, setUsername] = useState("Yugesha");
  // let [listNames, setListname] = useState([]); // Redux Target
  // let [user, setUser] = useState("");
  // let [pass, setPass] = useState("");
  // let [isAuth, setAuth] = useState(false);
  // console.log("Outside" + user);
  // const fetchNames = async () => {
  //   console.log(user);
  //   await axios
  //     .get("http://localhost:3000/getlistnames", {
  //       params: {
  //         username: user,
  //       },
  //     })
  //     .then((res) => {
  //       let temp = [];
  //       // console.log(res.data);
  //       for (let e of res.data) {
  //         temp.push({ listname: e.listname, id: e._id });
  //       }
  //       // console.log(temp);
  //       setListname(temp);

  //       // console.log(listNames);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const login = async () => {
  //   await axios
  //     .post("http://localhost:3000/login", {
  //       username: username,
  //       password: pass,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUser(res.data);
  //       // setAuth(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const create = async () => {
  //   await axios
  //     .post("http://localhost:3000/lists/createlist", {
  //       username: auth.user,
  //       listname: pass,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUser(res.data);
  //       // setAuth(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // function onLoadCard() {
  //   fetchNames();
  // }

  // function userIdChange(event) {
  //   let userValue = event.target.value;
  //    name(userValue);
  // }
  // function passwordChange(event) {
  //   let passValue = event.target.value;
  //   setPass(passValue);
  // }
  // function submit(event) {
  //   // login();
  //   return <Redirect to="/card" />;
  // }
  function createList(event) {
    console.log(event.target);
  }
  return (
    <Router>
      <Switch>
        <Route path={`${path}/list/:listname/:lid`}>
          {auth.isAuthenticated ? <List username={auth.user} /> : <SignIn />}
        </Route>
        <Route path={`${path}/card`}>
          {auth.isAuthenticated ? (
            <CardList userName={auth.user} createList={createList} />
          ) : (
            <SignIn />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
