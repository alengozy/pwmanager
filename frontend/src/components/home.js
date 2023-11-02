import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  return <div className="main-content flex w-full h-full fixed items-center justify-center">
  <Spinner className="!w-24 !h-24" animation="border" variant="primary" />
</div>;
};
