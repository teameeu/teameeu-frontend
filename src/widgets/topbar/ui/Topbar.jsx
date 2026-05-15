import "./Topbar.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth";

export const Topbar = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClickMenu = (path) => {
    navigate(path);
  }

  useEffect(() => {
    // /overview 아닐 때는 항상 보이게
    if (location.pathname !== "/overview") {
      setShow(true);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className={`topbar ${show ? "show" : "hide"}`}>
      <div className="topbar-logo">
        <span className="material-symbols-outlined">menu</span>
      </div>

      <div className="topbar-logo-img">
        <img src="/img/logo/logo01.svg" alt="logo" />
      </div>

      <div className="topbar-btns">
        {user ? (
          <>
            <button className="topbar-btn" onClick={() => handleClickMenu("/dashboard")}>
              대시보드
            </button>
            <button className="topbar-btn" onClick={() => handleClickMenu("/roadmap")}>
              로드맵
            </button>
            <button className="topbar-btn" onClick={() => handleClickMenu("/career-test")}>
              진로검사
            </button>
          </>
        ) : (
          <>
            <button className="topbar-btn" onClick={() => handleClickMenu("/login")}>
              로그인
            </button>
            <button className="topbar-btn" onClick={() => handleClickMenu("/join")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};