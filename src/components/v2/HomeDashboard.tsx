import type { Page } from '../../types/navigation';
import type {
  TrainingDay,
  TrainingWeek,
} from '../../types/training';

type HomeDashboardProps = {
  activeWeek: TrainingWeek;
  completedDayIds: string[];
  completedDayCount: number;
  nextDay: TrainingDay | null;
  onOpenDay: (day: TrainingDay) => void;
  onChangePage: (page: Page) => void;
};

function HomeDashboard({
  activeWeek,
  completedDayIds,
  completedDayCount,
  nextDay,
  onOpenDay,
  onChangePage,
}: HomeDashboardProps) {
  const totalDayCount = activeWeek.days.length;
  const progressPercentage = totalDayCount
    ? Math.round(
        (completedDayCount / totalDayCount) * 100
      )
    : 0;

  const nextDayIndex = nextDay
    ? activeWeek.days.findIndex(
        day => day.id === nextDay.id
      )
    : -1;

  return (
    <main className="page forge-v2-home">
      <section className="v2-week-hero">
        <div className="v2-hero-copy">
          <p className="v2-kicker">
            BLOCK {activeWeek.block} · WEEK{' '}
            {activeWeek.week}
          </p>
          <h1>{activeWeek.title}</h1>
          <p className="v2-hero-description">
            {activeWeek.description ??
              'Teknik, kuvvet, gymnastics ve engine gelişimi.'}
          </p>
        </div>

        <div className="v2-progress-panel">
          <div className="v2-progress-ring" aria-label={`%${progressPercentage} tamamlandı`}>
            <div
              className="v2-progress-ring-fill"
              style={{
                background: `conic-gradient(#f0b43c ${progressPercentage * 3.6}deg, #252c34 0deg)`,
              }}
            >
              <div className="v2-progress-ring-core">
                <strong>%{progressPercentage}</strong>
                <span>tamamlandı</span>
              </div>
            </div>
          </div>

          <div className="v2-progress-copy">
            <span>Haftalık ilerleme</span>
            <strong>
              {completedDayCount}/{totalDayCount} gün
            </strong>
          </div>
        </div>
      </section>

      {nextDay ? (
        <section className="v2-next-section">
          <div className="v2-section-title-row">
            <div>
              <p className="v2-kicker">SIRADAKİ ANTRENMAN</p>
              <h2>{nextDay.day}</h2>
            </div>
            <span className="v2-duration-pill">
              {nextDay.duration}
            </span>
          </div>

          <article className="v2-next-card">
            <div className="v2-next-card-main">
              <div className="v2-day-badge">
                {nextDay.day}
                {nextDay.optional && (
                  <span>OPSİYONEL</span>
                )}
              </div>
              <h3>{nextDay.title}</h3>
              <p>{nextDay.focus}</p>
            </div>
            <button
              type="button"
              className="v2-primary-button"
              onClick={() => onOpenDay(nextDay)}
            >
              Antrenmanı aç
              <span aria-hidden="true">→</span>
            </button>
          </article>
        </section>
      ) : (
        <section className="v2-complete-banner">
          <span>✓</span>
          <div>
            <p className="v2-kicker">HAFTA TAMAMLANDI</p>
            <h2>Week {activeWeek.week} tamamlandı</h2>
          </div>
        </section>
      )}

      <section className="v2-week-overview">
        <div className="v2-section-title-row compact">
          <div>
            <p className="v2-kicker">THIS WEEK</p>
            <h2>Antrenman Akışı</h2>
          </div>
          <button
            type="button"
            className="v2-text-button"
            onClick={() => onChangePage('program')}
          >
            Programı aç →
          </button>
        </div>

        <div className="v2-day-list">
          {activeWeek.days.map((day, index) => {
            const completed =
              completedDayIds.includes(day.id);
            const current =
              index === nextDayIndex && !completed;

            return (
              <button
                type="button"
                key={day.id}
                className={[
                  'v2-day-row',
                  completed ? 'completed' : '',
                  current ? 'current' : '',
                ].join(' ')}
                onClick={() => onOpenDay(day)}
              >
                <span className="v2-day-state">
                  {completed ? '✓' : current ? '→' : '○'}
                </span>
                <span className="v2-day-code">
                  {day.day}
                </span>
                <span className="v2-day-name">
                  <strong>{day.title}</strong>
                  <small>{day.focus}</small>
                </span>
                {day.optional && (
                  <span className="v2-optional-pill">
                    OPTIONAL
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="v2-quick-grid">
        <button
          type="button"
          onClick={() => onChangePage('timer')}
        >
          <span className="v2-quick-icon">◷</span>
          <strong>Timer</strong>
          <small>AMRAP · EMOM · For Time</small>
        </button>
        <button
          type="button"
          onClick={() => onChangePage('library')}
        >
          <span className="v2-quick-icon">▶</span>
          <strong>Movements</strong>
          <small>Teknik video kütüphanesi</small>
        </button>
        <button
          type="button"
          onClick={() => onChangePage('pr')}
        >
          <span className="v2-quick-icon">◆</span>
          <strong>PR Tracking</strong>
          <small>Kuvvet ve lift kayıtları</small>
        </button>
      </section>
    </main>
  );
}

export default HomeDashboard;
