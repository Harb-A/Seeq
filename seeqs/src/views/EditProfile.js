// EditProfile.js

import React from "react";
import "../styles/EditProfile.css";
import Taskbar from "../components/Taskbar";

const EditProfile = () => {
  const handleSaveChanges = () => {
    console.log("Save changes clicked");
  };

  return (
    <div>
      <Taskbar />
      <div className="edit-profile-container">
        <div className="edit-profile">
          <h1 className="edit-profile-title">Edit Profile</h1>
          {/* Add form fields for editing profile information */}
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" />

          <button className="save-changes-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
