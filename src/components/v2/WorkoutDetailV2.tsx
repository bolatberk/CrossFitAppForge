import { useState } from 'react';
import type { TrainingDay } from '../../types/training';
import type { SectionResult } from '../../types/trainingLog';

type WorkoutDetailV2Props = {
  day: TrainingDay;
  completedSectionIds: string[];
  isDayCompleted: boolean;
  nextDay: TrainingDay | null;
  onBack: () => void;
  onToggleSection: (sectionId: string) => void;
  onOpenNextDay: (day: TrainingDay) => void;
  getResult: (dayId: string, sectionId: string) => SectionResult | undefined;
  onSaveResult: (result: SectionResult) => void;
};

function getSectionTone(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes('metcon') || normalized.includes('conditioning')) return 'metcon';
  if (normalized.includes('olympic') || normalized.includes('snatch') || normalized.includes('clean') || normalized.includes('jerk')) return 'olympic';
  if (normalized.includes('strength') || normalized.includes('squat') || normalized.includes('press') || normalized.includes('pull-up')) return 'strength';
  if (normalized.includes('gymnastics') || normalized.includes('skill') || normalized.includes('butterfly')) return 'gymnastics';
  if (normalized.includes('warm')) return 'warmup';
  if (normalized.includes('cool')) return 'cooldown';
  if (normalized.includes('accessory')) return 'accessory';
  return 'default';
}

function isMetric(item: string) {
  const value = item.toLowerCase();
  return value.startsWith('rpe:') || value.startsWith('dinlenme:') || value.startsWith('tempo:') || value.startsWith('time cap:') || value.startsWith('hedef rpe:');
}

function isExerciseHeading(item: string, itemIndex: number) {
  return itemIndex === 0 || /^[A-Z]\)/.test(item.trim());
}

function WorkoutDetailV2({
  day,
  completedSectionIds,
  isDayCompleted,
  nextDay,
  onBack,
  onToggleSection,
  onOpenNextDay,
  getResult,
  onSaveResult,
}: WorkoutDetailV2Props) {
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const completedSectionCount = completedSectionIds.length;
  const sectionProgress = day.sections.length
    ? Math.round((completedSectionCount / day.sections.length) * 100)
    : 0;

  return (
    <main className="page v2-workout-page">
      <button type="button" className="v2-back-button" onClick={onBack}>← Programa dön</button>

      <section className="v2-workout-hero">
        <div className="v2-workout-hero-top">
          <div>
            <p className="v2-kicker">{day.day}{day.optional ? ' · OPSİYONEL' : ''}</p>
            <h1>{day.title}</h1>
          </div>
          <span className="v2-duration-pill">{day.duration}</span>
        </div>
        <p>{day.purpose}</p>
        <div className="v2-inline-progress">
          <div><span>Bölüm ilerlemesi</span><strong>{completedSectionCount}/{day.sections.length}</strong></div>
          <div className="v2-inline-progress-bar"><span style={{ width: `${sectionProgress}%` }} /></div>
        </div>
      </section>

      <section className="v2-section-stack">
        {day.sections.map((section, index) => {
          const completed = completedSectionIds.includes(section.id);
          const tone = getSectionTone(section.title);
          const metrics = section.items.filter(isMetric);
          const content = section.items.filter(item => !isMetric(item));
          const saved = getResult(day.id, section.id);
          const editing = editingSectionId === section.id;

          return (
            <article key={section.id} className={['v2-section-card', `tone-${tone}`, completed ? 'completed' : ''].join(' ')}>
              <div className="v2-section-card-header">
                <div className="v2-section-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="v2-section-title">
                  <p>{tone.toUpperCase()}</p>
                  <h2>{section.title}</h2>
                  {section.duration && <span>{section.duration}</span>}
                </div>
                <button type="button" className="v2-complete-button" onClick={() => onToggleSection(section.id)} aria-label={`${section.title} bölümünü tamamla`}>
                  {completed ? '✓' : '○'}
                </button>
              </div>

              {metrics.length > 0 && <div className="v2-metric-chips">{metrics.map((metric, metricIndex) => <span key={`${section.id}-metric-${metricIndex}`}>{metric}</span>)}</div>}

              <div className="v2-section-items">
                {content.map((item, itemIndex) => (
                  <div key={`${section.id}-${itemIndex}`} className={isExerciseHeading(item, itemIndex) ? 'primary-item' : ''}>{item}</div>
                ))}
              </div>

              {saved && !editing && (
                <div className="v2-saved-result">
                  <div className="v2-result-title"><span>RESULT</span><button type="button" onClick={() => setEditingSectionId(section.id)}>Düzenle</button></div>
                  <div className="v2-result-summary">
                    {saved.actualLoad && <span><small>LOAD</small><strong>{saved.actualLoad}</strong></span>}
                    {saved.score && <span><small>SCORE</small><strong>{saved.score}</strong></span>}
                    {saved.rpe && <span><small>RPE</small><strong>{saved.rpe}</strong></span>}
                    {saved.limiter && <span><small>LIMITER</small><strong>{saved.limiter}</strong></span>}
                  </div>
                  {saved.notes && <p>{saved.notes}</p>}
                </div>
              )}

              {editing && (
                <ResultEditor
                  dayId={day.id}
                  sectionId={section.id}
                  sectionTitle={section.title}
                  initial={saved}
                  onCancel={() => setEditingSectionId(null)}
                  onSave={result => { onSaveResult(result); setEditingSectionId(null); }}
                />
              )}

              {!editing && !saved && (
                <button type="button" className="v2-log-button" onClick={() => setEditingSectionId(section.id)}>＋ Sonuç gir</button>
              )}
            </article>
          );
        })}
      </section>

      {isDayCompleted && (
        <section className="v2-day-complete">
          <span className="v2-complete-mark">✓</span>
          <div>
            <p className="v2-kicker">ANTRENMAN TAMAMLANDI</p>
            <h2>{day.day} tamamlandı</h2>
            {nextDay ? <button type="button" onClick={() => onOpenNextDay(nextDay)}>{nextDay.day} antrenmanına geç →</button> : <p>Bu haftanın tüm günleri tamamlandı.</p>}
          </div>
        </section>
      )}
    </main>
  );
}

