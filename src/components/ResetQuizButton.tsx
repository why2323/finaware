import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { clearQuizResult } from '@/lib/storage';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const ResetQuizButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    clearQuizResult();
    toast.success('Quiz reset successfully');
    setOpen(false);
    navigate('/quiz');
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <RotateCcw className="w-4 h-4" />
          Reset Quiz
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Risk Profile Quiz?</AlertDialogTitle>
          <AlertDialogDescription>
            This will clear your current risk profile and allow you to retake the quiz. 
            Your personalized experience will be updated based on your new results.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset} className="bg-primary hover:bg-primary/90">
            Reset Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetQuizButton;