import React, { useState } from 'react';
import type { Theme } from '../App';

interface AnimatedCardProps {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  glowEffect?: boolean;
  characterDecoration?: boolean;
  floatingElements?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  theme,
  className = '',
  onClick,
  hoverable = true,
  glowEffect = true,
  characterDecoration = true,
  floatingElements = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  // Get theme effects
  const cardAnimation = theme.effects?.cardAnimation || 'hover:scale-105';
  const transitionEffect = theme.effects?.transitionEffect || 'transition-all duration-300';

  return (
    <div
      className={`
        relative bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20
        ${hoverable ? cardAnimation : ''}
        ${transitionEffect}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic glow effect following mouse */}
      {glowEffect && isHovered && (
        <div
          className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              ${theme.colors.primary}40 0%, 
              ${theme.colors.secondary}20 50%, 
              transparent 80%)`
          }}
        />
      )}

      {/* Floating theme particles */}
      {floatingElements && theme.graphics && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {theme.graphics.particles.slice(0, 3).map((particle, index) => (
            <div
              key={index}
              className={`absolute text-lg opacity-40 ${theme.animation}`}
              style={{
                left: `${20 + index * 30}%`,
                top: `${10 + index * 15}%`,
                animationDelay: `${index * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              {particle}
            </div>
          ))}
        </div>
      )}

      {/* Theme character decoration */}
      {characterDecoration && (
        <div className={`absolute -top-3 -right-3 text-3xl opacity-70 ${theme.animation}`}>
          {theme.character}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Border glow effect */}
      {isHovered && glowEffect && (
        <div 
          className={`absolute inset-0 rounded-xl border-2 opacity-50 pointer-events-none`}
          style={{
            borderColor: theme.colors.accent,
            boxShadow: `0 0 20px ${theme.colors.accent}40`
          }}
        />
      )}

      {/* Background decorative elements */}
      {theme.graphics && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {theme.graphics.backgroundElements.slice(0, 2).map((element, index) => (
            <div
              key={`bg-${index}`}
              className="absolute opacity-5 text-8xl"
              style={{
                right: `${index * 40}%`,
                bottom: `${index * 30}%`,
                transform: `rotate(${index * 15}deg)`,
                animation: `float ${4 + index}s ease-in-out infinite`
              }}
            >
              {element}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCard;