import React, { useState } from 'react';
import { BookOpen, CheckCircle, Lock, Star, Play } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface LessonsProps {
  userProgress: UserProgress;
  updateProgress: (newProgress: Partial<UserProgress>) => void;
  currentTheme: Theme;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  topics: string[];
  isCompleted: boolean;
  isLocked: boolean;
  stars: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Lessons: React.FC<LessonsProps> = ({ userProgress, updateProgress }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const lessons: Lesson[] = [
    {
      id: 'addition-basics',
      title: 'Addition Basics',
      description: 'Learn to add numbers up to 20',
      level: 1,
      topics: ['Single digit addition', 'Adding with pictures', 'Number line'],
      isCompleted: userProgress.completedLessons.includes('addition-basics'),
      isLocked: false,
      stars: 3,
      difficulty: 'Easy'
    },
    {
      id: 'subtraction-basics',
      title: 'Subtraction Basics',
      description: 'Master subtraction with fun examples',
      level: 1,
      topics: ['Taking away', 'Difference', 'Number patterns'],
      isCompleted: userProgress.completedLessons.includes('subtraction-basics'),
      isLocked: !userProgress.completedLessons.includes('addition-basics'),
      stars: 3,
      difficulty: 'Easy'
    },
    {
      id: 'multiplication-intro',
      title: 'Multiplication Magic',
      description: 'Discover the power of multiplication',
      level: 2,
      topics: ['Times tables', 'Arrays', 'Repeated addition'],
      isCompleted: userProgress.completedLessons.includes('multiplication-intro'),
      isLocked: userProgress.level < 2,
      stars: 4,
      difficulty: 'Medium'
    },
    {
      id: 'division-basics',
      title: 'Division Discovery',
      description: 'Learn to share and divide equally',
      level: 2,
      topics: ['Equal groups', 'Sharing', 'Division facts'],
      isCompleted: userProgress.completedLessons.includes('division-basics'),
      isLocked: !userProgress.completedLessons.includes('multiplication-intro'),
      stars: 4,
      difficulty: 'Medium'
    },
    {
      id: 'fractions-intro',
      title: 'Fraction Fun',
      description: 'Understanding parts of a whole',
      level: 3,
      topics: ['Halves and quarters', 'Comparing fractions', 'Mixed numbers'],
      isCompleted: userProgress.completedLessons.includes('fractions-intro'),
      isLocked: userProgress.level < 3,
      stars: 5,
      difficulty: 'Hard'
    },
    {
      id: 'algebra-basics',
      title: 'Algebra Adventure',
      description: 'Solve for the unknown variable',
      level: 4,
      topics: ['Missing numbers', 'Simple equations', 'Pattern recognition'],
      isCompleted: userProgress.completedLessons.includes('algebra-basics'),
      isLocked: userProgress.level < 4,
      stars: 5,
      difficulty: 'Hard'
    }
  ];

  const startLesson = (lesson: Lesson) => {
    if (lesson.isLocked) return;
    
    // Simulate lesson completion
    if (!lesson.isCompleted) {
      updateProgress({
        stars: userProgress.stars + lesson.stars,
        completedLessons: [...userProgress.completedLessons, lesson.id],
        level: Math.max(userProgress.level, Math.ceil(lesson.level))
      });
    }
    setSelectedLesson(lesson);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-100';
      case 'Medium': return 'text-yellow-500 bg-yellow-100';
      case 'Hard': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <BookOpen className="text-white mr-4" size={40} />
          Math Lessons
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Explore interactive lessons designed to make learning math fun and engaging!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Your Progress</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{userProgress.completedLessons.length}</div>
            <div className="text-white/80">Lessons Completed</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{userProgress.level}</div>
            <div className="text-white/80">Current Level</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{lessons.length - userProgress.completedLessons.length}</div>
            <div className="text-white/80">Lessons Remaining</div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${
              lesson.isLocked 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:bg-white/20 cursor-pointer transform hover:scale-105'
            }`}
            onClick={() => startLesson(lesson)}
          >
            {/* Lesson Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {lesson.isCompleted ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : lesson.isLocked ? (
                  <Lock className="text-gray-400" size={24} />
                ) : (
                  <Play className="text-blue-400" size={24} />
                )}
                <span className="text-sm font-medium text-white/80">Level {lesson.level}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
            </div>

            {/* Lesson Content */}
            <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
            <p className="text-white/80 mb-4">{lesson.description}</p>

            {/* Topics */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white/90 mb-2">What you'll learn:</h4>
              <ul className="space-y-1">
                {lesson.topics.map((topic, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-center">
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full mr-2"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stars & Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(lesson.stars)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
                <span className="text-white/80 text-sm ml-2">{lesson.stars} stars</span>
              </div>
              
              {!lesson.isLocked && (
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    lesson.isCompleted
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {lesson.isCompleted ? 'Completed' : 'Start Lesson'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedLesson.title}</h3>
            <p className="text-gray-600 mb-6">
              {selectedLesson.isCompleted 
                ? "You've already completed this lesson! Great job!" 
                : "Lesson completed! You've earned stars and unlocked new content."}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {!selectedLesson.isCompleted && (
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Continue Learning
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;