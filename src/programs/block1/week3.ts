import block1Week2 from './week2';
import type {
  TrainingDay,
  TrainingWeek,
} from '../../types/training';

function cloneWeek2DayC(): TrainingDay {
  const sourceDay = block1Week2.days.find(
    (day) => day.id === 'block-1-week-2-day-c'
  );

  if (!sourceDay) {
    throw new Error(
      'Week 3 Day C oluşturulamadı: Week 2 Day C bulunamadı.'
    );
  }

  return {
    ...sourceDay,
    id: 'block-1-week-3-day-c',
    sections: sourceDay.sections.map((section) => ({
      ...section,
      id: section.id.replace('w2-c-', 'w3-c-'),
      items: [...section.items],
    })),
  };
}

const block1Week3: TrainingWeek = {
  id: 'block-1-week-3',
  block: 1,
  week: 3,
  title: 'Butterfly Integration',
  description:
    'Overhead güveni, daha verimli Clean bar yolu, butterfly tightness ve simetri ile competition capacity adaptasyonunun tamamlandığı yüklenme haftası.',
  goals: [
    "Snatch'te overhead güvenini artırmak.",
    'Clean bar yolunu iyileştirmek.',
    'Butterfly tightness ve simetriyi geliştirmek.',
    'Competition Capacity gününü tamamlamak.',
  ],
  notes: [
    'Bu hafta yüklenme devam ediyor.',
    'Olympic teknik öncelikli.',
    'Metconlarda Dumbbell, Kettlebell ve Sandbag kullanılmaya başlanacak.',
  ],
  days: [
    {
      id: 'block-1-week-3-day-a',
      day: 'DAY A',
      title: 'Snatch Confidence Day',
      duration: '80–90 dk',
      focus: 'Squat Snatch · Overhead Güven · Butterfly · Sprint',
      purpose:
        "Snatch'i power yerine squat pozisyonunda yakalamaya başlamak, overhead güvenini ve butterfly tekniğini geliştirirken sprint kapasitesini artırmak.",
      sections: [
        {
          id: 'w3-a-warm-up',
          title: 'Warm-up',
          items: [
            '3 tur:',
            '250 m Row',
            '10 Air Squat',
            '10 Walking Lunge',
            '10 Scap Push-up',
            '10 PVC Pass Through',
            '10 Overhead Squat / PVC',
            'Bar Prep:',
            '10 Muscle Snatch',
            '10 Snatch Grip RDL',
            '10 Snatch Balance',
          ],
        },
        {
          id: 'w3-a-olympic-drill',
          title: 'Olympic Drill',
          items: [
            'Tall Snatch — 4×3 @ 20–30 kg',
            'Snatch Balance — 4×2 @ 35–40 kg',
            'Paused Overhead Squat — 3×5 @ 40 kg',
            'Pause: Dip pozisyonunda 3 sn bekle.',
            'Amaç: Overhead güveni.',
            'Amaç: Barın altına hızlı girme.',
          ],
        },
        {
          id: 'w3-a-olympic-lift',
          title: 'Olympic Lift',
          items: [
            'Squat Snatch — 6×2 @ %80 / 52.5 kg',
            'RPE: 7',
            'Video: Son 2 set',
            'Odak: Power yakalama yok.',
          ],
        },
        {
          id: 'w3-a-gymnastics',
          title: 'Gymnastics',
          duration: '12 dk',
          items: [
            'Butterfly Practice',
            'Her sette 5–7 kaliteli tekrar',
            'Dinlenme: 45 sn',
            'Odak: Push Away.',
            'Odak: Ayaklar bitişik.',
            'Odak: Baş nötr.',
          ],
        },
        {
          id: 'w3-a-strength',
          title: 'Strength',
          items: [
            'Back Squat — 5×4 @ %77.5 / 85 kg',
            'Tempo: 31X1',
            'RPE: 7.5',
          ],
        },
        {
          id: 'w3-a-metcon',
          title: 'Metcon',
          duration: '12 dk AMRAP',
          items: [
            '8 Dumbbell Snatch @ 22.5 kg',
            '10 Box Jump Over',
            '12 Wall Ball',
            '250 m SkiErg',
            'Amaç: Sprint ve geçiş kalitesi.',
          ],
        },
        {
          id: 'w3-a-accessory',
          title: 'Accessory',
          items: [
            '3 tur:',
            '10 Hollow Body Rock',
            '10 Single Arm DB Row / kol',
            '20 sn Active Hang',
            '15 Face Pull',
          ],
        },
        {
          id: 'w3-a-cool-down',
          title: 'Cool Down',
          items: [
            '5 dk Bike',
            'Lat mobilitesi',
            'Hip mobilitesi',
            'Thoracic mobilite',
          ],
        },
      ],
    },
    {
      id: 'block-1-week-3-day-b',
      day: 'DAY B',
      title: 'Clean Efficiency Day',
      duration: '85–95 dk',
      focus: 'Squat Clean · Front Rack · Strict Pull-up · Odd Object',
      purpose:
        "Clean bar yolunu düzeltmek, front rack pozisyonunu güçlendirmek, Strict Pull-up ROM'unu geliştirmek ve odd object kapasitesi oluşturmak.",
      sections: [
        {
          id: 'w3-b-warm-up',
          title: 'Warm-up',
          items: [
            '3 tur:',
            '250 m Row',
            '10 Cossack Squat',
            '10 Band Pull Apart',
            '10 Front Rack Lunge',
            '10 Muscle Clean',
          ],
        },
        {
          id: 'w3-b-olympic-drill',
          title: 'Olympic Drill',
          items: [
            'Clean High Pull — 4×3 @ 55 kg',
            'Tall Clean — 4×2 @ 40 kg',
            'Paused Front Squat — 3×3 @ 70 kg',
            'Pause: Dip pozisyonunda 2 sn bekle.',
          ],
        },
        {
          id: 'w3-b-olympic-lift',
          title: 'Olympic Lift',
          items: [
            'Squat Clean — 6×2 @ %80 / 72.5 kg',
            'RPE: 7',
            'Video: Son set',
          ],
        },
        {
          id: 'w3-b-gymnastics',
          title: 'Gymnastics',
          items: [
            'Strict Pull-up — 5×3',
            'Her tekrar tam Dead Hang başlangıç.',
            'Üst pozisyonda 1 sn bekle.',
            'Tam ROM.',
          ],
        },
        {
          id: 'w3-b-strength',
          title: 'Strength',
          items: [
            'Front Squat — 5×4 @ %77.5 / 80 kg',
            'Tempo: 31X1',
          ],
        },
        {
          id: 'w3-b-metcon',
          title: 'Metcon',
          duration: '5 Round For Time / Cap 16 dk',
          items: [
            '12 Kettlebell Swing @ 24 kg',
            '10 Sandbag Over Shoulder @ 40–50 kg',
            '8 Burpee Box Jump Over',
            '200 m Run',
            'Amaç: Odd object kapasitesi.',
            'Amaç: Grip ve hızlı transition.',
          ],
        },
        {
          id: 'w3-b-accessory',
          title: 'Accessory',
          items: [
            '3 tur:',
            '12 Bulgarian Split Squat / bacak',
            '15 Ring Row',
            '15 Band External Rotation',
            '30 m Farmer Carry',
          ],
        },
        {
          id: 'w3-b-cool-down',
          title: 'Cool Down',
          items: [
            '5 dk Bike',
            'Front Rack Stretch',
            'Hip Stretch',
            'Kontrollü nefes',
          ],
        },
      ],
    },
    cloneWeek2DayC(),
    {
      id: 'block-1-week-3-day-d',
      day: 'DAY D',
      title: 'Athletic Development',
      duration: '60–70 dk',
      focus: 'Double Under · Strict Pull-up · RDL · Zone 2',
      purpose:
        'Opsiyonel beceri, çekiş kuvveti, posterior chain ve aerobik kapasite çalışmasıyla ana günleri desteklemek.',
      optional: true,
      sections: [
        {
          id: 'w3-d-warm-up',
          title: 'Warm-up',
          items: [
            '2 tur:',
            '500 m Bike',
            '10 Push-up',
            '10 Air Squat',
            '20 sn Dead Hang',
          ],
        },
        {
          id: 'w3-d-skill',
          title: 'Skill',
          duration: '15 dk',
          items: [
            'Double Under Practice',
            'Odak: Teknik.',
            'Odak: Ritim.',
            'Odak: Bilek kullanımı.',
          ],
        },
        {
          id: 'w3-d-gymnastics',
          title: 'Gymnastics',
          items: [
            'Strict Pull-up — 5×3',
            'Her tekrar tam Dead Hang başlangıç.',
          ],
        },
        {
          id: 'w3-d-strength',
          title: 'Strength',
          items: [
            'Romanian Deadlift — 4×8 @ %75 / 85 kg',
          ],
        },
        {
          id: 'w3-d-conditioning',
          title: 'Conditioning',
          duration: '30 dk',
          items: [
            'Zone 2',
            'Bike veya Row',
            'Hedef nabız: 130–145 bpm',
          ],
        },
        {
          id: 'w3-d-accessory',
          title: 'Accessory',
          items: [
            '3 tur:',
            '10 Single Leg RDL / bacak',
            '12 Single Arm DB Press / kol',
            '15 Hollow Rock',
            '20 Band Pull Apart',
          ],
        },
        {
          id: 'w3-d-cool-down',
          title: 'Cool Down',
          duration: '10 dk',
          items: [
            'Mobilite',
            'Stretch',
            'Kontrollü nefes',
          ],
        },
      ],
    },
  ],
};

export default block1Week3;
