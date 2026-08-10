import type { TrainingDay } from '../../types/training';

type WorkoutDetailV2Props = {
  day: TrainingDay;
  completedSectionIds: string[];
  isDayCompleted: boolean;
  nextDay: TrainingDay | null;
  onBack: () => void;
  onToggleSection: (sectionId: string) => void;
  onOpenNextDay: (day: TrainingDay) => void;
};

function getSectionTone(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes('metcon') || normalized.includes('conditioning')) {
    return 'metcon';
  }
  if (normalized.includes('olympic')) {
    return 'olympic';
  }
  if (normalized.includes('strength')) {
    return 'strength';
  }
  if (normalized.includes('gymnastics') || normalized.includes('skill')) {
    return 'gymnastics';
  }
  if (normalized.includes('warm')) {
    return 'warmup';
  }
  if (normalized.includes('cool')) {
    return 'cooldown';
  }
  if (normalized.includes('accessory')) {
    return 'accessory';
  }

  return 'default';
}

function isMetric(item: string) {
  const value = item.toLowerCase();
  return (
    value.startsWith('rpe:') ||
    value.startsWith('dinlenme:') ||
    value.startsWith('tempo:') ||
    value.startsWith('time cap:') ||
    value.startsWith('hedef rpe:')
  );
}

function WorkoutDetailV2({
  day,
  completedSectionIds,
  isDayCompleted,
  nextDay,
  onBack,
  onToggleSection,
  onOpenNextDay,
}: WorkoutDetailV2Props) {
  const completedSectionCount =
    completedSectionIds.length;
  const sectionProgress = day.sections.length
    ? Math.round(
        (completedSectionCount /
          day.sections.length) *
          100
      )
    : 0;

  return (
    <main className="page v2-workout-page">
      <button
        type="button"
        className="v2-back-button"
        onClick={onBack}
      >
        ← Programa dön
      </button>

      <section className="v2-workout-hero">
        <div className="v2-workout-hero-top">
          <div>
            <p className="v2-kicker">
              {day.day}
              {day.optional ? ' · OPSİYONEL' : ''}
            </p>
            <h1>{day.title}</h1>
          </div>
          <span className="v2-duration-pill">
            {day.duration}
          </span>
        </div>

        <p>{day.purpose}</p>

        <div className="v2-inline-progress">
          <div>
            <span>Bölüm ilerlemesi</span>
            <strong>
              {completedSectionCount}/{day.sections.length}
            </strong>
          </div>
          <div className="v2-inline-progress-bar">
            <span
              style={{ width: `${sectionProgress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="v2-section-stack">
        {day.sections.map((section, index) => {
          const completed =
            completedSectionIds.includes(section.id);
          const tone = getSectionTone(section.title);
          const metrics = section.items.filter(isMetric);
          const content = section.items.filter(
            item => !isMetric(item)
          );

          return (
            <article
              key={section.id}
              className={[
                'v2-section-card',
                `tone-${tone}`,
                completed ? 'completed' : '',
              ].join(' ')}
            >
              <div className="v2-section-card-header">
                <div className="v2-section-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="v2-section-title">
                  <p>{tone.toUpperCase()}</p>
                  <h2>{section.title}</h2>
                  {section.duration && (
                    <span>{section.duration}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="v2-complete-button"
                  onClick={() =>
                    onToggleSection(section.id)
                  }
                  aria-label={`${section.title} bölümünü tamamla`}
                >
                  {completed ? '✓' : '○'}
                </button>
              </div>

              {metrics.length > 0 && (
                <div className="v2-metric-chips">
                  {metrics.map((metric, metricIndex) => (
                    <span
                      key={`${section.id}-metric-${metricIndex}`}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}

              <div className="v2-section-items">
                {content.map((item, itemIndex) => (
                  <div
                    key={`${section.id}-${itemIndex}`}
                    className={
                      itemIndex === 0
                        ? 'primary-item'
                        : ''
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      {isDayCompleted && (
        <section className="v2-day-complete">
          <span className="v2-complete-mark">✓</span>
          <div>
            <p className="v2-kicker">
              ANTRENMAN TAMAMLANDI
            </p>
            <h2>{day.day} tamamlandı</h2>
            {nextDay ? (
              <button
                type="button"
                onClick={() => onOpenNextDay(nextDay)}
              >
                {nextDay.day} antrenmanına geç →
              </button>
            ) : (
              <p>Bu haftanın tüm günleri tamamlandı.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default WorkoutDetailV2;
