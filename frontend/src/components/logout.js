import { useEffect } from "react";
import axiosInstance from "../custom_axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
export const Logout = ({updateAuthStatus}) => {
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        await axiosInstance.post(
          "api/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // This option should be in the same object as headers
          }
        );
        updateAuthStatus(false)
        delete axiosInstance.defaults.headers.common["Authorization"]; // Remove the header
      } catch (e) {
        console.error("Logout failed:", e);
      } finally {
        localStorage.clear();
        navigate('/login')
      }
    })();
  }, [navigate, updateAuthStatus]);

  return (
    <div className="main-content justify-center items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};
