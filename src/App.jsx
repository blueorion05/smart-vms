import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import AdminAccessControlPage from './pages/admin/AdminAccessControlPage'
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminReportsPage from './pages/admin/AdminReportsPage'
import AdminSecurityPage from './pages/admin/AdminSecurityPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminVisitorPage from './pages/admin/AdminVisitorPage'
import LoginPage from './pages/LoginPage'
import ReceptionistPage from './pages/ReceptionistPage'
import SecurityPage from './pages/SecurityPage'
import VisitorPage from './pages/VisitorPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="visitors" element={<AdminVisitorPage />} />
        <Route path="access-control" element={<AdminAccessControlPage />} />
        <Route path="security" element={<AdminSecurityPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
      </Route>
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/receptionist" element={<ReceptionistPage />} />
      <Route path="/visitor" element={<VisitorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
