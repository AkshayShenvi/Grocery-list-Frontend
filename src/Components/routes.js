import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import Logout from "./Logout/Logout";
import List from "./ListDetails/List";
import CardList from "./CardList";

const ROUTES = [
  { path: "/", key:"Login", exact: true, component: <SignIn /> },
  { path: "/register",key:"Register", exact: true, component: <Register /> },
  { path: "/logout",key:"Logout", exact: true, component: <Logout /> },
  { path: "/card", key:"Card",exact: true, component: <CardList /> },
  { path: "/list/:listname/:lid", exact: true, component: <List /> },
];

export default ROUTES;

