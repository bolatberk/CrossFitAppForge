import block1Week1 from './block1/week1';
import block1Week2 from './block1/week2';
import block1Week3 from './block1/week3';
import block1Week4 from './block1/week4';
import block1Week5 from './block1/week5';
import block1Week6 from './block1/week6';

import type {
  TrainingBlock,
  TrainingWeek,
} from '../types/training';

export const trainingProgram: TrainingWeek[] = [
  block1Week1,
  block1Week2,
  block1Week3,
  block1Week4,
  block1Week5,
  block1Week6,
];

export const trainingBlocks: TrainingBlock[] = [
  {
    id: 'block-1',
    block: 1,
    title: 'Butterfly Integration',
    description:
      'Olympic teknik, butterfly kapasitesi, temel kuvvet ve competition engine gelişim bloğu.',
    weeks: trainingProgram
      .filter((week) => week.block === 1)
      .sort(
        (firstWeek, secondWeek) =>
          firstWeek.week - secondWeek.week
      ),
  },
];

export function getTrainingWeek(
  blockNumber: number,
  weekNumber: number
): TrainingWeek | undefined {
  return trainingProgram.find(
    (program) =>
      program.block === blockNumber &&
      program.week === weekNumber
  );
}

export function getAvailableWeeks(
  blockNumber: number
): TrainingWeek[] {
  return trainingProgram
    .filter(
      (program) => program.block === blockNumber
    )
    .sort(
      (firstWeek, secondWeek) =>
        firstWeek.week - secondWeek.week
    );
}

export function getTrainingBlock(
  blockNumber: number
): TrainingBlock | undefined {
  return trainingBlocks.find(
    (block) => block.block === blockNumber
  );
}
