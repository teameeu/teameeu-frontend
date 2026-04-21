import "./Topbar.css";


export const Topbar = () => {
  return (
    <div className="topbar">
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