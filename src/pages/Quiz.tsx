```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { quizQuestions, calculateRiskProfile } from '@/data/quizQuestions';
import { saveQuizResult, getRiskProfileLabel } from '@/lib/storage';
import { Button } from '@/components/ui/button';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const profile = calculateRiskProfile(answers);
      const quizResult = {
        profile,
        completedAt: new Date().toISOString(),
      };
      saveQuizResult(quizResult);
      setResult(getRiskProfileLabel(profile));
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];
  const hasAnswer = answers[currentQuestion] !== undefined;

  if (showResult) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center bg-white/95">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Your Risk Profile</h1>
            <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <p className="text-2xl font-semibold text-primary">{result}</p>
            </div>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
              Great! We'll personalize your experience based on your investment style. You'll receive weekly updates tailored to your profile.
            </p>
            <Button
              onClick={handleFinish}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-8">
        <div className="glass-panel px-6 py-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.35em] text-slate-400 uppercase">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="quiz-shell p-8 md:p-12 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{currentQ.question}</h2>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-5 sm:p-6 quiz-option min-h-[64px] ${
                    answers[currentQuestion] === option.value ? 'quiz-option--active' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[currentQuestion] === option.value
                          ? 'border-cyan-300 bg-cyan-300 text-slate-900'
                          : 'border-white/40 text-transparent'
                      }`}
                    >
                      {answers[currentQuestion] === option.value && <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-base sm:text-lg">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentQuestion === 0}
            className="gap-2 min-h-[48px] px-6 text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 min-h-[48px] px-6 text-base"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
```
