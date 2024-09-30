import React, { useState } from "react";
import axios from "axios"; // If using Axios for API requests
import "./styles.css"; // Import your CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/register/",
        {
          username,
          password,
          email,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setErrorMessage("");
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        "Registration failed: " +
          (error.response?.data?.error || "Unknown error")
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid gap-2 mt-4">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
