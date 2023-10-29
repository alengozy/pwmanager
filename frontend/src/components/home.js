// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "../custom_axios";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <></>
  );
};
