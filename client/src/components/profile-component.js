import React from "react";

const ProfileComponent = () => {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-info">
        <p>Username: </p>
        <p>Email: </p>
        <p>Registered on: </p>
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
