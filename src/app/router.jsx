import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout, DefaultLayout } from "@/widgets/layout";
import { ProtectedRoute } from "@/features/auth/context/ProtectedRoute";
import { HomePage } from "@/pages/home";
import { TestPage } from "@/pages/test";
import { SplashPage } from "@/pages/splash";
import { LoginPage } from "@/pages/login";
import { JoinPage } from "@/pages/join";
import { Overview } from "@/pages/overview";
import { Roadmap } from "@/pages/roadMap";


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/test" element={<TestPage />} />
          </Route>
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};