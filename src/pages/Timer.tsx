import { useEffect, useRef, useState } from 'react';

type TimerMode = 'amrap' | 'emom' | 'fortime';

type TimerStatus = 'idle' | 'preparing' | 'running' | 'paused' | 'finished';

type TimerProps = {
  onBack: () => void;
};

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
}

function vibrate(pattern: number | number[]) {
  if ('vibrate' in navigator) {
    navigator.vibrate?.(pattern);
  }
}

function playBeep(frequency = 900, duration = 0.15, volume = 0.15) {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    window.setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, duration * 1000);
  } catch {
    // Ses çalışmasa bile timer çalışmaya devam eder.
  }
}

function playCountdownBeep() {
  playBeep(850, 0.14, 0.18);
  vibrate(100);
}

function playGoSignal() {
  playBeep(1250, 0.55, 0.2);
  vibrate([150, 80, 300]);
}

function playRoundSignal() {
  playBeep(950, 0.12, 0.17);

  window.setTimeout(() => {
    playBeep(1150, 0.24, 0.18);
  }, 170);

  vibrate([100, 70, 140]);
}

function playFinishSignal() {
  playBeep(700, 0.18, 0.18);

  window.setTimeout(() => {
    playBeep(900, 0.18, 0.18);
  }, 220);

  window.setTimeout(() => {
    playBeep(1250, 0.5, 0.2);
  }, 440);

  vibrate([250, 120, 450]);
}

