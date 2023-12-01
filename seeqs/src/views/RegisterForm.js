import React, { useState } from "react";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
  //Use states for fName, lName, email, phoneNumber, Password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  //Set states for fName, lName, email, phoneNumber, Password
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setPhoneNumber(numericValue);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Validate functions for email, password and phone number
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return "Password must be between 8 and 16 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter";
    }

    return "valid";
  };
  const validatePhoneNumber = (phoneNumber) => {
    // Check if the phoneNumber is a non-empty string of numeric characters
    return /^[0-9]+$/.test(phoneNumber);
  };

  //Register form verification
  const handleSubmit = (event) => {
    event.preventDefault();

    //Cant submit an empty form
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    //Validate the email
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    //Validate the password
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== "valid") {
      alert(passwordValidationResult);
      return;
    }

    //Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number");
      return;
    }

    console.log("Registration successful");
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-container-title">Seeqs</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-form-container-row">
          <label className="register-form-container-label">
            First Name
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className="register-form-input"
            />
          </label>
        </div>

        <br />
        <div className="register-form-container-row">
          <label className="register-form-container-label">
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className="register-form-input"
            />
          </label>
        </div>

        <br />
        <div className="register-form-container-row">
          <label className="register-form-container-label">
            Email
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="register-form-input"
            />
          </label>
        </div>

        <br />
        <div className="register-form-container-row">
          <label className="register-form-container-label">
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="register-form-input"
            />
          </label>
        </div>

        <br />
        <div className="register-form-container-row">
          <label className="register-form-container-label">
            Password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="register-form-input"
            />
          </label>
        </div>

        <br />
        <button type="submit" className="register-form-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
