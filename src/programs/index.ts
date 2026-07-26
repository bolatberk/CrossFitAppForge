import block1Week1 from './block1/week1';
import block1Week2 from './block1/week2';

import type {
  TrainingBlock,
  TrainingWeek,
} from '../types/training';

export const trainingProgram: TrainingWeek[] = [
  block1Week1,
  block1Week2,
];

export const trainingBlocks: TrainingBlock[] = [
  {
    id: 'block-1',
    block: 1,
    title: 'Foundation Build',
    description:
      'Teknik, temel kuvvet, gymnastics ve engine kapasitesi geliştirme bloğu.',
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
