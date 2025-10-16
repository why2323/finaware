import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { initializeOneSignal } from '@/lib/onesignal';

import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import MarketUpdates from '@/pages/MarketUpdates';
import MarketUpdateDetail from '@/pages/MarketUpdateDetail';
import AIUpdates from '@/pages/AIUpdates';
import AIUpdateDetail from '@/pages/AIUpdateDetail';
import MythsFacts from '@/pages/MythsFacts';
import Quiz from '@/pages/Quiz';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    initializeOneSignal();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="market-updates" element={<MarketUpdates />} />
              <Route path="market-updates/:id" element={<MarketUpdateDetail />} />
              <Route path="ai-updates" element={<AIUpdates />} />
              <Route path="ai-updates/:id" element={<AIUpdateDetail />} />
              <Route path="myths-facts" element={<MythsFacts />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;