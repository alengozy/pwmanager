import { FaLock, FaUser, FaRegistered } from 'react-icons/fa'
import React, { useState, useEffect } from "react";

export function Navigation({isAuth, updateAuthStatus}) {
  useEffect(() => {
     if (localStorage.getItem("access_token") !== null) {
       updateAuthStatus(true);
     }
   }, []);
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col text-white bg-gray-900 shadow-lg">
      <SideBarIcon icon={<FaLock size="28"/>} text='Passwords' link='/passwords'/>
      <Divider/>
      {isAuth ? (<SideBarIcon icon={<FaUser size="28"/>} text='Logout' link='/logout'/>) : 
      (<><SideBarIcon icon={<FaUser size="28" />} text='Login' link='/login' /><SideBarIcon href='/register' icon={<FaRegistered size="28" />} text='Register' link='/register' /></>)}
    </div>
  );
}

const SideBarIcon = ({ icon, text='tooltip', link}) => {
  return (
    <a href={link}>
      <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
          {text}
        </span>
      </div>
    </a>
  )
}

const Divider = () => <hr className="sidebar-hr" />
