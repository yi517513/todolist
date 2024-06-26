import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const NavComponent1 = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.alert("登出成功，現在您會被導向到首頁");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
        <form>
          <input placeholder=" Search" />
        </form>
      </ul>
    </nav>
  );
};

export default NavComponent1;
