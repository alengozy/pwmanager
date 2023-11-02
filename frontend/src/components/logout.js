import { useEffect } from "react";
import axios from "../custom_axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
export const Logout = ({updateAuthStatus}) => {
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        await axios.post(
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
        delete axios.defaults.headers.common["Authorization"]; // Remove the header
      } catch (e) {
        console.error("Logout failed:", e);
      } finally {
        localStorage.clear();
        navigate('/login')
      }
    })();
  }, [navigate]);

  return (
    <div className="main-content justify-center items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};
