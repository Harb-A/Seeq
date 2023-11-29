import React, { useState } from "react";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //Use states for the username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Navigate to pages
  const navigate = useNavigate();

  //Set the username on change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Set the password on change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Login logic
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Alert the user of empty fields (CHANGE THIS TO FE FORM VERIFACTION)
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Invalid credentials, Please try again.");
      }

      const data = await response.json();
      const accessToken = data.accessToken;

      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  //Move to register page when register button is clicked
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-container-title">Seeqs</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-container-row">
          <label className="login-form-container-label">
            Email
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="login-form-input"
            />
          </label>
        </div>

        <br />
        <div className="login-form-container-row">
          <label className="login-form-container-label">
            Password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="login-form-input"
            />
          </label>
        </div>

        <br />
        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>
      <p className="login-form-text">
        Don't have an account?{" "}
        <span className="login-form-link" onClick={handleRegisterClick}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
