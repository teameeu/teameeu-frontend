import { Navbar } from "@/widgets/navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};