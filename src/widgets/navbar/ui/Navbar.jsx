import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import "./Navbar.css";

const menuItems = [
  { icon: "중학교", label: "3학년" },
  { icon: "학년종료", label: "D-168" },
];

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navbarRef = useRef(null);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul"
  }).format(new Date());

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
          <h4>{formattedDate}</h4>
          <hr />
          <div className="profile-img">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="cute-avatar-svg">
              <circle cx="50" cy="50" r="48" fill="#F1F3F5" />
              <circle cx="50" cy="40" r="15" fill="#ADB5BD" />
              <path d="M24 78C24 64 35 58 50 58C65 58 76 64 76 78V82H24V78Z" fill="#ADB5BD" />
            </svg>
          </div>
          <div className="profile-name">
            {user?.userName ?? "사용자"}
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