import {
  useEffect,
  useRef,
  useState
} from 'react';
import type { CSSProperties } from 'react';
import './Timer.css';

type TimerMode = 'amrap' | 'emom' | 'fortime';

type TimerPhase =
  | 'idle'
  | 'preparing'
  | 'running'
  | 'paused'
  | 'finished';

interface TimerProps {
  onBack: () => void;
}

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

interface WakeLockSentinelLike {
  release: () => Promise<void>;
}



const pad = (value: number) =>
  value.toString().padStart(2, '0');

const formatTime = (totalSeconds: number) => {
  const safeSeconds = Math.max(
    0,
    Math.floor(totalSeconds)
  );

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${pad(minutes)}:${pad(seconds)}`;
};

export default function Timer({
  onBack
}: TimerProps) {
  const [mode, setMode] =
    useState<TimerMode>('amrap');

  const [phase, setPhase] =
    useState<TimerPhase>('idle');

  const [amrapMinutes, setAmrapMinutes] =
    useState(12);

  const [
    emomIntervalMinutes,
    setEmomIntervalMinutes
  ] = useState(1);

  const [emomRounds, setEmomRounds] =
    useState(10);

  const [timeCapMinutes, setTimeCapMinutes] =
    useState(15);

  const [prepTime, setPrepTime] =
    useState(10);

  const [prepRemaining, setPrepRemaining] =
    useState(10);

  const [remainingSeconds, setRemainingSeconds] =
    useState(12 * 60);

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  const [currentRound, setCurrentRound] =
    useState(1);

  const [showGoOverlay, setShowGoOverlay] =
    useState(false);

  const [roundOverlay, setRoundOverlay] =
    useState<number | null>(null);

  const [showTimeOverlay, setShowTimeOverlay] =
    useState(false);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const wakeLockRef =
    useRef<WakeLockSentinelLike | null>(null);

  const prepIntervalRef =
    useRef<number | null>(null);

  const timerIntervalRef =
    useRef<number | null>(null);

  const phaseRef = useRef<TimerPhase>('idle');
  const elapsedRef = useRef(0);
  const remainingRef = useRef(12 * 60);
  const currentRoundRef = useRef(1);

  const totalDuration =
    mode === 'amrap'
      ? amrapMinutes * 60
      : mode === 'emom'
        ? emomIntervalMinutes *
          60 *
          emomRounds
        : timeCapMinutes * 60;

  const emomIntervalSeconds =
    emomIntervalMinutes * 60;

  const isLocked =
    phase === 'preparing' ||
    phase === 'running' ||
    phase === 'paused';

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    remainingRef.current = remainingSeconds;
  }, [remainingSeconds]);

  useEffect(() => {
    currentRoundRef.current = currentRound;
  }, [currentRound]);

  const clearPrepInterval = () => {
    if (prepIntervalRef.current !== null) {
      window.clearInterval(
        prepIntervalRef.current
      );

      prepIntervalRef.current = null;
    }
  };

  const clearTimerInterval = () => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(
        timerIntervalRef.current
      );

      timerIntervalRef.current = null;
    }
  };

  const vibrate = (
    pattern: number | number[]
  ) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const getAudioContext =
    async (): Promise<AudioContext | null> => {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as WindowWithWebkitAudio
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      if (!audioContextRef.current) {
        audioContextRef.current =
          new AudioContextClass();
      }

      const context =
        audioContextRef.current;

      if (context.state === 'suspended') {
        try {
          await context.resume();
        } catch (error) {
          console.error(
            'Audio context could not start:',
            error
          );
        }
      }

      return context;
    };

  const unlockAudio = async () => {
    const context =
      await getAudioContext();

    if (!context) {
      return;
    }

    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    gain.gain.value = 0.0001;

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(
      context.currentTime
    );

    oscillator.stop(
      context.currentTime + 0.03
    );
  };

  const playTone = async (
    frequency: number,
    duration: number,
    volume: number
  ) => {
    const context =
      await getAudioContext();

    if (
      !context ||
      context.state !== 'running'
    ) {
      return;
    }

    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    const startTime =
      context.currentTime;

    const endTime =
      startTime + duration;

    oscillator.type = 'square';

    oscillator.frequency.setValueAtTime(
      frequency,
      startTime
    );

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );

    gain.gain.exponentialRampToValueAtTime(
      Math.max(volume, 0.001),
      startTime + 0.015
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      endTime
    );

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
  };

  const playCountdownSound = async () => {
    await playTone(880, 0.16, 0.7);
    vibrate(80);
  };

  const playGoSound = async () => {
    await playTone(1200, 0.6, 0.85);
    vibrate([120, 60, 180]);
  };

  const playRoundSound = async () => {
    await playTone(950, 0.16, 0.75);

    window.setTimeout(() => {
      void playTone(
        1200,
        0.24,
        0.85
      );
    }, 170);

    vibrate([90, 50, 90]);
  };

  const playFinishSound = async () => {
    await playTone(750, 0.2, 0.75);

    window.setTimeout(() => {
      void playTone(
        950,
        0.2,
        0.8
      );
    }, 220);

    window.setTimeout(() => {
      void playTone(
        1200,
        0.65,
        0.9
      );
    }, 440);

    vibrate([
      160,
      70,
      160,
      70,
      250
    ]);
  };

  const requestWakeLock = async () => {
    if (!('wakeLock' in navigator)) {
      return;
    }
  
    try {
      wakeLockRef.current =
        await navigator.wakeLock.request('screen');
    } catch (error) {
      console.warn(
        'Wake lock unavailable:',
        error
      );
    }
  };

  const releaseWakeLock = async () => {
    if (!wakeLockRef.current) {
      return;
    }

    try {
      await wakeLockRef.current.release();
    } catch (error) {
      console.warn(
        'Wake lock release failed:',
        error
      );
    }

    wakeLockRef.current = null;
  };

  const showRoundOverlay = (
    round: number
  ) => {
    setRoundOverlay(round);
    void playRoundSound();

    window.setTimeout(() => {
      setRoundOverlay(null);
    }, 1000);
  };

  const finishWorkout = () => {
    if (
      phaseRef.current === 'finished'
    ) {
      return;
    }

    clearTimerInterval();

    phaseRef.current = 'finished';
    setPhase('finished');

    setShowTimeOverlay(true);

    void playFinishSound();
    void releaseWakeLock();

    window.setTimeout(() => {
      setShowTimeOverlay(false);
    }, 1600);
  };

  const timerTick = () => {
    if (
      phaseRef.current !== 'running'
    ) {
      return;
    }

    const nextElapsed =
      elapsedRef.current + 1;

    elapsedRef.current = nextElapsed;
    setElapsedSeconds(nextElapsed);

    if (mode === 'fortime') {
      const nextRemaining = Math.max(
        0,
        totalDuration - nextElapsed
      );

      remainingRef.current =
        nextRemaining;

      setRemainingSeconds(
        nextRemaining
      );

      if (nextRemaining <= 0) {
        finishWorkout();
      }

      return;
    }

    const nextRemaining = Math.max(
      0,
      totalDuration - nextElapsed
    );

    remainingRef.current =
      nextRemaining;

    setRemainingSeconds(
      nextRemaining
    );

    if (mode === 'emom') {
      const calculatedRound =
        Math.floor(
          nextElapsed /
            emomIntervalSeconds
        ) + 1;

      if (
        calculatedRound >
          currentRoundRef.current &&
        calculatedRound <=
          emomRounds
      ) {
        currentRoundRef.current =
          calculatedRound;

        setCurrentRound(
          calculatedRound
        );

        showRoundOverlay(
          calculatedRound
        );
      }
    }

    if (nextRemaining <= 0) {
      finishWorkout();
    }
  };

  const beginWorkout = () => {
    clearPrepInterval();
    clearTimerInterval();

    elapsedRef.current = 0;
    remainingRef.current =
      totalDuration;

    currentRoundRef.current = 1;

    setElapsedSeconds(0);
    setRemainingSeconds(
      totalDuration
    );

    setCurrentRound(1);

    phaseRef.current = 'running';
    setPhase('running');

    setShowGoOverlay(true);

    void playGoSound();
    void requestWakeLock();

    window.setTimeout(() => {
      setShowGoOverlay(false);
    }, 900);

    timerIntervalRef.current =
      window.setInterval(
        timerTick,
        1000
      );
  };

  const startPreparation = async () => {
    await unlockAudio();

    clearPrepInterval();
    clearTimerInterval();

    let countdown = prepTime;

    setPrepRemaining(countdown);

    phaseRef.current = 'preparing';
    setPhase('preparing');

    setShowGoOverlay(false);
    setRoundOverlay(null);
    setShowTimeOverlay(false);

    prepIntervalRef.current =
      window.setInterval(() => {
        countdown -= 1;

        setPrepRemaining(countdown);

        if (
          countdown <= 3 &&
          countdown > 0
        ) {
          void playCountdownSound();
        }

        if (countdown <= 0) {
          beginWorkout();
        }
      }, 1000);
  };

  const togglePause = async () => {
    await unlockAudio();

    if (
      phaseRef.current === 'running'
    ) {
      phaseRef.current = 'paused';
      setPhase('paused');

      void releaseWakeLock();
      return;
    }

    if (
      phaseRef.current === 'paused'
    ) {
      phaseRef.current = 'running';
      setPhase('running');

      void requestWakeLock();
    }
  };

  const resetTimer = () => {
    clearPrepInterval();
    clearTimerInterval();

    phaseRef.current = 'idle';
    elapsedRef.current = 0;
    remainingRef.current =
      totalDuration;

    currentRoundRef.current = 1;

    setPhase('idle');
    setElapsedSeconds(0);

    setRemainingSeconds(
      totalDuration
    );

    setCurrentRound(1);
    setPrepRemaining(prepTime);

    setShowGoOverlay(false);
    setRoundOverlay(null);
    setShowTimeOverlay(false);

    void releaseWakeLock();
  };

  const cancelPreparation = () => {
    clearPrepInterval();

    phaseRef.current = 'idle';
    setPhase('idle');

    setPrepRemaining(prepTime);
  };

  const changeMode = (
    newMode: TimerMode
  ) => {
    clearPrepInterval();
    clearTimerInterval();

    setMode(newMode);

    phaseRef.current = 'idle';
    setPhase('idle');

    setElapsedSeconds(0);
    setCurrentRound(1);
  };

  useEffect(() => {
    if (phaseRef.current !== 'idle') {
      return;
    }

    elapsedRef.current = 0;
    remainingRef.current =
      totalDuration;

    setElapsedSeconds(0);

    setRemainingSeconds(
      totalDuration
    );

    setCurrentRound(1);
    currentRoundRef.current = 1;
  }, [
    totalDuration,
    mode
  ]);

  useEffect(() => {
    if (phase === 'idle') {
      setPrepRemaining(prepTime);
    }
  }, [prepTime, phase]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
          'visible' &&
        phaseRef.current === 'running'
      ) {
        void requestWakeLock();
        void getAudioContext();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, []);

  useEffect(() => {
    return () => {
      clearPrepInterval();
      clearTimerInterval();

      void releaseWakeLock();

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const displayedSeconds =
    mode === 'fortime'
      ? elapsedSeconds
      : remainingSeconds;

  const progressPercent =
    totalDuration > 0
      ? mode === 'fortime'
        ? Math.min(
            100,
            (elapsedSeconds /
              totalDuration) *
              100
          )
        : Math.min(
            100,
            ((totalDuration -
              remainingSeconds) /
              totalDuration) *
              100
          )
      : 0;

  const ringStyle = {
    '--timer-progress':
      `${progressPercent * 3.6}deg`
  } as CSSProperties;

  const emomRoundRemaining =
    emomIntervalSeconds -
    (elapsedSeconds %
      emomIntervalSeconds);

  const statusText = (() => {
    if (phase === 'finished') {
      return 'FINISHED';
    }

    if (phase === 'paused') {
      return 'PAUSED';
    }

    if (phase === 'running') {
      if (mode === 'emom') {
        return `ROUND ${currentRound} / ${emomRounds}`;
      }

      if (mode === 'fortime') {
        return 'FOR TIME';
      }

      return 'AMRAP';
    }

    return 'READY';
  })();

  return (
    <div className="forge-timer-page">
      <header className="forge-timer-header">
        <button
          type="button"
          className="forge-timer-back"
          onClick={onBack}
          aria-label="Back"
        >
          ←
        </button>

        <div className="forge-timer-title">
          <span>FORGE PERFORMANCE</span>
          <h1>TIMER</h1>
        </div>
      </header>

      <div className="forge-timer-tabs">
        <button
          type="button"
          className={
            mode === 'amrap'
              ? 'active'
              : ''
          }
          disabled={isLocked}
          onClick={() =>
            changeMode('amrap')
          }
        >
          AMRAP
        </button>

        <button
          type="button"
          className={
            mode === 'emom'
              ? 'active'
              : ''
          }
          disabled={isLocked}
          onClick={() =>
            changeMode('emom')
          }
        >
          ExMOM
        </button>

        <button
          type="button"
          className={
            mode === 'fortime'
              ? 'active'
              : ''
          }
          disabled={isLocked}
          onClick={() =>
            changeMode('fortime')
          }
        >
          FOR TIME
        </button>
      </div>

      {phase === 'idle' && (
        <section className="forge-timer-settings">
          {mode === 'amrap' && (
            <div className="forge-timer-card">
              <span className="forge-timer-card-label">
                AMRAP DURATION
              </span>

              <div className="forge-timer-stepper">
                <button
                  type="button"
                  onClick={() =>
                    setAmrapMinutes(
                      Math.max(
                        1,
                        amrapMinutes - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <strong>
                  {amrapMinutes} MIN
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setAmrapMinutes(
                      Math.min(
                        99,
                        amrapMinutes + 1
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          )}

          {mode === 'emom' && (
            <>
              <div className="forge-timer-card">
                <span className="forge-timer-card-label">
                  INTERVAL
                </span>

                <div className="forge-timer-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      setEmomIntervalMinutes(
                        Math.max(
                          1,
                          emomIntervalMinutes -
                            1
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    E
                    {
                      emomIntervalMinutes
                    }
                    MOM
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEmomIntervalMinutes(
                        Math.min(
                          10,
                          emomIntervalMinutes +
                            1
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="forge-timer-card">
                <span className="forge-timer-card-label">
                  TOTAL ROUNDS
                </span>

                <div className="forge-timer-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      setEmomRounds(
                        Math.max(
                          1,
                          emomRounds - 1
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    {emomRounds} ROUNDS
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEmomRounds(
                        Math.min(
                          99,
                          emomRounds + 1
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          {mode === 'fortime' && (
            <div className="forge-timer-card">
              <span className="forge-timer-card-label">
                TIME CAP
              </span>

              <div className="forge-timer-stepper">
                <button
                  type="button"
                  onClick={() =>
                    setTimeCapMinutes(
                      Math.max(
                        1,
                        timeCapMinutes - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <strong>
                  {timeCapMinutes} MIN
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setTimeCapMinutes(
                      Math.min(
                        99,
                        timeCapMinutes + 1
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="forge-timer-card">
            <span className="forge-timer-card-label">
              PREPARATION
            </span>

            <div className="forge-timer-prep-options">
              {[5, 10, 15].map(
                seconds => (
                  <button
                    key={seconds}
                    type="button"
                    className={
                      prepTime === seconds
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setPrepTime(seconds)
                    }
                  >
                    {seconds} SEC
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      <section className="forge-timer-display">
        <div
          className="forge-timer-ring"
          style={ringStyle}
        >
          <div className="forge-timer-ring-inner">
            {phase === 'preparing' ? (
              <>
                <span className="forge-timer-status">
                  GET READY
                </span>

                <strong className="forge-timer-prep-number">
                  {prepRemaining}
                </strong>
              </>
            ) : (
              <>
                <span className="forge-timer-status">
                  {statusText}
                </span>

                <strong className="forge-timer-time">
                  {formatTime(
                    displayedSeconds
                  )}
                </strong>

                {mode === 'emom' &&
                  phase !== 'idle' && (
                    <span className="forge-timer-subtime">
                      NEXT ROUND IN{' '}
                      {formatTime(
                        emomRoundRemaining
                      )}
                    </span>
                  )}

                {mode ===
                  'fortime' &&
                  phase !== 'idle' && (
                    <span className="forge-timer-subtime">
                      CAP REMAINING{' '}
                      {formatTime(
                        remainingSeconds
                      )}
                    </span>
                  )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="forge-timer-controls">
        {phase === 'idle' && (
          <button
            type="button"
            className="forge-timer-primary"
            onClick={() =>
              void startPreparation()
            }
          >
            START
          </button>
        )}

        {phase === 'preparing' && (
          <button
            type="button"
            className="forge-timer-secondary"
            onClick={cancelPreparation}
          >
            CANCEL
          </button>
        )}

        {(phase === 'running' ||
          phase === 'paused') && (
          <>
            <button
              type="button"
              className="forge-timer-primary"
              onClick={() =>
                void togglePause()
              }
            >
              {phase === 'paused'
                ? 'RESUME'
                : 'PAUSE'}
            </button>

            {mode === 'fortime' && (
              <button
                type="button"
                className="forge-timer-finish"
                onClick={finishWorkout}
              >
                FINISH
              </button>
            )}

            <button
              type="button"
              className="forge-timer-secondary"
              onClick={resetTimer}
            >
              RESET
            </button>
          </>
        )}

        {phase === 'finished' && (
          <button
            type="button"
            className="forge-timer-primary"
            onClick={resetTimer}
          >
            NEW TIMER
          </button>
        )}
      </section>

      {showGoOverlay && (
        <div className="forge-timer-overlay forge-go-overlay">
          <strong>GO</strong>
        </div>
      )}

      {roundOverlay !== null && (
        <div className="forge-timer-overlay forge-round-overlay">
          <span>ROUND</span>
          <strong>
            {roundOverlay}
          </strong>
        </div>
      )}

      {showTimeOverlay && (
        <div className="forge-timer-overlay forge-time-overlay">
          <strong>TIME</strong>
        </div>
      )}
    </div>
  );
}