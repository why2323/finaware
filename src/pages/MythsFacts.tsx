import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { MythFact } from '@/types';

const MythsFacts = () => {
  const { data: mythsFacts, isLoading } = useQuery({
    queryKey: ['myths-facts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('myths_facts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MythFact[];
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Myths vs Facts</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Debunking common investment misconceptions with clear facts
        </p>
      </motion.div>

      {/* Myths & Facts List */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-secondary rounded w-3/4 mb-4" />
              <div className="h-4 bg-secondary rounded w-full mb-2" />
              <div className="h-4 bg-secondary rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : mythsFacts && mythsFacts.length > 0 ? (
        <div className="space-y-6">
          {mythsFacts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
            >
              {/* Myth Section */}
              <div className="p-6 bg-destructive/5 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full mb-2">
                      MYTH
                    </div>
                    <p className="text-lg font-medium">{item.myth}</p>
                  </div>
                </div>
              </div>

              {/* Fact Section */}
              <div className="p-6 bg-primary/5 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                      FACT
                    </div>
                    <p className="text-lg font-medium">{item.fact}</p>
                  </div>
                </div>
              </div>

              {/* Why It Matters Section */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">
                      Why It Matters
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.why_it_matters}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">No myths & facts available yet</p>
        </div>
      )}
    </div>
  );
};

export default MythsFacts;