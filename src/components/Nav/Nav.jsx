import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="toybox">
        <img src={require("./stock4.jpg")} height="140" id="header-image1" />
        <Link to="/home">
          <h2 className="nav-title"> —— ToyBox —— </h2>
        </Link>

        <img src={require("./stock1.jpg")} height="140" id="header-image2" />
      </div>
      <br></br>
      <div className="links_bar">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Toy List
            </Link>

            <Link className="navLink" to="/community_toy_list">
              Community Toy List
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
