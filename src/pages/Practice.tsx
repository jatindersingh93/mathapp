import React, { useState, useEffect } from 'react';
import { Target, Clock, Check, X, RotateCcw, Star, Settings, Eye, Timer, Users } from 'lucide-react';
import type { UserProgress, Theme } from '../App';
import { useSoundEffects } from '../components/SoundManager';

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

const Practice: React.FC<PracticeProps> = ({ userProgress, updateProgress, currentTheme }) => {
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
  
  // Sound effects
  const { playCorrect, playIncorrect, playSuccess, playClick } = useSoundEffects(currentTheme);
  
  // Settings
  const [settings, setSettings] = useState<PracticeSettings>({
    timerEnabled: true,
    timeLimit: 60,
    maxAttempts: 3,
    showDetailedResults: true,
    selectedOperation: 'addition'
  });

  // Generate random math problem
  const generateProblem = (): MathProblem => {
    const operations = ['addition', 'subtraction', 'multiplication', 'division'];
    const operation = settings.selectedOperation === 'mixed' 
      ? operations[Math.floor(Math.random() * operations.length)]
      : settings.selectedOperation;

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
    setProblemResults([]);
    setTimeLeft(settings.timeLimit);
    const newProblem = generateProblem();
    setCurrentProblem(newProblem);
    setProblemStartTime(Date.now());
    setCurrentAttempts(0);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null || !currentProblem) return;

    const timeSpent = Date.now() - problemStartTime;
    const attempts = currentAttempts + 1;
    setCurrentAttempts(attempts);
    setSelectedAnswer(answer);
    const correct = answer === currentProblem.answer;
    setIsCorrect(correct);

    // Play sound effect based on correctness
    if (correct) {
      playCorrect();
    } else {
      playIncorrect();
    }

    // Record the result
    const result: ProblemResult = {
      id: currentProblem.id,
      question: currentProblem.question,
      correctAnswer: currentProblem.answer,
      userAnswer: answer,
      isCorrect: correct,
      timeSpent: timeSpent / 1000, // Convert to seconds
      attempts
    };

    setProblemResults(prev => [...prev, result]);

    if (correct) {
      setScore(score + 1);
      // Move to next problem after delay
      setTimeout(() => {
        moveToNextProblem();
      }, 1500);
    } else {
      // Check if user has more attempts
      if (attempts < settings.maxAttempts) {
        setTimeout(() => {
          setSelectedAnswer(null);
          setIsCorrect(null);
        }, 1500);
      } else {
        // No more attempts, move to next problem
        setTimeout(() => {
          moveToNextProblem();
        }, 1500);
      }
    }
  };

  const moveToNextProblem = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTotalProblems(totalProblems + 1);
    setCurrentAttempts(0);
    const newProblem = generateProblem();
    setCurrentProblem(newProblem);
    setProblemStartTime(Date.now());
  };

  // Timer effect
  useEffect(() => {
    let timer: number;
    if (gameStarted && !gameFinished && timeLeft > 0 && settings.timerEnabled) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if ((timeLeft === 0 && settings.timerEnabled) || (!settings.timerEnabled && totalProblems >= 10)) {
      setGameFinished(true);
      setGameStarted(false);
      
      // Play success sound when practice session completes
      playSuccess();
      
      // Update user progress
      const starsEarned = Math.floor(score / 2);
      updateProgress({
        stars: userProgress.stars + starsEarned,
        currentStreak: userProgress.currentStreak + (score > 5 ? 1 : 0)
      });
    }
    return () => clearTimeout(timer);
  }, [gameStarted, gameFinished, timeLeft, score, userProgress, updateProgress, settings.timerEnabled, totalProblems, playSuccess]);

  const operationOptions = [
    { value: 'addition', label: 'Addition ➕', emoji: '➕' },
    { value: 'subtraction', label: 'Subtraction ➖', emoji: '➖' },
    { value: 'multiplication', label: 'Multiplication ✖️', emoji: '✖️' },
    { value: 'division', label: 'Division ➗', emoji: '➗' },
    { value: 'mixed', label: 'Mixed Practice 🎲', emoji: '🎲' },
  ];

  // Settings Panel
  if (showSettings) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className={`text-6xl mb-4 ${currentTheme.animation}`}>{currentTheme.character}</div>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Settings className="text-white mr-4" size={40} />
            Practice Settings
          </h1>
          <p className="text-white/80 text-lg">{currentTheme.description}</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Timer Settings */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Timer className="text-white mr-3" size={24} />
              Timer Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="timerEnabled"
                  checked={settings.timerEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, timerEnabled: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <label htmlFor="timerEnabled" className="text-white font-medium">
                  Enable Timer
                </label>
              </div>
              
              {settings.timerEnabled && (
                <div>
                  <label className="block text-white font-medium mb-2">
                    Time Limit: {settings.timeLimit} seconds
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="30"
                    value={settings.timeLimit}
                    onChange={(e) => setSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-white/60 text-sm mt-1">
                    <span>30s</span>
                    <span>5min</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attempts Settings */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Users className="text-white mr-3" size={24} />
              Attempts Settings
            </h2>
            
            <div>
              <label className="block text-white font-medium mb-2">
                Maximum Attempts per Problem: {settings.maxAttempts}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={settings.maxAttempts}
                onChange={(e) => setSettings(prev => ({ ...prev, maxAttempts: parseInt(e.target.value) }))}
                className="w-full h-2 bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-white/60 text-sm mt-1">
                <span>1 try</span>
                <span>5 tries</span>
              </div>
            </div>
          </div>

          {/* Results Settings */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Eye className="text-white mr-3" size={24} />
              Results Settings
            </h2>
            
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="showDetailedResults"
                checked={settings.showDetailedResults}
                onChange={(e) => setSettings(prev => ({ ...prev, showDetailedResults: e.target.checked }))}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <label htmlFor="showDetailedResults" className="text-white font-medium">
                Show Detailed Results (time spent, attempts per problem)
              </label>
            </div>
          </div>

          {/* Operation Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your Challenge</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {operationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSettings(prev => ({ ...prev, selectedOperation: option.value }))}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    settings.selectedOperation === option.value
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

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowSettings(false)}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowSettings(false);
                startGame();
              }}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (showResults && problemResults.length > 0) {
    const correctAnswers = problemResults.filter(r => r.isCorrect).length;
    const averageTime = problemResults.reduce((sum, r) => sum + r.timeSpent, 0) / problemResults.length;
    const totalAttempts = problemResults.reduce((sum, r) => sum + r.attempts, 0);

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Eye className="text-white mr-4" size={40} />
            Detailed Results
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{correctAnswers}</div>
              <div className="text-white/80">Correct</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{problemResults.length - correctAnswers}</div>
              <div className="text-white/80">Incorrect</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{averageTime.toFixed(1)}s</div>
              <div className="text-white/80">Avg Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{totalAttempts}</div>
              <div className="text-white/80">Total Attempts</div>
            </div>
          </div>

          {/* Detailed Results Table */}
          {settings.showDetailedResults && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Problem by Problem Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2">#</th>
                      <th className="text-left py-2">Problem</th>
                      <th className="text-left py-2">Your Answer</th>
                      <th className="text-left py-2">Correct Answer</th>
                      <th className="text-left py-2">Time</th>
                      <th className="text-left py-2">Attempts</th>
                      <th className="text-left py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problemResults.map((result, index) => (
                      <tr key={result.id} className="border-b border-white/10">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{result.question}</td>
                        <td className="py-2">{result.userAnswer ?? 'No answer'}</td>
                        <td className="py-2">{result.correctAnswer}</td>
                        <td className="py-2">{result.timeSpent.toFixed(1)}s</td>
                        <td className="py-2">{result.attempts}</td>
                        <td className="py-2">
                          {result.isCorrect ? (
                            <Check className="text-green-400" size={20} />
                          ) : (
                            <X className="text-red-400" size={20} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowResults(false)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Back to Practice
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                startGame();
              }}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="inline mr-2" size={20} />
              Practice Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Menu
  if (!gameStarted && !gameFinished) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Target className="text-white mr-4" size={40} />
            Practice Mode
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Test your skills with customizable math challenges and track your progress!
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quick Start */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Quick Start</h3>
            <p className="text-white/80 mb-6">
              Start practicing with default settings (Timer: {settings.timerEnabled ? `${settings.timeLimit}s` : 'Off'}, 
              Max Attempts: {settings.maxAttempts}, Operation: {settings.selectedOperation})
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Start Practice Now
            </button>
          </div>

          {/* Settings Access */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Customize Your Practice</h3>
            <p className="text-white/80 mb-6">
              Adjust timer settings, number of attempts, and choose specific operations
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-200 flex items-center mx-auto"
            >
              <Settings className="mr-2" size={20} />
              Practice Settings
            </button>
          </div>

          {/* Previous Results */}
          {problemResults.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Previous Session</h3>
              <p className="text-white/80 mb-6">
                Last session: {problemResults.filter(r => r.isCorrect).length}/{problemResults.length} correct
              </p>
              <button
                onClick={() => setShowResults(true)}
                className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors duration-200 flex items-center mx-auto"
              >
                <Eye className="mr-2" size={20} />
                View Detailed Results
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Game Playing State
  if (gameStarted && currentProblem) {
    const attemptsRemaining = settings.maxAttempts - currentAttempts;
    const noAttemptsLeft = currentAttempts >= settings.maxAttempts && selectedAnswer !== currentProblem.answer;

    return (
      <div className="space-y-6">
        {/* Game Header */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <div className="text-white">
              <span className="text-lg font-bold">Score: {score}/{totalProblems}</span>
            </div>
            {settings.maxAttempts > 1 && (
              <div className="text-white">
                <span className="text-lg font-bold">Attempts Left: {Math.max(0, attemptsRemaining)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {settings.timerEnabled && (
              <div className="flex items-center space-x-2 text-white">
                <Clock size={20} />
                <span className="text-xl font-bold">{timeLeft}s</span>
              </div>
            )}
            <button
              onClick={() => {
                setGameStarted(false);
                setGameFinished(false);
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Problem */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center problem-appear">
            <div className="text-4xl md:text-6xl font-bold text-white mb-8">
              {currentProblem.question}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !noAttemptsLeft && handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null || noAttemptsLeft}
                  className={`p-4 text-2xl font-bold rounded-xl transition-all duration-200 ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-500 text-white success-pulse'
                        : 'bg-red-500 text-white'
                      : selectedAnswer !== null && option === currentProblem.answer
                      ? 'bg-green-500 text-white'
                      : noAttemptsLeft
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
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

            {/* Attempt feedback */}
            {selectedAnswer !== null && !isCorrect && attemptsRemaining > 0 && (
              <div className="mt-4 text-white/90">
                Try again! You have {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} left.
              </div>
            )}

            {noAttemptsLeft && (
              <div className="mt-4 text-white/90">
                The correct answer was {currentProblem.answer}. Moving to next problem...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game Finished State
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
        <div className={`text-6xl mb-4 ${currentTheme.animation}`}>{currentTheme.character}</div>
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
            onClick={() => {
              setGameFinished(false);
              setShowResults(false);
            }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Menu
          </button>
          {settings.showDetailedResults && (
            <button
              onClick={() => {
                setGameFinished(false);
                setShowResults(true);
              }}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <Eye className="inline mr-2" size={20} />
              View Results
            </button>
          )}
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="inline mr-2" size={20} />
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;