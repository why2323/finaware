import type { QuizResult, RiskProfile } from '@/types';

const QUIZ_RESULT_KEY = 'finaware_quiz_result';

export const saveQuizResult = (result: QuizResult): void => {
  localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
};

export const getQuizResult = (): QuizResult | null => {
  const stored = localStorage.getItem(QUIZ_RESULT_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearQuizResult = (): void => {
  localStorage.removeItem(QUIZ_RESULT_KEY);
};

export const hasCompletedQuiz = (): boolean => {
  return getQuizResult() !== null;
};

export const getRiskProfileLabel = (profile: RiskProfile): string => {
  const labels = {
    conservative: 'Conservative (Safe)',
    balanced: 'Balanced',
    aggressive: 'Aggressive',
  };
  return labels[profile];
};