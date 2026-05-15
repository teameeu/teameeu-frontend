import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const menuItems = [
  { icon: "중학교", label: "3학년" },
  { icon: "학년종료", label: "D-168" },
];

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {

    // 초기 마우스 위치 체크
    const handleMouseMove = (e) => {
      if (!navbarRef.current) return;

      const rect = navbarRef.current.getBoundingClientRect();

      const isHovering =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setCollapsed(!isHovering);
    };

    window.addEventListener("mousemove", handleMouseMove);


    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className={`navbar-container ${collapsed ? "collapsed" : ""}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(!collapsed)}>
      <div className={`navbar ${collapsed ? "collapsed" : ""}`}>
        {/* Menu */}
        <div className="navbar-menu">
          <h4>12월 30일</h4>
          <hr />
          <div className="profile-img" />
          <div className="profile-name">
            김이름
          </div>

          {menuItems.map((item, idx) => (
            <div key={idx} className="typo-body-small navbar-item">
              <div className="tag">
                  {!collapsed && <span>{item.icon}</span>}
                  {collapsed && idx === 0 && <span>{item.icon[0]}{item.label[0]}</span>}
                  {collapsed && idx === 1 && <span>{item.label}</span>}
              </div>
              {!collapsed && <span className="label">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};