import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout } from "@/widgets/layout";
import { HomePage } from "@/pages/home";
import { SplashPage } from "@/pages/splash";
import { LoginPage } from "@/pages/login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};