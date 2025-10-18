import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Trophy, BookOpen, Target, BarChart3, Palette, Gamepad2 } from 'lucide-react';
import type { UserProgress, Theme } from '../App';
import VolumeControl from './VolumeControl';

interface HeaderProps {
  userProgress: UserProgress;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  themes: Theme[];
}

const Header: React.FC<HeaderProps> = ({ userProgress, currentTheme, onThemeChange, themes }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: BookOpen, label: 'Home' },
    { path: '/lessons', icon: Target, label: 'Lessons' },
    { path: '/practice', icon: Star, label: 'Practice' },
    { path: '/games', icon: Gamepad2, label: 'Games' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
  ];

  return (
    <header className="bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🧮</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">MathQuest</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-white/30 text-white'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Stats & Theme Selector */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Stars - Hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-2 rounded-lg">
              <Star className="text-yellow-300 fill-current" size={16} />
              <span className="text-white font-bold text-sm">{userProgress.stars}</span>
            </div>

            {/* Level */}
            <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-2 rounded-lg">
              <Trophy className="text-yellow-300" size={16} />
              <span className="text-white font-bold text-xs sm:text-sm">L{userProgress.level}</span>
            </div>

            {/* Theme Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-white/30 transition-colors">
                <div className={`text-lg sm:text-2xl ${currentTheme.animation}`}>{currentTheme.character}</div>
                <div className="hidden md:block text-left">
                  <div className="text-white text-xs sm:text-sm font-medium">{currentTheme.name}</div>
                  <div className="text-white/70 text-xs hidden lg:block">{currentTheme.description}</div>
                </div>
                <Palette className="text-white" size={14} />
              </button>
              
              {/* Responsive theme dropdown */}
              <div className="absolute right-0 sm:right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-2 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-72 sm:w-80 max-h-80 sm:max-h-96 overflow-y-auto z-50 transform scale-95 group-hover:scale-100 theme-dropdown">
                <div className="text-gray-800 font-bold text-center py-2 border-b text-sm">Choose Your Adventure!</div>
                <div className="grid grid-cols-1 gap-1 sm:gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => onThemeChange(theme)}
                      className={`w-full text-left px-2 sm:px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 ${
                        currentTheme.name === theme.name ? 'bg-blue-50 border-2 border-blue-300' : 'border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`text-xl sm:text-2xl ${theme.animation}`}>{theme.character}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 text-sm truncate">{theme.name}</div>
                          <div className="text-xs text-gray-600 leading-tight line-clamp-2">{theme.description}</div>
                        </div>
                        {currentTheme.name === theme.name && (
                          <div className="text-blue-600 font-bold flex-shrink-0">✓</div>
                        )}
                      </div>
                      <div className={`h-2 sm:h-3 rounded-full mt-1 sm:mt-2 bg-gradient-to-r ${theme.background} opacity-70`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex-shrink-0">
              <VolumeControl theme={currentTheme} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-2 sm:mt-4 flex justify-around bg-white/10 rounded-lg p-1 sm:p-2 overflow-x-auto">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-1 sm:px-2 py-2 rounded-lg transition-all duration-200 flex-shrink-0 min-w-0 ${
                location.pathname === path
                  ? 'bg-white/30 text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;