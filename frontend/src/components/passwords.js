import React, { useEffect, useState } from "react";
import { TopNavigation } from "./topnavbar";
import axiosInstance from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa"

export const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true)
        const response = await axiosInstance.get("/api/password/", {
          withCredentials: true,
        });
        setPasswords(response.data);
        setIsLoading(false)
        // Initialize the visibility array with all passwords hidden
        setPasswordVisible(new Array(response.data.length).fill(false));
      } catch (error) {
        setIsLoading(false)
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
      <TopNavigation isLoading={isLoading}/> 
      <div class="flex flex-1 overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
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
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <PasswordRow
                id={index}
                name={password.name}
                account={password.account}
                password={password.key}
                passwordVisible={passwordVisible[index]}
                togglePasswordVisibility={() => togglePasswordVisibility(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PasswordRow = ({
  id,
  account,
  password,
  name,
  passwordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <tr
      key={id}
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:bg-gray-700 dark:text-gray-300"
      >
        {name}
      </th>
      <td class="px-6 py-4 dark:bg-gray-700"> {account}</td>
      <td class="px-6 py-4 dark:bg-gray-700" style={{ width: '200px' }}>{passwordVisible ? password : "******"}</td>
      <td class="px-6 py-4 dark:bg-gray-700">
        <IconButton onClick={togglePasswordVisibility} icon={<FaEye size="18"/>}/>
      </td>
    </tr>
  );
};

const IconButton = ({ onClick, icon, label=null }) => {
  return (
    <span onClick={onClick} className="icon-button">
      {icon}
    </span>
  );
};