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
            {activeWeek.title.toUpperCase()}
          </p>
          <h1>Week {activeWeek.week} Programı</h1>
          <p>
            Haftayı seç, antrenman gününü aç ve
            bölümleri tamamladıkça işaretle.
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
              onClick={() => onSelectWeek(week.week)}
            >
              Week {week.week}
            </button>
          ))}
        </section>
  
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
                  <span>{trainingDay.day}</span>
  
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
  