import axiosInstance from "../custom_axios";
import React, { useState, useEffect } from "react";
import UserForm from "./user_form";
import { useNavigate } from "react-router-dom";

export const Register = ({updateAuthStatus}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const title = 'Register'
  const button_text = 'Create Account'
  const navigate = useNavigate()
  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password === confirmPassword){
        try { 
            setIsLoading(true);
            const formData = { username: username, password: password }
            await axiosInstance.post('http://localhost:8000/api/register/', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
            const response = await axiosInstance.post('http://localhost:8000/api/login/', formData, { 
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
            console.error("Register failed:", error);
          }
          finally {
            setIsLoading(false)
          }
    } else {
        console.error("Passwords do not match!")
    }
    
  };
  return (
    <UserForm title={title}
              handleSubmit={handleSubmit}
              username={username}
              password={password}
              confirmPassword={confirmPassword}
              setUsername={setUsername}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              passwordsMatch={passwordsMatch}
              button_text={button_text}
              isLoading={isLoading}
    />
  )
}