import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';
import clsx from 'clsx';

const NavBar = () => {
  const { session, setSession } = useAppContext();

  const handleLogout = () => {
    setSession(null);
  };

  const linkClasses = ({ isActive }) =>
    clsx(
      'px-4 py-2 text-sm font-medium transition-colors duration-200',
      isActive ? 'text-white' : 'text-white/70 hover:text-white'
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-light/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-primary to-accent" />
          PsychePrep
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClasses}>
            Learner
          </NavLink>
          <NavLink to="/admin" className={linkClasses}>
            Admin
          </NavLink>
          <NavLink to="/exam" className={linkClasses}>
            Exam Sandbox
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-glow"
            >
              Access Platform
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
