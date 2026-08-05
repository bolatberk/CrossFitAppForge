import { useMemo, useState } from 'react';

import HomePage from './components/home/HomePage';
import BottomNavigation from './components/layout/BottomNavigation';
import Header from './components/layout/Header';
import PRTracking from './components/pr/PRTracking';
import ProgramPage from './components/program/ProgramPage';
import WorkoutDetail from './components/program/WorkoutDetail';
import { useProgram } from './hooks/useProgram';
import { useProgress } from './hooks/useProgress';
import MovementLibrary from './pages/MovementLibrary';
import Timer from './pages/Timer';
import type { Page } from './types/navigation';
import type { TrainingDay } from './types/training';

import './App.css';

function App() {
  const [activePage, setActivePage] =
    useState<Page>('home');

  const [selectedDayId, setSelectedDayId] =
    useState<string | null>(null);

  const {
    activeWeek,
    availableWeeks,
    selectWeek,
  } = useProgram(1);

  const trainingDays = activeWeek.days;

  const {
    progress,
    completedDayIds,
    completedDayCount,
    nextDay,
    toggleSection,
  } = useProgress(trainingDays);

  const selectedDay =
    trainingDays.find(
      day => day.id === selectedDayId
    ) ?? null;

  const nextDayAfterSelected = useMemo(() => {
    if (!selectedDay) {
      return null;
    }

    const selectedDayIndex =
      trainingDays.findIndex(
        day => day.id === selectedDay.id
      );

    return selectedDayIndex >= 0
      ? trainingDays[selectedDayIndex + 1] ??
          null
      : null;
  }, [selectedDay, trainingDays]);

  function openDay(day: TrainingDay) {
    setSelectedDayId(day.id);
    setActivePage('program');
  }

  function openProgram() {
    setSelectedDayId(null);
    setActivePage('program');
  }

  function goHome() {
    setSelectedDayId(null);
    setActivePage('home');
  }

  function changePage(page: Page) {
    setSelectedDayId(null);
    setActivePage(page);
  }

  function changeWeek(weekNumber: number) {
    selectWeek(weekNumber);
    setSelectedDayId(null);
    setActivePage('home');
  }

  return (
    <div className="app-shell">
      <Header
        activeWeek={activeWeek}
        availableWeeks={availableWeeks}
        onSelectWeek={changeWeek}
        onGoHome={goHome}
      />

      {activePage === 'home' && (
        <HomePage
          activeWeek={activeWeek}
          completedDayCount={completedDayCount}
          nextDay={nextDay}
          onOpenDay={openDay}
        />
      )}

      {activePage === 'program' &&
        !selectedDay && (
          <ProgramPage
            activeWeek={activeWeek}
            availableWeeks={availableWeeks}
            completedDayIds={completedDayIds}
            onSelectWeek={changeWeek}
            onOpenDay={openDay}
          />
        )}

      {activePage === 'program' &&
        selectedDay && (
          <WorkoutDetail
            day={selectedDay}
            completedSectionIds={
              progress.completedSections[
                selectedDay.id
              ] ?? []
            }
            isDayCompleted={completedDayIds.includes(
              selectedDay.id
            )}
            nextDay={nextDayAfterSelected}
            onBack={openProgram}
            onToggleSection={sectionId =>
              toggleSection(
                selectedDay.id,
                sectionId
              )
            }
            onOpenNextDay={openDay}
          />
        )}

      {activePage === 'timer' && (
        <Timer onBack={goHome} />
      )}

      {activePage === 'library' && (
        <MovementLibrary onBack={goHome} />
      )}

      {activePage === 'pr' && <PRTracking />}

      <BottomNavigation
        activePage={activePage}
        onChangePage={changePage}
      />
    </div>
  );
}

export default App;
