import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle.jsx';
import NavBar from '../components/common/NavBar.jsx';

const AppShell = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-surface-light text-white">
      <NavBar />
      <main className="pt-20 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mx-auto w-full max-w-7xl px-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <ThemeToggle />
    </div>
  );
};

export default AppShell;
