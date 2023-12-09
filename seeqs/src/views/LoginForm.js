import React, { useState } from "react";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //Use states for the email and password and loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Set states for email and password
  const handleEmailChange = (event) => {
    const lowercaseEmail = event.target.value.toLowerCase();
    setEmail(lowercaseEmail);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //useNavigate to be able to navigate to a different route of the website
  const navigate = useNavigate();

  //Validate functions of email and password
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

  //Login form validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Set loading to true while i am verifying
    setLoading(true);

    //Validate email and password
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== "valid") {
      alert(passwordValidationResult);
      setLoading(false);
      return;
    }
    if (!email || !password) {
      alert("Please enter both email and password");
      setLoading(false);
      return;
    }

    //Login api to check if user details are correct
    try {
      const response = await fetch("http://localhost:4000/auth", {
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
        setLoading(false);
        return;
      }

      const data = await response.json();
      const accessToken = data.accessToken;

      //Store JWT token in local storage
      localStorage.setItem("accessToken", accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Move to register page when register button is clicked
  const handleRegisterClick = () => {
    navigate("/register");
  };

  //Design
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
        <button type="submit" className="login-form-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
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
