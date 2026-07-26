export type MovementCategory =
  | 'Snatch'
  | 'Clean'
  | 'Jerk';

export interface MovementVideo {
  id: string;
  name: string;
  category: MovementCategory;
  videoUrl: string;
  source: string;
  aliases?: string[];
  description?: string;
}

export const movementLibrary: MovementVideo[] = [
  {
    id: 'snatch',
    name: 'Snatch',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=1Lv1IyigIUY',
    source: 'Catalyst Athletics',
    aliases: ['Squat Snatch'],
    description:
      'Full snatch performed from the floor into the overhead squat receiving position.'
  },
  {
    id: 'power-snatch',
    name: 'Power Snatch',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=ydHHsju1-Nc',
    source: 'Catalyst Athletics',
    description:
      'The bar is received above a parallel squat position.'
  },
  {
    id: 'hang-snatch',
    name: 'Hang Snatch',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=Php-RclQ1yU',
    source: 'Catalyst Athletics',
    aliases: ['Snatch From Hang'],
    description:
      'A snatch variation beginning from a hang position.'
  },
  {
    id: 'tall-snatch',
    name: 'Tall Snatch',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=UpDy-VNnUuo',
    source: 'Catalyst Athletics',
    description:
      'A drill emphasizing aggressive pull-under and receiving speed.'
  },
  {
    id: 'no-foot-snatch',
    name: 'No-Foot Snatch',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=5tCVloa5u_Y',
    source: 'Catalyst Athletics',
    aliases: [
      'Snatch With No Jump',
      'No Jump Snatch'
    ],
    description:
      'A snatch performed without repositioning the feet.'
  },
  {
    id: 'snatch-high-pull',
    name: 'Snatch High Pull',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=9WRp0a5hcb0',
    source: 'Catalyst Athletics',
    description:
      'A snatch pull completed with active upward elbow movement.'
  },
  {
    id: 'snatch-pull',
    name: 'Snatch Pull',
    category: 'Snatch',
    videoUrl:
      'https://www.youtube.com/watch?v=G1QygZ3Kd3w',
    source: 'Catalyst Athletics',
    description:
      'A pulling exercise used to develop snatch strength and positioning.'
  },
  {
    id: 'clean',
    name: 'Clean',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=oQIaWLrB318',
    source: 'Catalyst Athletics',
    aliases: ['Squat Clean'],
    description:
      'The bar is lifted from the floor and received in a front squat.'
  },
  {
    id: 'power-clean',
    name: 'Power Clean',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=YG8M_-11C2A',
    source: 'Catalyst Athletics',
    description:
      'The bar is received above a parallel squat position.'
  },
  {
    id: 'hang-clean',
    name: 'Hang Clean',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=uUeV3LwisDI',
    source: 'Catalyst Athletics',
    aliases: ['Clean From Hang'],
    description:
      'A clean variation beginning from a hang position.'
  },
  {
    id: 'tall-clean',
    name: 'Tall Clean',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=X9ckJS9LSug',
    source: 'Catalyst Athletics',
    aliases: [
      'Clean Pull-Under',
      'Dead-Hang Clean'
    ],
    description:
      'A drill emphasizing fast movement under the bar.'
  },
  {
    id: 'clean-high-pull',
    name: 'Clean High Pull',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=2Qv8pEnprpU',
    source: 'Catalyst Athletics',
    description:
      'A clean pull completed with active upward elbow movement.'
  },
  {
    id: 'clean-pull',
    name: 'Clean Pull',
    category: 'Clean',
    videoUrl:
      'https://www.youtube.com/watch?v=xx8WkFrST2Y',
    source: 'Catalyst Athletics',
    description:
      'A pulling exercise used to develop clean strength and positioning.'
  },
  {
    id: 'split-jerk',
    name: 'Split Jerk',
    category: 'Jerk',
    videoUrl:
      'https://www.youtube.com/watch?v=2GPA-cjUFnA',
    source: 'Catalyst Athletics',
    description:
      'The bar is driven overhead and received in a split stance.'
  },
  {
    id: 'push-jerk',
    name: 'Push Jerk',
    category: 'Jerk',
    videoUrl:
      'https://www.youtube.com/watch?v=Om7vLD6x8W0',
    source: 'Catalyst Athletics',
    description:
      'The bar is driven overhead and received with bent knees.'
  },


  {
    id: 'halting-snatch-deadlift',
    name: 'Halting Snatch Deadlift',
    category: 'Snatch',
    source: 'Catalyst Athletics',
    description:
      'Develops first pull mechanics and bar path.',
    videoUrl:
      'https://www.youtube.com/watch?v=BOR7S8rGM8o',
    aliases: [
      'Halting Snatch DL',
      'Halting Deadlift'
    ]
  },
  
  {
    id: 'jerk-balance',
    name: 'Jerk Balance',
    category: 'Jerk',
    source: 'Catalyst Athletics',
    description:
      'Improves split position and jerk timing.',
    videoUrl:
      'https://www.youtube.com/watch?v=VWU_0OwXoPQ',
    aliases: [
      'Balance Jerk'
    ]
  },
  
  {
    id: 'tall-jerk',
    name: 'Tall Jerk',
    category: 'Jerk',
    source: 'Catalyst Athletics',
    description:
      'Develops fast footwork and aggressive lockout.',
    videoUrl:
      'https://www.youtube.com/watch?v=cVkN2rDWaH8',
    aliases: [
      'Tall Split Jerk'
    ]
  },




  {
    id: 'power-jerk',
    name: 'Power Jerk',
    category: 'Jerk',
    videoUrl:
      'https://www.youtube.com/watch?v=Ir_34nxrk1Q',
    source: 'Catalyst Athletics',
    description:
      'The bar is received overhead with the feet moving into a squat stance.'
  }
];