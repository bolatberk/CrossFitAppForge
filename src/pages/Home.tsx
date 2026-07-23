export default function Home() {
  return (
    <main className="page">
      <section className="hero-card">
        <p className="eyebrow">FOUNDATION BUILD - WEEK 1 🚀</p>

        <h1>FORGE Performance Training</h1>

        <p className="hero-description">
          Snatch hızını, strict pull-up kapasitesini ve sürdürülebilir engine
          performansını geliştir.
        </p>

        <div className="week-progress">
          <div className="progress-heading">
            <span>Haftalık ilerleme</span>
            <strong>0 / 4 gün</strong>
          </div>

          <div className="progress-bar">
            <span />
          </div>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">SIRADAKİ ANTRENMAN</p>
          <h2>Day A</h2>
        </div>

        <span className="duration-badge">80–90 dk</span>
      </section>

      <article className="next-workout-card">
        <div>
          <p className="workout-label">OLYMPIC SPEED</p>
          <h3>Snatch Technique & Strict Pull-up</h3>
          <p>
            Teknik kalite, hızlı pull-under ve kontrollü üst gövde çekiş hacmi.
          </p>
        </div>

        <button>Programa git</button>
      </article>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Aktif blok</span>
          <strong>Block 1</strong>
        </article>

        <article className="stat-card">
          <span>Hafta</span>
          <strong>Week 1</strong>
        </article>

        <article className="stat-card">
          <span>Tamamlanan</span>
          <strong>0</strong>
        </article>

        <article className="stat-card">
          <span>Son RPE</span>
          <strong>—</strong>
        </article>
      </section>
    </main>
  );
}
