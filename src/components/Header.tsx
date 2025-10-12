import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Trophy, BookOpen, Target, BarChart3, Palette } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

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
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
  ];

  return (
    <header className="bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧮</span>
            </div>
            <h1 className="text-2xl font-bold text-white">MathQuest</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-white/30 text-white'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Stats & Theme Selector */}
          <div className="flex items-center space-x-4">
            {/* Stars */}
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
              <Star className="text-yellow-300 fill-current" size={20} />
              <span className="text-white font-bold">{userProgress.stars}</span>
            </div>

            {/* Level */}
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
              <Trophy className="text-yellow-300" size={20} />
              <span className="text-white font-bold">Level {userProgress.level}</span>
            </div>

            {/* Theme Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-colors">
                <Palette className="text-white" size={20} />
                <span className="text-white text-sm">{currentTheme.name}</span>
              </button>
              
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-2 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => onThemeChange(theme)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                      currentTheme.name === theme.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-around bg-white/10 rounded-lg p-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === path
                  ? 'bg-white/30 text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;