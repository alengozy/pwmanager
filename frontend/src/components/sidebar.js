import { FaLock, FaUser, FaRegistered } from "react-icons/fa";
import React, { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";

export const Sidebar = ({ isAuth, updateAuthStatus }) => {
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      updateAuthStatus(true);
    }
  }, []);
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col text-white bg-white dark:!bg-gray-900 shadow-lg">
      <SideBarIcon
        icon={<FaLock size="28" />}
        text="Passwords"
        link="/passwords"
      />
      <Divider />
      {isAuth ? (
        <SideBarIcon icon={<FaUser size="28" />} text="Logout" link="/logout" />
      ) : (
        <>
          <SideBarIcon icon={<FaUser size="28" />} text="Login" link="/login" />
          <SideBarIcon
            href="/register"
            icon={<FaRegistered size="28" />}
            text="Register"
            link="/register"
          />
        </>
      )}
      <ThemeIcon />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip", link }) => {
  return (
    <a href={link}>
      <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </a>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      <div className="sidebar-icon group">
        {darkTheme ? (
          <>
            <FaSun size="28" className="text-orange-300" />
            <span className="sidebar-tooltip group-hover:scale-100">
              Switch to light mode
            </span>
          </>
        ) : (
          <>
            <FaMoon size="28" className="text-blue-300" />
            <span className="sidebar-tooltip group-hover:scale-100">
              Switch to dark mode
            </span>
          </>
        )}
      </div>
    </span>
  );
};

const Divider = () => <hr className="sidebar-hr" />;
