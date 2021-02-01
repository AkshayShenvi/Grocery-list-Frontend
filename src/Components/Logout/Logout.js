import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
function Logout({ logoutUser }) {
    useEffect(() => logoutUser());
    
  return <Redirect to="/login" />;
}

const mapDispatchToProps = (dispatch) => {
  return { logoutUser: () => dispatch(logoutUser()) };
};
export default connect(null, mapDispatchToProps)(Logout);
