import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import type { AIUpdate } from '@/types';

const AIUpdateDetail = () => {
  const { id } = useParams();

  const { data: update, isLoading } = useQuery({
    queryKey: ['ai-update', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_updates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as AIUpdate;
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
        <p className="text-muted-foreground text-lg mb-4">AI update not found</p>
        <Link to="/ai-updates">
          <Button variant="outline">Back to AI Updates</Button>
        </Link>
      </div>
    );
  }

  const sections = [
    { title: 'Sector Impacts', content: update.sector_impacts },
    { title: 'Notable Launches', content: update.notable_launches },
    { title: 'Long Term Take', content: update.long_term_take },
    ...(update.risks_failures ? [{ title: 'Risks/Failures', content: update.risks_failures }] : []),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Back Button */}
        <Link to="/ai-updates" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to AI Updates
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
                  <Sparkles className="w-5 h-5 text-primary" />
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

export default AIUpdateDetail;