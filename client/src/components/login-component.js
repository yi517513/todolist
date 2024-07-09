import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [account, setAccount] = useState({
    email: "test123@gmail.com",
    password: "test123",
  });
  let [error, setError] = useState(null);

  const handleEmail = (e) => {
    setAccount((prevAccount) => ({ ...prevAccount, email: e.target.value }));
  };

  const handlePassword = (e) => {
    setAccount((prevAccount) => ({ ...prevAccount, password: e.target.value }));
  };
  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(
        login({ email: account.email, password: account.password })
      );
      if (login.fulfilled.match(resultAction)) {
        window.alert("登入成功，您現在將被重新導向到首頁");
        navigate("/");
      } else {
        // joi return的error.details[0].message使用
        setError(resultAction.payload);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="register_login">
      {error && (
        <div className="err_msg">
          <p>{error}</p>
        </div>
      )}
      <div className="input-group">
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          name="email"
          value={account.email}
          onChange={handleEmail}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password :</label>
        <input
          id="password"
          name="password"
          value={account.password}
          onChange={handlePassword}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
