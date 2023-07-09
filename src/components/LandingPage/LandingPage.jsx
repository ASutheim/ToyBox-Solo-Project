import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="left-side">
        <p id="welcome">Welcome!</p>
        <img src={require("./stock3.jpg")} height="250" />
      </div>
 
       
        <div className="right-side">
        <RegisterForm />
        <p id="member">Already a Member?</p>
        <button className="login-btn" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
