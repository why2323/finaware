```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div className="app-shell bg-slate-50 text-slate-900">
      <div className="floating-dots" aria-hidden />
      <div className="relative min-h-screen flex flex-col">
        <Navigation />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex-1 relative z-10"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
```
