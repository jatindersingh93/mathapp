import React from 'react';
import { Volume2, Star, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useSoundEffects } from './SoundManager';
import type { Theme } from '../App';

interface SoundTestPanelProps {
  theme: Theme;
  className?: string;
}

const SoundTestPanel: React.FC<SoundTestPanelProps> = ({ theme, className = '' }) => {
  const { playCorrect, playIncorrect, playSuccess, playThemeSound } = useSoundEffects(theme);

  const soundTests = [
    {
      label: '✅ Correct Answer',
      icon: CheckCircle,
      action: playCorrect,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Pleasant success chime'
    },
    {
      label: '❌ Wrong Answer',
      icon: XCircle,
      action: playIncorrect,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Gentle error tone'
    },
    {
      label: '🎉 Success/Achievement',
      icon: Trophy,
      action: playSuccess,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Celebration sound'
    },
    {
      label: '👆 Button Click',
      icon: Volume2,
      action: () => playThemeSound('click'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'UI interaction feedback'
    },
    {
      label: `${theme.character} Theme Sound`,
      icon: Star,
      action: () => playThemeSound('success'),
      color: `bg-gradient-to-r ${theme.background}`,
      description: `${theme.name} specific sound`
    }
  ];

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Volume2 className="text-white" size={24} />
        <h3 className="text-xl font-bold text-white">🎵 Sound Test Panel</h3>
      </div>
      
      <p className="text-white/80 text-sm mb-6">
        Test the different sound effects used throughout the app. Each button plays a different type of audio feedback.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soundTests.map((test, index) => {
          const IconComponent = test.icon;
          return (
            <button
              key={index}
              onClick={test.action}
              className={`${test.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent size={24} className="group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">{test.label}</div>
                  <div className="text-sm opacity-80">{test.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <h4 className="text-white font-semibold mb-2">🔊 About Sound Effects:</h4>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• All sounds are generated using Web Audio API for better performance</li>
          <li>• Volume can be controlled through the header volume control</li>
          <li>• Each theme has its own unique sound signature</li>
          <li>• Sounds provide immediate feedback for better learning experience</li>
        </ul>
      </div>
    </div>
  );
};

export default SoundTestPanel;