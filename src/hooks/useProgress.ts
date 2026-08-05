import { useEffect, useMemo, useState } from 'react';

import type {
  ProgressData,
  TrainingDay,
} from '../types/training';

const STORAGE_KEY = 'forge-progress-v2';

const EMPTY_PROGRESS: ProgressData = {
  completedSections: {},
};

function isProgressData(value: unknown): value is ProgressData {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const completedSections = (
    value as Partial<ProgressData>
  ).completedSections;

  if (
    !completedSections ||
    typeof completedSections !== 'object' ||
    Array.isArray(completedSections)
  ) {
    return false;
  }

  return Object.values(completedSections).every(
    (sectionIds) =>
      Array.isArray(sectionIds) &&
      sectionIds.every(
        (sectionId) => typeof sectionId === 'string'
      )
  );
}

function loadProgress(): ProgressData {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return EMPTY_PROGRESS;
    }

    const parsedProgress: unknown = JSON.parse(
      savedProgress
    );

    return isProgressData(parsedProgress)
      ? parsedProgress
      : EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function useProgress(trainingDays: TrainingDay[]) {
  const [progress, setProgress] = useState<ProgressData>(
    loadProgress
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  }, [progress]);

  const completedDayIds = useMemo(() => {
    return trainingDays
      .filter((day) => {
        if (day.sections.length === 0) {
          return false;
        }

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
        (day) =>
          !day.optional &&
          !completedDayIds.includes(day.id)
      ) ??
      trainingDays.find(
        (day) => !completedDayIds.includes(day.id)
      ) ??
      null
    );
  }, [completedDayIds, trainingDays]);

  function toggleSection(
    dayId: string,
    sectionId: string
  ) {
    const day = trainingDays.find(
      (trainingDay) => trainingDay.id === dayId
    );

    if (
      !day ||
      !day.sections.some(
        (section) => section.id === sectionId
      )
    ) {
      return;
    }

    setProgress((currentProgress) => {
      const currentDaySections =
        currentProgress.completedSections[dayId] ?? [];

      const isAlreadyCompleted =
        currentDaySections.includes(sectionId);

      const updatedDaySections = isAlreadyCompleted
        ? currentDaySections.filter(
            (id) => id !== sectionId
          )
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
