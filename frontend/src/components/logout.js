import { useEffect } from "react";
import axios from "../custom_axios";

export const Logout = () => {
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
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"]; // Remove the header
        window.location.href = "/login";
      } catch (e) {
        console.error("Logout failed:", e);
      }
    })();
  }, []);

  return <div></div>;
};
