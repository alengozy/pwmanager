import React, { useEffect, useState } from "react";
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
        console.log("Current access token:", localStorage.getItem("access_token"));
        const response = await axiosInstance.get("/api/password/", {
          withCredentials: true,
        });
        setPasswords(response.data);
        // Initialize the visibility array with all passwords hidden
        setPasswordVisible(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    })();
  }, [navigate]);

  return (
    <table className="main-content">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Account</th>
          <th>Password</th>
          <th>Toggle Password</th>
        </tr>
      </thead>
      <tbody>
        {passwords.map((password, index) => (
          <tr key={index}>
            <td>{password.id}</td>
            <td>{password.name}</td>
            <td>{password.account}</td>
            <td>
              {passwordVisible[index] ? password.key : "********"}
            </td>
            <td>
              <button onClick={() => togglePasswordVisibility(index)}>
                {passwordVisible[index] ? "Hide" : "Reveal"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
