export interface ChecklistItem {
  id: number;
  description: string;
  checks: string;
  BFF: boolean;
  TA: boolean;
  ALF: boolean;
}

export interface Station {
  id: number;
  name: string;
  items: ChecklistItem[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TestStats {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  correctPercentage: number;
}

export type Mode = 'learn' | 'test' | 'admin';