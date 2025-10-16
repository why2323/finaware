import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import type { MarketUpdate } from '@/types';

const MarketUpdateDetail = () => {
  const { id } = useParams();

  const { data: update, isLoading } = useQuery({
    queryKey: ['market-update', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_updates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as MarketUpdate;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/4 mb-8" />
          <div className="h-12 bg-secondary rounded w-3/4 mb-4" />
          <div className="h-6 bg-secondary rounded w-1/3 mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-secondary rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">
        <p className="text-muted-foreground text-lg mb-4">Market update not found</p>
        <Link to="/market-updates">
          <Button variant="outline">Back to Market Updates</Button>
        </Link>
      </div>
    );
  }

  const sections = [
    { title: 'Macro & Global Markets', content: update.macro_global },
    { title: 'Forex', content: update.forex },
    { title: 'Crypto', content: update.crypto },
    { title: 'Major US News', content: update.us_news },
    { title: 'Liquidity / Rates', content: update.liquidity_rates },
    { title: 'Actionable Educational Insights', content: update.insights },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Back Button */}
        <Link to="/market-updates" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Market Updates
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>Week of {update.week_of}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{update.title}</h1>
          <p className="text-xl text-muted-foreground">{update.summary}</p>
        </div>

        {/* Image */}
        {update.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={update.image_url}
              alt={update.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketUpdateDetail;