import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Trophy, TrendingUp, Star, Award } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface HomeProps {
  userProgress: UserProgress;
  currentTheme: Theme;
}

const Home: React.FC<HomeProps> = ({ userProgress }) => {
  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Pick up where you left off',
      icon: BookOpen,
      path: '/lessons',
      color: 'bg-blue-500',
    },
    {
      title: 'Practice Mode',
      description: 'Sharpen your skills',
      icon: Target,
      path: '/practice',
      color: 'bg-green-500',
    },
    {
      title: 'View Progress',
      description: 'See how far you\'ve come',
      icon: TrendingUp,
      path: '/progress',
      color: 'bg-purple-500',
    },
    {
      title: 'Collect Rewards',
      description: 'Check your achievements',
      icon: Trophy,
      path: '/rewards',
      color: 'bg-yellow-500',
    },
  ];

  const recentAchievements = [
    'Addition Master',
    'Problem Solver',
    '7-Day Streak',
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4">
            <span className="text-4xl">🎯</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to MathQuest!
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Embark on an exciting mathematical adventure where learning meets fun.
          Solve problems, earn stars, and become a math champion!
        </p>

        {/* Progress Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Star className="text-yellow-300 fill-current" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{userProgress.stars}</div>
            <div className="text-sm text-white/80">Stars</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="text-yellow-300" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{userProgress.level}</div>
            <div className="text-sm text-white/80">Level</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Award className="text-purple-300" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{userProgress.badges.length}</div>
            <div className="text-sm text-white/80">Badges</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Target className="text-green-300" size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{userProgress.currentStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
              <p className="text-white/80">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Award className="text-yellow-300 mr-3" size={28} />
            Recent Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300/30 rounded-lg p-4 text-center"
              >
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-white font-semibold">{achievement}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Challenge */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Target className="text-purple-300 mr-3" size={28} />
          Daily Challenge
        </h2>
        <p className="text-white/90 mb-4">
          Complete today's special challenge to earn bonus stars!
        </p>
        <div className="bg-white/20 rounded-lg p-4 mb-4">
          <div className="text-lg text-white font-medium">
            Solve 5 multiplication problems in under 2 minutes
          </div>
          <div className="text-sm text-white/80 mt-1">
            Reward: 10 bonus stars ⭐
          </div>
        </div>
        <Link
          to="/practice"
          className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Start Challenge
        </Link>
      </div>
    </div>
  );
};

export default Home;