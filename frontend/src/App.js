import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Passwords } from "./components/passwords";
import { Sidebar } from "./components/sidebar";
import { Logout } from "./components/logout";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const updateAuthStatus = (status) => {
    setIsAuth(status);
  };

  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar isAuth={isAuth} updateAuthStatus={updateAuthStatus} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passwords" element={<Passwords />} />
          <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus}/>} />
          <Route path="/logout" element={<Logout updateAuthStatus={updateAuthStatus}/>} />
          <Route path="/register" element={<Register updateAuthStatus={updateAuthStatus}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
