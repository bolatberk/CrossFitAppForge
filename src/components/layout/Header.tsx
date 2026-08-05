import {
  useEffect,
  useRef,
  useState,
} from 'react';

import type { TrainingWeek } from '../../types/training';

type HeaderProps = {
  activeWeek: TrainingWeek;
  availableWeeks: TrainingWeek[];
  onSelectWeek: (weekNumber: number) => void;
  onGoHome: () => void;
};

function Header({
  activeWeek,
  availableWeeks,
  onSelectWeek,
  onGoHome,
}: HeaderProps) {
  const [isWeekMenuOpen, setIsWeekMenuOpen] =
    useState(false);

  const menuRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsWeekMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsWeekMenuOpen(false);
      }
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown
    );
    document.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown
      );
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  function selectWeek(weekNumber: number) {
    onSelectWeek(weekNumber);
    setIsWeekMenuOpen(false);
  }

  function goHome() {
    onGoHome();
    setIsWeekMenuOpen(false);
  }

  return (
    <header className="app-header">
      <button
        type="button"
        className="brand-container brand-button"
        onClick={goHome}
        aria-label="Ana sayfaya dön"
      >
        <div className="brand-logo">F</div>

        <div>
          <span className="brand-mark">FORGE</span>
          <p>Performance Training</p>
        </div>
      </button>

      <div
        className="week-menu-container"
        ref={menuRef}
      >
        <button
          type="button"
          className={[
            'week-chip',
            isWeekMenuOpen ? 'open' : '',
          ].join(' ')}
          onClick={() =>
            setIsWeekMenuOpen(
              currentValue => !currentValue
            )
          }
          aria-haspopup="menu"
          aria-expanded={isWeekMenuOpen}
          aria-label={`Block ${activeWeek.block}, Week ${activeWeek.week}. Hafta seçimini aç`}
        >
          <span>Block {activeWeek.block}</span>

          <div className="week-chip-bottom">
            <strong>W{activeWeek.week}</strong>

            <span
              className="week-chip-chevron"
              aria-hidden="true"
            >
              {isWeekMenuOpen ? '⌃' : '⌄'}
            </span>
          </div>
        </button>

        {isWeekMenuOpen && (
          <div
            className="week-menu"
            role="menu"
            aria-label="Hafta seçimi"
          >
            <span className="week-menu-title">
              HAFTA SEÇİMİ
            </span>

            <div className="week-menu-list">
              {availableWeeks.map(week => {
                const isActive =
                  week.week === activeWeek.week;

                return (
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    className={[
                      'week-menu-item',
                      isActive ? 'active' : '',
                    ].join(' ')}
                    key={week.id}
                    onClick={() =>
                      selectWeek(week.week)
                    }
                  >
                    <span className="week-menu-code">
                      W{week.week}
                    </span>

                    <span className="week-menu-name">
                      Week {week.week}
                    </span>

                    <span
                      className="week-menu-radio"
                      aria-hidden="true"
                    >
                      {isActive ? '●' : '○'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="week-menu-divider" />

            <button
              type="button"
              className="week-menu-home"
              onClick={goHome}
            >
              <span aria-hidden="true">⌂</span>
              <span>Ana Sayfa</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
