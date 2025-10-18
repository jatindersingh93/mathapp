import React, { useEffect, useState } from 'react';
import type { Theme } from '../App';

interface AnimatedBackgroundProps {
  theme: Theme;
  intensity?: 'low' | 'medium' | 'high';
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  theme, 
  intensity = 'medium' 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set particle count based on intensity
  const particleCount = {
    low: 8,
    medium: 15,
    high: 25
  }[intensity];

  // Initialize window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Initialize particles
  useEffect(() => {
    if (!theme.graphics || windowSize.width === 0) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const emojis = [...theme.graphics.particles, ...theme.graphics.decorations];
      newParticles.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 0.8 + Math.random() * 1.5, // 0.8x to 2.3x size
        speed: 0.5 + Math.random() * 1.5, // Varying speeds
        rotation: Math.random() * 360,
        rotationSpeed: -2 + Math.random() * 4, // -2 to +2 degrees per frame
        opacity: 0.3 + Math.random() * 0.4 // 0.3 to 0.7 opacity
      });
    }
    setParticles(newParticles);
  }, [theme, particleCount, windowSize]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newY = particle.y - particle.speed;
        let newX = particle.x + Math.sin(particle.y * 0.01) * 0.5; // Subtle horizontal drift
        let newRotation = particle.rotation + particle.rotationSpeed;

        // Reset particle when it goes off screen
        if (newY < -50) {
          newY = windowSize.height + 50;
          newX = Math.random() * windowSize.width;
        }
        if (newX < -50) newX = windowSize.width + 50;
        if (newX > windowSize.width + 50) newX = -50;

        return {
          ...particle,
          x: newX,
          y: newY,
          rotation: newRotation
        };
      }));
    };

    const intervalId = setInterval(animateParticles, 50); // 20 FPS for smooth animation
    return () => clearInterval(intervalId);
  }, [particles.length, windowSize]);

  // Don't render if theme doesn't have graphics property
  if (!theme.graphics) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {theme.graphics.backgroundElements.map((element, index) => (
          <div
            key={`bg-${index}`}
            className="absolute opacity-10 text-6xl"
            style={{
              left: `${(index * 25) % 100}%`,
              top: `${(index * 17) % 80}%`,
              transform: `rotate(${index * 45}deg)`,
              animation: `float ${3 + (index % 3)}s ease-in-out infinite`
            }}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}rem`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
            pointerEvents: 'none'
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 text-4xl opacity-20 animate-pulse">
        {theme.character}
      </div>
      <div className="absolute top-4 right-4 text-4xl opacity-20 animate-bounce">
        {theme.graphics.decorations[0]}
      </div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-20 animate-ping">
        {theme.graphics.decorations[1] || theme.graphics.particles[0]}
      </div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20 animate-pulse">
        {theme.graphics.decorations[2] || theme.graphics.particles[1]}
      </div>

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;