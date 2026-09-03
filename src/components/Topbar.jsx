import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "../redux/actions/authActions";
import { getToken } from "../utils/auth";

function Topbar({ authLogout, isAuthenticated }) {
  const handleLogout = () => {
    authLogout();
  };

  return (
    <nav className="navbar bg-dark sticky-top">
      <div className="container-fluid">
        <button
          className="btn btn-outline-secondary d-lg-none text-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link to="/" className="navbar-brand ms-3 text-light">
          Navbar
        </Link>

        <div className="d-flex align-items-center ms-auto ms-lg-0 me-3">
          <ul className="navbar-nav flex-row align-items-center me-3">
            <li className="nav-item">
              {isAuthenticated ? (
                <a
                  onClick={handleLogout}
                  className="nav-link active text-light"
                  aria-current="page"
                  href="#"
                >
                  Logout
                </a>
              ) : (
                <Link
                  to="/login"
                  className="nav-link active text-light"
                  aria-current="page"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
