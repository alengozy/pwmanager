import React, { useEffect, useState } from "react";
import { TopNavigation } from "./topnavbar";
import axiosInstance from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState([]);
  const navigate = useNavigate();

  const togglePasswordVisibility = (index) => {
    const updatedPasswordVisible = [...passwordVisible];
    updatedPasswordVisible[index] = !updatedPasswordVisible[index];
    setPasswordVisible(updatedPasswordVisible);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const response = await axiosInstance.get("/api/password/", {
          withCredentials: true,
        });
        setPasswords(response.data);
        // Initialize the visibility array with all passwords hidden
        setPasswordVisible(new Array(response.data.length).fill(false));
      } catch (error) {
        if (error.response.status == 401) {
          console.error("Token has expired:", error);
          localStorage.clear();
          navigate("/login");
        }
        console.error("Error fetching passwords:", error);
      }
    })();
  }, [navigate]);

  return (
    <div className="password-container main-content">
      <TopNavigation />
      <ul>
        {passwords.map((password, index) => (
          <PasswordItem id={ index }
                        password={ password.key } 
                        account={ password.account} 
                        name={ password.name}
          ></PasswordItem>
        ))}
      </ul>
    </div>
  );
};

const PasswordItem = ( {id, account, password, name} ) => {
  return (
    <li key={id} className="password-item">
      {name} | {account} | {password}
    </li>
  )
}