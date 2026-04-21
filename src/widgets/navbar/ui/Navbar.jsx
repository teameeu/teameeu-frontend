import { useState } from "react";
import "./Navbar.css";

const menuItems = [
  { icon: "home", label: "Home" },
  { icon: "person", label: "Profile" },
  { icon: "settings", label: "Settings" },
];

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`navbar ${collapsed ? "collapsed" : ""}`} 
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(!collapsed)}>
      {/* Menu */}
      <div className="navbar-menu">
        {menuItems.map((item, idx) => (
          <div key={idx} className="typo-body-small navbar-item">
            <div className="icon-box">
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
            </div>

            {!collapsed && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};