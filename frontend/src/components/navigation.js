import { FaFire, FaLock, FaUser } from 'react-icons/fa'
import React, { useState, useEffect } from "react";
export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col text-white bg-gray-900 shadow-lg">
      <SideBarIcon href='/login' icon={<FaLock size="28"/>}/>
      <SideBarIcon icon={<FaUser size="28"/>}/>
    </div>
  );
}

const SideBarIcon = ({ icon }) => {
  return (
    <div className="sidebar-icon">
      { icon }
    </div>

  )
}
