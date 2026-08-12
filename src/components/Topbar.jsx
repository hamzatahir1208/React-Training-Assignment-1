import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  console.log(token);
const handleLogout = () => {
    console.log("logout clicked");

    localStorage.removeItem("accessToken");

    console.log("token:", localStorage.getItem("accessToken"));

    navigate("/login");

    console.log("navigation called");
};

  return (
    <nav className="navbar bg-dark sticky-top ">
      <div className="container-fluid">
        <button
          className="btn btn-outline-secondary d-lg-none text-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <Link to='/' className="navbar-brand ms-3 text-light">Navbar</Link>
        <div className="d-flex align-items-center ms-auto ms-lg-0 me-3">
          <ul className="navbar-nav flex-row align-items-center me-3">
            <li className="nav-item ">
              {token ? (
                <a onClick={handleLogout} className="nav-link active text-light" aria-current="page" href="#">Logout</a>
              ) : (
                <Link to='/login' className="nav-link active text-light" aria-current="page" href="#">Login</Link>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}