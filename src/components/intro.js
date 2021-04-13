import React from "react";
import "./intro.css";
import Rotator from "./rotator";

const Intro = () => {
  return (
    <div className="root">
      <div className="head">ANMOL DHIMAN</div>
      <Rotator
        elements={["#Developer", "#Engineer", "#Learner"]}
        id="primary-rotator"
      />
    </div>
  );
};

export default Intro;
