```tsx
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hasCompletedQuiz } from '@/lib/storage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ResetQuizButton from './ResetQuizButton';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const quizCompleted = hasCompletedQuiz();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/market-updates', label: 'Market Updates' },
    { path: '/ai-updates', label: 'AI Impact' },
    { path: '/myths-facts', label: 'Myths vs Facts' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-6 pb-3">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white transition-transform group-hover:-translate-y-1">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FinAware</p>
                <p className="text-xl font-semibold text-slate-900">Wealth Intelligence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {quizCompleted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200">
                      <Settings className="w-5 h-5" />
                      Toolkit
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <ResetQuizButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu Button - 44x44px minimum for touch */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl border border-slate-200 text-slate-700 active:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 border-t border-slate-200 pt-4 space-y-2"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-all min-h-[48px] flex items-center ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-500 active:text-slate-900 active:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {quizCompleted && (
                  <div className="pt-2 border-t border-slate-200">
                    <ResetQuizButton />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
```
