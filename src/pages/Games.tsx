import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, Target, Clock, Star, Trophy, RotateCcw } from 'lucide-react';
import type { UserProgress, Theme } from '../App';
import { useSoundEffects } from '../components/SoundManager';

interface GamesProps {
  userProgress: UserProgress;
  updateProgress: (newProgress: Partial<UserProgress>) => void;
  currentTheme: Theme;
}

interface MathBubble {
  id: string;
  x: number;
  y: number;
  question: string;
  answer: number;
  isCorrect: boolean;
  speed: number;
}

const Games: React.FC<GamesProps> = ({ userProgress, updateProgress, currentTheme }) => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bubbles, setBubbles] = useState<MathBubble[]>([]);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);

  // Sound effects
  const { playCorrect, playIncorrect, playSuccess, playClick } = useSoundEffects(currentTheme);

  // Bubble Pop Math Game
  const generateBubble = (): MathBubble => {
    const operations = ['+', '-', '×', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number, answer: number, question: string;

    switch (op) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        question = `${num1} ÷ ${num2}`;
        break;
      default:
        num1 = 1; num2 = 1; answer = 2; question = '1 + 1';
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: 100, // Start from bottom
      question,
      answer,
      isCorrect: false,
      speed: Math.random() * 2 + 1
    };
  };

  const startBubbleGame = () => {
    playClick(); // Sound effect for starting game
    setSelectedGame('bubble');
    setGameState('playing');
    setScore(0);
    setCombo(0);
    setLives(3);
    setTimeLeft(60);
    setBubbles([generateBubble()]);
  };

  const popBubble = (bubbleId: string, userAnswer: number) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === bubbleId);
      if (bubble && bubble.answer === userAnswer) {
        playCorrect(); // Sound effect for correct answer
        setScore(s => s + (10 + combo * 2));
        setCombo(c => c + 1);
        return prev.filter(b => b.id !== bubbleId);
      } else {
        playIncorrect(); // Sound effect for incorrect answer
        setCombo(0);
        setLives(l => l - 1);
        return prev.filter(b => b.id !== bubbleId);
      }
    });
  };

  // Math Racing Game
  const [racingCars, setRacingCars] = useState([
    { id: 'player', position: 0, speed: 0 },
    { id: 'opponent', position: 0, speed: 1 }
  ]);

  const startRacingGame = () => {
    playClick(); // Sound effect for starting game
    setSelectedGame('racing');
    setGameState('playing');
    setScore(0);
    setTimeLeft(120);
    setRacingCars([
      { id: 'player', position: 0, speed: 0 },
      { id: 'opponent', position: 0, speed: 1 }
    ]);
  };

  // Number Matching Memory Game
  const [memoryCards, setMemoryCards] = useState<Array<{
    id: string;
    value: number;
    equation: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const generateMemoryCards = () => {
    const pairs = [];
    for (let i = 0; i < 6; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const result = num1 + num2;
      pairs.push(
        { id: `eq${i}`, value: result, equation: `${num1} + ${num2}`, isFlipped: false, isMatched: false },
        { id: `res${i}`, value: result, equation: result.toString(), isFlipped: false, isMatched: false }
      );
    }
    return pairs.sort(() => Math.random() - 0.5);
  };

  const startMemoryGame = () => {
    playClick(); // Sound effect for starting game
    setSelectedGame('memory');
    setGameState('playing');
    setScore(0);
    setMemoryCards(generateMemoryCards());
    setFlippedCards([]);
  };

  // Game Timer Effect
  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      playSuccess(); // Sound effect for completing game
      setGameState('finished');
      const starsEarned = Math.floor(score / 20);
      updateProgress({
        stars: userProgress.stars + starsEarned
      });
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, score, userProgress, updateProgress, playSuccess]);

  // Bubble movement effect
  useEffect(() => {
    if (selectedGame === 'bubble' && gameState === 'playing') {
      const interval = setInterval(() => {
        setBubbles(prev => {
          const updated = prev.map(bubble => ({
            ...bubble,
            y: bubble.y - bubble.speed
          })).filter(bubble => bubble.y > -10);

          // Add new bubble occasionally
          if (Math.random() < 0.3 && updated.length < 3) {
            updated.push(generateBubble());
          }

          // Check if any bubbles reached the top (player missed)
          const missedBubbles = prev.filter(bubble => bubble.y <= -10);
          if (missedBubbles.length > 0) {
            setLives(l => Math.max(0, l - missedBubbles.length));
          }

          return updated;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [selectedGame, gameState]);

  // Check game over conditions
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('finished');
    }
  }, [lives, gameState]);

  const gameOptions = [
    {
      id: 'bubble',
      title: 'Bubble Pop Math',
      description: 'Pop bubbles by solving math problems before they reach the top!',
      icon: '🫧',
      color: 'from-blue-400 to-cyan-500',
      difficulty: 'Easy',
      action: startBubbleGame
    },
    {
      id: 'racing',
      title: 'Math Racing',
      description: 'Solve problems to make your car go faster and win the race!',
      icon: '🏎️',
      color: 'from-green-400 to-blue-500',
      difficulty: 'Medium',
      action: startRacingGame
    },
    {
      id: 'memory',
      title: 'Number Memory',
      description: 'Match equations with their answers in this memory challenge!',
      icon: '🧠',
      color: 'from-purple-400 to-pink-500',
      difficulty: 'Hard',
      action: startMemoryGame
    },
    {
      id: 'treasure',
      title: 'Treasure Hunt',
      description: 'Solve math clues to find hidden treasures!',
      icon: '🏴‍☠️',
      color: 'from-yellow-400 to-orange-500',
      difficulty: 'Medium',
      action: () => setSelectedGame('treasure')
    }
  ];

  if (gameState === 'menu') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className={`text-6xl mb-4 ${currentTheme.animation}`}>{currentTheme.character}</div>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Gamepad2 className="text-white mr-4" size={40} />
            Math Games Arena
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {currentTheme.description} Let's play some math games! 🎮
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {gameOptions.map((game) => (
            <div
              key={game.id}
              className={`bg-gradient-to-br ${game.color} p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              onClick={game.action}
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                <p className="text-white/90 mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {game.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-300 fill-current" size={16} />
                    <span className="text-sm">+{Math.floor(Math.random() * 20) + 10} points</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Trophy className="text-yellow-400 mr-3" size={28} />
            Daily Game Challenge
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-white font-semibold">Pop 50 Bubbles</div>
              <div className="text-white/80 text-sm">Reward: 25 stars</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏁</div>
              <div className="text-white font-semibold">Win 3 Races</div>
              <div className="text-white/80 text-sm">Reward: Speed Badge</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-white font-semibold">Perfect Memory</div>
              <div className="text-white/80 text-sm">Reward: Brain Master</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Playing State
  if (gameState === 'playing') {
    return (
      <div className="space-y-6">
        {/* Game Header */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <div className="text-white">
              <span className="text-lg font-bold">Score: {score}</span>
            </div>
            {selectedGame === 'bubble' && (
              <div className="flex items-center space-x-2">
                <span className="text-white">Lives:</span>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                      i < lives ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
            {combo > 0 && (
              <div className="text-yellow-400 font-bold animate-pulse">
                {combo}x Combo!
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Clock size={20} />
              <span className="text-xl font-bold">{timeLeft}s</span>
            </div>
            <button
              onClick={() => setGameState('menu')}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Exit Game
            </button>
          </div>
        </div>

        {/* Bubble Pop Game */}
        {selectedGame === 'bubble' && (
          <div className="relative bg-gradient-to-b from-blue-400/20 to-blue-600/20 rounded-xl p-4 h-96 overflow-hidden">
            <div className="absolute inset-0">
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className="absolute transition-all duration-100 ease-linear"
                  style={{
                    left: `${bubble.x}%`,
                    bottom: `${bubble.y}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg animate-bounce-slow">
                      <span className="text-white font-bold text-sm text-center">
                        {bubble.question}
                      </span>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <input
                        type="number"
                        className="w-16 h-8 text-center bg-white rounded border text-black text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              popBubble(bubble.id, value);
                            }
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Memory Game */}
        {selectedGame === 'memory' && (
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {memoryCards.map((card) => (
              <div
                key={card.id}
                className={`h-24 rounded-lg cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white text-black'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={() => {
                  if (!card.isFlipped && !card.isMatched && flippedCards.length < 2) {
                    setMemoryCards(prev => 
                      prev.map(c => c.id === card.id ? { ...c, isFlipped: true } : c)
                    );
                    setFlippedCards(prev => [...prev, card.id]);
                  }
                }}
              >
                <div className="h-full flex items-center justify-center font-bold">
                  {card.isFlipped || card.isMatched ? card.equation : '?'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Game Finished State
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{score}</div>
            <div className="text-white/80">Final Score</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{combo}</div>
            <div className="text-white/80">Best Combo</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-white">{Math.floor(score / 20)}</div>
            <div className="text-white/80 flex items-center justify-center">
              <Star className="text-yellow-400 fill-current mr-1" size={16} />
              Stars Earned
            </div>
          </div>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => {
              setGameState('menu');
              setSelectedGame('');
            }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Games
          </button>
          <button
            onClick={() => {
              if (selectedGame === 'bubble') startBubbleGame();
              else if (selectedGame === 'memory') startMemoryGame();
              else if (selectedGame === 'racing') startRacingGame();
            }}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="inline mr-2" size={20} />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Games;