import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../slices/authSlice";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [account, setAccount] = useState({
    username: " ",
    email: " ",
    password: " ",
  });
  let [error, setError] = useState(null);

  const handleUsername = (e) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      username: e.target.value,
    }));
  };
  const handleEmail = (e) => {
    setAccount((prevAccount) => ({ ...prevAccount, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      password: e.target.value,
    }));
  };
  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(
        register({
          username: account.username,
          email: account.email,
          password: account.password,
        })
      );
      if (register.fulfilled.match(resultAction)) {
        window.alert("註冊成功，您現在將被重新導向到登入頁面");
        navigate("/login");
      } else {
        setError(resultAction.payload);
      }
    } catch (error) {
      console.log(error);
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
        <label>Username :</label>
        <input name="username" onChange={handleUsername} />
      </div>
      <div className="input-group">
        <label>Email :</label>
        <input name="email" onChange={handleEmail} />
      </div>
      <div className="input-group">
        <label>Password :</label>
        <input name="password" onChange={handlePassword} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterComponent;
