import React, { useEffect, useState } from "react";
import { TopNavigation } from "./topnavbar";
import axiosInstance from "../custom_axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Modal from "react-modal";

export const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordRow, setNewPasswordRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchPasswords();
  }, [navigate]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear the newRowData for the next creation
    setNewPasswordRow({});
  };

  const handleInputChange = (e) => {
    // Update the newRowData state based on user input
    setNewPasswordRow({
      ...newPasswordRow,
      [e.target.name]: e.target.value,
    });
  };

  const createNewRow = async () => {
    try {
      const response = await axiosInstance.post(
        "api/password/",
        newPasswordRow,
        {
          withCredentials: true,
        }
      );
      // Add the newly created row to the existing data
      setPasswords([...passwords, response.data]);
      // Clear the newRowData for the next creation
      setNewPasswordRow({
        // Initialize with default values or leave empty depending on your API requirements
      });
    } catch (error) {
      console.error("Error creating new row:", error);
    }
  };

  return (
    <div className="main-content">
      <TopNavigation isLoading={isLoading} />
      <div class="flex flex-1 overflow-x-auto">
        <ModalButton
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          newRowData={newPasswordRow}
          createNewRow={createNewRow}
          handleInputChange={handleInputChange}
        />
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3 text-cyan-400">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-cyan-400">
                Account
              </th>
              <th scope="col" class="px-6 py-3 text-cyan-400">
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
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 table-data"
    >
      <th scope="row" class="px-6 py-4 font-bold ">
        {name}
      </th>
      <td class="px-6 py-4"> {account}</td>
      <td class="px-6 py-4" style={{ width: "200px" }}>
        {passwordVisible ? password : "******"}
      </td>
      <td class="px-6 py-4">
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

const ModalButton = ({
  openModal,
  closeModal,
  isModalOpen,
  newRowData,
  createNewRow,
  handleInputChange,
}) => {
  return (
    <div>
      <Button onClick={openModal}>Create New Row</Button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Create New Row</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newRowData.name || ""}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={createNewRow}>
            Create
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};
