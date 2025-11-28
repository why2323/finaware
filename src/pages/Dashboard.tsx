```tsx
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

  const formattedWeek = latestMarketUpdate
    ? new Date(latestMarketUpdate.week_of).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : 'This week';

  const insights = [
    {
      label: 'Risk Profile',
      value: quizResult ? getRiskProfileLabel(quizResult.profile) : 'Not set',
      helper: quizResult ? 'Personalised insights unlocked' : 'Finish quiz to personalise data',
    },
    {
      label: 'Market Snapshot',
      value: formattedWeek,
      helper: 'Latest curated update',
    },
    {
      label: 'AI Briefings',
      value: latestAIUpdate ? 'New insight ready' : 'Queued',
      helper: latestAIUpdate ? latestAIUpdate.title : 'Stay tuned for the next drop',
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-spotlight rounded-3xl overflow-hidden bg-slate-900 text-white px-6 sm:px-10 py-10 shadow-2xl"
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <div className="pill pill-primary w-fit bg-white/10 border-white/30 text-white">Weekly pulse</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Welcome back,{' '}
              <span className="text-cyan-300">
                {quizResult ? getRiskProfileLabel(quizResult.profile).split(' ')[0] : 'curious'}
              </span>{' '}
              investor
            </h1>
            <p className="text-white/70 text-base sm:text-lg">
              Get curated market briefings, AI impact snapshots and myth-busting facts aligned with your investing
              style.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/market-updates"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/90 text-slate-900 font-semibold px-5 py-3 sm:py-2.5 shadow-lg shadow-white/20 min-h-[44px] active:scale-95 transition-transform"
              >
                View market desk
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ai-updates"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/40 text-white px-5 py-3 sm:py-2.5 min-h-[44px] active:scale-95 transition-transform"
              >
                AI digest
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {insights.map((insight) => (
              <div key={insight.label} className="stat-card bg-white/10 text-white border-white/20">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">{insight.label}</p>
                <p className="text-xl font-semibold">{insight.value}</p>
                <p className="text-xs text-white/60 mt-1">{insight.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Market Update */}
        {latestMarketUpdate && (
          <motion.div variants={item}>
            <Link to={`/market-updates/${latestMarketUpdate.id}`} className="block group">
              <div className="h-full glass-panel p-6">
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
            <Link to={`/ai-updates/${latestAIUpdate.id}`} className="block group">
              <div className="h-full glass-panel p-6">
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
            <div className="glass-panel p-6">
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
                  <div key={myth.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
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
              <div className="glass-panel bg-gradient-to-br from-primary/10 to-primary/5 p-8 hover:border-primary/50 transition-all">
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
```
