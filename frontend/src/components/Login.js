import React, { useState } from "react";
import axios from "axios"; // If using Axios for API requests
import "./styles.css"; // Import your CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        setErrorMessage(""); // Clear any previous error messages
        navigate("/dealers"); // Redirect to dealer listings or dashboard
      }
    } catch (error) {
      setErrorMessage(
        "Login failed: " + (error.response?.data?.error || "Unknown error")
      );
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
