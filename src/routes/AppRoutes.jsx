import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import FAQPage from "../pages/FAQPage";
import StudentChat from "../pages/StudentChat";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/faqs" element={<FAQPage />} />

        <Route path="/chat" element={<StudentChat />} />
      </Routes>
    </BrowserRouter>
  );
}