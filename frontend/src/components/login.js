import axiosInstance from "../custom_axios";
import React, { useState } from "react";
import { UserForm } from "./user_form";
import { useNavigate } from "react-router-dom";

export const Login = ({updateAuthStatus}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const title = 'Login'
  const button_text = 'Proceed';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const formData = { username: username, password: password }
      const response = await axiosInstance.post('api/login/', formData, {
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
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      updateAuthStatus(true)
      // Redirect to the home page
      navigate('/')
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
      showLoginInstead={true}
    />
  );
}
