import { useEffect, useMemo, useState } from 'react';

import type {
  ProgressData,
  TrainingDay,
} from '../types/training';

const STORAGE_KEY = 'forge-progress-v2';

function loadProgress(): ProgressData {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return { completedSections: {} };
    }

    return JSON.parse(savedProgress) as ProgressData;
  } catch {
    return { completedSections: {} };
  }
}

export function useProgress(trainingDays: TrainingDay[]) {
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completedDayIds = useMemo(() => {
    return trainingDays
      .filter((day) => {
        const completedSections =
          progress.completedSections[day.id] ?? [];

        return day.sections.every((section) =>
          completedSections.includes(section.id)
        );
      })
      .map((day) => day.id);
  }, [progress, trainingDays]);

  const nextDay = useMemo(() => {
    return (
      trainingDays.find(
        (day) => !completedDayIds.includes(day.id)
      ) ?? null
    );
  }, [completedDayIds, trainingDays]);

  function toggleSection(dayId: string, sectionId: string) {
    setProgress((currentProgress) => {
      const currentDaySections =
        currentProgress.completedSections[dayId] ?? [];

      const isAlreadyCompleted =
        currentDaySections.includes(sectionId);

      const updatedDaySections = isAlreadyCompleted
        ? currentDaySections.filter((id) => id !== sectionId)
        : [...currentDaySections, sectionId];

      return {
        ...currentProgress,
        completedSections: {
          ...currentProgress.completedSections,
          [dayId]: updatedDaySections,
        },
      };
    });
  }

  return {
    progress,
    completedDayIds,
    completedDayCount: completedDayIds.length,
    nextDay,
    toggleSection,
  };
}
