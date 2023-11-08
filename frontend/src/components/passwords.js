import React, { useEffect, useState } from "react";
import { TopNavigation } from "./topnavbar";
import axiosInstance from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

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
    <div className="main-content">
      <TopNavigation />
      <div class="flex flex-1 overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Account
              </th>
              <th scope="col" class="px-6 py-3">
                Key
              </th>
              <th scope="col" class="px-6 py-3">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index)=>(
              <PasswordRow id={ index } name={ password.name } account={ password.account } password={ password.key }/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PasswordRow = ({ id, account, password, name }) => {
  return (
    <tr key={ id } class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        { name }
      </th>
      <td class="px-6 py-4"> { account }</td>
      <td class="px-6 py-4">{ password }</td>
      <td class="px-6 py-4"><Button title="Test"/></td>
    </tr>
  );
};
