import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import type { MarketUpdate } from '@/types';

const MarketUpdates = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: updates, isLoading } = useQuery({
    queryKey: ['market-updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_updates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MarketUpdate[];
    },
  });

  const filteredUpdates = updates?.filter((update) =>
    update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    update.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    update.week_of.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">World Market Updates</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Weekly insights into global markets, forex, crypto, and more
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search market updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-card border-border"
          />
        </div>
      </motion.div>

      {/* Updates List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-secondary rounded w-1/3 mb-4" />
              <div className="h-8 bg-secondary rounded w-3/4 mb-3" />
              <div className="h-4 bg-secondary rounded w-full mb-2" />
              <div className="h-4 bg-secondary rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : filteredUpdates && filteredUpdates.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/market-updates/${update.id}`} className="block group h-full">
                <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>Week of {update.week_of}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{update.summary}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    Read more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No market updates found</p>
        </div>
      )}
    </div>
  );
};

export default MarketUpdates;