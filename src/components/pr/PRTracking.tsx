const personalRecords = [
    ['Back Squat', '110 kg'],
    ['Front Squat', '105 kg'],
    ['Clean', '90 kg'],
    ['Clean & Jerk', '80 kg'],
    ['Snatch', '70 kg'],
    ['Push Press', '80 kg'],
  ];
  
  function PRTracking() {
    return (
      <main className="page">
        <section className="page-header">
          <p className="eyebrow">PR & PACER</p>
          <h1>Kişisel Rekorlar</h1>
          <p>
            Kuvvet ve olimpik kaldırış kayıtlarının
            merkezi.
          </p>
        </section>
  
        <section className="pr-list">
          {personalRecords.map(([movement, value]) => (
            <article
              className="pr-card"
              key={movement}
            >
              <div>
                <span>1RM</span>
                <h2>{movement}</h2>
              </div>
  
              <strong>{value}</strong>
            </article>
          ))}
        </section>
      </main>
    );
  }
  
  export default PRTracking;
  
