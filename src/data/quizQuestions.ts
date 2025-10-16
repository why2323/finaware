export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: 'conservative' | 'balanced' | 'aggressive';
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you feel if your investment dropped 20% in a month?",
    options: [
      { text: "Very worried - I'd want to sell immediately", value: 'conservative' },
      { text: "Concerned, but I'd wait and see", value: 'balanced' },
      { text: "It's normal - I'd consider buying more", value: 'aggressive' },
    ],
  },
  {
    id: 2,
    question: "What's your main investment goal?",
    options: [
      { text: "Protect my money and grow it slowly", value: 'conservative' },
      { text: "Balance safety with some growth", value: 'balanced' },
      { text: "Maximize returns, even with higher risk", value: 'aggressive' },
    ],
  },
  {
    id: 3,
    question: "How long do you plan to invest before needing the money?",
    options: [
      { text: "Less than 3 years", value: 'conservative' },
      { text: "3-7 years", value: 'balanced' },
      { text: "More than 7 years", value: 'aggressive' },
    ],
  },
  {
    id: 4,
    question: "How much of your savings are you comfortable investing?",
    options: [
      { text: "Less than 25% - I want most in savings", value: 'conservative' },
      { text: "25-50% - A balanced approach", value: 'balanced' },
      { text: "More than 50% - I'm ready to invest", value: 'aggressive' },
    ],
  },
  {
    id: 5,
    question: "How do you react to market news and volatility?",
    options: [
      { text: "It makes me anxious and I check often", value: 'conservative' },
      { text: "I stay informed but don't panic", value: 'balanced' },
      { text: "I see it as opportunity, not threat", value: 'aggressive' },
    ],
  },
];

export const calculateRiskProfile = (answers: Record<number, string>): 'conservative' | 'balanced' | 'aggressive' => {
  const scores = {
    conservative: 0,
    balanced: 0,
    aggressive: 0,
  };

  Object.values(answers).forEach((answer) => {
    scores[answer as keyof typeof scores]++;
  });

  const maxScore = Math.max(scores.conservative, scores.balanced, scores.aggressive);
  
  if (scores.aggressive === maxScore) return 'aggressive';
  if (scores.balanced === maxScore) return 'balanced';
  return 'conservative';
};