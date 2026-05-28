import { Topbar } from "@/widgets/topbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Footer } from "@/widgets/footer";
import { Outlet, useLocation } from "react-router-dom";

export const DefaultLayout = () => {
  const location = useLocation();
  const showFloatingBar = location.pathname !== "/overview" && location.pathname !== "/" && location.pathname !== "/preparing";

  return (
    <div style={{ display: "flex", position: "relative", padding: "0px", flexDirection: "column" }}>
      <Topbar />
        <Outlet />
      {showFloatingBar && <FloatingBar />}
      <Footer />
    </div>
  );
};