import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const AIUpdateForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    week_of: '',
    title: '',
    summary: '',
    sector_impacts: '',
    notable_launches: '',
    long_term_take: '',
    risks_failures: '',
    image_url: '',
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('ai_updates').insert([data] as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-updates'] });
      queryClient.invalidateQueries({ queryKey: ['latest-ai-update'] });
      toast.success('AI update published successfully!');
      setFormData({
        week_of: '',
        title: '',
        summary: '',
        sector_impacts: '',
        notable_launches: '',
        long_term_take: '',
        risks_failures: '',
        image_url: '',
      });
    },
    onError: (error: any) => {
      console.error('Error creating AI update:', error);
      toast.error('Failed to publish AI update');
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
      <h2 className="text-2xl font-semibold mb-6">Create AI Impact Update</h2>
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
            placeholder="AI update title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <Textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief summary of AI developments"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sector Impacts</label>
          <Textarea
            name="sector_impacts"
            value={formData.sector_impacts}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notable Launches</label>
          <Textarea
            name="notable_launches"
            value={formData.notable_launches}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Long Term Take</label>
          <Textarea
            name="long_term_take"
            value={formData.long_term_take}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Risks/Failures (optional)</label>
          <Textarea
            name="risks_failures"
            value={formData.risks_failures}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          {createMutation.isPending ? 'Publishing...' : 'Publish AI Update'}
        </Button>
      </form>
    </div>
  );
};

export default AIUpdateForm;