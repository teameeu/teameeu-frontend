import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/widgets/layout";
import { HomePage } from "@/pages/home";
import { SplashPage } from "@/pages/splash";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};