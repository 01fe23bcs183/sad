import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const AuthGuard = () => {
  const { session } = useAppContext();
  const location = useLocation();

  if (!session?.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (session?.lockdown && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