function ResultEditor({ dayId, sectionId, sectionTitle, initial, onSave, onCancel }: {
  dayId: string;
  sectionId: string;
  sectionTitle: string;
  initial?: SectionResult;
  onSave: (result: SectionResult) => void;
  onCancel: () => void;
}) {
  const [actualLoad, setActualLoad] = useState(initial?.actualLoad ?? '');
  const [score, setScore] = useState(initial?.score ?? '');
  const [rpe, setRpe] = useState(initial?.rpe ?? '');
  const [limiter, setLimiter] = useState(initial?.limiter ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  return (
    <div className="v2-result-editor">
      <div className="v2-result-title"><span>RESULT LOG</span><small>localStorage</small></div>
      <div className="v2-result-form-grid">
        <label>Actual Load<input value={actualLoad} onChange={e => setActualLoad(e.target.value)} placeholder="52.5 kg / BW +5 kg" /></label>
        <label>Time / Score<input value={score} onChange={e => setScore(e.target.value)} placeholder="12:51 / 5+18 / 8/8" /></label>
        <label>RPE<input inputMode="decimal" value={rpe} onChange={e => setRpe(e.target.value)} placeholder="7.5" /></label>
        <label>Main Limiter<input value={limiter} onChange={e => setLimiter(e.target.value)} placeholder="BJO → breathing" /></label>
      </div>
      <label className="v2-result-notes">Notes<textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Teknik kalite, set breakdown, pacing..." /></label>
      <div className="v2-result-actions">
        <button type="button" className="v2-result-cancel" onClick={onCancel}>Vazgeç</button>
        <button type="button" className="v2-result-save" onClick={() => onSave({ dayId, sectionId, sectionTitle, actualLoad, score, rpe, limiter, notes, updatedAt: new Date().toISOString() })}>SAVE RESULT</button>
      </div>
    </div>
  );
}

export default WorkoutDetailV2;
