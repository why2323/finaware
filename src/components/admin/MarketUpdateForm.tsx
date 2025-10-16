import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const MarketUpdateForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    week_of: '',
    title: '',
    summary: '',
    macro_global: '',
    forex: '',
    crypto: '',
    us_news: '',
    liquidity_rates: '',
    insights: '',
    image_url: '',
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('market_updates').insert([data] as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market-updates'] });
      queryClient.invalidateQueries({ queryKey: ['latest-market-update'] });
      toast.success('Market update published successfully!');
      setFormData({
        week_of: '',
        title: '',
        summary: '',
        macro_global: '',
        forex: '',
        crypto: '',
        us_news: '',
        liquidity_rates: '',
        insights: '',
        image_url: '',
      });
    },
    onError: (error: any) => {
      console.error('Error creating market update:', error);
      toast.error('Failed to publish market update');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Market Update</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Week Of</label>
            <Input
              name="week_of"
              value={formData.week_of}
              onChange={handleChange}
              placeholder="e.g., Jan 1, 2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
            <Input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Market update title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <Textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief summary of the week"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Macro & Global Markets</label>
          <Textarea
            name="macro_global"
            value={formData.macro_global}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Forex</label>
          <Textarea
            name="forex"
            value={formData.forex}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Crypto</label>
          <Textarea
            name="crypto"
            value={formData.crypto}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Major US News</label>
          <Textarea
            name="us_news"
            value={formData.us_news}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Liquidity / Rates</label>
          <Textarea
            name="liquidity_rates"
            value={formData.liquidity_rates}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Actionable Educational Insights</label>
          <Textarea
            name="insights"
            value={formData.insights}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          {createMutation.isPending ? 'Publishing...' : 'Publish Market Update'}
        </Button>
      </form>
    </div>
  );
};

export default MarketUpdateForm;