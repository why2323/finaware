import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Lightbulb, Brain, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { hasCompletedQuiz, getQuizResult, getRiskProfileLabel } from '@/lib/storage';
import type { MarketUpdate, AIUpdate, MythFact } from '@/types';

const Dashboard = () => {
  const navigate = useNavigate();
  const quizCompleted = hasCompletedQuiz();
  const quizResult = getQuizResult();

  useEffect(() => {
    if (!quizCompleted) {
      navigate('/quiz');
    }
  }, [quizCompleted, navigate]);

  const { data: latestMarketUpdate } = useQuery({
    queryKey: ['latest-market-update'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data as MarketUpdate;
    },
  });

  const { data: latestAIUpdate } = useQuery({
    queryKey: ['latest-ai-update'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data as AIUpdate;
    },
  });

  const { data: recentMyths } = useQuery({
    queryKey: ['recent-myths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('myths_facts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as MythFact[];
    },
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome back, <span className="text-primary">{quizResult ? getRiskProfileLabel(quizResult.profile).split(' ')[0] : ''}</span> investor
            </h1>
            <p className="text-lg text-muted-foreground">Everything at a glance</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            New this week
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Latest Market Update */}
        {latestMarketUpdate && (
          <motion.div variants={item}>
            <Link
              to={`/market-updates/${latestMarketUpdate.id}`}
              className="block group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      Latest World Market Update
                    </h3>
                    <p className="text-sm text-muted-foreground">Week of {latestMarketUpdate.week_of}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <h4 className="font-semibold mb-2">{latestMarketUpdate.title}</h4>
                <p className="text-muted-foreground line-clamp-3">{latestMarketUpdate.summary}</p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Latest AI Update */}
        {latestAIUpdate && (
          <motion.div variants={item}>
            <Link
              to={`/ai-updates/${latestAIUpdate.id}`}
              className="block group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      Latest AI Impact Update
                    </h3>
                    <p className="text-sm text-muted-foreground">Week of {latestAIUpdate.week_of}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <h4 className="font-semibold mb-2">{latestAIUpdate.title}</h4>
                <p className="text-muted-foreground line-clamp-3">{latestAIUpdate.summary}</p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Recent Myths vs Facts */}
        {recentMyths && recentMyths.length > 0 && (
          <motion.div variants={item} className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Recent Myths vs Facts</h3>
                </div>
                <Link
                  to="/myths-facts"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentMyths.map((myth) => (
                  <div
                    key={myth.id}
                    className="p-4 bg-secondary/50 rounded-xl border border-border/50"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
                        MYTH
                      </span>
                      <p className="flex-1 text-sm">{myth.myth}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        FACT
                      </span>
                      <p className="flex-1 text-sm text-muted-foreground">{myth.fact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz CTA (if not completed) */}
        {!quizCompleted && (
          <motion.div variants={item} className="lg:col-span-2">
            <Link to="/quiz" className="block group">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Discover Your Risk Profile</h3>
                    <p className="text-muted-foreground">
                      Take our 5-question quiz to understand your investment style
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;