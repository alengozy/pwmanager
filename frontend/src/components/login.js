import axios from "../custom_axios";
import React, { useState } from "react";
import UserForm from "./user_form";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const title = 'Login'
  const button_text = 'Login';
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const formData = { username: username, password: password }
      const response = await axios.post('api/login/', formData, {
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
      setError('Incorrect username or password. Please try again!')
      console.error("Login failed:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UserForm
        title={title}
        handleSubmit={handleSubmit}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        showConfirmPasswordField={false}
        error={error}
        button_text={button_text}
        isLoading={isLoading}
      />
    </div>
  );
}
