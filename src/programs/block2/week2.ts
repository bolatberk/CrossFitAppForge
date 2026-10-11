import type { TrainingWeek } from '../../types/training';

const block2Week2: TrainingWeek = {
  id: 'block-2-week-2',
  block: 2,
  week: 2,
  title: 'Technical Transfer & Strength Development',
  description: '3 days A / B / C · 75–90 min · General RPE 7.5–8.5. Baseline: Snatch 67 kg; Clean 90 kg; C&J 80 kg; Back Squat ~110 kg; Front Squat ~105 kg.',
  goals: [
    'Snatch: Direct Squat Catch @52.5–55 kg',
    'Clean: Technical quality @77.5 kg; optional 80 kg only if clean',
    'Jerk: Stable recovery @70 kg; optional 72.5 kg only if qualified',
    'Weighted Strict Pull: 5×3 @BW+5 kg, full ROM',
    'Explosive Pull: 5×2 with greater height and speed',
    'Butterfly: 2–3 consecutive quality cycles, no excessive arm compensation',
    'Back Squat: 5×3 @92.5 kg, RPE ≤8.5',
    'Front Squat: 4×5 @80 kg, RPE ≤8',
    'RDL: 3×6 @70 kg, controlled hinge',
    'Strict Press: 4×5 @37.5 kg, RPE 7–8',
    'Conditioning: Pacing repeatability, gymnastics economy, barbell quality under fatigue',
  ],
  notes: [
    'No failure / no PR chasing.',
    'Accessory optional. No sandbag. DU paused.',
    'BLOCK 2 WEEK 1: Clean 78 kg @RPE ≤8; Split Jerk 70 kg @RPE ~7.8; 72.5 kg Jerk not attempted; Snatch 55 kg Power/Full inconsistency; Weighted Strict PU 5×3 @BW+5 kg completed; Butterfly pattern unstable.',
    'FEEDBACK AFTER EACH DAY — Olympic: top load / RPE / technical quality.',
    'Gymnastics: completed reps / quality / limitations.',
    'Strength: sets / load / RPE / bar speed.',
    'Metcon: score / pacing / movement breakdown.',
    'Session: duration / RPE / recovery / pain.',
  ],
  days: [
    {
      id: 'block-2-week-2-day-a', day: 'DAY A',
      title: 'Snatch / Weighted Pull / Back Squat', duration: '75–90 min',
      focus: 'Snatch technical transfer · Weighted strict pull · Back Squat intensity · Running repeatability',
      purpose: 'Direct squat catch and bar proximity before load; strength without grinding; repeatable engine output.',
      sections: [
        { id: 'b2w2-a-warmup', title: 'Warm-up', duration: '8 min', items: [
          '2 ROUNDS:', '200 m Row', '8 Cossack Squat', '8 Walking Lunge', '8 Scap Pull-Up', '8 PVC OHS',
          'EMPTY BAR:', '5 Snatch Deadlift', '5 Snatch High Pull', '5 OHS', '3 Squat Snatch',
        ] },
        { id: 'b2w2-a-primer', title: 'Olympic Primer', items: [
          'A) Snatch High Pull', '2×3 @45 kg', 'B) Tall Snatch', '3×2 @30–35 kg',
          'FOCUS:', 'Bar proximity + active pull-under.',
        ] },
        { id: 'b2w2-a-snatch', title: 'Squat Snatch', items: [
          '2×2 @45 kg', '2×2 @47.5 kg', '2×1 @50 kg', '2×1 @52.5 kg',
          '2×1 @55 kg — CONDITIONAL',
          '55 kg only if previous reps are direct Squat Snatch.', 'RPE ≤8.',
          'If Power Catch + OHS appears:', 'Reduce to 50–52.5 kg.', 'Finish with 2 quality singles.',
          'NO 57.5 KG THIS WEEK.', 'CUE:', 'CLOSE → FINISH → UNDER',
        ] },
        { id: 'b2w2-a-pull', title: 'Weighted Strict Pull-Up', items: [
          '5×3 @BW+5 kg', 'Rest 90–120 sec', 'RPE ≤8',
          'Full ROM.', 'Dead-stop.', 'Controlled shoulders.', 'No kip.', 'Chin clearly over bar.',
        ] },
        { id: 'b2w2-a-squat', title: 'Back Squat — Intensity', items: [
          '5×3 @92.5 kg', 'Rest 2–3 min', 'Target RPE 8–8.5',
          'If first sets exceed target RPE:', 'Reduce remaining sets to 90 kg.',
          'Full depth.', 'No grinding.',
        ] },
        { id: 'b2w2-a-metcon', title: 'Metcon — Running Repeatability', items: [
          '5 SETS:', '3:00 WORK / 1:00 REST', 'EACH INTERVAL:',
          '300 m Run', '10 KB Swing @24 kg (Russian)', 'Remaining time: BikeErg calories',
          'No opening sprint.',
          'If first interval cannot fit:', 'Standardize run to 250 m from interval 2 onward.',
          'Record protocol change.', 'TARGET:', 'Consistent BikeErg output.',
          'LOG:', 'I1 ___ cal', 'I2 ___ cal', 'I3 ___ cal', 'I4 ___ cal', 'I5 ___ cal',
          'RPE ___', 'Limiter ___',
        ] },
        { id: 'b2w2-a-accessory', title: 'Accessory — Optional', items: [
          '2 ROUNDS:', '8–10 GHD Sit-Up', '12 Face Pull', '10 DB Hammer Curl',
        ] },
        { id: 'b2w2-a-cooldown', title: 'Cool-down', items: [
          '4–5 min easy movement.', 'Lat / hip mobility.',
        ] },
      ],
    },
    {
      id: 'block-2-week-2-day-b', day: 'DAY B',
      title: 'Clean / Butterfly / Front Squat / RDL', duration: '75–90 min',
      focus: 'Clean technical load · Butterfly technique reset · Front Squat volume · Romanian Deadlift',
      purpose: 'Clean quality under increasing load, butterfly motor-pattern reset and controlled posterior-chain strength.',
      sections: [
        { id: 'b2w2-b-warmup', title: 'Warm-up', duration: '8 min', items: [
          '2 ROUNDS:', '200 m BikeErg', '8 Walking Lunge', '8 Scap Pull-Up', '10 Band Pull-Apart',
          'EMPTY BAR:', '5 Clean Deadlift', '5 Front Squat', '3 Tall Clean', '3 Squat Clean',
        ] },
        { id: 'b2w2-b-primer', title: 'Clean Primer', items: [
          'A) Mid-Thigh Hang Squat Clean', '3×2 @45–50 kg',
          'B) Tall Clean', '2×2 @35–40 kg',
          'CUE:', 'SWEEP IN → FINISH → UNDER',
          'Do not deliberately smash the bar into the hip.',
        ] },
        { id: 'b2w2-b-clean', title: 'Squat Clean', items: [
          '2×2 @60 kg', '2×1 @67.5 kg', '2×1 @72.5 kg', '2×1 @75 kg', '2×1 @77.5 kg',
          'OPTIONAL:', '1×1 @80 kg', '80 kg only if 77.5 kg is technically clean.',
          'RPE CAP 8.5.', 'QUALITY:', 'Balanced first pull.', 'Close bar.', 'Full extension.',
          'Direct Squat Clean.', 'Fast elbows.', 'Stable rack.',
        ] },
        { id: 'b2w2-b-butterfly', title: 'Butterfly — Technique Reset', items: [
          'A) Straight-Arm Kip Swing', '2×5',
          'B) Butterfly Double + Reset', '4×2',
          'C) Continuous Butterfly', '3×3 — QUALITY ONLY',
          'Rest 60–90 sec.', 'ONE CUE:', 'PUSH AWAY',
          'Avoid:', 'Excessive forward leg swing.', 'Leaning excessively backward.',
          'Strict-dominant pulling.', 'Rhythm loss.',
          'Stop the set if pattern deteriorates.', 'Video:', 'First and last quality set.',
        ] },
        { id: 'b2w2-b-front-squat', title: 'Front Squat — Volume', items: [
          '4×5 @80 kg', 'Target RPE 7.5–8', 'Full depth.', 'No grind.',
        ] },
        { id: 'b2w2-b-rdl', title: 'Romanian Deadlift — New Strength', items: [
          '3×6 @70 kg', 'Target RPE ~7', '2-sec controlled eccentric.',
          'Soft knees.', 'Bar close.', 'Neutral trunk.', 'Controlled hip hinge.',
        ] },
        { id: 'b2w2-b-metcon', title: 'Metcon — Mixed-Modal Chipper', items: [
          'FOR TIME', 'CAP: 16:00', 'TARGET: 12–16 MIN',
          '40/32 cal Row', '30 Wall Ball @9 kg', '20 Alternating DB Snatch @22.5 kg',
          '20 Toes-to-Bar', '30 m Farmer Carry @2×24 kg KB', '20 Burpee Over Rower',
          'T2B:', 'Break as needed.', 'Do not reduce prescribed reps.',
          'LOG:', 'Time ___', 'T2B breakdown ___', 'Transitions ___',
          'Main limiter ___', 'RPE ___',
        ] },
        { id: 'b2w2-b-accessory', title: 'Accessory — Optional', items: [
          '2×12 Band External Rotation',
        ] },
        { id: 'b2w2-b-cooldown', title: 'Cool-down', items: [
          '5 min easy movement.',
        ] },
      ],
    },
    {
      id: 'block-2-week-2-day-c', day: 'DAY C',
      title: 'Jerk / Explosive Pull / Press', duration: '75–90 min',
      focus: 'Split Jerk repeatability · BMU pulling track · Butterfly transfer · Strict Press · Power and engine',
      purpose: 'Stable 70 kg Jerk recovery, explosive pulling quality, butterfly transfer and power under fatigue.',
      sections: [
        { id: 'b2w2-c-warmup', title: 'Warm-up', duration: '8 min', items: [
          '2 ROUNDS:', '200 m SkiErg', '10 Scap Push-Up', '8 Walking Lunge', '10 Band Pull-Apart',
          'EMPTY BAR:', '5 Strict Press', '5 Push Press', '5 Push Jerk', '5 Split Jerk',
        ] },
        { id: 'b2w2-c-primer', title: 'Jerk Primer', items: [
          'A) Jerk Balance', '2×2 @40 kg',
          'B) Pause Split Jerk', '3×2 @50 kg', '2-sec catch hold.',
          'Focus:', 'Vertical dip.', 'Fast drive.', 'Stable catch.', 'Controlled recovery.',
        ] },
        { id: 'b2w2-c-jerk', title: 'Split Jerk', items: [
          '2×2 @55 kg', '2×2 @60 kg', '2×1 @65 kg', '2×1 @67.5 kg', '2×1 @70 kg',
          'OPTIONAL:', '1×1 @72.5 kg',
          '72.5 kg only if BOTH 70 kg reps:', 'Stable catch.', 'Controlled recovery.',
          'No press-out.', 'RPE ≤8.',
          'If recovery balance fails:', 'Cancel optional attempt.',
          'MAIN GOAL:', 'Make 70 kg technically repeatable.',
        ] },
        { id: 'b2w2-c-explosive-pull', title: 'Explosive High Pull-Up — BMU Track', items: [
          '5×2', 'Rest 90 sec', 'Focus:', 'HEIGHT + SPEED.',
          'Kip permitted.', 'Reset each rep.', 'No uncontrolled swing.',
          'Do not count as successful C2B unless chest contacts the bar.',
        ] },
        { id: 'b2w2-c-butterfly', title: 'Butterfly — Short Transfer', items: [
          'A) Straight-Arm Kip Swing', '1×5', 'B) Butterfly', '4×2',
          'ONE CUE:', 'PUSH AWAY', 'Only quality reps.',
          'Skip if pulling fatigue disrupts technique.',
        ] },
        { id: 'b2w2-c-press', title: 'Strict Press — New Strength', items: [
          '4×5 @37.5 kg', 'Target RPE 7–8',
          'If first set exceeds RPE 8:', 'Reduce to 35 kg.',
          'No knee drive.', 'Controlled bar path.', 'Full lockout.',
        ] },
        { id: 'b2w2-c-metcon', title: 'Metcon — Descending Power & Engine', items: [
          'FOR TIME', '21-15-9',
          'Power Snatch @35 kg', 'Box Jump Over @24"', 'Sit-Up',
          'AFTER EACH ROUND:', '12/10 cal BikeErg',
          'ROUND 1:', '21 Power Snatch', '21 Box Jump Over', '21 Sit-Up', '12/10 cal BikeErg',
          'ROUND 2:', '15 Power Snatch', '15 Box Jump Over', '15 Sit-Up', '12/10 cal BikeErg',
          'ROUND 3:', '9 Power Snatch', '9 Box Jump Over', '9 Sit-Up', '12/10 cal BikeErg',
          'CAP: 15:00', 'Touch-and-go NOT mandatory.',
          'Keep barbell technique consistent.', 'No uncontrolled reps.',
          'LOG:', 'Total time ___', 'Power Snatch strategy ___', 'Round splits ___',
          'Main limiter ___', 'RPE ___',
        ] },
        { id: 'b2w2-c-accessory', title: 'Accessory — Optional', items: [
          '2 ROUNDS:', '10 DB Bench Press', '12 Face Pull', '10 GHD Sit-Up',
        ] },
        { id: 'b2w2-c-cooldown', title: 'Cool-down', items: [
          '5 min easy movement.',
        ] },
      ],
    },
  ],
};

export default block2Week2;
