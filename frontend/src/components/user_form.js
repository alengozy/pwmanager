import React from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserForm({
  title,
  handleSubmit,
  showUsernameField = true,
  showPasswordField = true,
  showConfirmPasswordField = true,
  showLoginInstead = false,
  username,
  password,
  confirmPassword,
  setUsername,
  setPassword,
  setConfirmPassword,
  passwordsMatch,
  isLoading,
  error,
  button_text,
}) {
  return (
    <div className="main-content"> 
      <Container>
        <Row className="vh-100 flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase">
                    {title}
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      {showUsernameField && (
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
                            disabled={isLoading}
                            required
                          />
                        </Form.Group>
                      )}

                      {showPasswordField && (
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            className={`"" ${!error ? "" : "is-invalid"}`}
                            type="password"
                            placeholder="Keep it secret..."
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                          {!error ? null : (
                            <div className="invalid-feedback">{error}</div>
                          )}
                        </Form.Group>
                      )}

                      {showConfirmPasswordField && (
                        <Form.Group className="mb-3" controlId="check_password">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            className={`"" ${
                              passwordsMatch ? "" : "is-invalid"
                            }`}
                            placeholder="Confirm Password"
                            name="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                          {passwordsMatch ? null : (
                            <div className="invalid-feedback">
                              Passwords do not match.
                            </div>
                          )}
                        </Form.Group>
                      )}

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>

                      {isLoading ? (
                        <div className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : (
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            {button_text}
                          </Button>
                        </div>
                      )}
                    </Form>
                    {!showLoginInstead && !isLoading && (
                      <div className="mt-3">
                        <p className="mb-0 text-center">
                          Already have an account?{" "}
                          <a href="/login" className="text-primary fw-bold">
                            Sign In
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserForm;
