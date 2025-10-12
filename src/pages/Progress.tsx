import React from 'react';
import { BarChart3, TrendingUp, Award, Star, Target } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface ProgressProps {
  userProgress: UserProgress;
  currentTheme: Theme;
}

const Progress: React.FC<ProgressProps> = ({ userProgress }) => {
  // Mock data for charts and progress tracking
  const weeklyProgress = [
    { day: 'Mon', stars: 5, problems: 12 },
    { day: 'Tue', stars: 8, problems: 15 },
    { day: 'Wed', stars: 6, problems: 10 },
    { day: 'Thu', stars: 10, problems: 18 },
    { day: 'Fri', stars: 7, problems: 14 },
    { day: 'Sat', stars: 12, problems: 22 },
    { day: 'Sun', stars: 9, problems: 16 },
  ];

  const skillProgress = [
    { skill: 'Addition', level: 85, color: 'bg-green-500' },
    { skill: 'Subtraction', level: 72, color: 'bg-blue-500' },
    { skill: 'Multiplication', level: 60, color: 'bg-purple-500' },
    { skill: 'Division', level: 45, color: 'bg-orange-500' },
    { skill: 'Fractions', level: 30, color: 'bg-pink-500' },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', date: '2 weeks ago', icon: '🎯' },
    { title: 'Star Collector', description: 'Earned 50 stars', date: '1 week ago', icon: '⭐' },
    { title: 'Speed Demon', description: 'Solved 10 problems in 60 seconds', date: '3 days ago', icon: '⚡' },
    { title: 'Consistent Learner', description: '7-day learning streak', date: 'Today', icon: '🔥' },
  ];

  const maxStars = Math.max(...weeklyProgress.map(d => d.stars));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <BarChart3 className="text-white mr-4" size={40} />
          Your Progress
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Track your mathematical journey and celebrate your achievements!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-white">{userProgress.stars}</div>
          <div className="text-white/80">Total Stars</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-3xl font-bold text-white">{userProgress.level}</div>
          <div className="text-white/80">Current Level</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-3xl font-bold text-white">{userProgress.completedLessons.length}</div>
          <div className="text-white/80">Lessons Completed</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-white">{userProgress.currentStreak}</div>
          <div className="text-white/80">Day Streak</div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="text-white mr-3" size={28} />
          This Week's Activity
        </h2>
        
        <div className="space-y-4">
          {/* Stars Chart */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Stars Earned Daily</h3>
            <div className="flex items-end justify-between space-x-2 h-32">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg w-full transition-all duration-500 hover:scale-105"
                    style={{ height: `${(day.stars / maxStars) * 100}%`, minHeight: '4px' }}
                  ></div>
                  <div className="text-white/80 text-sm mt-2">{day.day}</div>
                  <div className="text-white font-semibold text-xs">{day.stars}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problems Solved */}
          <div className="grid md:grid-cols-7 gap-2 mt-6">
            <div className="text-white font-semibold text-sm mb-2 md:col-span-7">Problems Solved This Week</div>
            {weeklyProgress.map((day, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-white/80 text-xs">{day.day}</div>
                <div className="text-white font-bold text-lg">{day.problems}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Progress */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Target className="text-white mr-3" size={28} />
          Skill Mastery
        </h2>
        
        <div className="space-y-4">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{skill.skill}</span>
                <span className="text-white/80 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className={`${skill.color} h-3 rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Award className="text-white mr-3" size={28} />
          Recent Achievements
        </h2>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-lg p-4">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{achievement.title}</h3>
                <p className="text-white/80 text-sm">{achievement.description}</p>
              </div>
              <div className="text-white/60 text-xs">{achievement.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Goals */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Star className="text-purple-300 mr-3" size={28} />
          Next Goals
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🎯 Reach Level {userProgress.level + 1}</h3>
            <p className="text-white/80 text-sm">Complete 3 more lessons to advance to the next level</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">⭐ Earn 100 Stars</h3>
            <p className="text-white/80 text-sm">{100 - userProgress.stars} more stars to reach this milestone</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(userProgress.stars / 100) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;