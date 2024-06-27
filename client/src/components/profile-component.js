import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../services/auth.service";
import { logout, verifyToken } from "../slices/authSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", email: "", date: "" });
  const [newPassword, setNewPassword] = useState("");
  const [changeBtn, setChangeBtn] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // *從state.auth取得isAuthenticated,isLoading,token狀態
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCurrentUser = async () => {
      // *若有token會從server取得用戶資料
      if (token) {
        try {
          // *取得資料之前會再次驗證token防止竄改，
          await dispatch(verifyToken()).unwrap();
          const foundUser = await AuthService.getCurrentUser(token);
          setUser(foundUser);
        } catch (error) {
          console.log(error);
          window.alert("尚未登入，您現在將被重新導向到登入頁面");
          navigate("/login");
        }
      } else {
        window.alert("尚未登入，您現在將被重新導向到登入頁面");
        navigate("/login");
      }
    };
    getCurrentUser();
  }, [dispatch, navigate, token]);

  const handleChangeBtn = () => {
    setChangeBtn((prevState) => !prevState);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    try {
      let result = await AuthService.changePassword(newPassword, token);
      setMessage(result.data);
    } catch (error) {
      setMessage(error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("你確定要刪除帳號嗎？");
    if (confirmed) {
      try {
        await AuthService.deleteAccount(token);
        dispatch(logout());
        window.alert("帳號已刪除，您現在將被重新導向到首頁");
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/profile");
    }
  };
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
        {changeBtn && (
          <div className="change-password">
            {changeBtn && message && (
              <div className="err_msg">
                <p>{message}</p>
              </div>
            )}
            <div className="change-item">
              <label>New Password :</label>
              <input
                placeholder="Enter Your Password"
                onChange={handleNewPassword}
              />
              <button onClick={handleChangePassword}>Enter</button>
              <button onClick={handleChangeBtn}>Cancel</button>
            </div>
          </div>
        )}
        {!changeBtn && (
          <button onClick={handleChangeBtn}>Change Password</button>
        )}
        {!changeBtn && <button onClick={handleDelete}>Delete Account</button>}
      </div>
    </div>
  );
};

export default ProfileComponent;
