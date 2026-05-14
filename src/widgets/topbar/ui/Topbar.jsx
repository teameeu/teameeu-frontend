import "./Topbar.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Topbar = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

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
        <img src="/logo.svg" alt="logo" />
      </div>

      <div className="topbar-btns">
        <button className="topbar-btn">대시보드</button>
        <button className="topbar-btn">로드맵</button>
        <button className="topbar-btn">진로검사</button>
      </div>
    </div>
  );
};