import { useState } from 'react';
import Header from './components/Header';
import Station from './components/Station';
import TestProgress from './components/TestStats';
import Admin from './components/Admin';
import { stations } from './data/stations';
import { Mode, TestStats } from './types';

function App() {
  const [mode, setMode] = useState<Mode>('learn');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [testStats, setTestStats] = useState<TestStats>({
    totalQuestions: stations.reduce((acc, station) => acc + station.items.length, 0),
    answeredQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    correctPercentage: 0,
  });

  const handleItemComplete = (stationId: number, itemId: number, correct?: boolean) => {
    if (mode === 'test' && typeof correct === 'boolean') {
      setTestStats(prev => {
        const newStats = {
          ...prev,
          answeredQuestions: prev.answeredQuestions + 1,
          correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
          wrongAnswers: correct ? prev.wrongAnswers : prev.wrongAnswers + 1,
        };
        newStats.correctPercentage = Math.round(
          (newStats.correctAnswers / newStats.answeredQuestions) * 100
        );
        return newStats;
      });
    }

    setCompletedItems(prev => {
      const key = `${stationId}-${itemId}`;
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setCompletedItems(new Set());
    if (newMode === 'test') {
      setTestStats({
        totalQuestions: stations.reduce((acc, station) => acc + station.items.length, 0),
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        correctPercentage: 0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentMode={mode} onModeChange={handleModeChange} />
      
      <main className="container mx-auto px-4 py-8">
        {mode === 'admin' ? (
          <Admin />
        ) : (
          <div className="max-w-4xl mx-auto">
            {mode === 'test' && <TestProgress stats={testStats} />}
            
            <div className="space-y-8">
              {stations.map((station) => (
                <Station
                  key={station.id}
                  station={station}
                  mode={mode}
                  completedItems={completedItems}
                  onItemComplete={handleItemComplete}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;