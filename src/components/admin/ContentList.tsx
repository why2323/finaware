import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import type { MarketUpdate, AIUpdate, MythFact } from '@/types';

interface ContentListProps {
  type: 'market' | 'ai' | 'myth';
}

const ContentList = ({ type }: ContentListProps) => {
  const queryClient = useQueryClient();

  const tableName = type === 'market' ? 'market_updates' : type === 'ai' ? 'ai_updates' : 'myths_facts';
  const queryKey = type === 'market' ? 'market-updates' : type === 'ai' ? 'ai-updates' : 'myths-facts';

  const { data: items, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (MarketUpdate | AIUpdate | MythFact)[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Item deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  if (!items || items.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No items yet</div>;
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Published Content</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50"
          >
            <div className="flex-1 min-w-0">
              {'title' in item ? (
                <>
                  <h4 className="font-medium truncate">{item.title}</h4>
                  {'week_of' in item && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Week of {item.week_of}</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm truncate">{item.myth}</p>
              )}
            </div>
            <Button
              onClick={() => handleDelete(item.id)}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-4"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;