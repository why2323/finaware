import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const MythFactForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    myth: '',
    fact: '',
    why_it_matters: '',
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('myths_facts').insert([data] as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myths-facts'] });
      queryClient.invalidateQueries({ queryKey: ['recent-myths'] });
      toast.success('Myth vs Fact published successfully!');
      setFormData({
        myth: '',
        fact: '',
        why_it_matters: '',
      });
    },
    onError: (error: any) => {
      console.error('Error creating myth/fact:', error);
      toast.error('Failed to publish myth vs fact');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Myth vs Fact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Myth</label>
          <Textarea
            name="myth"
            value={formData.myth}
            onChange={handleChange}
            placeholder="The common misconception..."
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fact</label>
          <Textarea
            name="fact"
            value={formData.fact}
            onChange={handleChange}
            placeholder="The actual truth..."
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Why It Matters</label>
          <Textarea
            name="why_it_matters"
            value={formData.why_it_matters}
            onChange={handleChange}
            placeholder="Explain the importance..."
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
          {createMutation.isPending ? 'Publishing...' : 'Publish Myth vs Fact'}
        </Button>
      </form>
    </div>
  );
};

export default MythFactForm;