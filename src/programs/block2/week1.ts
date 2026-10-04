import type { TrainingWeek } from '../../types/training';

const block2Week1: TrainingWeek = {
  id: 'block-2-week-1',
  block: 2,
  week: 1,
  title: 'Baseline Transfer',
  description: 'Block 2 — Performance Development. Technique → Load · Strength → Power · Gymnastics → Capacity · Engine → Repeatability · All → CrossFit Performance. Frequency: 3 days — A / B / C. Session target: 75–90 min. General RPE: 7.5–8.5.',
  goals: [
    'Technique → Load',
    'Strength → Power',
    'Gymnastics → Capacity',
    'Engine → Repeatability',
    'All → CrossFit Performance',
  ],
  notes: [
    'No failure.',
    'No unnecessary PR attempts.',
    'Olympic quality > load.',
    'Strength progression is UNDULATING, not linear.',
    'Metcon prescriptions do NOT change after starting.',
    'Slow down / break sets if necessary; do not reduce reps.',
    'Accessory is OPTIONAL.',
    'Sandbag is NOT used.',
    'DU remains paused.',
    'BUTTERFLY: Pattern stabilization before capacity.',
    'CONDITIONING: Repeatability before opening speed.',
  ],
  days: [
    {
      id: 'block-2-week-1-day-a',
      day: 'DAY A',
      title: 'Snatch + Weighted Pull + Back Squat + Repeatability',
      duration: '75–90 min',
      focus: 'Snatch · Weighted Pull · Back Squat · Repeatability',
      purpose: 'Technique → Load · Strength → Power · Engine → Repeatability',
      sections: [
        { id: 'b2w1-a-warm-up', title: 'Warm-up', duration: '8–10 min', items: [
          '2 Rounds:', '250 m Row', '8 Walking Lunge', '8 Cossack Squat', '8 Scap Pull-Up', '8 PVC OHS',
          'Empty Bar:', '5 Snatch Deadlift', '5 Snatch High Pull', '5 Muscle Snatch', '5 OHS', '3 Squat Snatch'
        ]},
        { id: 'b2w1-a-snatch-primer', title: 'Snatch Primer', items: [
          'A) Snatch High Pull', '3×3 @45 kg', 'FOCUS:', 'Bar close.', 'CUE:', 'CLOSE → ELBOWS HIGH & OUT',
          'Do NOT deliberately pull the bar higher.', 'B) Tall Snatch', '2×2 @30–35 kg', 'FOCUS:', 'Fast turnover + direct catch.'
        ]},
        { id: 'b2w1-a-squat-snatch', title: 'Squat Snatch', items: [
          '1RM:', '67 kg', '2×1 @47.5 kg', '≈71%', '2×1 @50 kg', '≈75%', '2×1 @52.5 kg', '≈78%',
          '2×1 @55 kg', '≈82%', 'IF 55 kg IS TECHNICALLY CLEAN:', 'OPTIONAL:', '1×1 @57.5 kg', '≈86%',
          'REST:', '90–120 sec', 'RPE CAP:', '8.5', 'MAIN CUE:', 'KEEP IT CLOSE → FINISH → UNDER',
          'QUALITY:', 'Controlled First Pull', 'Full extension', 'Bar close', 'Active pull-under', 'Direct Squat Snatch',
          'Stable overhead catch', 'DO NOT ADD LOAD IF:', 'Forward loop clearly increases', 'Early arm bend becomes dominant',
          'Power catch + OHS appears', 'Catch becomes unstable'
        ]},
        { id: 'b2w1-a-weighted-pull', title: 'Weighted Strict Pull-Up', items: [
          '5×3 @BW +5 kg', 'REST:', '90–120 sec', 'TARGET RPE:', '7.5–8', 'STANDARD:', 'Dead-stop',
          'Full elbow extension', 'Shoulder remains controlled', 'No kip', 'Chin clearly over bar', 'GOAL:',
          'Build pulling strength foundation for:', 'Weighted Pull', '↓', 'Explosive Pull', '↓', 'High C2B', '↓',
          'Hip-to-Bar', '↓', 'BMU'
        ]},
        { id: 'b2w1-a-back-squat', title: 'Back Squat — Volume', items: [
          '4×5 @85 kg', '≈77% of 110 kg', 'REST:', '2:00–3:00', 'TARGET RPE:', '7.5–8', 'STANDARD:',
          'Full depth', 'Controlled eccentric', 'Strong drive', 'No grind', 'PURPOSE:', 'Previous:', '4×4 @90 kg',
          'Now:', 'Load ↓', 'Volume ↑'
        ]},
        { id: 'b2w1-a-conditioning', title: 'Conditioning — Repeatability Intervals', items: [
          '5 SETS:', '3:00 WORK', '1:00 REST', 'EACH 3:00 WINDOW:', '8/6 cal BikeErg',
          '10 DB Front Rack Reverse Lunge @2×17.5 kg', '6 Burpee Target Touch', 'Remaining Time:', 'ROW CALORIES',
          'DB LUNGE:', '5 reps each leg', 'Alternating reverse lunge.', 'TARGET:',
          'Produce similar Row calories across all 5 intervals.', 'PACING:', 'INTERVAL 1: Conservative',
          'INTERVAL 2: Establish pace', 'INTERVAL 3: Hold', 'INTERVAL 4: Hold', 'INTERVAL 5: Push',
          'TARGET RPE:', '1 = 7.5', '2 = 8', '3 = 8', '4 = 8.5', '5 = 9', 'KPI:', 'Best → Worst Row Output',
          'TARGET DECAY:', '≤10%', 'LOG:', 'I1 Row Cal: _____', 'I2 Row Cal: _____', 'I3 Row Cal: _____',
          'I4 Row Cal: _____', 'I5 Row Cal: _____', 'RPE: _____', 'MAIN LIMITER: ________________'
        ]},
        { id: 'b2w1-a-accessory', title: 'Accessory — Optional', items: [
          '2 Rounds:', '10 GHD Sit-Up', '12 Face Pull', '10 DB Hammer Curl'
        ]},
        { id: 'b2w1-a-cool-down', title: 'Cool Down', items: [
          '5 min easy movement', 'Lat', 'Hip flexor', 'Thoracic', 'Quad'
        ]},
      ],
    },
    {
      id: 'block-2-week-1-day-b',
      day: 'DAY B',
      title: 'Clean + Butterfly + Front Squat + Threshold',
      duration: '75–90 min',
      focus: 'Clean · Butterfly · Front Squat · Threshold',
      purpose: 'Technique → Load · Butterfly pattern stabilization · Threshold repeatability',
      sections: [
        { id: 'b2w1-b-warm-up', title: 'Warm-up', duration: '8–10 min', items: [
          '2 Rounds:', '250 m BikeErg', '8 Front Rack Walking Lunge', '8 Cossack Squat', '8 Scap Pull-Up',
          '10 Band Pull-Apart', 'Empty Bar:', '5 Clean Deadlift', '5 Clean High Pull', '5 Front Squat',
          '3 Tall Clean', '3 Squat Clean'
        ]},
        { id: 'b2w1-b-clean-primer', title: 'Clean Primer', items: [
          'A) MID-THIGH HANG SQUAT CLEAN', '3×2 @45–50 kg', 'FOCUS:', 'Power position', '+', 'Bar proximity',
          '+', 'Contact', 'CUE:', 'SWEEP IN → FINISH → UNDER', 'Do NOT deliberately smash the hip into the bar.',
          'B) TALL CLEAN', '2×2 @35–40 kg', 'FOCUS:', 'Active pull-under', 'Fast elbows', 'Immediate front rack'
        ]},
        { id: 'b2w1-b-squat-clean', title: 'Squat Clean', items: [
          '1RM:', '90 kg', '2×1 @65 kg', '≈72%', '2×1 @70 kg', '≈78%', '2×1 @72.5 kg', '≈81%',
          '2×1 @75 kg', '≈83%', 'IF 75 IS TECHNICALLY CLEAN:', 'OPTIONAL:', '1×1 @77.5 kg', '≈86%',
          'REST:', '90–120 sec', 'RPE CAP:', '8.5', 'MAIN CUE:', 'SWEEP IN → FINISH → UNDER', 'QUALITY:',
          'Balanced First Pull', 'Arms long through extension', 'Bar close', 'Direct Squat Clean', 'Fast turnover',
          'High elbows', 'Stable recovery'
        ]},
        { id: 'b2w1-b-butterfly', title: 'Butterfly — Pattern Stabilization', items: [
          'A) STRAIGHT-ARM KIP SWING', '2×6', 'FOCUS:', 'CHEST THROUGH → HEAD FOLLOWS', 'IMPORTANT:',
          'Do NOT intentionally throw the head backward.', 'Chest/shoulders initiate the arch.', 'Head follows naturally.',
          'B) BUTTERFLY PULL-UP', '5×4', 'REST:', '45–60 sec', 'MAIN CUE:', 'RHYTHM', 'GOAL:',
          'Not 20 total reps.', 'Goal:', '5 sets with the SAME motor pattern.', 'WATCH FOR:', 'Cervical rigidity',
          'Early arm bend', 'Strict-dominant pull', 'Legs moving into L-sit', 'Knee bend', 'Rhythm loss',
          'IF LOWER-BODY DISCONNECT IS OBVIOUS:', 'OPTIONAL CONSTRAINT:', 'Sponge / Block Butterfly', '1×3–4',
          'THEN:', 'Normal Butterfly', '1×3–4', 'VIDEO:', 'Preferably:', 'SET 1', '+', 'SET 5', 'PURPOSE:',
          'Compare technical degradation.'
        ]},
        { id: 'b2w1-b-front-squat', title: 'Front Squat — Intensity', items: [
          '5×3 @85 kg', '≈81% of 105 kg', 'REST:', '2:00–2:30', 'TARGET RPE:', '8', 'STANDARD:',
          'Full depth', 'High elbows', 'Upright torso', 'No grind'
        ]},
        { id: 'b2w1-b-conditioning', title: 'Conditioning — Continuous Threshold', items: [
          'AMRAP 15', '250 m Treadmill Run', '12 KB Swing @24 kg', '8 Toes-to-Bar',
          '10 DB Box Step-Over @2×12.5 kg / 24"', 'TREADMILL:', 'Do NOT sprint the first run.',
          'Get to sustainable speed quickly.', 'KB SWING:', 'Russian / eye-level standard.', '12 UB target.',
          'T2B:', '8 reps EVERY ROUND.', 'Allowed:', '8 UB', 'or', '5 + 3', 'or', '4 + 4', 'or', '3 + 3 + 2',
          'NOT ALLOWED:', 'Reducing prescribed reps during workout.', 'DB BOX STEP-OVER:',
          '5 lead each side where practical.', 'No jump required.', 'PACING:', 'MIN 0–5: CONTROL',
          'MIN 5–10: HOLD', 'MIN 10–15: BUILD if available', 'TARGET RPE:', '8–8.5', 'PRIMARY KPI:',
          'Can 8 T2B remain repeatable after running + posterior-chain work?', 'LOG:',
          'TOTAL: _____ Rounds + _____ Reps', 'ROUND TIMES:', 'R1: _____', 'R2: _____', 'R3: _____',
          'R4: _____', 'R5: _____', 'T2B:', 'R1: _____', 'R2: _____', 'R3: _____', 'R4: _____',
          'R5: _____', 'RPE: _____', 'MAIN LIMITER: ________________'
        ]},
        { id: 'b2w1-b-accessory', title: 'Accessory — Optional', items: [
          '2 Rounds:', '10 GHD Sit-Up', '12 Band External Rotation', '10 DB Curl'
        ]},
        { id: 'b2w1-b-cool-down', title: 'Cool Down', items: [
          '5 min easy walk/bike', 'Lats', 'Hamstrings', 'Hip flexors', 'Front rack'
        ]},
      ],
    },
    {
      id: 'block-2-week-1-day-c',
      day: 'DAY C',
      title: 'Jerk + Explosive Pull + Butterfly Transfer + Push Press + CrossFit Performance',
      duration: '75–90 min',
      focus: 'Jerk · Explosive Pull · Butterfly Transfer · Push Press · CrossFit Performance',
      purpose: 'Strength → Power · Gymnastics → Capacity · All → CrossFit Performance',
      sections: [
        { id: 'b2w1-c-warm-up', title: 'Warm-up', items: [
          '2 Rounds:', '200 m SkiErg', '8 Walking Lunge', '10 Scap Push-Up', '10 Band Pull-Apart',
          'Empty Bar:', '5 Strict Press', '5 Push Press', '5 Push Jerk', '5 Split Jerk'
        ]},
        { id: 'b2w1-c-jerk-primer', title: 'Jerk Primer', items: [
          'A) JERK BALANCE', '2×2 @40 kg', 'B) PAUSE SPLIT JERK', '2×2 @50 kg', '2 sec catch hold.',
          'FOCUS:', 'Vertical dip', '+', 'Fast drive', '+', 'Stable receiving position'
        ]},
        { id: 'b2w1-c-split-jerk', title: 'Split Jerk', items: [
          'C&J 1RM:', '80 kg', '2×2 @60 kg', '75%', '2×2 @65 kg', '81%', '2×1 @67.5 kg', '84%',
          '2×1 @70 kg', '87.5%', 'IF 70 kg:', 'Stable', 'No press-out', 'Controlled recovery', 'RPE ≤8',
          'OPTIONAL:', '1×1 @72.5 kg', '≈91%', 'NO PR ATTEMPT.'
        ]},
        { id: 'b2w1-c-explosive-pull', title: 'Explosive Pull — BMU Foundation', items: [
          'EXPLOSIVE CHEST-TO-BAR PULL-UP', '5×3', 'REST:', '75–90 sec', 'GOAL:', 'HEIGHT', '+', 'SPEED',
          'Kip allowed.', 'Each set should remain explosive.', 'NOT A CAPACITY SET.', 'NOT AMRAP.',
          'PROGRESSION PATH:', 'Weighted Strict Pull', '↓', 'Explosive C2B', '↓', 'High C2B', '↓',
          'Hip-to-Bar', '↓', 'Transition', '↓', 'BMU'
        ]},
        { id: 'b2w1-c-butterfly', title: 'Butterfly — Short Transfer', items: [
          '3×4', 'REST:', '45 sec', 'ONLY CUE:', 'RHYTHM', 'PURPOSE:',
          "Can Day B's pattern be reproduced on another day?", 'NO EXTRA VOLUME.', 'NO MAX TEST.'
        ]},
        { id: 'b2w1-c-push-press', title: 'Push Press — Strength', items: [
          '5×3 @55 kg', '≈73% of 75 kg', 'REST:', '90–120 sec', 'TARGET RPE:', '7.5–8', 'QUALITY:',
          'Vertical dip', 'Strong leg drive', 'Bar stays close', 'Fast lockout', 'No grind'
        ]},
        { id: 'b2w1-c-conditioning', title: 'Conditioning — Ascending Barbell Ladder', items: [
          'FOR TIME', 'ROUND 1:', '3 Clean & Jerk @50 kg', '12 Wall Ball @9 kg', '10/8 cal SkiErg',
          'ROUND 2:', '6 Clean & Jerk @50 kg', '12 Wall Ball @9 kg', '10/8 cal SkiErg',
          'ROUND 3:', '9 Clean & Jerk @50 kg', '12 Wall Ball @9 kg', '10/8 cal SkiErg',
          'ROUND 4:', '12 Clean & Jerk @50 kg', '12 Wall Ball @9 kg', '10/8 cal SkiErg', 'CAP:', '16:00',
          'CLEAN & JERK:', 'Power Clean + Push Jerk permitted.', 'Singles are COMPLETELY acceptable.',
          'Do NOT force TnG.', 'STRATEGY:', '3: Fast but controlled', '6: Controlled cycling / singles',
          '9: Sustainable', '12: Stay moving', 'WALL BALL:', 'Target:', '12 UB', 'Break if needed.',
          'SKI:', 'Strong sustainable pace.', 'Do NOT sprint early.', 'TARGET RPE:', '8–9', 'PURPOSE:',
          'Increasing barbell volume under accumulating fatigue.', 'PRIMARY KPI:',
          'Can barbell turnover remain stable as reps increase?', 'LOG:', 'TOTAL TIME: _____',
          '3 C&J ROUND: _____', '6 C&J ROUND: _____', '9 C&J ROUND: _____', '12 C&J ROUND: _____',
          'C&J STRATEGY: ________________', 'WALL BALL: ________________', 'RPE: _____',
          'MAIN LIMITER: ________________'
        ]},
        { id: 'b2w1-c-accessory', title: 'Accessory — Optional', items: [
          '2 Rounds:', '10 DB Bench Press', '10 GHD Sit-Up', '12 Band Face Pull'
        ]},
        { id: 'b2w1-c-cool-down', title: 'Cool Down', items: [
          '5 min easy movement', 'Shoulders', 'Lats', 'Quads', 'Hip flexors', 'Thoracic'
        ]},
        { id: 'b2w1-kpi', title: 'Block 2 — Week 1 KPI', items: [
          'SNATCH', '55 kg technical quality: _____', '57.5 kg optional: _____', 'Bar Path: _____',
          'Early Arm Bend: _____', 'Direct Squat Catch: _____',
          'CLEAN', '75 kg: _____', '77.5 kg optional: _____', 'Sweep / Power Position: _____',
          'Bar Proximity: _____', 'Turnover: _____',
          'JERK', '70 kg: _____', '72.5 kg optional: _____', 'RPE: _____', 'Catch Stability: _____',
          'WEIGHTED STRICT PULL', '5×3 @+5 kg: _____', 'RPE: _____', 'Standard: _____',
          'EXPLOSIVE PULL', '5×3 C2B:', 'Height: _____', 'Speed: _____', 'Repeatability: _____',
          'BUTTERFLY', 'DAY B:', '5×4: _____', 'SET 1 QUALITY: _____', 'SET 5 QUALITY: _____',
          'DAY C:', '3×4: _____', 'QUESTION:', 'Was the SAME pattern reproduced on both days?', 'YES / NO',
          'BACK SQUAT', '4×5 @85 kg', 'RPE: _____',
          'FRONT SQUAT', '5×3 @85 kg', 'RPE: _____',
          'PUSH PRESS', '5×3 @55 kg', 'RPE: _____',
          'CONDITIONING', 'DAY A:', '5×3:00 Repeatability', 'Row Calories:',
          '____ / ____ / ____ / ____ / ____', 'Output Decay: _____%', 'DAY B:', 'AMRAP 15',
          'Score: _____', 'T2B prescribed reps maintained:', 'YES / NO', 'DAY C:',
          'Ascending C&J Ladder', 'Time: _____', 'Barbell quality: _____'
        ]},
        { id: 'b2w1-success', title: 'Week 1 Success Criteria', items: [
          '1. Snatch quality transfers to 55 kg+.',
          '2. Clean quality transfers to 75 kg+.',
          '3. 70 kg Jerk becomes repeatable rather than a one-day result.',
          '4. +5 kg weighted strict pull-up becomes established working strength.',
          '5. Explosive pulling pathway officially begins.',
          '6. Butterfly pattern is reproduced across separate training days.',
          '7. T2B prescription is maintained under fatigue.',
          '8. Conditioning output becomes measurable through repeatability rather than just final workout time.',
          '9. Strength progresses without unnecessary failure or linear loading.',
          'BLOCK 2 WEEK 1 — END'
        ]},
      ],
    },
  ],
};

export default block2Week1;
