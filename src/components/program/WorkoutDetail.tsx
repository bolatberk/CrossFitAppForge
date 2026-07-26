import type { TrainingDay } from '../../types/training';

type WorkoutDetailProps = {
  day: TrainingDay;
  completedSectionIds: string[];
  isDayCompleted: boolean;
  nextDay: TrainingDay | null;
  onBack: () => void;
  onToggleSection: (sectionId: string) => void;
  onOpenNextDay: (day: TrainingDay) => void;
};

function WorkoutDetail({
  day,
  completedSectionIds,
  isDayCompleted,
  nextDay,
  onBack,
  onToggleSection,
  onOpenNextDay,
}: WorkoutDetailProps) {
  const completedSectionCount =
    completedSectionIds.length;

  const sectionProgress =
    day.sections.length > 0
      ? Math.round(
          (completedSectionCount /
            day.sections.length) *
            100
        )
      : 0;

  return (
    <main className="page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Programa dön
      </button>

      <section className="workout-detail-header">
        <div className="workout-detail-top">
          <div>
            <p className="eyebrow">{day.day}</p>
            <h1>{day.title}</h1>
          </div>

          <span className="duration-badge">
            {day.duration}
          </span>
        </div>

        <p>{day.purpose}</p>

        <div className="day-progress">
          <div className="progress-heading">
            <span>Bölüm ilerlemesi</span>
            <strong>
              {completedSectionCount} /{' '}
              {day.sections.length}
            </strong>
          </div>

          <div className="progress-bar">
            <span
              style={{ width: `${sectionProgress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="workout-sections">
        {day.sections.map((section, index) => {
          const isCompleted =
            completedSectionIds.includes(section.id);

          return (
            <article
              className={`workout-section-card ${
                isCompleted
                  ? 'section-completed'
                  : ''
              }`}
              key={section.id}
            >
              <div className="workout-section-heading">
                <div>
                  <span>BÖLÜM {index + 1}</span>
                  <h2>{section.title}</h2>
                  {section.duration && (
                    <p>{section.duration}</p>
                  )}
                </div>

                <button
                  type="button"
                  className="complete-section-button"
                  onClick={() =>
                    onToggleSection(section.id)
                  }
                  aria-label={`${section.title} bölümünü tamamla`}
                >
                  {isCompleted ? '✓' : '○'}
                </button>
              </div>

              <div className="workout-items">
                {section.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      {isDayCompleted && (
        <section className="day-complete-card">
          <div className="day-complete-heading">
            <span className="day-complete-icon">
              ✓
            </span>

            <div>
              <p className="eyebrow">
                ANTRENMAN TAMAMLANDI
              </p>
              <h2>{day.day} tamamlandı</h2>
            </div>
          </div>

          {nextDay ? (
            <>
              <p>
                Sıradaki antrenman:{' '}
                <strong>{nextDay.day}</strong>
              </p>

              <button
                type="button"
                onClick={() =>
                  onOpenNextDay(nextDay)
                }
              >
                {nextDay.day} antrenmanına geç
              </button>
            </>
          ) : (
            <p>
              Bu haftanın bütün günlerini tamamladın.
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default WorkoutDetail;
