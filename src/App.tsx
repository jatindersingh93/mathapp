import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Components
import Header from './components/Header';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Rewards from './pages/Rewards';

// Types
export interface UserProgress {
  level: number;
  stars: number;
  badges: string[];
  completedLessons: string[];
  currentStreak: number;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  background: string;
}

const themes: Theme[] = [
  {
    name: 'Ocean',
    colors: { primary: '#3B82F6', secondary: '#06B6D4', accent: '#10B981' },
    background: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'Jungle',
    colors: { primary: '#10B981', secondary: '#84CC16', accent: '#F59E0B' },
    background: 'from-green-400 to-emerald-500'
  },
  {
    name: 'Space',
    colors: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F97316' },
    background: 'from-purple-400 to-pink-500'
  }
];

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    stars: 0,
    badges: [],
    completedLessons: [],
    currentStreak: 0
  });

  const updateProgress = (newProgress: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...newProgress }));
  };

  return (
    <Router>
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} font-math`}>
        <Header 
          userProgress={userProgress} 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          themes={themes}
        />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Home userProgress={userProgress} currentTheme={currentTheme} />} 
            />
            <Route 
              path="/lessons" 
              element={<Lessons userProgress={userProgress} updateProgress={updateProgress} currentTheme={currentTheme} />} 
            />
            <Route 
              path="/practice" 
              element={<Practice userProgress={userProgress} updateProgress={updateProgress} currentTheme={currentTheme} />} 
            />
            <Route 
              path="/progress" 
              element={<Progress userProgress={userProgress} currentTheme={currentTheme} />} 
            />
            <Route 
              path="/rewards" 
              element={<Rewards userProgress={userProgress} currentTheme={currentTheme} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
