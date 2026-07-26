import type { TrainingWeek } from '../../types/training';

const block1Week1: TrainingWeek = {
  id: 'block-1-week-1',
  block: 1,
  week: 1,
  title: 'Technique Foundation',
  description:
    'Snatch, clean, jerk, gymnastics ve temel kuvvet kapasitesi geliştirme haftası.',

  days: [
    {
      id: 'day-a',
      day: 'DAY A',
      title: 'Snatch Technique Day',
      duration: '75–90 dk',
      focus: 'Snatch · Butterfly · Back Squat · AMRAP',
      purpose:
        'Snatch tekniğini geliştirmek, bar altında hız kazanmak, butterfly ritmini oluşturmak ve teknik bozulmadan sürdürülebilir kondisyon kapasitesi geliştirmek.',
      sections: [
        // Mevcut Day A bölümleri
      ],
    },

    {
      id: 'day-b',
      day: 'DAY B',
      title: 'Clean Development Day',
      duration: '75–90 dk',
      focus: 'Clean · Weighted Pull-up · Front Squat · EMOM',
      purpose:
        'Clean tekniğini geliştirmek, hızlı rack pozisyonu oluşturmak, çekiş kuvvetini artırmak ve sürdürülebilir barbell cycling kapasitesi geliştirmek.',
      sections: [
        // Mevcut Day B bölümleri
      ],
    },

    {
      id: 'day-c',
      day: 'DAY C',
      title: 'Competition Conditioning Day',
      duration: '80–95 dk',
      focus: 'Split Jerk · Butterfly · Push Press · Competition WOD',
      purpose:
        'Split jerk tekniğini geliştirmek, yorgunluk altında butterfly ritmini korumak ve yarışma temposunda geçiş, nefes ve pacing kapasitesi oluşturmak.',
      sections: [
        // Mevcut Day C bölümleri
      ],
    },

    {
      id: 'day-d',
      day: 'DAY D',
      title: 'Home Performance Builder',
      duration: '55–60 dk',
      focus: 'Butterfly · Tempo Squat · Upper Body · Grip',
      purpose:
        'Tekniği geliştirmek, zayıf halkaları güçlendirmek, butterfly ritmini artırmak ve ertesi güne toparlanmış şekilde geçmek.',
      sections: [
        // Mevcut Day D bölümleri
      ],
    },
  ],
};

export default block1Week1;