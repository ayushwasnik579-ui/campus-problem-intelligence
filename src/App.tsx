import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ReportProblem from './pages/student/ReportProblem';
import MyReports from './pages/student/MyReports';
import CampusIssues from './pages/shared/CampusIssues';
import IssueDetails from './pages/shared/IssueDetails';
import Notifications from './pages/shared/Notifications';
import Profile from './pages/shared/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AICommandCenter from './pages/admin/AICommandCenter';
import AIInsights from './pages/admin/AIInsights';
import RecurringIssues from './pages/admin/RecurringIssues';
import Departments from './pages/admin/Departments';
import CampusHeatmap from './pages/admin/CampusHeatmap';
import Analytics from './pages/admin/Analytics';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import type { ReactNode } from 'react';

function ProtectedRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles?: string[] }) {
  const { state } = useApp();
  if (!state.currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles && state.userRole && !allowedRoles.includes(state.userRole)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="report" element={<ReportProblem />} />
        <Route path="my-reports" element={<MyReports />} />
        <Route path="campus-issues" element={<CampusIssues />} />
        <Route path="issue/:id" element={<IssueDetails />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'staff']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="issues" element={<CampusIssues />} />
        <Route path="issue/:id" element={<IssueDetails />} />
        <Route path="ai-command" element={<AICommandCenter />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="recurring" element={<RecurringIssues />} />
        <Route path="departments" element={<Departments />} />
        <Route path="heatmap" element={<CampusHeatmap />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
