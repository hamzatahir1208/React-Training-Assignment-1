import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout({ children }) {
  return (
    <div className="">
        <Topbar />

      <div className="d-flex ">
        <Sidebar />
        <div className="w-100">{children} </div>
      </div>
    </div>
  );
}