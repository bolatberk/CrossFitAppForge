import type { TrainingWeek } from '../../types/training';

const block1Week5: TrainingWeek = {
  id: 'block-1-week-5',
  block: 1,
  week: 5,
  title: 'Build / Skill Transfer',
  description:
    'Direct Squat Catch transferi, Butterfly kapasitesi, Strict Pull-up tam ROM ve deload sonrası kontrollü strength yüklemesi. Hedef RPE 7–8. Failure yok. Power yazılmadıkça Snatch/Clean squat varyasyonudur. Accessory ve Day D opsiyonel. Sandbag yok.',
  days: [
    {
      id: 'block-1-week-5-day-a',
      day: 'DAY A',
      title: 'Snatch Pull-Under Development',
      duration: '80–90 dk',
      focus: 'Squat Snatch · Butterfly Capacity · Back Squat · Barbell Cycling',
      purpose: 'Snatch direkt Squat Catch oranını artırmak, Butterfly kapasitesini 10 tekrar bandına taşımak ve Back Squat yükünü yeniden artırmak.',
      sections: [
        { id: 'w5-a-warm-up', title: 'Warm-up', duration: '10 dk', items: [
          '2 tur', '200 m Row', '10 Air Squat', '8 Walking Lunge / toplam',
          '10 Scap Push-up', '10 PVC Pass Through', '8 PVC Overhead Squat',
          'Wrist / Overhead Prep: 10 Wrist Rock', '20 sn Prayer Stretch',
          '20 sn PVC Overhead Hold', 'Empty Bar: 6 Snatch Grip RDL',
          '5 Muscle Snatch', '5 Overhead Squat', '5 High-Hang Squat Snatch'
        ]},
        { id: 'w5-a-olympic-drill', title: 'Olympic Drill', duration: '15 dk', items: [
          'Tall Snatch — 3×3 @ 30 kg', 'Snatch Balance — 3×2 @ 40 kg',
          'High-Hang Squat Snatch — 3×2 @ 35–40 kg', 'Dinlenme: 60–75 sn',
          'Tall Snatch: Barı daha yükseğe çekmeye çalışma; kendini barın altına çek.',
          'Snatch Balance: Ayakların yere basması ile overhead lockout aynı anda.',
          'High-Hang: Direkt Squat Catch.', 'Power Catch + OHS istemiyoruz.'
        ]},
        { id: 'w5-a-olympic-lift', title: 'Olympic Lift — Squat Snatch', items: [
          '6×2', 'Başlangıç: 45 kg', 'Çalışma aralığı: 45–50 kg ≈ %70–77',
          'RPE: 6.5–7.5', 'Dinlenme: 2 dk',
          'QUALITY GATE: İlk 6 tekrarın en az 5/6’sı gerçek Squat Snatch ise 47.5–50 kg’a çık.',
          'Geçmezse 45 kg’da kal.', 'Ana metrik: 12 tekrarın kaçı direkt Squat Snatch?',
          'Hedef: ≥9/12',
          'Power Catch + OHS lift tamamlanmış olsa bile teknik başarılı tekrar sayılmayacak.'
        ]},
        { id: 'w5-a-gymnastics', title: 'Gymnastics — Butterfly Capacity', items: [
          '4×10 Butterfly Pull-up', 'Dinlenme: 90 sn', 'RPE: ≤8',
          'İlk 3 set çok temizse 4. set: 10–12 tekrar.',
          'Odak: Dairesel aks · güçlü push-away · baş nötr · ayaklar bitişik.',
          'Gereksiz knee bend yok; hollow/arch bağlantısı korunacak.',
          '10 sayısına ulaşmak için kötü tekrar yapma.',
          'Örnek: 10 / 10 / 9 / 8 temizse başarılı antrenman.'
        ]},
        { id: 'w5-a-strength', title: 'Strength — Back Squat', items: [
          '4×4 @ %72.5 / ≈80 kg', 'Dinlenme: 2–2.5 dk', 'RPE: 7–7.5',
          'Tempo: Kontrollü iniş → normal dip → agresif çıkış.', 'Failure / grind yok.'
        ]},
        { id: 'w5-a-metcon', title: 'Metcon — Barbell Cycling + Burpee + Run', items: [
          '5 Rounds For Time', '6 Power Snatch @ 40 kg', '8 Bar-Facing Burpee',
          '200 m Treadmill Run', 'Time Cap: 13 dk', 'Hedef: 9:30–12:00', 'RPE: 8–8.5',
          'Power Snatch: 6 UB hedeflenebilir; failure yok.',
          'Burpee: Sabit ritim, sprint yapma.', 'Run: İlk turdan itibaren sürdürülebilir pace.',
          'Amaç: Barbell cycling · burpee efficiency · koşu sonrası barbell · transition · threshold engine.'
        ]},
        { id: 'w5-a-accessory', title: 'Accessory — Opsiyonel', items: [
          '2–3 tur', '10 Single-Arm DB Row / kol @ 17.5–22.5 kg',
          '12 Hollow Body Rock', '20 sn Active Hang', '12 Band External Rotation / kol'
        ]},
        { id: 'w5-a-cool-down', title: 'Cool Down', duration: '5 dk', items: [
          'Easy Bike / Walk', 'Lat Stretch', 'T-Spine Rotation', 'Wrist Mobility'
        ]}
      ]
    },
    {
      id: 'block-1-week-5-day-b',
      day: 'DAY B',
      title: 'Clean Consolidation',
      duration: '80–90 dk',
      focus: 'Squat Clean · Strict Pull-up · Front Squat · Loaded Conditioning',
      purpose: 'Week 4 direkt Squat Clean paternini daha yüksek yükte korumak, Strict Pull-up tam ROM hacmini artırmak ve Front Squat’ı yeniden yüklemek.',
      sections: [
        { id: 'w5-b-warm-up', title: 'Warm-up', duration: '10 dk', items: [
          '2 tur', '250 m Row veya Bike', '8 Cossack Squat', '10 Band Pull Apart',
          '8 Front Rack Lunge', 'Empty Bar: 5 Tall Clean', '5 High-Hang Squat Clean', '5 Front Squat'
        ]},
        { id: 'w5-b-olympic-drill', title: 'Olympic Drill', duration: '12 dk', items: [
          'Tall Clean — 3×3 @ 40 kg', 'High-Hang Squat Clean — 3×2 @ 45–50 kg',
          'Clean High Pull — 2×3 @ 50–55 kg', 'Dinlenme: 60–75 sn',
          'Tall Clean: Agresif pull-under.', 'High-Hang: Direkt Squat Catch.',
          'Clean High Pull: Bar vücuda yakın; barı kalçayla ileri gönderme.',
          'Tall Clean korunuyor çünkü Squat Catch’e en iyi transfer hissedilen drill.'
        ]},
        { id: 'w5-b-olympic-lift', title: 'Olympic Lift — Squat Clean', items: [
          '6×2', 'İlk 2 set: 60 kg', 'Sonraki 4 set: 65 kg', '≈ %67–72',
          'RPE: ≈7', 'Dinlenme: 2 dk',
          'QUALITY GATE: 60 kg’daki ilk 4 tekrarın en az 3/4’ü Direct Squat Catch ise 65 kg.',
          'Geçmezse 60 kg’da kal.', 'Ana metrik: 12 tekrarın kaçı Direct Squat Clean?',
          'Hedef: ≥10/12', 'Power Clean + Front Squat teknik başarılı tekrar sayılmayacak.'
        ]},
        { id: 'w5-b-gymnastics', title: 'Gymnastics — Strict Pull-up', items: [
          '5 set: 5 / 5 / 4 / 3 / 3', 'Hedef: 20 kaliteli tekrar', 'Dinlenme: 90–120 sn',
          'Tam Dead Hang → strict çekiş → çene bar üzerinde → kontrollü tam iniş.',
          'ROM bozulursa seti bitir.',
          'Örnek: 5 / 5 / 4 / 3 / 2 = 19 kaliteli tekrar; 20 yarım tekrardan daha değerlidir.'
        ]},
        { id: 'w5-b-strength', title: 'Strength — Front Squat', items: [
          '4×4 @ %72.5 / ≈75 kg', 'Dinlenme: 2–2.5 dk', 'RPE: 7–8',
          'İlk 3 set: Normal', 'Son set: Her tekrarda 2 sn dip pause.',
          'Odak: Dirsekler yüksek · göğüs dik · core aktif · dipten agresif çıkış.'
        ]},
        { id: 'w5-b-metcon', title: 'Metcon — Loaded Conditioning', items: [
          '4 Rounds For Time', '12 American KB Swing @ 24 kg',
          '40 m Suitcase Carry @ 1×24 kg KB — 20 m sağ + 20 m sol',
          '10 DB Box Step-Over @ 1×22.5 kg', '12/10 Cal SkiErg',
          'Time Cap: 15 dk', 'Hedef: 11–14 dk', 'RPE: ≈8',
          'KB Swing: Kontrollü ama mümkünse UB.', 'Suitcase Carry: Gövde yana yatmayacak.',
          'DB Box Step-Over: Tek DB; shoulder veya front-rack pozisyonunda olabilir.',
          'Her tur taşıma tarafını değiştir.', 'Ski: İlk turdan itibaren sürdürülebilir pace.',
          'Amaç: Grip endurance · loaded locomotion · unilateral core · posterior chain · step-over capacity · Ski engine.'
        ]},
        { id: 'w5-b-accessory', title: 'Accessory — Opsiyonel', items: [
          '2 tur', '10 Single-Arm DB Bench Press / kol @ 17.5 kg',
          '10 Bulgarian Split Squat / bacak', '12 Ring Row'
        ]},
        { id: 'w5-b-cool-down', title: 'Cool Down', duration: '5 dk', items: [
          'Easy Bike / Walk', 'Front Rack Stretch', 'Hip Stretch', 'Lat Stretch', 'T-Spine Rotation'
        ]}
      ]
    },
    {
      id: 'block-1-week-5-day-c',
      day: 'DAY C',
      title: 'Competition Capacity',
      duration: '80–95 dk',
      focus: 'Split Jerk · Butterfly Under Fatigue · Push Press · Competition Chipper',
      purpose: 'Jerk kalitesini geliştirmek, Push Press’i kontrollü yeniden yüklemek, Butterfly’ı hafif fatigue altında kullanmak ve uzun competition-style chipper çalışmak.',
      sections: [
        { id: 'w5-c-warm-up', title: 'Warm-up', duration: '10 dk', items: [
          '2 tur', '250 m Row', '10 Walking Lunge', '10 Scap Push-up',
          '10 Band Pull Apart', '8 Empty Bar Push Press', '5 Split Jerk Footwork'
        ]},
        { id: 'w5-c-olympic-drill', title: 'Olympic Drill', items: [
          'Jerk Balance — 3×3 @ 40 kg', 'Tall Jerk — 3×2 @ 40 kg',
          'Dinlenme: 60–75 sn', 'Odak: Dikey dip · güçlü drive · hızlı lockout · dengeli split.'
        ]},
        { id: 'w5-c-olympic-lift', title: 'Olympic Lift — Split Jerk', items: [
          '6×2 @ %75 / ≈60 kg', 'RPE: 7–7.5', 'Dinlenme: 2 dk',
          'Odak: Dikey dip · bar öne kaçmayacak · hızlı lockout · dengeli split · kontrollü recovery.'
        ]},
        { id: 'w5-c-gymnastics', title: 'Gymnastics — Butterfly Under Fatigue', items: [
          '4 set', '10/8 Cal Row', 'Hemen ardından 8 Butterfly Pull-up',
          'Dinlenme: 75–90 sn', 'Amaç: Nabız yükseldiğinde Butterfly mekaniğini korumak.',
          'Odak: Push-away · dairesel ritim · baş nötr · ayaklar bitişik.',
          'Teknik bozuluyorsa: 8 → 6', 'Kalite > tekrar sayısı.'
        ]},
        { id: 'w5-c-strength', title: 'Strength — Push Press', items: [
          '4×5 @ %65–70 / ≈50–52.5 kg', 'Dinlenme: 2 dk', 'RPE: ≤8',
          'Week 3’teki RPE 9 tekrar istenmiyor.',
          '3. sette RPE 8’e ulaşıyorsa kilo azalt veya 4. seti yapma.'
        ]},
        { id: 'w5-c-metcon', title: 'Metcon — Competition Chipper', items: [
          'For Time', '30/24 Cal Row', '30 Wall Ball @ 9 kg', '20 Toes-to-Bar',
          '20 Single DB Devil Press @ 17.5 kg', '30 Box Jump Over @ 24"', '30/24 Cal BikeErg',
          'Time Cap: 20 dk', 'Hedef: 15–19 dk', 'RPE: 8–9',
          'Row: %75–80 tempo; burada WOD kazanılmayacak.',
          'Wall Ball: 15 + 15 veya yalnızca rahat hissediyorsan UB.',
          'Toes-to-Bar: Failure yok; örnek 8 + 7 + 5 veya 5 + 5 + 5 + 5.',
          'Devil Press: Tek DB; her tekrarda kol değiştir; steady singles.',
          'Box Jump Over: Kesintisiz sürdürülebilir ritim.',
          'BikeErg: Son istasyon; kalan kapasite burada kullanılabilir.',
          'Skor: Toplam süre. Cap olursa tamamlanan tekrar.'
        ]},
        { id: 'w5-c-accessory', title: 'Accessory — Opsiyonel', items: [
          '2 tur', '10 GHD Sit-up', '10 Single-Arm DB Bench Press / kol @ 17.5 kg', '12 Face Pull'
        ]},
        { id: 'w5-c-cool-down', title: 'Cool Down', duration: '5 dk', items: [
          'Easy Walk / Bike', 'Lat Stretch', 'Hip Flexor Stretch', 'T-Spine', 'Controlled Breathing'
        ]}
      ]
    },
    {
      id: 'block-1-week-5-day-d',
      day: 'DAY D',
      title: 'Home Athletic Development',
      duration: '50–60 dk',
      focus: 'Double Under · Strict Pull-up · Posterior Chain · Structural / Hypertrophy · Aerobic Base',
      purpose: 'Opsiyonel ev günü. A/B/C sonrası recovery kötü ise yapılmayacak.',
      sections: [
        { id: 'w5-d-warm-up', title: 'Warm-up', duration: '8 dk', items: [
          '3 tur', '10 Air Squat', '8 Push-up', '8 Empty Bar RDL', '20 sn Dead Hang'
        ]},
        { id: 'w5-d-skill', title: 'Skill — Double Under', duration: '12 dk', items: [
          '0–3 dk: Single Under rhythm', '3–6 dk: Single → Single → Double',
          '6–9 dk: Double + Double bağlantı denemeleri',
          '9–12 dk: Serbest kaliteli DU denemeleri', 'Hedef: 3–5 Unbroken Double Under',
          'Bu conditioning değil; nabız yükseltme.', 'Koordinasyon ve timing çalış.'
        ]},
        { id: 'w5-d-gymnastics', title: 'Gymnastics — Strict Pull-up', items: [
          '4×3', 'Tam ROM', 'Dinlenme: 90 sn', 'RPE: 6–7'
        ]},
        { id: 'w5-d-strength', title: 'Strength — Romanian Deadlift', items: [
          '4×6 @ %70 / ≈80 kg', 'Dinlenme: 2 dk', 'RPE: 7'
        ]},
        { id: 'w5-d-structural', title: 'Structural / Hypertrophy', items: [
          '3 tur', '8 Single-Leg RDL / bacak @ 1×17.5 kg DB',
          '10 Single-Arm DB Bench Press / kol @ 17.5 kg',
          '8 Reverse Lunge / bacak @ 1×17.5 kg DB', 'Dinlenme: 60–90 sn',
          'Amaç: Kas gelişimi için kontrollü ek hacim.', 'Failure yok.'
        ]},
        { id: 'w5-d-conditioning', title: 'Conditioning — Zone 2', duration: '15–20 dk', items: [
          'RPE: 4–5', 'Koşu / yürüyüş kombinasyonu veya mevcut uygun cardio ekipmanı.',
          'Hedef: Konuşabilecek tempo.', 'Bu bölüm competition WOD değil.'
        ]},
        { id: 'w5-d-accessory', title: 'Accessory — Opsiyonel', items: [
          '2 tur', '15 Hollow Body Rock', '20 sn Active Hang', '10 Scap Pull-up'
        ]},
        { id: 'w5-d-cool-down', title: 'Cool Down', duration: '5 dk', items: [
          'Hamstring Stretch', 'Hip Stretch', 'Lat Stretch', 'T-Spine'
        ]}
      ]
    }
  ]
};

export default block1Week5;
