import React from "react";
import { BrowserRouter } from "react-router-dom";
// ------------------------------- Component imports ---------------------------------
import Navigation from "../Navigation";

function Landing() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}
export default Landing;