function Timer({ onBack }: TimerProps) {
  const [mode, setMode] = useState<TimerMode>('amrap');
  const [status, setStatus] = useState<TimerStatus>('idle');

  const [prepTime, setPrepTime] = useState(10);
  const [prepRemaining, setPrepRemaining] = useState(10);

  const [amrapMinutes, setAmrapMinutes] = useState(10);

  const [emomIntervalMinutes, setEmomIntervalMinutes] = useState(1);

  const [emomRounds, setEmomRounds] = useState(10);

  const [forTimeCapEnabled, setForTimeCapEnabled] = useState(true);

  const [forTimeCapMinutes, setForTimeCapMinutes] = useState(15);

  const [displaySeconds, setDisplaySeconds] = useState(600);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  const [roundOverlay, setRoundOverlay] = useState('');
  const [showGoOverlay, setShowGoOverlay] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);
  const prepIntervalRef = useRef<number | null>(null);
  const overlayTimeoutRef = useRef<number | null>(null);

  const startedAtRef = useRef<number | null>(null);
  const prepEndsAtRef = useRef<number | null>(null);

  const elapsedBeforeStartRef = useRef(0);
  const lastEmomRoundRef = useRef(1);
  const lastPrepBeepRef = useRef<number | null>(null);

  const emomRoundDurationSeconds = emomIntervalMinutes * 60;

  const totalEmomSeconds = emomRoundDurationSeconds * emomRounds;

  function clearTimerInterval() {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }

  function clearPrepInterval() {
    if (prepIntervalRef.current !== null) {
      window.clearInterval(prepIntervalRef.current);
      prepIntervalRef.current = null;
    }
  }

  function clearOverlayTimeout() {
    if (overlayTimeoutRef.current !== null) {
      window.clearTimeout(overlayTimeoutRef.current);
      overlayTimeoutRef.current = null;
    }
  }

  function getInitialDisplaySeconds(selectedMode: TimerMode = mode) {
    if (selectedMode === 'amrap') {
      return amrapMinutes * 60;
    }

    if (selectedMode === 'emom') {
      return emomRoundDurationSeconds;
    }

    return 0;
  }

  function showRoundMessage(round: number) {
    clearOverlayTimeout();

    setRoundOverlay(`ROUND ${round}`);

    overlayTimeoutRef.current = window.setTimeout(() => {
      setRoundOverlay('');
    }, 900);
  }

  function showGoMessage() {
    clearOverlayTimeout();

    setShowGoOverlay(true);

    overlayTimeoutRef.current = window.setTimeout(() => {
      setShowGoOverlay(false);
    }, 900);
  }

  function resetTimer(selectedMode: TimerMode = mode) {
    clearTimerInterval();
    clearPrepInterval();
    clearOverlayTimeout();

    setStatus('idle');
    setElapsedSeconds(0);
    setCurrentRound(1);
    setDisplaySeconds(getInitialDisplaySeconds(selectedMode));

    setPrepRemaining(prepTime);
    setRoundOverlay('');
    setShowGoOverlay(false);

    startedAtRef.current = null;
    prepEndsAtRef.current = null;
    elapsedBeforeStartRef.current = 0;
    lastEmomRoundRef.current = 1;
    lastPrepBeepRef.current = null;
  }

  function changeMode(nextMode: TimerMode) {
    setMode(nextMode);

    clearTimerInterval();
    clearPrepInterval();
    clearOverlayTimeout();

    setStatus('idle');
    setElapsedSeconds(0);
    setCurrentRound(1);
    setRoundOverlay('');
    setShowGoOverlay(false);

    startedAtRef.current = null;
    prepEndsAtRef.current = null;
    elapsedBeforeStartRef.current = 0;
    lastEmomRoundRef.current = 1;
    lastPrepBeepRef.current = null;

    if (nextMode === 'amrap') {
      setDisplaySeconds(amrapMinutes * 60);
    }

    if (nextMode === 'emom') {
      setDisplaySeconds(emomIntervalMinutes * 60);
    }

    if (nextMode === 'fortime') {
      setDisplaySeconds(0);
    }
  }

  function beginWorkout() {
    clearPrepInterval();

    setPrepRemaining(0);
    setStatus('running');

    startedAtRef.current = Date.now();
    prepEndsAtRef.current = null;
    lastPrepBeepRef.current = null;

    playGoSignal();
    showGoMessage();
  }

  function updatePreparation() {
    if (prepEndsAtRef.current === null) return;

    const millisecondsRemaining = prepEndsAtRef.current - Date.now();

    const secondsRemaining = Math.max(
      0,
      Math.ceil(millisecondsRemaining / 1000)
    );

    setPrepRemaining(secondsRemaining);

    if (
      secondsRemaining <= 3 &&
      secondsRemaining >= 1 &&
      lastPrepBeepRef.current !== secondsRemaining
    ) {
      lastPrepBeepRef.current = secondsRemaining;
      playCountdownBeep();
    }

    if (millisecondsRemaining <= 0) {
      beginWorkout();
    }
  }

  function startPreparation() {
    clearTimerInterval();
    clearPrepInterval();
    clearOverlayTimeout();

    setStatus('preparing');
    setPrepRemaining(prepTime);
    setRoundOverlay('');
    setShowGoOverlay(false);

    lastPrepBeepRef.current = null;

    prepEndsAtRef.current = Date.now() + prepTime * 1000;

    updatePreparation();

    prepIntervalRef.current = window.setInterval(() => {
      updatePreparation();
    }, 100);
  }

  function cancelPreparation() {
    clearPrepInterval();

    prepEndsAtRef.current = null;
    lastPrepBeepRef.current = null;

    resetTimer();
  }

  function finishTimer() {
    clearTimerInterval();

    setStatus('finished');
    playFinishSignal();
  }

  function updateTimer() {
    if (startedAtRef.current === null) return;

    const currentSessionSeconds = Math.floor(
      (Date.now() - startedAtRef.current) / 1000
    );

    const totalElapsed = elapsedBeforeStartRef.current + currentSessionSeconds;

    setElapsedSeconds(totalElapsed);

    if (mode === 'amrap') {
      const totalDuration = amrapMinutes * 60;

      const remaining = Math.max(0, totalDuration - totalElapsed);

      setDisplaySeconds(remaining);

      if (remaining <= 0) {
        finishTimer();
      }

      return;
    }

    if (mode === 'emom') {
      if (totalElapsed >= totalEmomSeconds) {
        setCurrentRound(emomRounds);
        setDisplaySeconds(0);
        finishTimer();
        return;
      }

      const roundIndex = Math.floor(totalElapsed / emomRoundDurationSeconds);

      const newRound = roundIndex + 1;

      const elapsedInRound = totalElapsed % emomRoundDurationSeconds;

      const remainingInRound = emomRoundDurationSeconds - elapsedInRound;

      setCurrentRound(newRound);
      setDisplaySeconds(remainingInRound);

      if (newRound !== lastEmomRoundRef.current && newRound <= emomRounds) {
        lastEmomRoundRef.current = newRound;

        playRoundSignal();
        showRoundMessage(newRound);
      }

      return;
    }

    setDisplaySeconds(totalElapsed);

    if (forTimeCapEnabled && totalElapsed >= forTimeCapMinutes * 60) {
      setDisplaySeconds(forTimeCapMinutes * 60);
      finishTimer();
    }
  }

  function handleStart() {
    if (status === 'paused') {
      startedAtRef.current = Date.now();
      setStatus('running');
      return;
    }

    if (status === 'finished') {
      resetTimer();

      window.setTimeout(() => {
        startPreparation();
      }, 0);

      return;
    }

    startPreparation();
  }

  function pauseTimer() {
    if (startedAtRef.current !== null) {
      const currentSessionSeconds = Math.floor(
        (Date.now() - startedAtRef.current) / 1000
      );

      elapsedBeforeStartRef.current += currentSessionSeconds;
    }

    startedAtRef.current = null;

    clearTimerInterval();
    setStatus('paused');
  }

  function stopForTime() {
    if (mode !== 'fortime') return;

    if (startedAtRef.current !== null) {
      const currentSessionSeconds = Math.floor(
        (Date.now() - startedAtRef.current) / 1000
      );

      const finalElapsed =
        elapsedBeforeStartRef.current + currentSessionSeconds;

      setElapsedSeconds(finalElapsed);
      setDisplaySeconds(finalElapsed);
    }

    finishTimer();
  }

  useEffect(() => {
    clearTimerInterval();

    if (status === 'running') {
      updateTimer();

      timerIntervalRef.current = window.setInterval(() => {
        updateTimer();
      }, 250);
    }

    return clearTimerInterval;
  }, [
    status,
    mode,
    amrapMinutes,
    emomIntervalMinutes,
    emomRounds,
    forTimeCapEnabled,
    forTimeCapMinutes,
  ]);

  useEffect(() => {
    if (status !== 'idle') return;

    if (mode === 'amrap') {
      setDisplaySeconds(amrapMinutes * 60);
    }

    if (mode === 'emom') {
      setDisplaySeconds(emomIntervalMinutes * 60);
    }

    if (mode === 'fortime') {
      setDisplaySeconds(0);
    }
  }, [mode, status, amrapMinutes, emomIntervalMinutes, emomRounds]);

  useEffect(() => {
    return () => {
      clearTimerInterval();
      clearPrepInterval();
      clearOverlayTimeout();
    };
  }, []);

  const progressPercentage = (() => {
    if (mode === 'amrap') {
      const totalSeconds = amrapMinutes * 60;

      return totalSeconds > 0
        ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
        : 0;
    }

    if (mode === 'emom') {
      return totalEmomSeconds > 0
        ? Math.min(100, (elapsedSeconds / totalEmomSeconds) * 100)
        : 0;
    }

    if (forTimeCapEnabled) {
      const totalSeconds = forTimeCapMinutes * 60;

      return totalSeconds > 0
        ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
        : 0;
    }

    return 0;
  })();

  const modeTitle =
    mode === 'amrap'
      ? 'AMRAP'
      : mode === 'emom'
      ? `E${emomIntervalMinutes}MOM`
      : 'FOR TIME';

  const timerSubtitle =
    status === 'preparing'
      ? 'HAZIRLAN'
      : status === 'finished'
      ? 'TAMAMLANDI'
      : mode === 'emom'
      ? `ROUND ${currentRound} / ${emomRounds}`
      : status === 'paused'
      ? 'DURAKLATILDI'
      : status === 'running'
      ? 'ÇALIŞIYOR'
      : 'HAZIR';

  return (
    <main className="page timer-page">
      <button className="back-button" onClick={onBack} type="button">
        ← Ana sayfaya dön
      </button>

      <section className="page-header">
        <p className="eyebrow">FORGE TIMER</p>
        <h1>Workout Timer</h1>
        <p>AMRAP, ExMOM ve For Time antrenmanlarını tek ekrandan yönet.</p>
      </section>

      <section className="timer-mode-tabs">
        <button
          className={mode === 'amrap' ? 'active' : ''}
          onClick={() => changeMode('amrap')}
          disabled={status !== 'idle'}
          type="button"
        >
          AMRAP
        </button>

        <button
          className={mode === 'emom' ? 'active' : ''}
          onClick={() => changeMode('emom')}
          disabled={status !== 'idle'}
          type="button"
        >
          ExMOM
        </button>

        <button
          className={mode === 'fortime' ? 'active' : ''}
          onClick={() => changeMode('fortime')}
          disabled={status !== 'idle'}
          type="button"
        >
          For Time
        </button>
      </section>

      {status === 'idle' && (
        <section className="timer-settings-card">
          <div className="prep-time-setting">
            <span>Hazırlık süresi</span>

            <div className="prep-time-options">
              {[5, 10, 15].map((seconds) => (
                <button
                  key={seconds}
                  className={prepTime === seconds ? 'active' : ''}
                  onClick={() => {
                    setPrepTime(seconds);
                    setPrepRemaining(seconds);
                  }}
                  type="button"
                >
                  {seconds} sn
                </button>
              ))}
            </div>
          </div>

          {mode === 'amrap' && (
            <label className="timer-field">
              <span>AMRAP süresi</span>

              <div className="timer-input-row">
                <input
                  min="1"
                  max="90"
                  type="number"
                  value={amrapMinutes}
                  onChange={(event) =>
                    setAmrapMinutes(Math.max(1, Number(event.target.value)))
                  }
                />

                <strong>dakika</strong>
              </div>
            </label>
          )}

          {mode === 'emom' && (
            <div className="timer-settings-grid">
              <label className="timer-field">
                <span>Her tur kaç dakika?</span>

                <div className="timer-input-row">
                  <input
                    min="1"
                    max="10"
                    type="number"
                    value={emomIntervalMinutes}
                    onChange={(event) =>
                      setEmomIntervalMinutes(
                        Math.max(1, Number(event.target.value))
                      )
                    }
                  />

                  <strong>dk</strong>
                </div>
              </label>

              <label className="timer-field">
                <span>Toplam tur</span>

                <div className="timer-input-row">
                  <input
                    min="1"
                    max="100"
                    type="number"
                    value={emomRounds}
                    onChange={(event) =>
                      setEmomRounds(Math.max(1, Number(event.target.value)))
                    }
                  />

                  <strong>tur</strong>
                </div>
              </label>

              <div className="emom-summary">
                <span>Oluşturulan timer</span>

                <strong>
                  E{emomIntervalMinutes}MOM × {emomRounds}
                </strong>

                <p>Toplam süre: {formatTime(totalEmomSeconds)}</p>
              </div>
            </div>
          )}

          {mode === 'fortime' && (
            <>
              <label className="timer-toggle-row">
                <div>
                  <strong>Time cap kullan</strong>
                  <span>Süre dolduğunda timer otomatik durur.</span>
                </div>

                <input
                  type="checkbox"
                  checked={forTimeCapEnabled}
                  onChange={(event) =>
                    setForTimeCapEnabled(event.target.checked)
                  }
                />
              </label>

              {forTimeCapEnabled && (
                <label className="timer-field">
                  <span>Time cap</span>

                  <div className="timer-input-row">
                    <input
                      min="1"
                      max="180"
                      type="number"
                      value={forTimeCapMinutes}
                      onChange={(event) =>
                        setForTimeCapMinutes(
                          Math.max(1, Number(event.target.value))
                        )
                      }
                    />

                    <strong>dakika</strong>
                  </div>
                </label>
              )}
            </>
          )}
        </section>
      )}

      <section className={`timer-display-card timer-status-${status}`}>
        <div className="timer-display-top">
          <span>{modeTitle}</span>
          <strong>{timerSubtitle}</strong>
        </div>

        <div
          className="timer-progress-ring"
          style={{
            background: `conic-gradient(
              var(--gold, #f4b62f) ${progressPercentage}%,
              rgba(255, 255, 255, 0.08) ${progressPercentage}%
            )`,
          }}
        >
          <div className="timer-progress-inner">
            {status === 'preparing' ? (
              <>
                <strong className="prep-countdown-number">
                  {prepRemaining}
                </strong>

                <span>HAZIRLAN</span>
              </>
            ) : (
              <>
                <strong className="timer-clock">
                  {formatTime(displaySeconds)}
                </strong>

                {mode === 'emom' && (
                  <span>
                    Tur {currentRound} / {emomRounds}
                  </span>
                )}

                {mode === 'amrap' && <span>Kalan süre</span>}

                {mode === 'fortime' && <span>Geçen süre</span>}
              </>
            )}
          </div>
        </div>

        {mode === 'emom' && status !== 'preparing' && (
          <div className="timer-round-grid">
            <article>
              <span>Interval</span>
              <strong>{emomIntervalMinutes} dk</strong>
            </article>

            <article>
              <span>Tur</span>
              <strong>
                {currentRound}/{emomRounds}
              </strong>
            </article>

            <article>
              <span>Toplam</span>
              <strong>{formatTime(totalEmomSeconds)}</strong>
            </article>
          </div>
        )}

        {status === 'preparing' ? (
          <button
            className="prep-cancel-button"
            onClick={cancelPreparation}
            type="button"
          >
            Hazırlığı iptal et
          </button>
        ) : (
          <div className="timer-controls">
            <button
              className="timer-secondary-button"
              onClick={() => resetTimer()}
              type="button"
            >
              Sıfırla
            </button>

            {status !== 'running' ? (
              <button
                className="timer-primary-button"
                onClick={handleStart}
                type="button"
              >
                {status === 'paused'
                  ? 'Devam et'
                  : status === 'finished'
                  ? 'Tekrar başlat'
                  : 'Başlat'}
              </button>
            ) : (
              <button
                className="timer-primary-button"
                onClick={pauseTimer}
                type="button"
              >
                Duraklat
              </button>
            )}

            {mode === 'fortime' && status === 'running' ? (
              <button
                className="timer-finish-button"
                onClick={stopForTime}
                type="button"
              >
                Bitir
              </button>
            ) : (
              <button
                className="timer-secondary-button"
                onClick={() => resetTimer()}
                type="button"
              >
                Durdur
              </button>
            )}
          </div>
        )}
      </section>

      {roundOverlay && (
        <div className="timer-fullscreen-overlay">
          <span>YENİ TUR</span>
          <strong>{roundOverlay}</strong>
        </div>
      )}

      {showGoOverlay && (
        <div className="timer-fullscreen-overlay timer-go-overlay">
          <strong>GO!</strong>
        </div>
      )}

      <section className="timer-info-card">
        {mode === 'amrap' && (
          <>
            <strong>AMRAP</strong>
            <p>
              Seçilen süre boyunca mümkün olduğunca çok tur veya tekrar tamamla.
            </p>
          </>
        )}

        {mode === 'emom' && (
          <>
            <strong>ExMOM</strong>
            <p>
              Her X dakikada yeni tur başlar. Örneğin E2MOM × 6, iki dakikada
              bir başlayan toplam altı turdur.
            </p>
          </>
        )}

        {mode === 'fortime' && (
          <>
            <strong>For Time</strong>
            <p>
              Antrenmanı mümkün olan en kısa sürede tamamla ve bitirdiğin anda
              Bitir düğmesine bas.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default Timer;
