import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ToyForm from "../ToyForm/ToyForm.jsx";
import ToyList from "../ToyList/ToyList.jsx";


import "./UserPage.css";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div className="flex-container">
        <div className="form">
          <ToyForm />
        </div>

        <div className="list">
          <ToyList />
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
