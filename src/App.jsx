import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserDashboardPage from './pages/UserDashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ExamPage from './pages/ExamPage.jsx';
import AppShell from './layouts/AppShell.jsx';
import AuthGuard from './layouts/AuthGuard.jsx';
import { useAppContext } from './context/AppContext.jsx';

const App = () => {
  const { session } = useAppContext();
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}> 
          <Route
            path="/dashboard"
            element={session?.user?.role === 'admin' ? <Navigate to="/admin" /> : <UserDashboardPage />}
          />
          <Route path="/admin" element={session?.user?.role === 'admin' ? <AdminDashboardPage /> : <Navigate to="/dashboard" />} />
          <Route path="/exam" element={<ExamPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
