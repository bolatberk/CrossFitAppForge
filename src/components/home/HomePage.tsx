import type {
  TrainingDay,
  TrainingWeek,
} from '../../types/training';

type HomePageProps = {
  activeWeek: TrainingWeek;
  completedDayCount: number;
  nextDay: TrainingDay | null;
  onOpenDay: (day: TrainingDay) => void;
};

function HomePage({
  activeWeek,
  completedDayCount,
  nextDay,
  onOpenDay,
}: HomePageProps) {
  const totalDayCount = activeWeek.days.length;

  const progressPercentage =
    totalDayCount > 0
      ? Math.round(
          (completedDayCount / totalDayCount) * 100
        )
      : 0;

  return (
    <main className="page">
      <section className="hero-card">
        <p className="eyebrow">
          {activeWeek.title.toUpperCase()} · WEEK{' '}
          {activeWeek.week}
        </p>

        <h1>FORGE Performance Training</h1>

        <p className="hero-description">
          {activeWeek.description ??
            'Teknik, kuvvet, gymnastics ve engine performansını geliştir.'}
        </p>

        <div className="week-progress">
          <div className="progress-heading">
            <span>Haftalık ilerleme</span>
            <strong>
              {completedDayCount} / {totalDayCount} gün
            </strong>
          </div>

          <div className="progress-bar">
            <span
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="progress-percentage">
            %{progressPercentage} tamamlandı
          </p>
        </div>
      </section>

      {nextDay ? (
        <>
          <section className="section-heading">
            <div>
              <p className="eyebrow">
                SIRADAKİ ANTRENMAN
              </p>
              <h2>{nextDay.day}</h2>
            </div>

            <span className="duration-badge">
              {nextDay.duration}
            </span>
          </section>

          <article className="next-workout-card">
            <div>
              <p className="workout-label">
                {nextDay.day}
              </p>
              <h3>{nextDay.title}</h3>
              <p>{nextDay.focus}</p>
            </div>

            <button
              type="button"
              onClick={() => onOpenDay(nextDay)}
            >
              Antrenmanı aç
            </button>
          </article>
        </>
      ) : (
        <section className="week-complete-card">
          <span className="week-complete-icon">✓</span>

          <div>
            <p className="eyebrow">
              HAFTA TAMAMLANDI
            </p>
            <h2>Tüm antrenmanlar tamamlandı</h2>
            <p>
              {activeWeek.title} Week {activeWeek.week}{' '}
              başarıyla tamamlandı.
            </p>
          </div>
        </section>
      )}

      <section className="stats-grid">
        <article className="stat-card">
          <span>Aktif blok</span>
          <strong>Block {activeWeek.block}</strong>
        </article>

        <article className="stat-card">
          <span>Hafta</span>
          <strong>Week {activeWeek.week}</strong>
        </article>

        <article className="stat-card">
          <span>Tamamlanan</span>
          <strong>{completedDayCount}</strong>
        </article>

        <article className="stat-card">
          <span>İlerleme</span>
          <strong>%{progressPercentage}</strong>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
