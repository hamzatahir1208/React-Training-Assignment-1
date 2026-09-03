import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import { loginUserRequest } from "../../redux/actions/authActions";
import { createLoadingSelector } from "../../redux/reducers/loadingReducer";
import { AUTH } from "../../constants";

function Login({ loginUserRequest, isLoggingIn }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { username, password } = formData;

    try {
      await loginUserRequest({ username, password });
      navigate("/");
    } catch (err) {
      setErrorMessage(err?.message);
    }
  };

  return (
    <Container fluid className="bg-light">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center p-3">
                  <i className="bi bi-person-fill fs-3 text-dark"></i>
                </div>
                <h2 className="fw-bold mt-3 mb-1">Welcome Back</h2>
                <p className="text-secondary">Login to your account</p>
              </div>

              {errorMessage && (
                <Alert variant="danger" className="text-center fw-bold py-2">
                  {errorMessage}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={isLoggingIn}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-lock"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoggingIn}
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isLoggingIn}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2 mt-4 d-inline-flex align-items-center justify-content-center gap-2"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-dark">{"Don't have an account?"}</span>
                <a href="#" className="text-primary text-decoration-none ms-1">
                  Create Account
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const loadingSelector = createLoadingSelector(AUTH.LOGIN_REQUEST);

const mapStateToProps = (state) => ({
  isLoggingIn: loadingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginUserRequest: (data) => dispatch(loginUserRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
