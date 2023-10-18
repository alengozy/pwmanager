// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "../custom_axios";

// Define the Home function.
export const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    } else {
      (async () => {
        try {
          const { data } = await axios.get(
            'home/',
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          setMessage(data.message);
        } catch (e) {
          console.log('not auth');
        }
      })();
    }
  }, []);

  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
  );
};
