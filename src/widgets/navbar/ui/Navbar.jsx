import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { roadmapApi, unwrapApiData } from "@/shared/api";
import dayjs from "dayjs";
import "./Navbar.css";

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navbarRef = useRef(null);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [isTaskPopoverOpen, setIsTaskPopoverOpen] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul"
  }).format(new Date());


  // TODO: - shared 승격(이후 백엔드로 이동)
  const getDaysUntilYearEnd = () => {
    const today = new Date();
    const yearEnd = new Date(today.getFullYear(), 11, 31);
    const diffTime = yearEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : `D-0`;
  };
  const dDayLabel = getDaysUntilYearEnd();

  useEffect(() => {
    if (!user) {
      setInProgressCount(0);
      setInProgressItems([]);
      return;
    }

    const fetchInProgressCount = async () => {
      try {
        const { data } = await roadmapApi.getRoadmap();
        const payload = unwrapApiData(data);
        const items = Array.isArray(payload?.items) ? payload.items : (Array.isArray(payload) ? payload : []);
        const today = dayjs().startOf("day");
        const filtered = items.filter(item => {
          if (item.status === "DONE") return false;
          if (!item.startedAt || !item.endedAt) return false;

          const start = dayjs(item.startedAt).startOf("day");
          const end = dayjs(item.endedAt).startOf("day");

          return (today.isAfter(start) || today.isSame(start)) &&
            (today.isBefore(end) || today.isSame(end));
        });
        setInProgressCount(filtered.length);
        setInProgressItems(filtered);
      } catch (err) {
        console.error("Failed to load navbar in progress items count", err);
      }
    };

    fetchInProgressCount();

    const interval = setInterval(fetchInProgressCount, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleItemClick = (itemId) => {
    if (itemId === "todo") {
      setIsTaskPopoverOpen(prev => !prev);
    }
  };

  const menuItems = [
    {
      id: "todo",
      label: "오늘 할 일",
      value: `${inProgressCount}개`,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    },
    {
      id: "dday",
      label: "올해 마감",
      value: dDayLabel,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
  ];

  useEffect(() => {
    if (!isTaskPopoverOpen) return;

    const handleOutsideClick = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsTaskPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isTaskPopoverOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!navbarRef.current) return;

      if (isTaskPopoverOpen) {
        setCollapsed(false);
        return;
      }

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
  }, [isTaskPopoverOpen]);

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

          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`navbar-item ${collapsed ? "collapsed" : ""} ${item.id === "todo" ? "clickable" : ""}`}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="item-icon-wrapper">
                {item.icon}
                {collapsed && item.id === "todo" && inProgressCount > 0 && (
                  <span className="mini-badge">{inProgressCount}</span>
                )}
                {collapsed && item.id === "dday" && (
                  <span className="mini-dday-badge">D</span>
                )}
              </div>
              {!collapsed && (
                <div className="item-content">
                  <span className="item-label">{item.label}</span>
                  <span className="item-value">{item.value}</span>
                </div>
              )}
            </div>
          ))}

          {isTaskPopoverOpen && (
            <div className="task-popover-layer" onClick={(e) => e.stopPropagation()}>
              <div className="popover-header">
                <h5>오늘 할 일 ({inProgressCount})</h5>
                <button onClick={(e) => { e.stopPropagation(); setIsTaskPopoverOpen(false); }} className="popover-close-btn">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="popover-body">
                {inProgressItems.length === 0 ? (
                  <div className="empty-tasks">
                    <span className="emoji">🎉</span>
                    <p>오늘 완료할 로드맵이 없습니다!<br />새로운 도전을 더해 보세요.</p>
                  </div>
                ) : (
                  <div className="task-list">
                    {inProgressItems.map((item) => (
                      <div key={item.roadmapItemId} className="task-list-item">
                        <div className="task-info">
                          <span className="task-title">{item.title}</span>
                          {item.endedAt && (
                            <span className="task-date">
                              ~ {new Date(item.endedAt).toLocaleDateString("ko-KR", { month: 'numeric', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};