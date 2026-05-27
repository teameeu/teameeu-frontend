import { AuthBanner } from "@/widgets/auth-banner";
import { Topbar } from "@/widgets/topbar";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // <div style={{ display: "flex", position: "relative", padding: "0px 120px" }}>
    <div style={{ display: "flex", position: "relative", padding: "0px 120px", width: "100%", maxHeight: "100vh", minHeight: "100vh" }}>
      <Topbar />
      <AuthBanner />
      <div style={{ flex: 1, padding: "96px 24px 40px 24px", alignItems: "center", justifyContent: "center", justifyItems: "center", overflowY: "scroll", scrollbarWidth: "none" }}>
        <Outlet />
      </div>
    </div>
  );
};