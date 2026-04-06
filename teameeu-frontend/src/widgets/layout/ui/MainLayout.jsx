import { Navbar } from "@/widgets/navbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FloatingBar />
    </div>
  );
};