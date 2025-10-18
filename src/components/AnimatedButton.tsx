import React, { useState } from 'react';
import type { Theme } from '../App';
import { useSoundEffects } from './SoundManager';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme: Theme;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  particles?: boolean;
}

interface ParticleEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
  animation: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  theme,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
  particles = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [clickEffects, setClickEffects] = useState<ParticleEffect[]>([]);
  
  // Initialize sound effects
  const { playClick, playThemeSound } = useSoundEffects(theme);

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant colors
  const variantClasses = {
    primary: `bg-gradient-to-r ${theme.background}`,
    secondary: `bg-gradient-to-r from-gray-400 to-gray-600`,
    accent: `bg-gradient-to-r from-${theme.colors.accent} to-${theme.colors.primary}`
  };

  // Handle click with particle effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !onClick) return;
    
    // Play click sound effect
    playThemeSound('click');
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Create particle effect on click
    if (particles && theme.graphics) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const newEffects: ParticleEffect[] = [];
      for (let i = 0; i < 5; i++) {
        newEffects.push({
          id: Date.now() + i,
          x: centerX + (Math.random() - 0.5) * 40,
          y: centerY + (Math.random() - 0.5) * 40,
          emoji: theme.graphics.particles[Math.floor(Math.random() * theme.graphics.particles.length)],
          animation: 'animate-ping'
        });
      }
      
      setClickEffects(newEffects);
      
      // Clear effects after animation
      setTimeout(() => setClickEffects([]), 1000);
    }

    onClick();
  };

  // Hover effects class
  const hoverEffects = theme.effects ? theme.effects.buttonHover : 'scale-105';
  const cardAnimation = theme.effects ? theme.effects.cardAnimation : 'hover:scale-105';
  const transitionEffect = theme.effects ? theme.effects.transitionEffect : 'transition-all duration-300';

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg font-bold text-white shadow-lg
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${transitionEffect}
        ${isHovered ? hoverEffects : ''}
        ${isPressed ? 'scale-95' : ''}
        ${cardAnimation}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Theme character decoration */}
      {isHovered && (
        <div className={`absolute -top-2 -right-2 text-2xl ${theme.animation}`}>
          {theme.character}
        </div>
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span>{children}</span>
      </div>
      
      {/* Click particle effects */}
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className={`absolute text-lg pointer-events-none ${effect.animation}`}
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {effect.emoji}
        </div>
      ))}
      
      {/* Shine effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"
            style={{
              animation: 'shimmer 0.8s ease-out'
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </button>
  );
};

export default AnimatedButton;