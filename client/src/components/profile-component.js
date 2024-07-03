import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../services/profile.service";
import { logout } from "../slices/authSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  // 用來設置輸入新密碼的欄位是否出現
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
  // 按下enter以後新密碼被設置在message變數
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // *從state.auth取得isAuthenticated,isLoading,token狀態
  const { token, user } = useSelector((state) => state.auth);

  // navigate不變時不會重新創建
  const handleAuthError = useCallback(
    (error) => {
      console.error(error.message);
      window.alert("發生錯誤，請重新登入");
      localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  const redirectToLogin = useCallback(
    (message) => {
      window.alert(message);
      navigate("/login");
    },
    [navigate]
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      // *若有token會從server取得用戶資料
      if (token) {
        try {
          setIsLoading(false);
        } catch (error) {
          handleAuthError(error);
        }
      } else {
        redirectToLogin("尚未登入，您現在將被重新導向到登入頁面");
      }
    };
    getCurrentUser();
  }, [token, handleAuthError, redirectToLogin]);

  const changePassword = async () => {
    try {
      let result = await ProfileService.changePassword(newPassword, token);
      setFeedbackMessage(result.data);
    } catch (error) {
      setFeedbackMessage(error.response?.data || error.message);
    }
  };

  const deleteAccount = async () => {
    const isConfirmed = window.confirm("你確定要刪除帳號嗎？");
    if (isConfirmed) {
      try {
        await ProfileService.deleteAccount(token);
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-info">
        <p>Username : {user.username} </p>
        <p>Email : {user.email} </p>
        <p>Registered on : {user.date} </p>
      </div>
      <div className="user-stats">
        <p>Total Tasks : {user.completedTasks + user.inCompletedTasks}</p>
        <p>Completed Tasks: {user.completedTasks}</p>
        <p>Incomplete Tasks :{user.inCompletedTasks}</p>
        <p>
          Completion Rate :
          {(user.completedTasks /
            (user.completedTasks + user.inCompletedTasks)) *
            100 +
            "%"}
        </p>
      </div>
      <div className="account-settings">
        <h2>Account Settings</h2>
        {isPasswordChangeVisible && (
          <div className="change-password">
            {feedbackMessage && (
              <div className="err_msg">
                <p>{feedbackMessage}</p>
              </div>
            )}
            <div className="change-item">
              <label>New Password :</label>
              <input
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <button onClick={changePassword}>Enter</button>
              <button
                onClick={() => {
                  setIsPasswordChangeVisible(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!isPasswordChangeVisible && (
          <button
            onClick={() => {
              setIsPasswordChangeVisible(true);
            }}
          >
            Change Password
          </button>
        )}
        {!isPasswordChangeVisible && (
          <button onClick={deleteAccount}>Delete Account</button>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
