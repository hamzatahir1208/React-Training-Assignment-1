import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout({ children }) {
  return (
    <>
      <Topbar />
      <div className="d-flex">
        <Sidebar />
        <div className="w-100">{children}</div>
      </div>
    </>
  );
}
