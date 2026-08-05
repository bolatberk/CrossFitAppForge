import type {
  TrainingDay,
  TrainingWeek,
} from '../../types/training';

type ProgramPageProps = {
  activeWeek: TrainingWeek;
  availableWeeks: TrainingWeek[];
  completedDayIds: string[];
  onSelectWeek: (weekNumber: number) => void;
  onOpenDay: (day: TrainingDay) => void;
};

function ProgramPage({
  activeWeek,
  availableWeeks,
  completedDayIds,
  onSelectWeek,
  onOpenDay,
}: ProgramPageProps) {
  return (
    <main className="page">
      <section className="page-header">
        <p className="eyebrow">
          BLOCK {activeWeek.block} ·{' '}
          {activeWeek.title.toUpperCase()}
        </p>
        <h1>Week {activeWeek.week} Programı</h1>
        <p>
          {activeWeek.description ??
            'Haftayı seç, antrenman gününü aç ve bölümleri tamamladıkça işaretle.'}
        </p>
      </section>

      <section
        className="week-selector"
        aria-label="Hafta seçimi"
      >
        {availableWeeks.map((week) => (
          <button
            type="button"
            key={week.id}
            className={
              week.week === activeWeek.week
                ? 'active'
                : ''
            }
            aria-pressed={
              week.week === activeWeek.week
            }
            onClick={() => onSelectWeek(week.week)}
          >
            Week {week.week}
          </button>
        ))}
      </section>

      {(activeWeek.goals?.length ||
        activeWeek.notes?.length) && (
        <section className="week-brief-grid">
          {activeWeek.goals &&
            activeWeek.goals.length > 0 && (
              <article className="week-brief-card">
                <span>HAFTANIN ANA HEDEFİ</span>
                <ul>
                  {activeWeek.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </article>
            )}

          {activeWeek.notes &&
            activeWeek.notes.length > 0 && (
              <article className="week-brief-card week-note-card">
                <span>HAFTA NOTU</span>
                <ul>
                  {activeWeek.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>
            )}
        </section>
      )}

      <section className="program-list">
        {activeWeek.days.map((trainingDay) => {
          const isCompleted =
            completedDayIds.includes(trainingDay.id);

          return (
            <article
              className={[
                'program-card',
                isCompleted
                  ? 'program-card-completed'
                  : '',
              ].join(' ')}
              key={trainingDay.id}
            >
              <div className="program-card-top">
                <div className="program-day-label">
                  <span>{trainingDay.day}</span>
                  {trainingDay.optional && (
                    <small>OPSİYONEL</small>
                  )}
                </div>

                <div className="program-status">
                  {isCompleted ? (
                    <strong className="completed-label">
                      ✓ Tamamlandı
                    </strong>
                  ) : (
                    <strong className="unlocked-label">
                      Açık
                    </strong>
                  )}
                </div>
              </div>

              <h2>{trainingDay.title}</h2>
              <p>{trainingDay.focus}</p>
              <small>{trainingDay.duration}</small>

              <button
                type="button"
                onClick={() => onOpenDay(trainingDay)}
              >
                {isCompleted
                  ? 'Günü görüntüle'
                  : 'Günü aç'}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default ProgramPage;
