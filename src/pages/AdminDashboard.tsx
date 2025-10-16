import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, TrendingUp, Sparkles, Lightbulb } from 'lucide-react';
import MarketUpdateForm from '@/components/admin/MarketUpdateForm';
import AIUpdateForm from '@/components/admin/AIUpdateForm';
import MythFactForm from '@/components/admin/MythFactForm';
import ContentList from '@/components/admin/ContentList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('market-updates');

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage FinAware content</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="market-updates" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Market Updates
            </TabsTrigger>
            <TabsTrigger value="ai-updates" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Updates
            </TabsTrigger>
            <TabsTrigger value="myths-facts" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Myths & Facts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market-updates" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MarketUpdateForm />
              <div className="mt-8">
                <ContentList type="market" />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="ai-updates" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AIUpdateForm />
              <div className="mt-8">
                <ContentList type="ai" />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="myths-facts" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MythFactForm />
              <div className="mt-8">
                <ContentList type="myth" />
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;