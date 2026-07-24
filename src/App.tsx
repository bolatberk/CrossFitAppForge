import { useEffect, useMemo, useState } from 'react';
import './App.css';
import MovementLibrary from './pages/MovementLibrary';
import Timer from './pages/Timer';



type Page =
  | 'home'
  | 'program'
  | 'timer'
  | 'library'
  | 'pr';

type WorkoutSection = {
  id: string;
  title: string;
  duration?: string;
  items: string[];
};

type TrainingDay = {
  id: string;
  day: string;
  title: string;
  duration: string;
  focus: string;
  purpose: string;
  sections: WorkoutSection[];
};

type ProgressData = {
  completedSections: Record<string, string[]>;
};

const STORAGE_KEY = 'forge-progress-v1';

const trainingDays: TrainingDay[] = [
  {
    id: 'day-a',
    day: 'DAY A',
    title: 'Snatch Technique Day',
    duration: '75–90 dk',
    focus: 'Snatch · Butterfly · Back Squat · AMRAP',
    purpose:
      'Snatch tekniğini geliştirmek, bar altında hız kazanmak, butterfly ritmini oluşturmak ve teknik bozulmadan sürdürülebilir kondisyon kapasitesi geliştirmek.',
    sections: [
      {
        id: 'warm-up',
        title: 'Warm-up',
        duration: '10–12 dk',
        items: [
          'Ayakkabı: TYR Lifter → Metcon Shoe',
          '3 dk Row',
          'Dynamic Mobility',
          'World’s Greatest Stretch — 5/5',
          'Banded Shoulder Pass Through — 15',
          'Ankle Rock — 15/15',
          'Empty Bar Flow — 2 tur',
          '5 Muscle Snatch',
          '5 Overhead Squat',
          '5 Snatch Balance',
          '5 Drop Snatch',
        ],
      },
      {
        id: 'mobility',
        title: 'Mobility',
        items: [
          'Warm-up içerisindeki dinamik mobilite',
          'World’s Greatest Stretch — 5/5',
          'Banded Shoulder Pass Through — 15',
          'Ankle Rock — 15/15',
        ],
      },
      {
        id: 'olympic-drill',
        title: 'Olympic Drill',
        items: [
          'Tall Snatch — 4 × 3 @ %40–50',
          'No Foot Snatch — 3 × 2 @ %40–50',
          'Odak: Barı yukarı çekme',
          'Odak: Hızlı altına girme',
          'Odak: Sessiz ayaklar',
        ],
      },
      {
        id: 'olympic-lift',
        title: 'Olympic Lift',
        items: [
          'Snatch',
          '6 × 2 @ %75',
          'Hedef kilo: ≈ 50 kg',
          'RPE: 6–7',
          'Video: Son 2 set',
          'Odak: Bar yolu kontrollü',
          'Odak: Hızlı çekiş',
          'Odak: Aktif altına girme',
          'Odak: Stabil yakalama',
        ],
      },
      {
        id: 'gymnastics',
        title: 'Gymnastics',
        duration: 'EMOM 10',
        items: [
          'Butterfly Progression',
          'Tek dakikalar: 4–6 Butterfly Pull-up',
          'Çift dakikalar: 8 Beat Swing',
          'Çift dakikalar: 4 Jumping Butterfly',
          'Amaç: Ritim oluşturmak',
          'Amaç: Omuzu yormadan tekrar biriktirmek',
          'Failure yok',
        ],
      },
      {
        id: 'strength',
        title: 'Strength',
        items: [
          'Back Squat',
          '5 × 5 @ %72.5',
          'Hedef kilo: ≈ 80 kg',
          'RPE: 7',
          'Tempo: 31X1',
          'Odak: Sıkı core',
          'Odak: Diz ve kalça açısı',
          'Odak: Kontrollü tempo',
        ],
      },
      {
        id: 'metcon',
        title: 'Metcon',
        duration: '10 dk AMRAP',
        items: [
          '6 Power Snatch @ 40 kg',
          '8 Box Jump Over',
          '10 Cal Row',
          'Yoğunluk: Yaklaşık %75',
          'Amaç: Teknik bozulmadan nefes kontrolü',
        ],
      },
      {
        id: 'accessory',
        title: 'Accessory',
        items: [
          '3 tur',
          '12 Snatch Grip Romanian Deadlift',
          '15 Face Pull',
          '30 sn Hollow Hold',
        ],
      },
      {
        id: 'cool-down',
        title: 'Cool Down',
        items: [
          'Hafif yürüyüş veya kolay Row',
          'Lat ve omuz esnetme',
          'Kalça ve ayak bileği mobilitesi',
          'Kontrollü nefes',
        ],
      },
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
      {
        id: 'warm-up',
        title: 'Warm-up',
        duration: '10–12 dk',
        items: [
          'Ayakkabı: TYR Lifter → Metcon Shoe',
          '5 dk Bike',
          'Dynamic Mobility',
          'Hip Opener — 10/10',
          'Front Rack Stretch — 45 sn',
          'Scap CARs — 10',
          'Ankle Rock — 15/15',
          'Bar Prep Flow — 2 tur',
          '5 Muscle Clean',
          '5 Front Squat',
          '5 Clean Pull',
          '5 Hang Power Clean',
        ],
      },
      {
        id: 'mobility',
        title: 'Mobility',
        items: [
          'Warm-up içerisindeki dinamik mobilite',
          'Hip Opener — 10/10',
          'Front Rack Stretch — 45 sn',
          'Scap CARs — 10',
          'Ankle Rock — 15/15',
        ],
      },
      {
        id: 'olympic-drill',
        title: 'Olympic Drill',
        items: [
          'Tall Clean — 4 × 3 @ %40–50',
          'Clean High Pull — 3 × 3 @ %40–50',
          'Odak: Hızlı çekiş',
          'Odak: Dirsekleri hızlı çevir',
          'Odak: Rack pozisyonu',
          'Odak: Ayak temasını hafif tut',
        ],
      },
      {
        id: 'olympic-lift',
        title: 'Olympic Lift',
        items: [
          'Clean',
          '6 × 2 @ %75',
          'Hedef kilo: ≈ 67.5 kg',
          'RPE: 6–7',
          'Video: Son set',
          'Odak: Bar yolu dik ve yakın',
          'Odak: Triple extension',
          'Odak: Hızlı rack',
          'Odak: Dizleri öne aç',
        ],
      },
      {
        id: 'gymnastics',
        title: 'Gymnastics / Pull Strength',
        items: [
          'Weighted Strict Pull-up',
          '5 × 5',
          'Başlangıç: Vücut ağırlığı',
          'Kolay gelirse: +2.5 kg',
          'Odak: Tam açılış',
          'Odak: Çene barın üstüne',
          'Odak: Kontrollü iniş',
          'Odak: Sıkı core',
        ],
      },
      {
        id: 'strength',
        title: 'Strength',
        items: [
          'Front Squat',
          '5 × 4 @ %72.5',
          'Hedef kilo: ≈ 75 kg',
          'RPE: 7',
          'Tempo: 31X1',
          'Odak: Dik gövde',
          'Odak: Dirsekler yüksek',
          'Odak: Diz takibi',
          'Odak: Kontrollü tempo',
        ],
      },
      {
        id: 'metcon',
        title: 'Metcon',
        duration: '12 dk EMOM',
        items: [
          '1. Dakika: 8 Hang Power Clean @ 50 kg',
          '2. Dakika: 10 Burpee',
          '3. Dakika: 12/10 Cal Bike',
          'Amaç: Barbell cycling kapasitesi',
          'Amaç: Nefes kontrolü',
          'Amaç: Sürdürülebilir tempo',
          'Yoğunluk: Yaklaşık %75–80',
        ],
      },
      {
        id: 'accessory',
        title: 'Accessory',
        items: [
          '3 tur',
          '10 Bulgarian Split Squat — her bacak',
          '15 Ring Row',
          '15 Band External Rotation',
        ],
      },
      {
        id: 'cool-down',
        title: 'Cool Down',
        items: [
          'Hafif Bike',
          'Front rack stretch',
          'Kalça fleksör esnetme',
          'Thoracic rotation',
          'Kontrollü nefes',
        ],
      },
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
      {
        id: 'warm-up',
        title: 'Warm-up',
        items: [
          'Ayakkabı: TYR Lifter → Metcon Shoe',
          '5 dk Row',
          'Dynamic Mobility',
          'World’s Greatest Stretch — 5/5',
          'Cat-Cow — 10',
          'Scapular Wall Slide — 10',
          'Ankle Rock — 15/15',
          'Hip Opener — 10/10',
          'Bar Prep Flow — 2 tur',
          '5 PVC Pass Through',
          '5 Overhead Squat',
          '5 Good Morning',
          '5 Front Rack Lunge',
        ],
      },
      {
        id: 'mobility',
        title: 'Mobility',
        items: [
          'Warm-up içerisindeki dinamik mobilite',
          'World’s Greatest Stretch — 5/5',
          'Cat-Cow — 10',
          'Scapular Wall Slide — 10',
          'Ankle Rock — 15/15',
          'Hip Opener — 10/10',
        ],
      },
      {
        id: 'olympic-drill',
        title: 'Olympic Drill',
        items: [
          'Jerk Balance — 4 × 3 @ %40–50',
          'Tall Jerk — 3 × 2 @ %40–50',
          'Footwork Drill — 3 × 3',
          'Odak: Dik dip',
          'Odak: Patlayıcı drive',
          'Odak: Hızlı ve stabil split',
          'Odak: Denge ve ayak kontrolü',
        ],
      },
      {
        id: 'olympic-lift',
        title: 'Olympic Lift',
        items: [
          'Split Jerk',
          '6 × 2 @ %75',
          'Hedef kilo: ≈ 60 kg',
          'RPE: 6–7',
          'Video: Son 2 set',
          'Odak: Dip dik ve kontrollü',
          'Odak: Güçlü drive',
          'Odak: Hızlı lockout',
          'Odak: Stabil split',
          'Odak: Hızlı recovery',
        ],
      },
      {
        id: 'gymnastics',
        title: 'Gymnastics',
        duration: 'EMOM 8',
        items: [
          'Butterfly Under Fatigue',
          '1. Dakika: 5 Butterfly Pull-up',
          '2. Dakika: 8 Burpee Over Bar',
          'Odak: Ritmi koru',
          'Odak: Kipten güce geçiş',
          'Odak: Omuzu koru',
          'Odak: Hızlı toparlan',
        ],
      },
      {
        id: 'strength',
        title: 'Strength',
        items: [
          'Push Press',
          '5 × 5 @ %70',
          'Hedef kilo: ≈ 40 kg',
          'RPE: 7',
          'Tempo: 20X1',
          'Odak: Leg drive kullanımı',
          'Odak: Bar yolu dik',
          'Odak: Güçlü lockout',
          'Odak: Omuz stabilitesi',
        ],
      },
      {
        id: 'metcon',
        title: 'Metcon',
        duration: 'Time Cap: 18 dk',
        items: [
          'Competition WOD — For Time',
          '3 round',
          '400 m Run',
          '15 Wall Ball — 9/6 kg',
          '12 Toes to Bar',
          '9 Clean @ 60 kg',
          'Odak: Geçişlerde hız — 3 sn veya daha kısa',
          'Odak: Nefes kontrolü',
          'Odak: İstikrarlı pace',
          'Odak: Butterfly ritmini koru',
          'Odak: Verimli kipping',
        ],
      },
      {
        id: 'accessory',
        title: 'Accessory',
        items: [
          '3 tur',
          '12 Copenhagen Plank — her taraf',
          '15 Scap Pull-up',
          '15 Banded Y-Raise',
          '60 sn Heavy Farmer Carry',
          'Odak: Core stabilitesi',
          'Odak: Omuz sağlığı',
          'Odak: Scap kontrolü',
          'Odak: Grip ve taşıma gücü',
        ],
      },
      {
        id: 'cool-down',
        title: 'Cool Down',
        items: [
          'Hafif yürüyüş veya Row',
          'Omuz ve lat esnetme',
          'Kalça fleksör esnetme',
          'Hamstring mobilitesi',
          'Kontrollü nefes',
        ],
      },
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
      {
        id: 'warm-up',
        title: 'Warm-up',
        duration: '8 dk',
        items: [
          'Opsiyonel gün: Çarşamba',
          'Sıralama: Day A → Day D → Day B → Day C',
          'Yer: Home Workout',
          'Hedef RPE: 6–7',
          '2 tur',
          '10 Air Squat',
          '8 Scap Pull-up',
          '8 Push-up',
          '20 sn Dead Hang',
          '10 Cat-Cow',
          '10 Bar Pass Through',
          'Amaç: Vücut ısınması',
          'Amaç: Eklem mobilitesi',
          'Amaç: Aktivasyon',
        ],
      },
      {
        id: 'mobility',
        title: 'Mobility',
        items: [
          'Warm-up içerisindeki mobilite',
          'Cat-Cow',
          'Bar Pass Through',
          'Dead Hang',
          'Scap Pull-up',
        ],
      },
      {
        id: 'skill',
        title: 'Skill',
        duration: 'EMOM 12',
        items: [
          'Butterfly Skill',
          'Tek dakikalar: 4–5 Butterfly Pull-up',
          'Çift dakikalar: 6 Beat Swing',
          'Çift dakikalar: 3 Jumping Butterfly',
          'Çift dakikalar: 10 sn Active Hang',
          'Odak: Ritim',
          'Odak: Salınım',
          'Odak: Kontrol',
          'Failure yok',
          'Her sette kalite',
        ],
      },
      {
        id: 'gymnastics',
        title: 'Gymnastics',
        items: [
          'Upper Body Builder içerisinde',
          'Strict Pull-up',
          '4 tur × 4 tekrar',
          'Dinlenme: Superset turu sonunda 60 sn',
        ],
      },
      {
        id: 'strength',
        title: 'Strength',
        items: [
          'Tempo Back Squat',
          '4 × 5 @ 70 kg',
          'Tempo: 31X1',
          'Dinlenme: 90 sn',
          'RPE: 6–7',
          'Odak: Kontrollü iniş',
          'Odak: Güçlü pozisyon',
          'Odak: Dengeli çıkış',
        ],
      },
      {
        id: 'upper-body-builder',
        title: 'Upper Body Builder',
        items: [
          '4 tur superset',
          'A) Strict Press — 6 tekrar @ 35 kg',
          'B) Strict Pull-up — 4 tekrar',
          'Dinlenme: 60 sn',
        ],
      },
      {
        id: 'accessory',
        title: 'Accessory',
        duration: '10 dk — 3 tur',
        items: [
          'Bulletproof Circuit',
          'A) Single Arm Dumbbell Romanian Deadlift — 10/10',
          'B) Single Arm Dumbbell Row — 12/12',
          'C) Single Arm Floor Press — 10/10',
          'D) Dead Bug — 12/12',
          'Dinlenme: Tur sonunda 60 sn',
        ],
      },
      {
        id: 'conditioning',
        title: 'Conditioning',
        duration: '5 dk AMRAP',
        items: [
          'Quick Finisher',
          '20 m Single Arm Farmer Carry — sağ',
          '20 m Single Arm Farmer Carry — sol',
          '5 Push-up',
          '5 Air Squat',
          'Amaç: Core stabilitesi',
          'Amaç: Kavrama',
          'Amaç: Dolaşım odaklı kısa finisher',
        ],
      },
      {
        id: 'cool-down',
        title: 'Cool Down',
        items: [
          'Omuz ve lat esnetme',
          'Kalça mobilitesi',
          'Hafif spinal rotation',
          'Kontrollü nefes',
        ],
      },
      {
        id: 'golden-rules',
        title: 'Day D Altın Kuralları',
        items: [
          'Failure olmaz',
          'RPE 6–7’yi geçmez',
          'Her sette 2–3 tekrar yedek kalır — RIR 2–3',
          'Ertesi gün toparlanmış hisset',
          'Kalite, ağırlık ve yorgunluktan önemlidir',
        ],
      },
    ],
  },
];

