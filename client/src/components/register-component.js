import React from "react";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  return (
    <div className="register">
      {/* <h1>register</h1> */}
      <div className="input-group">
        <label>Username :</label>
        <input name="username" />
      </div>
      <div className="input-group">
        <label>Email :</label>
        <input name="email" />
      </div>
      <div className="input-group">
        <label>Password :</label>
        <input name="password" />
      </div>
      <button>Register</button>
    </div>
  );
};

export default RegisterComponent;
