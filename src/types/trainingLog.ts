export type SectionResult = {
  dayId: string;
  sectionId: string;
  sectionTitle: string;
  actualLoad: string;
  score: string;
  rpe: string;
  limiter: string;
  notes: string;
  updatedAt: string;
};

export type TrainingLogData = Record<string, SectionResult>;
