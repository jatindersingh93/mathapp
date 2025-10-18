import React, { useState } from 'react';
import { BookOpen, Star, ArrowRight, ArrowLeft, Trophy, Heart, Check, X } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface StoryModeProps {
  userProgress: UserProgress;
  updateProgress: (newProgress: Partial<UserProgress>) => void;
  currentTheme: Theme;
}

interface StoryChapter {
  id: string;
  title: string;
  story: string;
  character: string;
  background: string;
  problems: {
    question: string;
    options: number[];
    correct: number;
    explanation: string;
  }[];
}

const StoryMode: React.FC<StoryModeProps> = ({ userProgress, updateProgress }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const chapters: StoryChapter[] = [
    {
      id: 'dragon-cave',
      title: 'The Dragon\'s Treasure Cave',
      story: 'You are a brave knight who discovered a dragon\'s cave filled with golden coins! But the dragon will only let you take treasure if you can solve his mathematical riddles.',
      character: '🐉',
      background: 'from-red-600 to-orange-600',
      problems: [
        {
          question: 'The dragon has 12 gold coins and finds 8 more. How many coins does he have now?',
          options: [18, 20, 22, 16],
          correct: 20,
          explanation: '12 + 8 = 20. The dragon now has 20 golden coins!'
        },
        {
          question: 'If the dragon gives you 5 coins and keeps 15 for himself, how many coins did he start with?',
          options: [20, 25, 18, 22],
          correct: 20,
          explanation: '5 + 15 = 20. The dragon started with 20 coins!'
        },
        {
          question: 'The dragon arranges his coins in 4 rows with 6 coins each. How many coins in total?',
          options: [20, 24, 26, 22],
          correct: 24,
          explanation: '4 × 6 = 24. There are 24 coins arranged in the rows!'
        }
      ]
    },
    {
      id: 'space-adventure',
      title: 'Mission to Planet Math',
      story: 'You are an astronaut on a mission to Planet Math! The friendly aliens need your help to fix their broken calculator by solving math problems.',
      character: '👽',
      background: 'from-purple-600 to-blue-600',
      problems: [
        {
          question: 'Your spaceship travels 25 miles, then 17 more miles. How far have you traveled?',
          options: [40, 42, 45, 38],
          correct: 42,
          explanation: '25 + 17 = 42 miles. Great navigation, astronaut!'
        },
        {
          question: 'You need to distribute 36 energy crystals equally among 6 alien friends. How many does each get?',
          options: [5, 6, 7, 8],
          correct: 6,
          explanation: '36 ÷ 6 = 6. Each alien friend gets 6 energy crystals!'
        },
        {
          question: 'The aliens show you 3 groups of 8 stars each. How many stars do you see?',
          options: [21, 24, 26, 28],
          correct: 24,
          explanation: '3 × 8 = 24. You see 24 beautiful stars!'
        }
      ]
    },
    {
      id: 'underwater-kingdom',
      title: 'The Underwater Kingdom',
      story: 'Dive deep into the ocean where you meet a wise octopus who guards the underwater kingdom. Help solve riddles to earn magical pearls!',
      character: '🐙',
      background: 'from-blue-600 to-cyan-600',
      problems: [
        {
          question: 'The octopus has 8 arms, and his friend has 6 arms. How many arms do they have together?',
          options: [12, 14, 16, 18],
          correct: 14,
          explanation: '8 + 6 = 14. Together they have 14 arms!'
        },
        {
          question: 'You find 21 pearls and want to share them equally with 2 friends. How many pearls each?',
          options: [6, 7, 8, 9],
          correct: 7,
          explanation: '21 ÷ 3 = 7. You and your 2 friends each get 7 pearls!'
        },
        {
          question: 'The kingdom has 5 coral gardens with 9 fish in each. How many fish total?',
          options: [40, 45, 50, 55],
          correct: 45,
          explanation: '5 × 9 = 45. There are 45 colorful fish in the coral gardens!'
        }
      ]
    }
  ];

  const currentStory = chapters[currentChapter];
  const currentQ = currentStory.problems[currentProblem];

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === currentQ.correct) {
      setScore(score + 10);
    } else {
      setHearts(hearts - 1);
    }
  };

  const nextProblem = () => {
    if (currentProblem < currentStory.problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
    } else if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentProblem(0);
    } else {
      // Story complete!
      const starsEarned = Math.floor(score / 5);
      updateProgress({
        stars: userProgress.stars + starsEarned,
        completedLessons: [...userProgress.completedLessons, 'story-mode']
      });
    }
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetStory = () => {
    setCurrentChapter(0);
    setCurrentProblem(0);
    setScore(0);
    setHearts(3);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (hearts <= 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-3xl font-bold text-white mb-4">Story Paused</h2>
          <p className="text-white/90 mb-6">
            Don't worry! Every hero faces challenges. Take a break and try again when you're ready!
          </p>
          <button
            onClick={resetStory}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Start New Adventure
          </button>
        </div>
      </div>
    );
  }

  if (currentChapter >= chapters.length) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Adventure Complete!</h2>
          <p className="text-white/90 mb-6">
            Congratulations! You've completed all the mathematical adventures and helped all the characters!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-white/80">Total Score</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{Math.floor(score / 5)}</div>
              <div className="text-white/80 flex items-center justify-center">
                <Star className="text-yellow-400 fill-current mr-1" size={16} />
                Stars Earned
              </div>
            </div>
          </div>

          <button
            onClick={resetStory}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <Trophy className="inline mr-2" size={20} />
            Start New Adventure
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Story Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <BookOpen className="text-white mr-4" size={40} />
          Math Story Adventures
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Embark on magical journeys where math helps you solve real adventures! 📚✨
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-semibold">Adventure Progress</span>
          <div className="flex items-center space-x-4">
            {/* Hearts */}
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`${i < hearts ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                  size={20}
                />
              ))}
            </div>
            {/* Score */}
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="text-white font-bold">{score}</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentChapter * 3 + currentProblem + 1) / (chapters.length * 3)) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {/* Story Content */}
      <div className={`bg-gradient-to-br ${currentStory.background} rounded-xl p-6 text-white`}>
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{currentStory.character}</div>
          <h2 className="text-2xl font-bold mb-3">{currentStory.title}</h2>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
            {currentStory.story}
          </p>
        </div>
      </div>

      {/* Math Problem */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Challenge {currentProblem + 1} of {currentStory.problems.length}
          </h3>
          <p className="text-lg text-white/90 mb-6">
            {currentQ.question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswer(option)}
              disabled={showExplanation}
              className={`p-4 text-xl font-bold rounded-xl transition-all duration-200 ${
                selectedAnswer === option
                  ? option === currentQ.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : showExplanation && option === currentQ.correct
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30 transform hover:scale-105'
              }`}
            >
              {option}
              {selectedAnswer === option && (
                <span className="ml-2">
                  {option === currentQ.correct ? <Check size={24} /> : <X size={24} />}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <p className="text-white font-medium">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        {showExplanation && (
          <div className="flex justify-center">
            <button
              onClick={nextProblem}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center"
            >
              {currentProblem < currentStory.problems.length - 1 
                ? 'Next Challenge' 
                : currentChapter < chapters.length - 1 
                ? 'Next Chapter' 
                : 'Complete Adventure'
              }
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Chapter Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            if (currentChapter > 0) {
              setCurrentChapter(currentChapter - 1);
              setCurrentProblem(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
            }
          }}
          disabled={currentChapter === 0}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center"
        >
          <ArrowLeft className="mr-2" size={20} />
          Previous Chapter
        </button>

        <div className="text-white text-center">
          <div className="text-sm opacity-80">Chapter</div>
          <div className="font-bold">{currentChapter + 1} of {chapters.length}</div>
        </div>

        <button
          onClick={() => {
            if (currentChapter < chapters.length - 1) {
              setCurrentChapter(currentChapter + 1);
              setCurrentProblem(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
            }
          }}
          disabled={currentChapter === chapters.length - 1}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center"
        >
          Next Chapter
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default StoryMode;