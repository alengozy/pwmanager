import axios from "../custom_axios";
import React, { useState, useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password === confirmPassword){
        try {
            const formData = { username: username, password: password }
            await axios.post('http://localhost:8000/api/register/', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
            const response = await axios.post('http://localhost:8000/api/login/', formData, { 
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
      
            const { access, refresh } = response.data;
      
            // Store tokens in local storage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
      
            // Set authorization header for future API requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
            // Redirect to the home page
            window.location.href = '/';
          } catch (error) {
            // Handle errors, e.g., display an error message
            console.error("Register failed:", error);
          }
    } else {
        console.error("Passwords do not match!")
    }
    
  };
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Register</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="johndoe"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Keep it secret..."
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="check_password"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      {!passwordsMatch && <div className="error-message">Passwords do not match.</div>}
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}