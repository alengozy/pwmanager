import React, { useEffect, useState } from "react";
import { TopNavigation } from "./topnavbar";
import axiosInstance from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import PasswordFormDialog from "./passwordformdialog";

export const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchPasswords();
  }, [navigate]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewRowData({
      ...newRowData,
      [e.target.name]: e.target.value,
    });
  };

  const createNewRow = async () => {
    try {
      console.log("aaaaaaa" + newRowData.name);
      const data = {
        name: newRowData.name,
        account: newRowData.account,
        key: newRowData.key,
      };
      await axiosInstance.post("/api/password/", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Clear the newRowData for the next creation
      setNewRowData({});

      handleCloseModal();

      fetchPasswords();
    } catch (error) {
      console.error("Error creating new row:", error);
    }
  };

  const togglePasswordVisibility = (index) => {
    const updatedPasswordVisible = [...passwordVisible];
    updatedPasswordVisible[index] = !updatedPasswordVisible[index];
    setPasswordVisible(updatedPasswordVisible);
  };

  const fetchPasswords = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/api/password/", {
        withCredentials: true,
      });
      setPasswords(response.data);
      setIsLoading(false);
      // Initialize the visibility array with all passwords hidden
      setPasswordVisible(new Array(response.data.length).fill(false));
    } catch (error) {
      setIsLoading(false);
      if (error.response.status == 401) {
        console.error("Token has expired:", error);
        localStorage.clear();
        navigate("/login");
      }
      console.error("Error fetching passwords:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="top-navigation">
        <TopNavigation isLoading={isLoading} updateFunction={fetchPasswords} />
        <PasswordFormDialog
          isOpen={isModalOpen}
          openModal={handleOpenModal}
          onChange={handleInputChange}
          onClose={handleCloseModal}
          onSubmit={createNewRow}
          newRowData={newRowData}
        />
      </div>
      <div className="flex flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-cyan-400">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-cyan-400">
                Account
              </th>
              <th scope="col" className="px-6 py-3 text-cyan-400">
                Key
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <PasswordRow
                key={password.id}
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
  account,
  password,
  name,
  passwordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 table-data">
      <th scope="row" className="px-6 py-4 font-bold ">
        {name}
      </th>
      <td className="px-6 py-4"> {account}</td>
      <td className="px-6 py-4" style={{ width: "200px" }}>
        {passwordVisible ? password : "******"}
      </td>
      <td className="px-6 py-4">
        <IconButton
          onClick={togglePasswordVisibility}
          icon={<FaEye size="18" />}
        />
      </td>
    </tr>
  );
};

const IconButton = ({ onClick, icon, label = null }) => {
  return (
    <span onClick={onClick} className="icon-button">
      {icon}
    </span>
  );
};
