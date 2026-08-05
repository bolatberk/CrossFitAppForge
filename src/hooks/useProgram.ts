import { useMemo, useState } from 'react';

import {
  getAvailableWeeks,
  getTrainingWeek,
  trainingProgram,
} from '../programs';

const ACTIVE_WEEK_STORAGE_KEY = 'forge-active-week-v1';

type StoredWeekSelection = {
  block: number;
  week: number;
};

function loadWeekSelection(
  fallbackBlock: number,
  fallbackWeek: number
): StoredWeekSelection {
  try {
    const savedSelection = localStorage.getItem(
      ACTIVE_WEEK_STORAGE_KEY
    );

    if (!savedSelection) {
      return {
        block: fallbackBlock,
        week: fallbackWeek,
      };
    }

    const parsedSelection = JSON.parse(
      savedSelection
    ) as Partial<StoredWeekSelection>;

    if (
      typeof parsedSelection.block !== 'number' ||
      typeof parsedSelection.week !== 'number' ||
      !getTrainingWeek(
        parsedSelection.block,
        parsedSelection.week
      )
    ) {
      return {
        block: fallbackBlock,
        week: fallbackWeek,
      };
    }

    return {
      block: parsedSelection.block,
      week: parsedSelection.week,
    };
  } catch {
    return {
      block: fallbackBlock,
      week: fallbackWeek,
    };
  }
}

export function useProgram(
  initialBlock = 1,
  initialWeek = 1
) {
  const initialSelection = loadWeekSelection(
    initialBlock,
    initialWeek
  );

  const [activeBlockNumber, setActiveBlockNumber] =
    useState(initialSelection.block);

  const [activeWeekNumber, setActiveWeekNumber] =
    useState(initialSelection.week);

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

  function persistSelection(
    blockNumber: number,
    weekNumber: number
  ) {
    localStorage.setItem(
      ACTIVE_WEEK_STORAGE_KEY,
      JSON.stringify({
        block: blockNumber,
        week: weekNumber,
      })
    );
  }

  function selectWeek(weekNumber: number) {
    if (!getTrainingWeek(activeBlockNumber, weekNumber)) {
      return;
    }

    setActiveWeekNumber(weekNumber);
    persistSelection(activeBlockNumber, weekNumber);
  }

  function selectBlock(blockNumber: number) {
    const firstWeek = getAvailableWeeks(blockNumber)[0];

    if (!firstWeek) {
      return;
    }

    setActiveBlockNumber(blockNumber);
    setActiveWeekNumber(firstWeek.week);
    persistSelection(blockNumber, firstWeek.week);
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
