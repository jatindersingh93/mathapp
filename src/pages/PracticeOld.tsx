import React, { useState, useEffect const Practice: React.FC<PracticeProps> = ({ userProgress, updateProgress }) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [totalProblems, setTotalProblems] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [problemStartTime, setProblemStartTime] = useState<number>(0);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  
  // Results tracking
  const [problemResults, setProblemResults] = useState<ProblemResult[]>([]);
  
  // Settings
  const [settings, setSettings] = useState<PracticeSettings>({
    timerEnabled: true,
    timeLimit: 60,
    maxAttempts: 3,
    showDetailedResults: true,
    selectedOperation: 'addition'
  });act';
import { Target, Clock, Check, X, RotateCcw, Star, Zap, Trophy, Gift, Settings, Eye, Timer, Users } from 'lucide-react';
import type { UserProgress, Theme } from '../App';

interface PracticeProps {
  userProgress: UserProgress;
  updateProgress: (newProgress: Partial<UserProgress>) => void;
  currentTheme: Theme;
}

interface MathProblem {
  id: string;
  question: string;
  answer: number;
  options: number[];
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
}

interface ProblemResult {
  id: string;
  question: string;
  correctAnswer: number;
  userAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
  attempts: number;
}

interface PracticeSettings {
  timerEnabled: boolean;
  timeLimit: number;
  maxAttempts: number;
  showDetailedResults: boolean;
  selectedOperation: string;
}

const Practice: React.FC<PracticeProps> = ({ userProgress, updateProgress }) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [totalProblems, setTotalProblems] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<string>('addition');

  // Generate random math problem
  const generateProblem = (): MathProblem => {
    const operations = ['addition', 'subtraction', 'multiplication', 'division'];
    const operation = selectedOperation === 'mixed' 
      ? operations[Math.floor(Math.random() * operations.length)]
      : selectedOperation;

    let num1: number, num2: number, answer: number, question: string;

    switch (operation) {
      case 'addition':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case 'subtraction':
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        question = `${num1} - ${num2} = ?`;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
      case 'division':
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        question = `${num1} ÷ ${num2} = ?`;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
        question = '1 + 1 = ?';
    }

    // Generate wrong options
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      question,
      answer,
      options,
      operation: operation as any
    };
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setScore(0);
    setTotalProblems(0);
    setTimeLeft(60);
    setCurrentProblem(generateProblem());
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null || !currentProblem) return;

    setSelectedAnswer(answer);
    const correct = answer === currentProblem.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTotalProblems(totalProblems + 1);

    // Move to next problem after delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentProblem(generateProblem());
    }, 1500);
  };

  // Timer effect
  useEffect(() => {
    let timer: number;
    if (gameStarted && !gameFinished && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setGameFinished(true);
      setGameStarted(false);
      
      // Update user progress
      const starsEarned = Math.floor(score / 2);
      updateProgress({
        stars: userProgress.stars + starsEarned,
        currentStreak: userProgress.currentStreak + (score > 5 ? 1 : 0)
      });
    }
    return () => clearTimeout(timer);
  }, [gameStarted, gameFinished, timeLeft, score, userProgress, updateProgress]);

  const operationOptions = [
    { value: 'addition', label: 'Addition ➕', emoji: '➕' },
    { value: 'subtraction', label: 'Subtraction ➖', emoji: '➖' },
    { value: 'multiplication', label: 'Multiplication ✖️', emoji: '✖️' },
    { value: 'division', label: 'Division ➗', emoji: '➗' },
    { value: 'mixed', label: 'Mixed Practice 🎲', emoji: '🎲' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Target className="text-white mr-4" size={40} />
          Practice Mode
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Test your skills with timed math challenges and earn stars!
        </p>
      </div>

      {!gameStarted && !gameFinished && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Operation Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your Challenge</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {operationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedOperation(option.value)}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    selectedOperation === option.value
                      ? 'bg-white/30 border-2 border-white/50'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="text-white font-semibold">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Game */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Ready to Practice?</h3>
            <p className="text-white/80 mb-6">
              You'll have 60 seconds to solve as many problems as possible!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Start Practice
            </button>
          </div>
        </div>
      )}

      {gameStarted && currentProblem && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Header */}
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-lg font-bold">Score: {score}</span>
              </div>
              <div className="text-white">
                <span className="text-lg font-bold">Problems: {totalProblems}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Clock size={20} />
              <span className="text-xl font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Problem */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center problem-appear">
            <div className="text-4xl md:text-6xl font-bold text-white mb-8">
              {currentProblem.question}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 text-2xl font-bold rounded-xl transition-all duration-200 ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-500 text-white success-pulse'
                        : 'bg-red-500 text-white'
                      : selectedAnswer !== null && option === currentProblem.answer
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30 transform hover:scale-105'
                  }`}
                >
                  {option}
                  {selectedAnswer === option && (
                    <span className="ml-2">
                      {isCorrect ? <Check size={24} /> : <X size={24} />}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameFinished && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Results */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">Practice Complete!</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{score}</div>
                <div className="text-white/80">Correct Answers</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{totalProblems}</div>
                <div className="text-white/80">Total Problems</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{Math.floor(score / 2)}</div>
                <div className="text-white/80 flex items-center justify-center">
                  <Star className="text-yellow-400 fill-current mr-1" size={16} />
                  Stars Earned
                </div>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="inline mr-2" size={20} />
                Practice Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;