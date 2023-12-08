import React, { useEffect } from "react";
import "../styles/EditProfile.css";
import Taskbar from "../components/Taskbar";

import { useState } from "react";

const EditProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Fetch user data from API and set the initial form data
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // Handle the case where the access token is not available
          console.error("Access token not found in local storage");
          return;
        }

        const response = await fetch("http://localhost:4000/users/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData(userData);
        } else {
          console.error("Error fetching user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      // Save editted changes using the API
      const response = await fetch("API_ENDPOINT/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Changes saved successfully");
        setEditMode(false);
      } else {
        console.error("Error saving changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div>
      <Taskbar />
      <div className="edit-profile-container">
        <div className="edit-profile">
          <h1 className="edit-profile-title">Edit Profile</h1>
          <form>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              readOnly={!editMode}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              readOnly={!editMode}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!editMode}
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              readOnly={!editMode}
            />

            {editMode && (
              <button
                type="button"
                className="save-changes-button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            )}
          </form>
          <button type="button" onClick={handleEditClick} disabled={editMode}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