const personalRecords = [
  ['Back Squat', '110 kg'],
  ['Front Squat', '105 kg'],
  ['Clean', '90 kg'],
  ['Clean & Jerk', '80 kg'],
  ['Snatch', '65 kg'],
  ['Push Press', '80 kg'],
];

function loadProgress(): ProgressData {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return {
        completedSections: {},
      };
    }

    return JSON.parse(savedProgress) as ProgressData;
  } catch {
    return {
      completedSections: {},
    };
  }
}

function Home({
  completedDayCount,
  nextDay,
  onOpenDay,
}: {
  completedDayCount: number;
  nextDay: TrainingDay | null;
  onOpenDay: (day: TrainingDay) => void;
}) {
  const progressPercentage = Math.round(
    (completedDayCount / trainingDays.length) * 100
  );

  return (
    <main className="page">
      <section className="hero-card">
        <p className="eyebrow">FOUNDATION BUILD · WEEK 1</p>

        <h1>FORGE Performance Training</h1>

        <p className="hero-description">
          Snatch hızını, strict pull-up kapasitesini ve sürdürülebilir engine
          performansını geliştir.
        </p>

        <div className="week-progress">
          <div className="progress-heading">
            <span>Haftalık ilerleme</span>

            <strong>
              {completedDayCount} / {trainingDays.length} gün
            </strong>
          </div>

          <div className="progress-bar">
            <span style={{ width: `${progressPercentage}%` }} />
          </div>

          <p className="progress-percentage">
            %{progressPercentage} tamamlandı
          </p>
        </div>
      </section>

      {nextDay ? (
        <>
          <section className="section-heading">
            <div>
              <p className="eyebrow">SIRADAKİ ANTRENMAN</p>
              <h2>{nextDay.day}</h2>
            </div>

            <span className="duration-badge">{nextDay.duration}</span>
          </section>

          <article className="next-workout-card">
            <div>
              <p className="workout-label">{nextDay.day}</p>
              <h3>{nextDay.title}</h3>
              <p>{nextDay.focus}</p>
            </div>

            <button onClick={() => onOpenDay(nextDay)}>Antrenmanı aç</button>
          </article>
        </>
      ) : (
        <section className="week-complete-card">
          <span className="week-complete-icon">✓</span>

          <div>
            <p className="eyebrow">HAFTA TAMAMLANDI</p>
            <h2>Tüm antrenmanlar tamamlandı</h2>
            <p>Foundation Build Week 1 başarıyla tamamlandı.</p>
          </div>
        </section>
      )}

      <section className="stats-grid">
        <article className="stat-card">
          <span>Aktif blok</span>
          <strong>Block 1</strong>
        </article>

        <article className="stat-card">
          <span>Hafta</span>
          <strong>Week 1</strong>
        </article>

        <article className="stat-card">
          <span>Tamamlanan</span>
          <strong>{completedDayCount}</strong>
        </article>

        <article className="stat-card">
          <span>İlerleme</span>
          <strong>%{progressPercentage}</strong>
        </article>
      </section>
    </main>
  );
}

