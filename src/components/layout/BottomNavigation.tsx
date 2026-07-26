import type { Page } from '../../types/navigation';

type BottomNavigationProps = {
  activePage: Page;
  onChangePage: (page: Page) => void;
};

const navigationItems: {
  page: Page;
  label: string;
  icon: string;
}[] = [
  { page: 'home', label: 'Home', icon: '⌂' },
  { page: 'program', label: 'Program', icon: '▤' },
  { page: 'timer', label: 'Timer', icon: '◷' },
  { page: 'library', label: 'Movements', icon: '◇' },
  { page: 'pr', label: 'PR', icon: '◆' },
];

function BottomNavigation({
  activePage,
  onChangePage,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-navigation">
      {navigationItems.map((item) => (
        <button
          type="button"
          className={
            activePage === item.page ? 'active' : ''
          }
          key={item.page}
          onClick={() => onChangePage(item.page)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavigation;
