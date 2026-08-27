import { Link } from "react-router-dom";

export default function SidebarLinks({ links }) {
  return (
    <ul className="nav flex-column">
      {links.length > 0 ? (
        links.map((item, idx) => (
          <li className="nav-item" key={idx}>
            <Link className="nav-link text-white" to={item.to}>
              {item.name}
            </Link>
          </li>
        ))
      ) : (
        <li className="nav-item">Empty</li>
      )}
    </ul>
  );
}
