import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import AdminDashboard from "../pages/admin/Dashboard";
import LecturerDashboard from "../pages/lecturer/LecturerDashboard";
import StudentDashboard from "../pages/student/Dashboard";
import LeaderDashboard from "../pages/student/leader/LeaderDashboard";
import MemberDashboard from "../pages/student/member/MemberDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />


        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute roles={["LECTURER"]} />}>
          <Route path="/lecturer" element={<LecturerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute roles={["STUDENT"]} />}>
          <Route path="/student" element={<StudentDashboard />} />

          <Route
            path="/student/leader"
            element={
              <ProtectedRoute leaderOnly>
                <LeaderDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/member"
            element={
              <ProtectedRoute memberOnly>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
