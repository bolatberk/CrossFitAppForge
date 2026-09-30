import type { SectionResult } from '../../types/trainingLog';

type Props = { results: SectionResult[] };

function includesAny(value: string, terms: string[]) {
  const text = value.toLowerCase();
  return terms.some(term => text.includes(term));
}

function PRTracking({ results }: Props) {
  const strength = results.filter(r => includesAny(r.sectionTitle, ['squat', 'press', 'pull-up', 'snatch', 'clean', 'jerk']));
  const conditioning = results.filter(r => includesAny(r.sectionTitle, ['metcon', 'conditioning']));
  const butterfly = results.filter(r => r.sectionTitle.toLowerCase().includes('butterfly'));
  const rpes = results.map(r => Number(r.rpe)).filter(v => Number.isFinite(v) && v > 0);
  const averageRpe = rpes.length ? (rpes.reduce((a, b) => a + b, 0) / rpes.length).toFixed(1) : '—';

  return (
    <main className="page v2-performance-page">
      <section className="v2-program-hero">
        <p className="v2-kicker">FORGE PERFORMANCE</p>
        <h1>Training Log</h1>
        <p>Program → Log → Performance. Kaydettiğin sonuçlar bu cihazda tutulur.</p>
      </section>

      <section className="v2-performance-stats">
        <article><small>TOTAL LOGS</small><strong>{results.length}</strong></article>
        <article><small>AVG RPE</small><strong>{averageRpe}</strong></article>
        <article><small>CONDITIONING</small><strong>{conditioning.length}</strong></article>
      </section>

      <LogGroup title="STRENGTH + OLYMPIC" results={strength} empty="Henüz strength/olympic sonucu yok." />
      <LogGroup title="CONDITIONING" results={conditioning} empty="Henüz conditioning sonucu yok." />

      <section className="v2-performance-group">
        <div className="v2-section-title-row compact"><div><p className="v2-kicker">SKILL TRACK</p><h2>Butterfly</h2></div></div>
        <div className="v2-skill-card">
          <span className="v2-status-pill next">DEVELOPING</span>
          <strong>Long-term skill track</strong>
          <p>PR mantığından ayrı tutulur. Rhythm, long body ve teknik kalite önceliklidir.</p>
          {butterfly[0] ? <div className="v2-skill-last"><small>SON KAYIT</small><strong>{butterfly[0].score || butterfly[0].actualLoad || 'Kayıt var'}</strong><span>{butterfly[0].notes || butterfly[0].limiter}</span></div> : <small>Henüz Butterfly sonucu kaydedilmedi.</small>}
        </div>
      </section>
    </main>
  );
}

function LogGroup({ title, results, empty }: { title: string; results: SectionResult[]; empty: string }) {
  return (
    <section className="v2-performance-group">
      <div className="v2-section-title-row compact"><div><p className="v2-kicker">PERFORMANCE</p><h2>{title}</h2></div></div>
      <div className="v2-log-list">
        {results.length === 0 ? <div className="v2-empty-log">{empty}</div> : results.slice(0, 12).map(result => (
          <article key={`${result.dayId}:${result.sectionId}:${result.updatedAt}`}>
            <div><strong>{result.sectionTitle}</strong><small>{new Date(result.updatedAt).toLocaleDateString('tr-TR')}</small></div>
            <div className="v2-log-values">
              {result.actualLoad && <span>{result.actualLoad}</span>}
              {result.score && <span>{result.score}</span>}
              {result.rpe && <span>RPE {result.rpe}</span>}
            </div>
            {(result.limiter || result.notes) && <p>{result.limiter || result.notes}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default PRTracking;
