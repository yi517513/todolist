import React from "react";

const LoginComponent = () => {
  return (
    <div className="register">
      <div className="input-group">
        <label>Email :</label>
        <input name="email" />
      </div>
      <div className="input-group">
        <label>Password :</label>
        <input name="password" />
      </div>
      <button>Login</button>
    </div>
  );
};

export default LoginComponent;
