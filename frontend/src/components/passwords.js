import React, { useEffect, useState } from "react";
import axios from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);}

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const response = await axios.get("/api/password/", {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
        setPasswords(response.data);
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
              {passwordVisible ? password.key : "********"}
            </td>
            <td>
              <button onClick={togglePasswordVisibility}>
                {passwordVisible ? "Hide" : "Reveal"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
