import { Navbar } from "@/widgets/navbar";
import { Topbar } from "@/widgets/topbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout = () => {
  const location = useLocation();
  const isTestPage = location.pathname.startsWith("/test");

  return (
    <div style={{
      display: "flex",
      position: "relative",
      padding: isTestPage ? "0px" : "0px 120px 0px 0px",
      overflowX: "hidden",
      width: "100vw",
      minHeight: "100vh"
    }}>
      <Topbar />
      <Navbar />
      <div style={{
        flex: 1,
        padding: isTestPage ? "56px 0px 0px 0px" : "96px 24px 40px 24px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <Outlet />
      </div>
      <FloatingBar />
    </div>
  );
};