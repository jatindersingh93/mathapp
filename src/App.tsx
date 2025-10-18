import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Components
import Header from './components/Header';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Games from './pages/Games';
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
  character: string;
  description: string;
  animation: string;
  graphics: {
    particles: string[];
    decorations: string[];
    backgroundElements: string[];
  };
  sounds: {
    success: string;
    click: string;
    background: string;
  };
  effects: {
    buttonHover: string;
    cardAnimation: string;
    transitionEffect: string;
  };
}

const themes: Theme[] = [
  // Original themes updated
  {
    name: 'Ocean Adventure',
    colors: { primary: '#3B82F6', secondary: '#06B6D4', accent: '#10B981' },
    background: 'from-blue-400 via-cyan-400 to-teal-500',
    character: '🐙',
    description: 'Dive deep with friendly sea creatures!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['🫧', '🐠', '🌊', '⭐', '🐚'],
      decorations: ['🪸', '🦑', '🐙', '🐬', '🦈'],
      backgroundElements: ['🌊', '💎', '⚓', '🏝️']
    },
    sounds: {
      success: 'bubble-pop',
      click: 'water-drop',
      background: 'ocean-waves'
    },
    effects: {
      buttonHover: 'scale-110 shadow-blue-300/50',
      cardAnimation: 'hover:rotate-1 hover:scale-105',
      transitionEffect: 'transition-all duration-300 ease-in-out'
    }
  },
  {
    name: 'Jungle Safari',
    colors: { primary: '#10B981', secondary: '#84CC16', accent: '#F59E0B' },
    background: 'from-green-400 via-emerald-400 to-lime-500',
    character: '🦁',
    description: 'Explore the wild with jungle animals!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['🍃', '🌿', '🦋', '✨', '🌺'],
      decorations: ['🐵', '🦜', '🐆', '🦒', '🐘'],
      backgroundElements: ['🌳', '🌴', '🦴', '🪨']
    },
    sounds: {
      success: 'jungle-roar',
      click: 'leaf-rustle',
      background: 'jungle-ambiance'
    },
    effects: {
      buttonHover: 'scale-110 shadow-green-300/50',
      cardAnimation: 'hover:-rotate-1 hover:scale-105',
      transitionEffect: 'transition-all duration-300 ease-bounce'
    }
  },
  {
    name: 'Space Explorer',
    colors: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F97316' },
    background: 'from-purple-500 via-pink-500 to-indigo-600',
    character: '🚀',
    description: 'Blast off to mathematical galaxies!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['⭐', '✨', '🌟', '💫', '🌠'],
      decorations: ['🛸', '👽', '🌍', '🌙', '☄️'],
      backgroundElements: ['🪐', '🌌', '🔭', '🚀']
    },
    sounds: {
      success: 'space-beep',
      click: 'laser-zap',
      background: 'cosmic-ambient'
    },
    effects: {
      buttonHover: 'scale-110 shadow-purple-300/50',
      cardAnimation: 'hover:rotate-2 hover:scale-105',
      transitionEffect: 'transition-all duration-500 ease-out'
    }
  },
  
  // New kid-friendly themes
  {
    name: 'Roblox World',
    colors: { primary: '#00A2FF', secondary: '#FF6B35', accent: '#32CD32' },
    background: 'from-blue-500 via-orange-400 to-green-400',
    character: '🟦',
    description: 'Build your math skills block by block!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['🟦', '🟩', '🟨', '🟪', '🟫'],
      decorations: ['⚡', '💎', '🔧', '⚙️', '🏗️'],
      backgroundElements: ['🧱', '🔲', '🟩', '⬜']
    },
    sounds: {
      success: 'block-place',
      click: 'block-break',
      background: 'building-ambient'
    },
    effects: {
      buttonHover: 'scale-110 shadow-blue-400/50',
      cardAnimation: 'hover:skew-y-1 hover:scale-105',
      transitionEffect: 'transition-all duration-200 ease-linear'
    }
  },
  {
    name: 'Racing Championship',
    colors: { primary: '#FF4444', secondary: '#FFD700', accent: '#32CD32' },
    background: 'from-red-500 via-yellow-400 to-green-500',
    character: '🏎️',
    description: 'Speed through math problems and win!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['💨', '⚡', '🔥', '✨', '💫'],
      decorations: ['🏆', '🥇', '🚩', '⛽', '🛞'],
      backgroundElements: ['🏁', '🛣️', '🚧', '🎯']
    },
    sounds: {
      success: 'engine-rev',
      click: 'tire-screech',
      background: 'race-track'
    },
    effects: {
      buttonHover: 'scale-110 shadow-red-400/50',
      cardAnimation: 'hover:-skew-x-1 hover:scale-105',
      transitionEffect: 'transition-all duration-150 ease-out'
    }
  },
  {
    name: 'Minecraft Adventure',
    colors: { primary: '#8B4513', secondary: '#32CD32', accent: '#4169E1' },
    background: 'from-amber-600 via-green-500 to-blue-500',
    character: '⛏️',
    description: 'Mine for mathematical treasures!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['⛏️', '💎', '🧱', '🌿', '🔥'],
      decorations: ['🗡️', '🛡️', '🏹', '🧪', '📦'],
      backgroundElements: ['🟫', '🟩', '🟦', '⬛']
    },
    sounds: {
      success: 'mine-success',
      click: 'block-hit',
      background: 'cave-ambient'
    },
    effects: {
      buttonHover: 'scale-110 shadow-amber-400/50',
      cardAnimation: 'hover:rotate-1 hover:scale-105',
      transitionEffect: 'transition-all duration-300 ease-in-out'
    }
  },
  {
    name: 'Pokemon Journey',
    colors: { primary: '#FFD700', secondary: '#FF6B35', accent: '#4169E1' },
    background: 'from-yellow-400 via-orange-400 to-blue-500',
    character: '⚡',
    description: 'Catch \'em all - math problems!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['⚡', '🔥', '💧', '🍃', '✨'],
      decorations: ['⚽', '🎒', '🗺️', '🏆', '🎖️'],
      backgroundElements: ['🌱', '🌸', '⭐', '🌈']
    },
    sounds: {
      success: 'pokemon-success',
      click: 'pokeball-throw',
      background: 'pokemon-center'
    },
    effects: {
      buttonHover: 'scale-110 shadow-yellow-400/50',
      cardAnimation: 'hover:-rotate-2 hover:scale-105',
      transitionEffect: 'transition-all duration-400 ease-bounce'
    }
  },
  {
    name: 'Superhero Academy',
    colors: { primary: '#DC143C', secondary: '#4169E1', accent: '#FFD700' },
    background: 'from-red-600 via-blue-600 to-yellow-400',
    character: '🦸‍♂️',
    description: 'Use your math superpowers to save the day!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['⚡', '💥', '✨', '⭐', '🌟'],
      decorations: ['🛡️', '⚔️', '🏆', '🎖️', '👑'],
      backgroundElements: ['🏢', '🌆', '☁️', '🌤️']
    },
    sounds: {
      success: 'hero-power',
      click: 'cape-whoosh',
      background: 'heroic-theme'
    },
    effects: {
      buttonHover: 'scale-110 shadow-red-400/50',
      cardAnimation: 'hover:scale-110 hover:rotate-1',
      transitionEffect: 'transition-all duration-200 ease-out'
    }
  },
  {
    name: 'Princess Castle',
    colors: { primary: '#FF69B4', secondary: '#DDA0DD', accent: '#FFD700' },
    background: 'from-pink-400 via-purple-300 to-yellow-300',
    character: '👸',
    description: 'Solve magical math in a fairy tale kingdom!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['✨', '🌟', '💖', '🦋', '🌸'],
      decorations: ['👑', '💎', '🏰', '🌹', '🦄'],
      backgroundElements: ['🏰', '🌈', '☁️', '🌙']
    },
    sounds: {
      success: 'magic-chime',
      click: 'fairy-sparkle',
      background: 'castle-ambiance'
    },
    effects: {
      buttonHover: 'scale-110 shadow-pink-300/50',
      cardAnimation: 'hover:scale-105 hover:-rotate-1',
      transitionEffect: 'transition-all duration-400 ease-in-out'
    }
  },
  {
    name: 'Ninja Dojo',
    colors: { primary: '#2F4F4F', secondary: '#FF4500', accent: '#FFD700' },
    background: 'from-slate-600 via-orange-500 to-yellow-400',
    character: '🥷',
    description: 'Master the ancient art of mathematics!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['⚡', '🔥', '💨', '⭐', '✨'],
      decorations: ['🗡️', '🏹', '⚔️', '🛡️', '🎯'],
      backgroundElements: ['🏯', '🌙', '⛩️', '🌸']
    },
    sounds: {
      success: 'ninja-strike',
      click: 'sword-slice',
      background: 'dojo-meditation'
    },
    effects: {
      buttonHover: 'scale-110 shadow-slate-400/50',
      cardAnimation: 'hover:skew-x-1 hover:scale-105',
      transitionEffect: 'transition-all duration-150 ease-out'
    }
  },
  {
    name: 'Candy Kingdom',
    colors: { primary: '#FF1493', secondary: '#00CED1', accent: '#ADFF2F' },
    background: 'from-pink-500 via-cyan-400 to-lime-400',
    character: '🍭',
    description: 'Sweet math adventures in candy land!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['🍬', '🍭', '🧁', '🍰', '✨'],
      decorations: ['🎂', '🍪', '🍩', '🧁', '🎈'],
      backgroundElements: ['🏠', '🌈', '☁️', '🎪']
    },
    sounds: {
      success: 'candy-pop',
      click: 'sugar-crunch',
      background: 'candy-shop'
    },
    effects: {
      buttonHover: 'scale-110 shadow-pink-400/50',
      cardAnimation: 'hover:rotate-2 hover:scale-105',
      transitionEffect: 'transition-all duration-300 ease-bounce'
    }
  },
  {
    name: 'Dragon Quest',
    colors: { primary: '#8B0000', secondary: '#FFD700', accent: '#32CD32' },
    background: 'from-red-800 via-yellow-500 to-green-500',
    character: '🐲',
    description: 'Epic mathematical quests with friendly dragons!',
    animation: 'animate-pulse',
    graphics: {
      particles: ['🔥', '⚡', '💎', '✨', '⭐'],
      decorations: ['⚔️', '🛡️', '👑', '💰', '🏆'],
      backgroundElements: ['🏔️', '🏰', '🌋', '🗻']
    },
    sounds: {
      success: 'dragon-roar',
      click: 'fire-breath',
      background: 'medieval-quest'
    },
    effects: {
      buttonHover: 'scale-110 shadow-red-600/50',
      cardAnimation: 'hover:-rotate-1 hover:scale-105',
      transitionEffect: 'transition-all duration-400 ease-out'
    }
  },
  {
    name: 'Robot Factory',
    colors: { primary: '#708090', secondary: '#00BFFF', accent: '#32CD32' },
    background: 'from-slate-500 via-sky-400 to-green-400',
    character: '🤖',
    description: 'Build amazing robots with math equations!',
    animation: 'animate-bounce',
    graphics: {
      particles: ['⚡', '🔧', '⚙️', '💡', '✨'],
      decorations: ['🛠️', '🔩', '⚙️', '🔌', '💻'],
      backgroundElements: ['🏭', '🔧', '⚙️', '🖥️']
    },
    sounds: {
      success: 'robot-beep',
      click: 'mechanical-click',
      background: 'factory-hum'
    },
    effects: {
      buttonHover: 'scale-110 shadow-slate-400/50',
      cardAnimation: 'hover:skew-y-1 hover:scale-105',
      transitionEffect: 'transition-all duration-250 ease-linear'
    }
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
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} font-math relative overflow-hidden`}>
        {/* Animated Background */}
        <AnimatedBackground theme={currentTheme} intensity="medium" />
        
        <Header 
          userProgress={userProgress} 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          themes={themes}
        />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
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
              path="/games" 
              element={<Games userProgress={userProgress} updateProgress={updateProgress} currentTheme={currentTheme} />} 
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
