import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useSoundEffects } from './SoundManager';
import type { Theme } from '../App';

interface VolumeControlProps {
  theme: Theme;
  className?: string;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ theme, className = '' }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const { setVolume: setSoundVolume, setMuted, getVolume, isMuted: getSoundMuted, playSuccess } = useSoundEffects(theme);

  useEffect(() => {
    setVolume(getVolume());
    setIsMuted(getSoundMuted());
  }, [getVolume, getSoundMuted]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setSoundVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      setMuted(false);
    }
    // Play a test sound when adjusting volume
    playSuccess();
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setMuted(newMuted);
    if (!newMuted) {
      playSuccess();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-colors ${theme.effects?.transitionEffect}`}
        title="Sound Settings"
      >
        {isMuted ? (
          <VolumeX className="text-white" size={20} />
        ) : (
          <Volume2 className="text-white" size={20} />
        )}
        <Settings className="text-white" size={16} />
      </button>

      {showSettings && (
        <div className="absolute right-0 top-14 bg-white rounded-lg shadow-xl p-4 space-y-4 w-64 z-50">
          <div className="text-gray-800 font-bold text-center border-b pb-2">
            🔊 Sound Settings
          </div>
          
          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Volume</label>
              <span className="text-sm text-gray-500">{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center space-x-3">
              <VolumeX size={16} className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r ${theme.background}`}
                style={{
                  background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`
                }}
              />
              <Volume2 size={16} className="text-gray-600" />
            </div>
          </div>

          {/* Mute Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Mute Sound</label>
            <button
              onClick={toggleMute}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                isMuted ? 'bg-gray-300' : `bg-gradient-to-r ${theme.background}`
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                  isMuted ? 'translate-x-1' : 'translate-x-6'
                }`}
              />
            </button>
          </div>

          {/* Theme Sounds Preview */}
          <div className="space-y-2 border-t pt-3">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {theme.character} {theme.name} Sounds
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => playSuccess()}
                disabled={isMuted}
                className={`px-3 py-2 text-xs rounded-lg transition-all ${
                  isMuted 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : `bg-gradient-to-r ${theme.background} text-white hover:scale-105`
                }`}
              >
                🎉 Success
              </button>
              <button
                onClick={() => {
                  const { playThemeSound } = useSoundEffects(theme);
                  playThemeSound('click');
                }}
                disabled={isMuted}
                className={`px-3 py-2 text-xs rounded-lg transition-all ${
                  isMuted 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : `bg-gradient-to-r ${theme.background} text-white hover:scale-105`
                }`}
              >
                👆 Click
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowSettings(false)}
            className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;