function Program({
  completedDayIds,
  onOpenDay,
}: {
  completedDayIds: string[];
  onOpenDay: (day: TrainingDay) => void;
}) {
  return (
    <main className="page">
      <section className="page-header">
        <p className="eyebrow">FOUNDATION BUILD</p>
        <h1>Week 1 Programı</h1>
        <p>
          Tüm antrenman günleri açıktır. Günleri istediğin sırada
          görüntüleyebilir ve tamamlayabilirsin.
        </p>
      </section>

      <section className="program-list">
        {trainingDays.map((trainingDay) => {
          const isCompleted = completedDayIds.includes(trainingDay.id);

          return (
            <article
              className={[
                'program-card',
                isCompleted ? 'program-card-completed' : '',
              ].join(' ')}
              key={trainingDay.id}
            >
              <div className="program-card-top">
                <span>{trainingDay.day}</span>

                <div className="program-status">
                  {isCompleted ? (
                    <strong className="completed-label">✓ Tamamlandı</strong>
                  ) : (
                    <strong className="unlocked-label">Açık</strong>
                  )}
                </div>
              </div>

              <h2>{trainingDay.title}</h2>
              <p>{trainingDay.focus}</p>
              <small>{trainingDay.duration}</small>

              <button onClick={() => onOpenDay(trainingDay)}>
                {isCompleted ? 'Günü görüntüle' : 'Günü aç'}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function WorkoutDetail({
  day,
  completedSectionIds,
  isDayCompleted,
  nextDay,
  onBack,
  onToggleSection,
  onOpenNextDay,
}: {
  day: TrainingDay;
  completedSectionIds: string[];
  isDayCompleted: boolean;
  nextDay: TrainingDay | null;
  onBack: () => void;
  onToggleSection: (sectionId: string) => void;
  onOpenNextDay: (day: TrainingDay) => void;
}) {
  const completedSectionCount = completedSectionIds.length;

  const sectionProgress = Math.round(
    (completedSectionCount / day.sections.length) * 100
  );

  return (
    <main className="page">
      <button className="back-button" onClick={onBack}>
        ← Programa dön
      </button>

      <section className="workout-detail-header">
        <div className="workout-detail-top">
          <div>
            <p className="eyebrow">{day.day}</p>
            <h1>{day.title}</h1>
          </div>

          <span className="duration-badge">{day.duration}</span>
        </div>

        <p>{day.purpose}</p>

        <div className="day-progress">
          <div className="progress-heading">
            <span>Bölüm ilerlemesi</span>

            <strong>
              {completedSectionCount} / {day.sections.length}
            </strong>
          </div>

          <div className="progress-bar">
            <span style={{ width: `${sectionProgress}%` }} />
          </div>
        </div>
      </section>

      <section className="workout-sections">
        {day.sections.map((section, index) => {
          const isCompleted = completedSectionIds.includes(section.id);

          return (
            <article
              className={`workout-section-card ${
                isCompleted ? 'section-completed' : ''
              }`}
              key={section.id}
            >
              <div className="workout-section-heading">
                <div>
                  <span>BÖLÜM {index + 1}</span>
                  <h2>{section.title}</h2>
                  {section.duration && <p>{section.duration}</p>}
                </div>

                <button
                  className="complete-section-button"
                  onClick={() => onToggleSection(section.id)}
                  aria-label={`${section.title} bölümünü tamamla`}
                >
                  {isCompleted ? '✓' : '○'}
                </button>
              </div>

              <div className="workout-items">
                {section.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      {isDayCompleted && (
        <section className="day-complete-card">
          <div className="day-complete-heading">
            <span className="day-complete-icon">✓</span>

            <div>
              <p className="eyebrow">ANTRENMAN TAMAMLANDI</p>
              <h2>{day.day} tamamlandı</h2>
            </div>
          </div>

          {nextDay ? (
            <>
              <p>
                Sıradaki antrenman: <strong>{nextDay.day}</strong>
              </p>

              <button onClick={() => onOpenNextDay(nextDay)}>
                {nextDay.day} antrenmanına geç
              </button>
            </>
          ) : (
            <p>Bu haftanın bütün günlerini tamamladın.</p>
          )}
        </section>
      )}
    </main>
  );
}

function PRTracking() {
  return (
    <main className="page">
      <section className="page-header">
        <p className="eyebrow">PR & PACER</p>
        <h1>Kişisel Rekorlar</h1>
        <p>Kuvvet ve olimpik kaldırış kayıtlarının merkezi.</p>
      </section>

      <section className="pr-list">
        {personalRecords.map(([movement, value]) => (
          <article className="pr-card" key={movement}>
            <div>
              <span>1RM</span>
              <h2>{movement}</h2>
            </div>

            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}

function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completedDayIds = useMemo(() => {
    return trainingDays
      .filter((day) => {
        const completedSections = progress.completedSections[day.id] ?? [];

        return day.sections.every((section) =>
          completedSections.includes(section.id)
        );
      })
      .map((day) => day.id);
  }, [progress]);

  const completedDayCount = completedDayIds.length;

  const nextDay = useMemo(() => {
    return (
      trainingDays.find((day) => !completedDayIds.includes(day.id)) ?? null
    );
  }, [completedDayIds]);

  const selectedDay =
    trainingDays.find((day) => day.id === selectedDayId) ?? null;

  const selectedDayIndex = selectedDay
    ? trainingDays.findIndex((day) => day.id === selectedDay.id)
    : -1;

  const nextDayAfterSelected =
    selectedDayIndex >= 0 ? trainingDays[selectedDayIndex + 1] ?? null : null;

  function openDay(day: TrainingDay) {
    setSelectedDayId(day.id);
    setActivePage('program');
  }

  function openProgram() {
    setSelectedDayId(null);
    setActivePage('program');
  }

  function changePage(page: Page) {
    setSelectedDayId(null);
    setActivePage(page);
  }

  function toggleSection(dayId: string, sectionId: string) {
    setProgress((currentProgress) => {
      const currentDaySections = currentProgress.completedSections[dayId] ?? [];

      const isAlreadyCompleted = currentDaySections.includes(sectionId);

      const updatedDaySections = isAlreadyCompleted
        ? currentDaySections.filter((id) => id !== sectionId)
        : [...currentDaySections, sectionId];

      return {
        ...currentProgress,
        completedSections: {
          ...currentProgress.completedSections,
          [dayId]: updatedDaySections,
        },
      };
    });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-container">
          <div className="brand-logo">F</div>

          <div>
            <span className="brand-mark">FORGE</span>
            <p>Performance Training</p>
          </div>
        </div>

        <div className="week-chip">
          <span>Block 1</span>
          <strong>W1</strong>
        </div>
      </header>

      {activePage === 'home' && (
        <Home
          completedDayCount={completedDayCount}
          nextDay={nextDay}
          onOpenDay={openDay}
        />
      )}

      {activePage === 'program' && !selectedDay && (
        <Program completedDayIds={completedDayIds} onOpenDay={openDay} />
      )}

      {activePage === 'program' && selectedDay && (
        <WorkoutDetail
          day={selectedDay}
          completedSectionIds={progress.completedSections[selectedDay.id] ?? []}
          isDayCompleted={completedDayIds.includes(selectedDay.id)}
          nextDay={nextDayAfterSelected}
          onBack={openProgram}
          onToggleSection={(sectionId) =>
            toggleSection(selectedDay.id, sectionId)
          }
          onOpenNextDay={openDay}
        />
      )}
   {activePage === 'timer' && (
  <Timer
  onBack={() => setActivePage('home')}
/>
)}

{activePage === 'library' && (
  <MovementLibrary
    onBack={() => setActivePage('home')}
  />
)}

      {activePage === 'pr' && <PRTracking />}

      <nav className="bottom-navigation">
        <button
          className={activePage === 'home' ? 'active' : ''}
          onClick={() => changePage('home')}
        >
          <span className="nav-icon">⌂</span>
          <span>Home</span>
        </button>

        <button
  type="button"
  onClick={() => setActivePage('library')}
>
  Movements
</button>

        <button
          className={activePage === 'program' ? 'active' : ''}
          onClick={openProgram}
        >
          <span className="nav-icon">▤</span>
          <span>Program</span>
        </button>
        <button
          className={activePage === 'timer' ? 'active' : ''}
          onClick={() => changePage('timer')}
        >


          
          <span className="nav-icon">◷</span>
          <span>Timer</span>
        </button>

        <button
          className={activePage === 'pr' ? 'active' : ''}
          onClick={() => changePage('pr')}
        >
          <span className="nav-icon">◆</span>
          <span>PR Tracking</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
