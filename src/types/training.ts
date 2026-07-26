export interface TrainingSection {
  id: string;
  title: string;
  duration?: string;
  items: string[];
}

export interface TrainingDay {
  id: string;
  day: string;
  title: string;
  duration: string;
  focus: string;
  purpose: string;
  sections: TrainingSection[];
}

export interface TrainingWeek {
  id: string;
  block: number;
  week: number;
  title: string;
  description?: string;
  days: TrainingDay[];
}

export interface TrainingBlock {
  id: string;
  block: number;
  title: string;
  description?: string;
  weeks: TrainingWeek[];
}

export interface ProgressData {
  completedSections: Record<string, string[]>;
}
