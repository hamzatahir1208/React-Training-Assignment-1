import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { setToken } from "../../utils/auth";

export default function Login() {
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

    const { username, password } = formData;

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      const data = await loginUser(username, password);
      setToken(data.accessToken);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center p-3">
                  <i className="bi bi-person-fill fs-3 text-dark"></i>
                </div>
                <h2 className="fw-bold mt-3 mb-1">Welcome Back</h2>
                <p className="text-secondary">Login to your account</p>
              </div>

              {errorMessage && (
                <div className="text-center text-danger fw-bold mb-2">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-4"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-dark">{"Don't have an account?"}</span>
                <a
                  href="#"
                  className="text-primary text-decoration-none ms-1"
                >
                  Create Account
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
