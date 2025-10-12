import React from 'react';
import { Trophy, Award, Star, Medal, Gift, Lock } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface RewardsProps {
  userProgress: UserProgress;
  currentTheme: Theme;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  isEarned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
}

const Rewards: React.FC<RewardsProps> = ({ userProgress }) => {
  const badges: Badge[] = [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      requirement: 'Complete 1 lesson',
      isEarned: userProgress.completedLessons.length >= 1,
      rarity: 'common'
    },
    {
      id: 'star-collector',
      name: 'Star Collector',
      description: 'Collect your first 10 stars',
      icon: '⭐',
      requirement: 'Earn 10 stars',
      isEarned: userProgress.stars >= 10,
      rarity: 'common'
    },
    {
      id: 'addition-master',
      name: 'Addition Master',
      description: 'Master addition skills',
      icon: '➕',
      requirement: 'Complete addition lessons',
      isEarned: userProgress.completedLessons.includes('addition-basics'),
      rarity: 'rare'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Solve 15 problems in 60 seconds',
      icon: '⚡',
      requirement: 'Score 15+ in practice mode',
      isEarned: userProgress.stars >= 30, // Mock condition
      rarity: 'epic'
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      requirement: '7-day consecutive streak',
      isEarned: userProgress.currentStreak >= 7,
      rarity: 'epic'
    },
    {
      id: 'math-champion',
      name: 'Math Champion',
      description: 'Reach level 5 and master all basics',
      icon: '👑',
      requirement: 'Reach level 5',
      isEarned: userProgress.level >= 5,
      rarity: 'legendary'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'lesson-completionist',
      title: 'Lesson Completionist',
      description: 'Complete 10 lessons',
      icon: '📚',
      points: 50,
      isCompleted: userProgress.completedLessons.length >= 10,
      progress: userProgress.completedLessons.length,
      maxProgress: 10
    },
    {
      id: 'star-hoarder',
      title: 'Star Hoarder',
      description: 'Collect 100 stars',
      icon: '🌟',
      points: 100,
      isCompleted: userProgress.stars >= 100,
      progress: userProgress.stars,
      maxProgress: 100
    },
    {
      id: 'level-climber',
      title: 'Level Climber',
      description: 'Reach level 10',
      icon: '🏔️',
      points: 200,
      isCompleted: userProgress.level >= 10,
      progress: userProgress.level,
      maxProgress: 10
    },
    {
      id: 'practice-guru',
      title: 'Practice Guru',
      description: 'Complete 50 practice sessions',
      icon: '🎯',
      points: 75,
      isCompleted: false, // Mock condition
      progress: 23, // Mock progress
      maxProgress: 50
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-100';
      case 'rare': return 'border-blue-400 bg-blue-100';
      case 'epic': return 'border-purple-400 bg-purple-100';
      case 'legendary': return 'border-yellow-400 bg-yellow-100';
      default: return 'border-gray-400 bg-gray-100';
    }
  };

  const earnedBadges = badges.filter(badge => badge.isEarned);
  const totalPoints = achievements.filter(a => a.isCompleted).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Trophy className="text-white mr-4" size={40} />
          Rewards & Achievements
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Celebrate your mathematical milestones and show off your badges!
        </p>
      </div>

      {/* Rewards Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-3xl font-bold text-white">{earnedBadges.length}</div>
          <div className="text-white/80">Badges Earned</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-3xl font-bold text-white">{achievements.filter(a => a.isCompleted).length}</div>
          <div className="text-white/80">Achievements</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">💎</div>
          <div className="text-3xl font-bold text-white">{totalPoints}</div>
          <div className="text-white/80">Total Points</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-3xl font-bold text-white">{Math.round((earnedBadges.length / badges.length) * 100)}%</div>
          <div className="text-white/80">Collection Rate</div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Award className="text-white mr-3" size={28} />
          Badge Collection
        </h2>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                badge.isEarned
                  ? `${getRarityColor(badge.rarity)} transform hover:scale-105`
                  : 'bg-gray-600/20 border-gray-600 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {badge.isEarned ? badge.icon : '🔒'}
                </div>
                <h3 className={`font-bold mb-1 ${badge.isEarned ? 'text-gray-800' : 'text-white/60'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm mb-2 ${badge.isEarned ? 'text-gray-600' : 'text-white/50'}`}>
                  {badge.description}
                </p>
                <div className={`text-xs ${badge.isEarned ? 'text-gray-500' : 'text-white/40'}`}>
                  {badge.requirement}
                </div>
                {badge.isEarned && (
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      badge.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                      badge.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                      badge.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {badge.rarity.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Progress */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Medal className="text-white mr-3" size={28} />
          Achievement Progress
        </h2>
        
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.isCompleted
                  ? 'bg-green-500/20 border-green-400/50'
                  : 'bg-white/10 border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold">{achievement.title}</h3>
                    <p className="text-white/80 text-sm">{achievement.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{achievement.points} pts</div>
                  {achievement.isCompleted && (
                    <div className="text-green-400 text-sm">✓ Completed</div>
                  )}
                </div>
              </div>
              
              {!achievement.isCompleted && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-white/80 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Special Rewards */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Gift className="text-yellow-300 mr-3" size={28} />
          Special Rewards
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-2xl">🎨</div>
              <div>
                <h3 className="text-white font-semibold">Custom Avatar</h3>
                <p className="text-white/80 text-sm">Unlock at level 5</p>
              </div>
            </div>
            {userProgress.level >= 5 ? (
              <div className="text-green-400 text-sm">✓ Unlocked!</div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="text-white/60" size={16} />
                <span className="text-white/60 text-sm">Level {5 - userProgress.level} more to unlock</span>
              </div>
            )}
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-2xl">🏆</div>
              <div>
                <h3 className="text-white font-semibold">Premium Theme</h3>
                <p className="text-white/80 text-sm">Unlock with 100 stars</p>
              </div>
            </div>
            {userProgress.stars >= 100 ? (
              <div className="text-green-400 text-sm">✓ Unlocked!</div>
            ) : (
              <div className="flex items-center space-x-2">
                <Star className="text-white/60" size={16} />
                <span className="text-white/60 text-sm">{100 - userProgress.stars} stars needed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;