export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      market_updates: {
        Row: {
          id: string
          created_at: string
          week_of: string
          title: string
          summary: string
          macro_global: string
          forex: string
          crypto: string
          us_news: string
          liquidity_rates: string
          insights: string
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          week_of: string
          title: string
          summary: string
          macro_global: string
          forex: string
          crypto: string
          us_news: string
          liquidity_rates: string
          insights: string
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          week_of?: string
          title?: string
          summary?: string
          macro_global?: string
          forex?: string
          crypto?: string
          us_news?: string
          liquidity_rates?: string
          insights?: string
          image_url?: string | null
        }
      }
      ai_updates: {
        Row: {
          id: string
          created_at: string
          week_of: string
          title: string
          summary: string
          sector_impacts: string
          notable_launches: string
          long_term_take: string
          risks_failures: string | null
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          week_of: string
          title: string
          summary: string
          sector_impacts: string
          notable_launches: string
          long_term_take: string
          risks_failures?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          week_of?: string
          title?: string
          summary?: string
          sector_impacts?: string
          notable_launches?: string
          long_term_take?: string
          risks_failures?: string | null
          image_url?: string | null
        }
      }
      myths_facts: {
        Row: {
          id: string
          created_at: string
          myth: string
          fact: string
          why_it_matters: string
        }
        Insert: {
          id?: string
          created_at?: string
          myth: string
          fact: string
          why_it_matters: string
        }
        Update: {
          id?: string
          created_at?: string
          myth?: string
          fact?: string
          why_it_matters?: string
        }
      }
    }
  }
}