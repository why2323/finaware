import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedQuiz } from '@/lib/storage';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to quiz if not completed, otherwise to dashboard
    if (!hasCompletedQuiz()) {
      navigate('/quiz');
    }
  }, [navigate]);

  // This component just redirects, so we show a loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;