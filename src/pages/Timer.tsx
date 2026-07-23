import { useEffect, useRef, useState } from 'react';

type TimerMode = 'amrap' | 'emom' | 'fortime';

interface TimerProps {
  onBack: () => void;
}

interface WakeLockSentinelLike {
  release: () => Promise<void>;
  addEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
}

interface NavigatorWithWakeLock extends Navigator {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinelLike>;
  };
}

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

const pad = (value: number) => value.toString().padStart(2, '0');

const formatTime = (totalSeconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${pad(minutes)}:${pad(seconds)}`;
};

export default function Timer({ onBack }: TimerProps) {
  const [mode, setMode] = useState<TimerMode>('amrap');

  // AMRAP
  const [amrapMinutes, setAmrapMinutes] = useState(12);

  // ExMOM
  const [emomIntervalMinutes, setEmomIntervalMinutes] = useState(1);
  const [emomRounds, setEmomRounds] = useState(10);

  // For Time
  const [timeCapMinutes, setTimeCapMinutes] = useState(15);

  // Preparation
  const [prepTime, setPrepTime] = useState(10);
  const [prepRemaining, setPrepRemaining] = useState(10);
  const [preparing, setPreparing] = useState(false);

  // Timer state
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  // Overlays
  const [showGoOverlay, setShowGoOverlay] = useState(false);
  const [roundOverlay, setRoundOverlay] = useState<number | null>(null);
  const [showTimeOverlay, setShowTimeOverlay] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null);

  const timerIntervalRef = useRef<number | null>(null);
  const prepIntervalRef = useRef<number | null>(null);

  const runningRef = useRef(false);
  const pausedRef = useRef(false);
  const finishedRef = useRef(false);

  const elapsedRef = useRef(0);
  const remainingRef = useRef(0);
  const currentRoundRef = useRef(1);

  const totalDuration =
    mode === 'amrap'
      ? amrapMinutes * 60
      : mode === 'emom'
        ? emomIntervalMinutes * 60 * emomRounds
        : timeCapMinutes * 60;

  const emomIntervalSeconds = emomIntervalMinutes * 60;

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    finishedRef.current = finished;
  }, [finished]);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    remainingRef.current = remainingSeconds;
  }, [remainingSeconds]);

  useEffect(() => {
    currentRoundRef.current = currentRound;
  }, [currentRound]);

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const getAudioContext = async (): Promise<AudioContext | null> => {
    const AudioContextClass =
      window.AudioContext ||
      (window as WindowWithWebkitAudio).webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;

    if (context.state === 'suspended') {
      try {
        await context.resume();
      } catch (error) {
        console.error('AudioContext resume failed:', error);
      }
    }

    return context;
  };

  const unlockAudio = async () => {
    const context = await getAudioContext();

    if (!context) {
      return;
    }

    // iOS ses motorunu kullanıcı dokunuşuyla aktive etmek için
    // çok kısa, duyulmayacak seviyede bir ses çalıyoruz.
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = 440;
    gain.gain.value = 0.0001;

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.03);
  };

  const playTone = async (
    frequency: number,
    duration: number,
    volume: number,
    type: OscillatorType = 'sine'
  ) => {
    const context = await getAudioContext();

    if (!context || context.state !== 'running') {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    const startTime = context.currentTime;
    const endTime = startTime + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(
      Math.max(volume, 0.001),
      startTime + 0.015
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
  };

  const playCountdownBeep = async () => {
    await playTone(900, 0.18, 0.9, 'square');
    vibrate(90);
  };

  const playGoSound = async () => {
    await playTone(1200, 0.65, 1, 'square');
    vibrate([120, 70, 180]);
  };

  const playRoundSound = async () => {
    await playTone(1050, 0.22, 0.9, 'square');

    window.setTimeout(() => {
      void playTone(1250, 0.28, 1, 'square');
    }, 220);

    vibrate([100, 60, 100]);
  };

  const playFinishSound = async () => {
    await playTone(750, 0.22, 0.9, 'square');

    window.setTimeout(() => {
      void playTone(950, 0.22, 0.95, 'square');
    }, 230);

    window.setTimeout(() => {
      void playTone(1200, 0.7, 1, 'square');
    }, 460);

    vibrate([180, 80, 180, 80, 300]);
  };

  const requestWakeLock = async () => {
    const nav = navigator as NavigatorWithWakeLock;

    if (!nav.wakeLock) {
      return;
    }

    try {
      wakeLockRef.current = await nav.wakeLock.request('screen');
    } catch (error) {
      console.warn('Wake Lock could not be enabled:', error);
    }
  };

  const releaseWakeLock = async () => {
    if (!wakeLockRef.current) {
      return;
    }

    try {
      await wakeLockRef.current.release();
    } catch (error) {
      console.warn('Wake Lock release failed:', error);
    } finally {
      wakeLockRef.current = null;
    }
  };

  const clearTimerInterval = () => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const clearPrepInterval = () => {
    if (prepIntervalRef.current !== null) {
      window.clearInterval(prepIntervalRef.current);
      prepIntervalRef.current = null;
    }
  };

  const finishWorkout = () => {
    if (finishedRef.current) {
      return;
    }

    clearTimerInterval();

    finishedRef.current = true;
    runningRef.current = false;
    pausedRef.current = false;

    setRunning(false);
    setPaused(false);
    setFinished(true);

    setShowTimeOverlay(true);
    void playFinishSound();
    void releaseWakeLock();

    window.setTimeout(() => {
      setShowTimeOverlay(false);
    }, 1800);
  };

  const showRound = (round: number) => {
    setRoundOverlay(round);
    void playRoundSound();

    window.setTimeout(() => {
      setRoundOverlay(null);
    }, 1200);
  };

  const runTimerTick = () => {
    if (
      !runningRef.current ||
      pausedRef.current ||
      finishedRef.current
    ) {
      return;
    }

    const nextElapsed = elapsedRef.current + 1;

    elapsedRef.current = nextElapsed;
    setElapsedSeconds(nextElapsed);

    if (mode === 'fortime') {
      const nextRemaining = Math.max(
        0,
        timeCapMinutes * 60 - nextElapsed
      );

      remainingRef.current = nextRemaining;
      setRemainingSeconds(nextRemaining);

      if (nextRemaining <= 0) {
        finishWorkout();
      }

      return;
    }

    const nextRemaining = Math.max(0, totalDuration - nextElapsed);

    remainingRef.current = nextRemaining;
    setRemainingSeconds(nextRemaining);

    if (mode === 'emom') {
      const calculatedRound =
        Math.floor(nextElapsed / emomIntervalSeconds) + 1;

      if (
        calculatedRound > currentRoundRef.current &&
        calculatedRound <= emomRounds
      ) {
        currentRoundRef.current = calculatedRound;
        setCurrentRound(calculatedRound);
        showRound(calculatedRound);
      }
    }

    if (nextRemaining <= 0) {
      finishWorkout();
    }
  };

  const beginWorkout = () => {
    clearTimerInterval();

    elapsedRef.current = 0;
    remainingRef.current = totalDuration;
    currentRoundRef.current = 1;

    runningRef.current = true;
    pausedRef.current = false;
    finishedRef.current = false;

    setElapsedSeconds(0);
    setRemainingSeconds(totalDuration);
    setCurrentRound(1);

    setPreparing(false);
    setRunning(true);
    setPaused(false);
    setFinished(false);

    setShowGoOverlay(true);
    void playGoSound();
    void requestWakeLock();

    window.setTimeout(() => {
      setShowGoOverlay(false);
    }, 1000);

    timerIntervalRef.current = window.setInterval(
      runTimerTick,
      1000
    );
  };

  const startPreparation = async () => {
    await unlockAudio();

    clearPrepInterval();
    clearTimerInterval();

    const initialPrep = prepTime;

    setPreparing(true);
    setRunning(false);
    setPaused(false);
    setFinished(false);

    setPrepRemaining(initialPrep);
    setShowGoOverlay(false);
    setRoundOverlay(null);
    setShowTimeOverlay(false);

    let currentPrep = initialPrep;

    prepIntervalRef.current = window.setInterval(() => {
      currentPrep -= 1;
      setPrepRemaining(currentPrep);

      if (currentPrep <= 3 && currentPrep > 0) {
        void playCountdownBeep();
      }

      if (currentPrep <= 0) {
        clearPrepInterval();
        beginWorkout();
      }
    }, 1000);
  };

  const togglePause = async () => {
    await unlockAudio();

    const nextPaused = !pausedRef.current;

    pausedRef.current = nextPaused;
    setPaused(nextPaused);

    if (nextPaused) {
      void releaseWakeLock();
    } else {
      void requestWakeLock();
    }
  };

  const resetTimer = () => {
    clearPrepInterval();
    clearTimerInterval();

    runningRef.current = false;
    pausedRef.current = false;
    finishedRef.current = false;

    elapsedRef.current = 0;
    remainingRef.current = totalDuration;
    currentRoundRef.current = 1;

    setPreparing(false);
    setRunning(false);
    setPaused(false);
    setFinished(false);

    setPrepRemaining(prepTime);
    setElapsedSeconds(0);
    setRemainingSeconds(totalDuration);
    setCurrentRound(1);

    setShowGoOverlay(false);
    setRoundOverlay(null);
    setShowTimeOverlay(false);

    void releaseWakeLock();
  };

  const cancelPreparation = () => {
    clearPrepInterval();

    setPreparing(false);
    setPrepRemaining(prepTime);
  };

  const changeMode = (newMode: TimerMode) => {
    resetTimer();
    setMode(newMode);
  };

  useEffect(() => {
    setRemainingSeconds(totalDuration);
    remainingRef.current = totalDuration;
  }, [
    mode,
    amrapMinutes,
    emomIntervalMinutes,
    emomRounds,
    timeCapMinutes
  ]);

  useEffect(() => {
    setPrepRemaining(prepTime);
  }, [prepTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        runningRef.current &&
        !pausedRef.current
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
    mode === 'fortime' ? elapsedSeconds : remainingSeconds;

  const progressPercent =
    totalDuration > 0
      ? mode === 'fortime'
        ? Math.min(100, (elapsedSeconds / totalDuration) * 100)
        : Math.min(
            100,
            ((totalDuration - remainingSeconds) / totalDuration) *
              100
          )
      : 0;

  const emomRoundRemaining =
    mode === 'emom' && running
      ? emomIntervalSeconds -
        (elapsedSeconds % emomIntervalSeconds || 0)
      : emomIntervalSeconds;

  const timerLocked = preparing || running || finished;

  return (
    <main className="timer-page">
      <header className="timer-header">
        <button
          type="button"
          className="timer-back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <p className="timer-eyebrow">FORGE PERFORMANCE</p>
          <h1>TIMER</h1>
        </div>
      </header>

      <section className="timer-mode-tabs">
        <button
          type="button"
          className={mode === 'amrap' ? 'active' : ''}
          onClick={() => changeMode('amrap')}
          disabled={timerLocked}
        >
          AMRAP
        </button>

        <button
          type="button"
          className={mode === 'emom' ? 'active' : ''}
          onClick={() => changeMode('emom')}
          disabled={timerLocked}
        >
          ExMOM
        </button>

        <button
          type="button"
          className={mode === 'fortime' ? 'active' : ''}
          onClick={() => changeMode('fortime')}
          disabled={timerLocked}
        >
          FOR TIME
        </button>
      </section>

      {!timerLocked && (
        <section className="timer-settings">
          {mode === 'amrap' && (
            <div className="timer-setting-card">
              <span>AMRAP DURATION</span>

              <div className="timer-stepper">
                <button
                  type="button"
                  onClick={() =>
                    setAmrapMinutes((value) =>
                      Math.max(1, value - 1)
                    )
                  }
                >
                  −
                </button>

                <strong>{amrapMinutes} MIN</strong>

                <button
                  type="button"
                  onClick={() =>
                    setAmrapMinutes((value) =>
                      Math.min(99, value + 1)
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
              <div className="timer-setting-card">
                <span>INTERVAL</span>

                <div className="timer-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      setEmomIntervalMinutes((value) =>
                        Math.max(1, value - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    E{emomIntervalMinutes}MOM
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEmomIntervalMinutes((value) =>
                        Math.min(10, value + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="timer-setting-card">
                <span>TOTAL ROUNDS</span>

                <div className="timer-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      setEmomRounds((value) =>
                        Math.max(1, value - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>{emomRounds} ROUNDS</strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEmomRounds((value) =>
                        Math.min(99, value + 1)
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
            <div className="timer-setting-card">
              <span>TIME CAP</span>

              <div className="timer-stepper">
                <button
                  type="button"
                  onClick={() =>
                    setTimeCapMinutes((value) =>
                      Math.max(1, value - 1)
                    )
                  }
                >
                  −
                </button>

                <strong>{timeCapMinutes} MIN</strong>

                <button
                  type="button"
                  onClick={() =>
                    setTimeCapMinutes((value) =>
                      Math.min(99, value + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="timer-setting-card">
            <span>PREPARATION</span>

            <div className="timer-prep-options">
              {[5, 10, 15].map((seconds) => (
                <button
                  key={seconds}
                  type="button"
                  className={
                    prepTime === seconds ? 'active' : ''
                  }
                  onClick={() => setPrepTime(seconds)}
                >
                  {seconds} SEC
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="timer-display-section">
        <div
          className="timer-ring"
          style={
            {
              '--timer-progress': `${progressPercent * 3.6}deg`
            } as React.CSSProperties
          }
        >
          <div className="timer-ring-inner">
            {preparing ? (
              <>
                <span className="timer-status-label">
                  GET READY
                </span>

                <strong className="timer-prep-number">
                  {prepRemaining}
                </strong>
              </>
            ) : (
              <>
                <span className="timer-status-label">
                  {finished
                    ? 'FINISHED'
                    : paused
                      ? 'PAUSED'
                      : running
                        ? mode === 'emom'
                          ? `ROUND ${currentRound} / ${emomRounds}`
                          : mode === 'fortime'
                            ? 'FOR TIME'
                            : 'AMRAP'
                        : 'READY'}
                </span>

                <strong className="timer-main-time">
                  {formatTime(displayedSeconds)}
                </strong>

                {mode === 'emom' && (
                  <span className="timer-round-time">
                    NEXT ROUND IN{' '}
                    {formatTime(emomRoundRemaining)}
                  </span>
                )}

                {mode === 'fortime' && running && (
                  <span className="timer-round-time">
                    CAP REMAINING{' '}
                    {formatTime(
                      Math.max(
                        0,
                        timeCapMinutes * 60 - elapsedSeconds
                      )
                    )}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="timer-controls">
        {!preparing && !running && !finished && (
          <button
            type="button"
            className="timer-primary-button"
            onClick={() => void startPreparation()}
          >
            START
          </button>
        )}

        {preparing && (
          <button
            type="button"
            className="timer-secondary-button"
            onClick={cancelPreparation}
          >
            CANCEL
          </button>
        )}

        {running && (
          <>
            <button
              type="button"
              className="timer-primary-button"
              onClick={() => void togglePause()}
            >
              {paused ? 'RESUME' : 'PAUSE'}
            </button>

            {mode === 'fortime' && (
              <button
                type="button"
                className="timer-finish-button"
                onClick={finishWorkout}
              >
                FINISH
              </button>
            )}

            <button
              type="button"
              className="timer-secondary-button"
              onClick={resetTimer}
            >
              RESET
            </button>
          </>
        )}

        {finished && (
          <button
            type="button"
            className="timer-primary-button"
            onClick={resetTimer}
          >
            NEW TIMER
          </button>
        )}
      </section>

      {showGoOverlay && (
        <div className="timer-fullscreen-overlay timer-go-overlay">
          <strong>GO</strong>
        </div>
      )}

      {roundOverlay !== null && (
        <div className="timer-fullscreen-overlay timer-round-overlay">
          <span>ROUND</span>
          <strong>{roundOverlay}</strong>
        </div>
      )}

      {showTimeOverlay && (
        <div className="timer-fullscreen-overlay timer-time-overlay">
          <strong>TIME</strong>
        </div>
      )}
    </main>
  );
}