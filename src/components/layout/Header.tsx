import type { TrainingWeek } from '../../types/training';

type HeaderProps = {
  activeWeek: TrainingWeek;
};

function Header({ activeWeek }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-container">
        <div className="brand-logo">F</div>

        <div>
          <span className="brand-mark">FORGE</span>
          <p>Performance Training</p>
        </div>
      </div>

      <div className="week-chip">
        <span>Block {activeWeek.block}</span>
        <strong>W{activeWeek.week}</strong>
      </div>
    </header>
  );
}

export default Header;
