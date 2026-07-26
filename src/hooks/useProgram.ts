import { useMemo, useState } from 'react';

import {
  getAvailableWeeks,
  getTrainingWeek,
  trainingProgram,
} from '../programs';

export function useProgram(
  initialBlock = 1,
  initialWeek = 1
) {
  const [activeBlockNumber, setActiveBlockNumber] =
    useState(initialBlock);

  const [activeWeekNumber, setActiveWeekNumber] =
    useState(initialWeek);

  const activeWeek =
    getTrainingWeek(
      activeBlockNumber,
      activeWeekNumber
    ) ?? trainingProgram[0];

  if (!activeWeek) {
    throw new Error(
      'Program verisi bulunamadı. programs klasörünü kontrol et.'
    );
  }

  const availableWeeks = useMemo(
    () => getAvailableWeeks(activeBlockNumber),
    [activeBlockNumber]
  );

  function selectWeek(weekNumber: number) {
    setActiveWeekNumber(weekNumber);
  }

  return {
    activeWeek,
    activeBlockNumber,
    activeWeekNumber,
    availableWeeks,
    setActiveBlockNumber,
    selectWeek,
  };
}
