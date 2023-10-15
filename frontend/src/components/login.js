import axios from "axios";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const { access, refresh } = response.data;

      // Store tokens in local storage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Set authorization header for future API requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-3" style={{ width: "300px" }}>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <h3 className="Auth-form-title mb-3">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
