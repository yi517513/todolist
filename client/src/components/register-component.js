import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../slices/authSlice";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(
        register({ username, email, password })
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
