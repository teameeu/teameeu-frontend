import { AuthBanner } from "@/widgets/auth-banner";
import { Topbar } from "@/widgets/topbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // <div style={{ display: "flex", position: "relative", padding: "0px 120px" }}>
    <div style={{ display: "flex", position: "relative", padding: "0px 120px" }}>
      <Topbar />
      <AuthBanner />
      <div style={{ flex: 1, padding: "96px 24px 40px 24px" }}>
        <Outlet />
      </div>
      <FloatingBar />
    </div>
  );
};