export type RiskProfile = 'conservative' | 'balanced' | 'aggressive';

export interface QuizAnswer {
  questionId: number;
  answer: string;
}

export interface QuizResult {
  profile: RiskProfile;
  completedAt: string;
}

export interface MarketUpdate {
  id: string;
  created_at: string;
  week_of: string;
  title: string;
  summary: string;
  macro_global: string;
  forex: string;
  crypto: string;
  us_news: string;
  liquidity_rates: string;
  insights: string;
  image_url: string | null;
}

export interface AIUpdate {
  id: string;
  created_at: string;
  week_of: string;
  title: string;
  summary: string;
  sector_impacts: string;
  notable_launches: string;
  long_term_take: string;
  risks_failures: string | null;
  image_url: string | null;
}

export interface MythFact {
  id: string;
  created_at: string;
  myth: string;
  fact: string;
  why_it_matters: string;
}