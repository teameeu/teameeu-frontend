import { Navbar } from "@/widgets/navbar";
import { Topbar } from "@/widgets/topbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    // <div style={{ display: "flex", position: "relative", padding: "0px 120px" }}>
    <div style={{ display: "flex", position: "relative", padding: "0px 120px 0px 0px" }}>
      <Topbar />
      <Navbar />
      <div style={{ flex: 1, padding: "96px 24px 40px 24px" }}>
        <Outlet />
      </div>
      <FloatingBar />
    </div>
  );
};