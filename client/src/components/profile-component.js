import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../services/auth.service";

const ProfileComponent = () => {
  const [user, setUser] = useState({ username: "", email: "", date: "" });
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (isAuthenticated) {
        const token = localStorage.getItem("token");
        let foundUser = await AuthService.getCurrentUser(token);
        setUser(foundUser);
      } else {
        window.alert("尚未登入，您現在將被重新導向到登入頁面");
        navigate("/login");
      }
    };
    getCurrentUser();
  }, [isAuthenticated, navigate]);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-info">
        <p>Username : {user.username} </p>
        <p>Email : {user.email} </p>
        <p>Registered on : {user.date} </p>
      </div>
      <div className="user-stats">
        <p>Total Tasks: </p>
        <p>Completed Tasks: </p>
        <p>Incomplete Tasks:</p>
        <p>Completion Rate: </p>
      </div>
      <div className="account-settings">
        <h2>Account Settings</h2>
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default ProfileComponent;
