import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        window.alert("登入成功，您現在將被重新導向到首頁");
        navigate("/");
      } else {
        // joi return的error.details[0].message使用
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
        <label>Email :</label>
        <input name="email" onChange={handleEmail} />
      </div>
      <div className="input-group">
        <label>Password :</label>
        <input name="password" onChange={handlePassword} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
