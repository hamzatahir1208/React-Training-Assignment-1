import SidebarLinks from "./SidebarLinks";

export default function Sidebar() {
  const linksData = [
    {name : "Dashboard",
      to : "/"
    },
    {name : "Services",
      to : "/"
    },{name : "About",
      to : "/"
    }
  ]
  return (
    <>
      <div
        className="d-none d-lg-flex flex-column bg-dark text-white p-5"
      >
        <SidebarLinks links={linksData} />
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
          <SidebarLinks links={linksData} />
        </div>
      </div>
    </>
  );
}
