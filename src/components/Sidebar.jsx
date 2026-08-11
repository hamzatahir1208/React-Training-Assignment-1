export default function Sidebar() {
  return (
    <>
      <div
        className="d-none d-lg-flex flex-column bg-dark text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <SidebarLinks />
      </div>

      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SidebarLinks />
        </div>
      </div>
    </>
  );
}

function SidebarLinks() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item"><a className="nav-link text-white" href="#">Dashboard</a></li>
      <li className="nav-item"><a className="nav-link text-white" href="#">Reports</a></li>
      <li className="nav-item"><a className="nav-link text-white" href="#">Settings</a></li>
    </ul>
  );
}