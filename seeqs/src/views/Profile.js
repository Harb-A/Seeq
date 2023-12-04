import React from "react";
import "../styles/Profile.css";
import Taskbar from "../components/Taskbar";

const Profile = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <div>
      <Taskbar />
      <div className="profile-container">
        <div className="profile">
          <h1 className="profile-username">
            {`${user.firstName} ${user.lastName}`}
          </h1>
          <p className="profile-email">Email - {user.email}</p>
          <p className="profile-phonenumber">
            Phone Number - {user.phoneNumber}
          </p>
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Edit Profile
          </button>{" "}
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
