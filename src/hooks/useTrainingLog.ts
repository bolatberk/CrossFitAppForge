import { useMemo, useState } from 'react';
import type { SectionResult, TrainingLogData } from '../types/trainingLog';

const STORAGE_KEY = 'forge-training-log-v1';

function readLog(): TrainingLogData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useTrainingLog() {
  const [results, setResults] = useState<TrainingLogData>(readLog);

  function saveResult(result: SectionResult) {
    setResults(current => {
      const next = {
        ...current,
        [`${result.dayId}:${result.sectionId}`]: result,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function getResult(dayId: string, sectionId: string) {
    return results[`${dayId}:${sectionId}`];
  }

  const allResults = useMemo(
    () => Object.values(results).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [results]
  );

  const averageRpe = useMemo(() => {
    const values = allResults
      .map(result => Number(result.rpe))
      .filter(value => Number.isFinite(value) && value > 0);
    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }, [allResults]);

  return { results, allResults, averageRpe, saveResult, getResult };
}
