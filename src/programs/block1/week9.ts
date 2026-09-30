import type { TrainingWeek } from '../../types/training';

const block1Week9: TrainingWeek = {
  id: 'block-1-week-9',
  block: 1,
  week: 9,
  title: 'Routine Re-Entry + Consolidation + Closure',

  description:
    'Block 1 final week. Full return to normal A/B/C routine, consolidation of Block 1 adaptations, establishment of Block 2 baselines and closure without unnecessary fatigue. Frequency: 3 days — A / B / C. Session target: 75–90 min. General RPE: 7–8.',

  goals: [
    'Full return to normal A/B/C routine',
    'Consolidate Block 1 adaptations',
    'Establish Block 2 baselines',
    'Finish Block 1 without unnecessary fatigue',
  ],

  notes: [
    'No PR attempts',
    'No failure',
    'Olympic technique > load',
    'Accessory = OPTIONAL',
    'Butterfly = long-term skill track',
    'Butterfly is NOT a Block 1 exit criterion',
    'No small-circle Butterfly',
    'No sandbag',
    'After Day C: BLOCK 1 CLOSES',
    'Next: Block 2 — Performance Development + Gymnastics Development + Butterfly Skill Track + Conditioning Repeatability',
  ],

  days: [
    {
      id: 'block-1-week-9-day-a',
      day: 'DAY A',
      title:
        'Snatch + Weighted Pull + Back Squat + Metcon',
      duration: '70 min — COMPLETED',
      focus:
        'Snatch Technique · Weighted Strict Pull · Back Squat · Conditioning',
      purpose:
        'Confirm the established Squat Snatch pattern, open the weighted strict pulling phase, maintain squat strength and establish the main conditioning development target for Block 2.',

      sections: [
        {
          id: 'w9-a-warm-up',
          title: 'Warm-up',
          items: [
            '2 Rounds:',
            '250 m Row',
            '8 Walking Lunge',
            '8 Air Squat',
            '8 Scap Pull-Up',
            '8 PVC OHS',
            '8 PVC Snatch',
            'Empty Bar:',
            '5 Snatch Grip RDL',
            '5 Muscle Snatch',
            '5 High-Hang Squat Snatch',
            '5 OHS',
          ],
        },

        {
          id: 'w9-a-snatch-primer',
          title: 'Snatch Technical Primer',
          items: [
            'Muscle Snatch',
            '2×3 @25–30 kg',
            'Snatch High Pull',
            '2×3 @40–45 kg',
            'Tall Snatch',
            '2×2 @30 kg',
            'Drop Snatch',
            '2×2 @30–35 kg',
            'CUE:',
            'CLOSE → FINISH → UNDER',
          ],
        },

        {
          id: 'w9-a-squat-snatch',
          title: 'Squat Snatch',
          items: [
            '1RM = 67 kg',
            '2×1 @45 kg',
            '2×1 @47.5 kg',
            '2×1 @50 kg',
            '2×1 @52.5 kg',
            '55 kg optional:',
            'NOT DONE',
            'RESULT:',
            'Loads comfortable',
            'RPE 7.3',
            'Full/Squat Snatch pattern good',
            'First Pull good',
            'Speed under good',
            'Deep catch / overhead stability good',
            'CURRENT REFINEMENT:',
            'Slight early arm bend',
            'Slight forward bar loop',
            'Catch synchronization refinement',
            'STATUS:',
            'BLOCK 1 PATTERN GOAL = PASS',
          ],
        },

        {
          id: 'w9-a-weighted-pull',
          title:
            'Weighted Dead-Stop Strict Pull-Up',
          items: [
            'Originally scheduled for Day B, but completed on Day A due to no grips for Butterfly.',
            '3×3 @BW +2.5 kg',
            '2×3 @BW +5 kg',
            'TOTAL:',
            '15/15 weighted reps',
            'STANDARD:',
            'Dead-stop',
            'Full elbow extension',
            'Approx. 2 sec bottom reset',
            'No kip',
            'Chin over bar',
            'NOTE:',
            'No additional weighted pulling on Day B.',
          ],
        },

        {
          id: 'w9-a-back-squat',
          title: 'Strength — Back Squat',
          items: [
            'ACTUAL:',
            '4×4 @90 kg',
            'Full depth',
            'RPE: 7.8',
            'Last Set: NORMAL',
            'RESULT:',
            'Strength maintained/progressing.',
          ],
        },

        {
          id: 'w9-a-metcon',
          title: 'Metcon',
          items: [
            '4 ROUNDS FOR TIME',
            '12/10 cal BikeErg',
            '10 Alternating DB Snatch @22.5 kg',
            '12 Box Jump Over @24"',
            '10 Wall Ball @9 kg',
            'RESULT:',
            'TIME: 12:51',
            'RPE: ~9',
            'All 4 rounds completed.',
            'Psychological urge to stop appeared after Round 2, but workout was completed.',
            'Main Limiter:',
            'BJO → breathing',
            'Estimated pacing:',
            'Round 1 approximately 2:35',
            'Then pace likely deteriorated each round.',
            'IMPORTANT BLOCK 2 TARGET:',
            'REPEATABILITY > OPENING SPEED',
          ],
        },

        {
          id: 'w9-a-accessory',
          title: 'Accessory — Optional',
          items: [
            'OPTIONAL',
          ],
        },

        {
          id: 'w9-a-session-data',
          title: 'Day A Session Data',
          items: [
            'TOTAL TIME: 70 min',
            'GENERAL RPE: 7',
            'ENERGY: 7',
            'SLEEP: 7.5',
            'RECOVERY: 8',
            'PAIN: NONE',
          ],
        },
      ],
    },

    {
      id: 'block-1-week-9-day-b',
      day: 'DAY B',
      title:
        'Clean + Butterfly + Front Squat + Threshold',
      duration: '75–85 min',
      focus:
        'Clean Technique · Butterfly Skill · Front Squat · Threshold · Repeatability',
      purpose:
        'Confirm Clean consistency, continue Butterfly as a long-term skill track, maintain Front Squat strength and establish repeatability under threshold conditioning.',

      sections: [
        {
          id: 'w9-b-rules',
          title: 'Day B Rules',
          items: [
            'GENERAL RPE: 7–8',
            'NO WEIGHTED STRICT PULL-UP TODAY.',
          ],
        },

        {
          id: 'w9-b-warm-up',
          title: 'Warm-up',
          duration: '8–10 min',
          items: [
            '2 Rounds:',
            '250 m BikeErg',
            '8 Cossack Squat',
            '8 Front Rack Walking Lunge',
            '8 Scap Pull-Up',
            '10 Band Pull-Apart',
            'Empty Bar:',
            '5 Clean Deadlift',
            '5 Clean High Pull',
            '5 Tall Clean',
            '5 Front Squat',
            '5 High-Hang Squat Clean',
          ],
        },

        {
          id: 'w9-b-clean-primer',
          title: 'Clean Technical Primer',
          items: [
            'A) Tall Clean',
            '2×2 @40 kg',
            'FOCUS:',
            'Fast elbows + direct Squat Catch',

            'B) Clean High Pull',
            '2×3 @50 kg',
            'FOCUS:',
            'LONG ARMS → FINISH',
            'Bar close.',
            'Do not deliberately pull higher.',

            'C) High-Hang Squat Clean',
            '2×2 @50 kg',
            'FOCUS:',
            'FINISH → FAST UNDER',
          ],
        },

        {
          id: 'w9-b-squat-clean',
          title: 'Squat Clean',
          items: [
            '1RM = 90 kg',
            '2×1 @60 kg',
            '2×1 @65 kg',
            '2×1 @67.5 kg',
            '2×1 @70 kg',
            'IF 70 kg IS CLEAN:',
            'OPTIONAL:',
            '1×1 @72.5 kg',
            '≈81%',
            'REST:',
            '90–120 sec',
            'RPE CAP:',
            '8',
            'MAIN CUE:',
            'LONG ARMS → FINISH → UNDER',
            'QUALITY CRITERIA:',
            'Direct Squat Clean',
            'No Power Catch + Front Squat',
            'Full extension',
            'Arms stay long through extension',
            'Bar stays close',
            'Fast elbows',
            'Stable bottom',
            'IF:',
            'Early arm bend / forward bar path significantly deteriorates',
            'THEN:',
            'Stop at 70 kg.',
            'No additional heavy attempts.',
          ],
        },

        {
          id: 'w9-b-butterfly',
          title: 'Butterfly — Skill Track',
          items: [
            'A) Straight-Arm Kip Swing',
            '2×6',

            'B) Butterfly Pull-Up',
            '5×3',

            'REST:',
            '45–60 sec',

            'ONLY CUE:',
            'LONG + RHYTHM',

            'If all 5 sets are technically clean:',
            'OPTIONAL:',
            '1×5–8',

            'NO:',
            'Max-rep attempt',
            'Small-circle drill',
            'Excessive technical cues',

            'STOP IF:',
            'Rhythm disappears',
            'Pull becomes arm-dominant',
            'Early arm bend becomes excessive',
            'Legs significantly disconnect',

            'VIDEO:',
            'Record at least ONE set from the side if possible.',
            'Do the movement naturally.',
            'Do NOT alter technique for the camera.',
          ],
        },

        {
          id: 'w9-b-front-squat',
          title: 'Strength — Front Squat',
          items: [
            '4×4 @80 kg',
            'Rest: 2:00–2:30',
            'Target RPE: 7–7.5',
            'STANDARD:',
            'Full depth',
            'Upright torso',
            'Controlled descent',
            'Strong drive',
            'No grind',
          ],
        },

        {
          id: 'w9-b-metcon',
          title:
            'Metcon — Threshold + Repeatability',
          items: [
            'AMRAP 14',
            '10/8 cal Row',
            '8 Toes-to-Bar',
            '10 Wall Ball @9 kg',
            '8 Burpee Target Touch',

            'BURPEE STANDARD:',
            'Chest/thighs to floor',
            'Vertical jump',
            'Touch overhead target with BOTH hands',
            'Same target height throughout workout',

            'TARGET RPE: 8–8.5',

            'PACING — MIN 0–3:',
            'CONTROL.',
            'Do NOT chase a fast first round.',

            'PACING — MIN 3–11:',
            'Sustainable pace.',
            'Row: Strong but submaximal',
            'T2B: 8 UB if sustainable',
            'Wall Ball: 10 UB if sustainable',
            'Burpee: Steady cadence',

            'PACING — MIN 11–14:',
            'If quality remains:',
            'INCREASE OUTPUT.',

            'MAIN TARGET:',
            'REPEATABLE ROUNDS',
            'NOT:',
            'FASTEST POSSIBLE ROUND 1',

            'NO VOLUNTARY STOP.',
            'You may slow.',
            'You may break sets.',
            'Unless pain / safety issue occurs:',
            'WORK UNTIL 14:00.',

            'LOG — TOTAL SCORE:',
            '_____ Rounds + _____ Reps',

            'ROUND SPLITS:',
            'R1: _____',
            'R2: _____',
            'R3: _____',
            'R4: _____',
            'R5: _____',
            'R6: _____',

            'T2B: ________________',
            'WALL BALL: ________________',
            'BURPEE: ________________',
            'FINAL 3 MIN: FASTER / SAME / SLOWER',
            'RPE: _____',
            'MAIN LIMITER: ________________',
          ],
        },

        {
          id: 'w9-b-accessory',
          title: 'Accessory — Optional',
          items: [
            '2 Rounds:',
            '10 GHD Sit-Up',
            '12 Face Pull',
            '10 DB Hammer Curl',
          ],
        },

        {
          id: 'w9-b-cooldown',
          title: 'Cool Down',
          items: [
            '5 min easy Bike / Walk',
            'Lat stretch',
            'Front rack stretch',
            'Hip flexor stretch',
            'Thoracic rotation',
          ],
        },
      ],
    },

    {
      id: 'block-1-week-9-day-c',
      day: 'DAY C',
      title:
        'Jerk + Butterfly + Push Press + Block Closing Metcon',
      duration: '75–85 min',
      focus:
        'Split Jerk · Butterfly Skill · Push Press · Block Closing Conditioning',
      purpose:
        'Confirm Jerk stability, continue Butterfly skill exposure, maintain Push Press strength and close Block 1 with a repeatability-focused mixed-modal metcon.',

      sections: [
        {
          id: 'w9-c-rules',
          title: 'Day C Rules',
          items: [
            'GENERAL RPE: 7–8',
          ],
        },

        {
          id: 'w9-c-warm-up',
          title: 'Warm-up',
          items: [
            '2 Rounds:',
            '200 m SkiErg',
            '8 Walking Lunge',
            '10 Scap Push-Up',
            '10 Band Pull-Apart',
            'Empty Bar:',
            '5 Strict Press',
            '5 Push Press',
            '5 Push Jerk',
            '5 Split Jerk',
          ],
        },

        {
          id: 'w9-c-jerk-primer',
          title: 'Jerk Technical Primer',
          items: [
            'A) Jerk Balance',
            '2×2 @40 kg',

            'B) Tall Jerk',
            '2×2 @40 kg',

            'C) Pause Split Jerk',
            '2×2 @50 kg',

            'CATCH HOLD:',
            '2 sec',
          ],
        },

        {
          id: 'w9-c-split-jerk',
          title: 'Split Jerk',
          items: [
            '2×2 @55 kg',
            '2×2 @60 kg',
            '2×1 @65 kg',

            'If 65 kg is technically stable:',
            'OPTIONAL:',
            '1×1 @67.5 kg',

            'C&J 1RM:',
            '80 kg',

            '65 kg ≈81%',
            '67.5 kg ≈84%',

            'RPE CAP:',
            '8',

            'QUALITY CRITERIA:',
            'Vertical dip',
            'Vertical drive',
            'Fast lockout',
            'Stable split',
            'Bar over midline',
            'Controlled recovery',
            'No press-out',
          ],
        },

        {
          id: 'w9-c-butterfly',
          title:
            'Butterfly — Skill Exposure 2',
          items: [
            'A) Straight-Arm Kip Swing',
            '1×6',

            'B) Butterfly Pull-Up',
            '4×4',

            'ONLY CUE:',
            'LONG + RHYTHM',

            'If technically clean:',
            'OPTIONAL:',
            '1×6–8',

            'STOP IF:',
            'Rhythm deteriorates.',

            'NO MAX-REP TEST.',
            'NO SMALL-CIRCLE.',
          ],
        },

        {
          id: 'w9-c-push-press',
          title: 'Strength — Push Press',
          items: [
            '4×4 @52.5 kg',
            'RPE CAP: 8',
            'If bar speed significantly deteriorates:',
            'Final set: 50 kg',
          ],
        },

        {
          id: 'w9-c-metcon',
          title: 'Block Closing Metcon',
          items: [
            '4 ROUNDS FOR TIME',

            '12/10 cal SkiErg',
            '8 Power Clean @45 kg',
            '10 Box Jump Over @24"',
            '8 Toes-to-Bar',

            'CAP: 16:00',
            'TARGET: 12–15 min',
            'TARGET RPE: 8–8.5',

            'POWER CLEAN:',
            'TnG allowed.',
            'Singles allowed if cycling quality deteriorates.',

            'T2B:',
            'Target: 8 UB',
            'If needed: 5 + 3',

            'PACING:',
            'Round 1: Controlled',
            'Round 2: Establish pace',
            'Round 3: Hold',
            'Round 4: Push if available',

            'PRIMARY TARGET:',
            'R4 pace should remain reasonably close to R1.',
            'Do NOT redline Round 1.',

            'LOG — TOTAL TIME:',
            '_____',

            'R1: _____',
            'R2: _____',
            'R3: _____',
            'R4: _____',

            'POWER CLEAN STRATEGY: ________________',
            'T2B BREAKDOWN: ________________',
            'RPE: _____',
            'MAIN LIMITER: ________________',
          ],
        },

        {
          id: 'w9-c-accessory',
          title: 'Accessory — Optional',
          items: [
            '2 Rounds:',
            '10 GHD Sit-Up',
            '10 DB Bench Press',
            '12 Band External Rotation',
          ],
        },

        {
          id: 'w9-c-cooldown',
          title: 'Cool Down',
          items: [
            '5 min easy movement',
            'Shoulder / lat / hip recovery',
          ],
        },

        {
          id: 'w9-c-scorecard-snatch',
          title: 'Block 1 Closing Scorecard — Snatch',
          items: [
            '1RM: 67 kg',
            'Technical Work: 52.5 kg ≈78%',
            'Pattern: PASS',
            'Direct Squat Snatch: PASS',
            'Speed Under: PASS',
            'Overhead Stability: PASS',
            'Remaining:',
            'Bar proximity',
            'Early arm bend',
            'Minor forward loop',
            'Catch synchronization refinement',
          ],
        },

        {
          id: 'w9-c-scorecard-clean',
          title: 'Block 1 Closing Scorecard — Clean',
          items: [
            '1RM: 90 kg',
            'TARGET THIS WEEK:',
            '70 kg: _____',
            '72.5 kg: _____',
            'Direct Squat Clean: _____',
            'Bar Path: _____',
            'Early Arm Bend: _____',
          ],
        },

        {
          id: 'w9-c-scorecard-pulling',
          title:
            'Block 1 Closing Scorecard — Strict Pulling',
          items: [
            'BW Dead-Stop:',
            '5×5 = 25/25',
            'Weighted:',
            '3×3 @+2.5 kg',
            '2×3 @+5 kg',
            'TOTAL: 15/15',
            'STATUS:',
            'WEIGHTED STRENGTH PHASE OPEN',
          ],
        },

        {
          id: 'w9-c-scorecard-back-squat',
          title:
            'Block 1 Closing Scorecard — Back Squat',
          items: [
            '1RM: ~110 kg',
            'FINAL WEEK:',
            '4×4 @90 kg',
            'RPE 7.8',
            'Full Depth',
            'STATUS:',
            'PROGRESSING',
          ],
        },

        {
          id: 'w9-c-scorecard-front-squat',
          title:
            'Block 1 Closing Scorecard — Front Squat',
          items: [
            '1RM: ~105 kg',
            'THIS WEEK:',
            '4×4 @80 kg',
            'RESULT: _____',
          ],
        },

        {
          id: 'w9-c-scorecard-jerk',
          title: 'Block 1 Closing Scorecard — Jerk',
          items: [
            'C&J 1RM: 80 kg',
            'THIS WEEK:',
            '65 kg: _____',
            '67.5 kg: _____',
            'STABILITY: _____',
          ],
        },

        {
          id: 'w9-c-scorecard-butterfly',
          title:
            'Block 1 Closing Scorecard — Butterfly',
          items: [
            'STATUS:',
            'LONG-TERM SKILL TRACK',
            'NOT A BLOCK 1 EXIT GATE',
            'THIS WEEK:',
            'DAY B: _____',
            'DAY C: _____',
            'VIDEO: YES / NO',
            'MAIN TECHNICAL ISSUE: _____',
          ],
        },

        {
          id: 'w9-c-scorecard-conditioning',
          title:
            'Block 1 Closing Scorecard — Conditioning',
          items: [
            'DAY A:',
            '4R FT — Bike + DB Snatch + BJO + WB',
            'TIME: 12:51',
            'Completed: YES',
            'Main Limiter: BJO → Breathing',
            'Primary Development Need:',
            'PACE REPEATABILITY',

            'DAY B:',
            'AMRAP 14',
            'Score: _____',
            'Pace Decay: _____',
            'Main Limiter: _____',

            'DAY C:',
            '4R FT',
            'Time: _____',
            'Pace Decay: _____',
            'Main Limiter: _____',
          ],
        },

        {
          id: 'w9-c-block-close',
          title: 'Block 1 Final Objective',
          items: [
            'This week is NOT a PR week.',
            'We are confirming:',
            '1. Olympic patterns are established.',
            '2. Squat strength has progressed.',
            '3. Weighted pulling can begin.',
            '4. Conditioning capacity is present.',
            '5. Repeatability needs further development.',
            '6. Butterfly continues independently as a skill track.',
            'After Day C:',
            'BLOCK 1 CLOSES.',
            'NEXT:',
            'BLOCK 2',
            'PERFORMANCE DEVELOPMENT',
            '+',
            'GYMNASTICS DEVELOPMENT',
            '+',
            'BUTTERFLY SKILL TRACK',
            '+',
            'CONDITIONING REPEATABILITY',
          ],
        },
      ],
    },
  ],
};

export default block1Week9;
