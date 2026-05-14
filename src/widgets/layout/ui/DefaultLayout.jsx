import { Topbar } from "@/widgets/topbar";
import { FloatingBar } from "@/widgets/floatingbar";
import { Footer } from "@/widgets/footer";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div style={{ display: "flex", position: "relative", padding: "0px", flexDirection: "column" }}>
      <Topbar />
        <Outlet />
      <FloatingBar />
      <Footer />
    </div>
  );
};