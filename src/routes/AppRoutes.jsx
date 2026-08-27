import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/components/Dashboard";
import Login from "../pages/auth/components/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
