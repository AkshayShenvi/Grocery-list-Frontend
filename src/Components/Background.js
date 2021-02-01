import React from "react";
//import groimage from "../images/groceryImage.png";
const groimage = "../images/groceryImage.png";
function Background() {
  //   const s = {
  //     backgroundImage: `url(${groimage})`,
  //     height: "100%",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     backgroundSize: "cover",
  //   };
  //   return <div style={{ backgroundImage: `url(${groimage})` }}></div>;
  return (
    <div style={{ backgroundImage: "url(" + require(`groimage`) + ")" }}></div>
  );

  //   return <img src={groimage} />;
}

export default Background;
