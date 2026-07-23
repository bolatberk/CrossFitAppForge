const trainingDays = [
  {
    day: 'DAY A',
    title: 'Olympic Speed & Gymnastics',
    duration: '80–90 dk',
    focus: 'Snatch · Strict Pull-up · Engine',
  },
  {
    day: 'DAY B',
    title: 'Upper Pull & Threshold',
    duration: '70–80 dk',
    focus: 'Push Press · T2B · Row',
  },
  {
    day: 'DAY C',
    title: 'Competition Day',
    duration: '80–90 dk',
    focus: 'Front Squat · Push Jerk · Metcon',
  },
  {
    day: 'DAY D',
    title: 'Optional Home Session',
    duration: '45–55 dk',
    focus: 'Skill · Strength · Conditioning',
  },
]

export default function Program() {
  return (
    <main className="page">
      <section className="page-header">
        <p className="eyebrow">FOUNDATION BUILD</p>
        <h1>Week 1 Programı</h1>
        <p>
          Bu hafta teknik kalite, sürdürülebilir tempo ve temel kuvvet
          korunacak.
        </p>
      </section>

      <section className="program-list">
        {trainingDays.map((trainingDay) => (
          <article className="program-card" key={trainingDay.day}>
            <div className="program-card-top">
              <span>{trainingDay.day}</span>
              <strong>{trainingDay.duration}</strong>
            </div>

            <h2>{trainingDay.title}</h2>
            <p>{trainingDay.focus}</p>

            <button>Günü aç</button>
          </article>
        ))}
      </section>
    </main>
  )
}
