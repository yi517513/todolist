import React from "react";
import { Link } from "react-router-dom";

const NavComponent1 = () => {
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
          <Link to="/logout">Logout</Link>
        </li>
        <form>
          <input placeholder=" Search" />
        </form>
      </ul>
    </nav>
  );
};

export default NavComponent1;
