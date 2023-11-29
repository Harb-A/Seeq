import React, { useState } from "react";
import "../styles/RegisterForm.css"; // Make sure to adjust the import based on your actual style file

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

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
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your registration logic here

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
