import React, { useState } from "react";
import "../styles/RegisterForm.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  //Use states for fName, lName, email, phone, Password and loading
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Set states for fName, lName, email, phone, Password
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setPhone(numericValue);
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
  const validatePhone = (phone) => {
    // Check if the phone is a non-empty string of numeric characters
    return /^[0-9]+$/.test(phone);
  };

  //Register form verification
  const handleSubmit = (event) => {
    event.preventDefault();

    //Cant submit an empty form
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    //Validate the email
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    //Validate the password
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== "valid") {
      alert(passwordValidationResult);
      setLoading(false);
      return;
    }

    //Validate phone number format
    if (!validatePhone(phone)) {
      alert("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    //Send registration logic to API
    const registrationEndpoint = "http://localhost:4000/auth/register/";
    const userData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password,
    };

    fetch(registrationEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then(() => {
        navigate("/"); // navigate on successful registration
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
              value={phone}
              onChange={handlePhoneChange}
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
        <button
          type="submit"
          className="register-form-button"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
