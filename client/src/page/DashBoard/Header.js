import React from "react";
import "./CSS/Header/Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="Container">
      <div className="Logo">
        <Link to="/">CodeBuddy</Link>
      </div>
      <ul>
        
        <li>
          <Link to="/vcontest">Virtual contest</Link>
        </li>
        <li>
          <Link to="/contest-list">Contest List</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button className="btn-small btn-color" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
