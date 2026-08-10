import type {
  TrainingDay,
  TrainingWeek,
} from '../../types/training';

type ProgramTimelineProps = {
  activeWeek: TrainingWeek;
  completedDayIds: string[];
  onOpenDay: (day: TrainingDay) => void;
};

function ProgramTimeline({
  activeWeek,
  completedDayIds,
  onOpenDay,
}: ProgramTimelineProps) {
  const nextOpenId =
    activeWeek.days.find(
      day =>
        !day.optional &&
        !completedDayIds.includes(day.id)
    )?.id ??
    activeWeek.days.find(
      day => !completedDayIds.includes(day.id)
    )?.id;

  return (
    <main className="page v2-program-page">
      <section className="v2-program-hero">
        <p className="v2-kicker">
          BLOCK {activeWeek.block} · WEEK{' '}
          {activeWeek.week}
        </p>
        <h1>{activeWeek.title}</h1>
        <p>
          {activeWeek.description ??
            'Haftanın tüm antrenman günleri.'}
        </p>
      </section>

      {(activeWeek.goals?.length ||
        activeWeek.notes?.length) && (
        <section className="v2-brief-grid">
          {activeWeek.goals?.length ? (
            <article>
              <span>HAFTANIN HEDEFLERİ</span>
              <ul>
                {activeWeek.goals.map(goal => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </article>
          ) : null}
          {activeWeek.notes?.length ? (
            <article className="note">
              <span>HAFTA NOTLARI</span>
              <ul>
                {activeWeek.notes.map(note => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
      )}

      <section className="v2-timeline">
        {activeWeek.days.map((day, index) => {
          const completed =
            completedDayIds.includes(day.id);
          const current = day.id === nextOpenId;

          return (
            <article
              key={day.id}
              className={[
                'v2-timeline-row',
                completed ? 'completed' : '',
                current ? 'current' : '',
              ].join(' ')}
            >
              <div className="v2-timeline-rail">
                <span>
                  {completed ? '✓' : current ? '→' : index + 1}
                </span>
              </div>

              <div className="v2-timeline-card">
                <div className="v2-timeline-card-top">
                  <div>
                    <p className="v2-kicker">
                      {day.day}
                      {day.optional
                        ? ' · OPSİYONEL'
                        : ''}
                    </p>
                    <h2>{day.title}</h2>
                  </div>
                  <span className="v2-duration-pill">
                    {day.duration}
                  </span>
                </div>

                <p className="v2-timeline-focus">
                  {day.focus}
                </p>

                <div className="v2-timeline-footer">
                  <span
                    className={[
                      'v2-status-pill',
                      completed
                        ? 'done'
                        : current
                          ? 'next'
                          : '',
                    ].join(' ')}
                  >
                    {completed
                      ? '✓ Tamamlandı'
                      : current
                        ? 'Sıradaki gün'
                        : day.optional
                          ? 'Opsiyonel'
                          : 'Hazır'}
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenDay(day)}
                  >
                    {completed
                      ? 'Görüntüle'
                      : 'Günü aç'}{' '}
                    →
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default ProgramTimeline;
