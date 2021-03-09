import React, { useEffect } from "react";
// -------------------------------------- Components --------------------------------------------
import { Navbar, Nav } from "react-bootstrap";
// import Nav from "react-bootstrap";
import { Switch } from "@material-ui/core";

import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";
import Logout from "./Logout/Logout";
import List from "./ListDetails/List";
import CardList from "./CardList";
// import CardList from "./CardList";
// import List from "./List";
// import isEmpty from "is-empty";
import setAuthToken from "../redux/Authintication/setAuthToken";
import jwt_decode from "jwt-decode";
// -------------------------------------- Redux ------------------------------------------------
import {
  changeEventKey,
  changeTheme,
  setCurrentUser,
  logoutUser,
} from "../redux";
import { connect } from "react-redux";

require("dotenv").config();

function Navigation({
  isdark,
  evekey,
  changeEventKey,
  changeTheme,
  auth,
  setCurrentUser,
  logoutUser,
}) {
  const history = useHistory();
  function darkMode() {
    if (isdark) {
      return "dark";
    } else {
      return "light";
    }
  }
  const changeActiveKey = (eventKey) => {
    // console.log(eventKey)
    let currentKey = eventKey;
    // eventKey.preventDefault()
    changeEventKey(currentKey);

    // console.log(evekey);

    // console.log(eventKey);
  };
  const darkModeSwitch = (event) => {
    let mode = event.target.checked;
    changeTheme(mode);
  };
  // console.log(auth.isAuthenticated);
  // function createList(event) {
  //   // create();
  // }

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decode = jwt_decode(token);
      setCurrentUser(decode);

      const currentTime = Date.now();
      if (decode.exp < currentTime) {
        logoutUser();
      }
    }
  }, []);

  return (
    <Router>
      <Navbar
        collapseOnSelect={false}
        bg={darkMode()}
        variant={darkMode()}
        fixed="top"
        expand="lg"
        style={{
          backgroundColor: "#05386b",
        }}
      >
        <Navbar.Brand as={Link} to="/">
          Grocery List
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {auth.isAuthenticated ? (
            <Nav variant="pills " activeKey={3}>
              <Nav.Item>
                <Nav.Link eventKey={3} as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav variant="pills " activeKey={evekey} onSelect={changeActiveKey}>
              <Nav.Item>
                <Nav.Link eventKey={1} as={Link} to="/logout">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={2} as={Link} to="/register">
                  Register
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
        <Switch checked={isdark} onChange={darkModeSwitch} color="primary" />
        <h6>v 1.1</h6>
      </Navbar>

      <RouterSwitch>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
          {/* <Redirect to="/login" /> */}
          <Logout />
        </Route>

        <Route path="/card">
          {auth.isAuthenticated ? (
            <CardList userName={auth.user} />
          ) : (
            <SignIn />
          )}
        </Route>
        <Route path="/list/:listname/:lid">
          {auth.isAuthenticated ? <List username={auth.user} /> : <SignIn />}
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </RouterSwitch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isdark: state.navigation.darkMode,
    evekey: state.navigation.eventKey,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeEventKey: (ekey) => dispatch(changeEventKey(ekey)),
    changeTheme: (theme) => dispatch(changeTheme(theme)),
    setCurrentUser: (decode) => dispatch(setCurrentUser(decode)),
    logoutUser: () => dispatch(logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
