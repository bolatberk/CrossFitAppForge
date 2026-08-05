import { useMemo, useState } from 'react';

import {
  getAvailableWeeks,
  getTrainingWeek,
  trainingProgram,
} from '../programs';

function getLatestWeekNumber(
  blockNumber: number
): number {
  const availableWeeks =
    getAvailableWeeks(blockNumber);

  return (
    availableWeeks.at(-1)?.week ??
    availableWeeks[0]?.week ??
    1
  );
}

export function useProgram(
  initialBlock = 1
) {
  const [activeBlockNumber, setActiveBlockNumber] =
    useState(initialBlock);

  const [activeWeekNumber, setActiveWeekNumber] =
    useState(() =>
      getLatestWeekNumber(initialBlock)
    );

  const availableWeeks = useMemo(
    () => getAvailableWeeks(activeBlockNumber),
    [activeBlockNumber]
  );

  const activeWeek =
    getTrainingWeek(
      activeBlockNumber,
      activeWeekNumber
    ) ??
    availableWeeks.at(-1) ??
    trainingProgram[0];

  if (!activeWeek) {
    throw new Error(
      'Program verisi bulunamadı. programs klasörünü kontrol et.'
    );
  }

  function selectWeek(weekNumber: number) {
    const selectedWeek = getTrainingWeek(
      activeBlockNumber,
      weekNumber
    );

    if (!selectedWeek) {
      return;
    }

    setActiveWeekNumber(weekNumber);
  }

  function selectBlock(blockNumber: number) {
    const latestWeekNumber =
      getLatestWeekNumber(blockNumber);

    const latestWeek = getTrainingWeek(
      blockNumber,
      latestWeekNumber
    );

    if (!latestWeek) {
      return;
    }

    setActiveBlockNumber(blockNumber);
    setActiveWeekNumber(latestWeekNumber);
  }

  return {
    activeWeek,
    activeBlockNumber,
    activeWeekNumber,
    availableWeeks,
    selectBlock,
    selectWeek,
  };
}
