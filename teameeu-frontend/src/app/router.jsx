import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/widgets/layout";
import { HomePage } from "@/pages/home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};