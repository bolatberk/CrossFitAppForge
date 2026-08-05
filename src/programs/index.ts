import block1Week1 from './block1/week1';
import block1Week2 from './block1/week2';
import block1Week3 from './block1/week3';

import type {
  TrainingBlock,
  TrainingWeek,
} from '../types/training';

const compareWeeks = (
  firstWeek: TrainingWeek,
  secondWeek: TrainingWeek
): number =>
  firstWeek.block - secondWeek.block ||
  firstWeek.week - secondWeek.week;

export const trainingProgram: readonly TrainingWeek[] = [
  block1Week1,
  block1Week2,
  block1Week3,
].sort(compareWeeks);

export const trainingBlocks: readonly TrainingBlock[] = [
  {
    id: 'block-1',
    block: 1,
    title: 'Butterfly Integration',
    description:
      'Olympic teknik, butterfly gelişimi, temel kuvvet ve competition capacity entegrasyonu.',
    weeks: trainingProgram.filter(
      (week) => week.block === 1
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
  return trainingProgram.filter(
    (program) => program.block === blockNumber
  );
}

export function getTrainingBlock(
  blockNumber: number
): TrainingBlock | undefined {
  return trainingBlocks.find(
    (block) => block.block === blockNumber
  );
}
