import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";

import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

import Landing from "./Components/LandingPage/Landing";

// import App from "./Components/App"
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <Landing />
    {/* <CreateListPopup /> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
