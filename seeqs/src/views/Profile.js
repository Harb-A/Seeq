import React, { useEffect } from "react";
import "../styles/Profile.css";
import Taskbar from "../components/Taskbar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user data from API and set the initial form data
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // If not authenticated, redirect to the login page
          console.log("Access token not found. Redirecting to login page...");
          navigate("/"); // Adjust the path based on your route setup
        }

        const response = await fetch("http://localhost:4000/users/current", {
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
      const authToken = localStorage.getItem("accessToken");

      const updatedUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      // Save editted changes using the API
      const response = await fetch("http://localhost:4000/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
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

  const handleDiscardChanges = () => {
    setEditMode(false);
  };

  return (
    <div>
      <Taskbar />
      <div className="profile-container">
        {/* Change the class name */}
        <div className="profile">
          {/* Change the class name */}
          <h1 className="profile-title">My Profile</h1>{" "}
          {/* Change the class name */}
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
              value={formData.phone}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </form>
          {!editMode && (
            <button
              className="save-changes-button"
              type="button"
              onClick={handleEditClick}
              disabled={editMode}
            >
              Edit
            </button>
          )}
          {editMode && (
            <div className="update-profile-container">
              <button
                type="button"
                className="save-changes-button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="save-changes-button"
                onClick={handleDiscardChanges}
              >
                Discard changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
