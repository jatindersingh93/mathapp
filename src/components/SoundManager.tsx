import { useEffect, useRef } from 'react';
import type { Theme } from '../App';

// Sound effect URLs - using Web Audio API compatible sounds
const SOUND_EFFECTS = {
  // Click sounds
  'water-drop': '/sounds/water-drop.mp3',
  'leaf-rustle': '/sounds/leaf-rustle.mp3',
  'laser-zap': '/sounds/laser-zap.mp3',
  'block-break': '/sounds/block-break.mp3',
  'tire-screech': '/sounds/tire-screech.mp3',
  'block-hit': '/sounds/block-hit.mp3',
  'pokeball-throw': '/sounds/pokeball-throw.mp3',
  'cape-whoosh': '/sounds/cape-whoosh.mp3',
  'fairy-sparkle': '/sounds/fairy-sparkle.mp3',
  'sword-slice': '/sounds/sword-slice.mp3',
  'sugar-crunch': '/sounds/sugar-crunch.mp3',
  'fire-breath': '/sounds/fire-breath.mp3',
  'mechanical-click': '/sounds/mechanical-click.mp3',
  
  // Success sounds
  'bubble-pop': '/sounds/bubble-pop.mp3',
  'jungle-roar': '/sounds/jungle-roar.mp3',
  'space-beep': '/sounds/space-beep.mp3',
  'block-place': '/sounds/block-place.mp3',
  'engine-rev': '/sounds/engine-rev.mp3',
  'mine-success': '/sounds/mine-success.mp3',
  'pokemon-success': '/sounds/pokemon-success.mp3',
  'hero-power': '/sounds/hero-power.mp3',
  'magic-chime': '/sounds/magic-chime.mp3',
  'ninja-strike': '/sounds/ninja-strike.mp3',
  'candy-pop': '/sounds/candy-pop.mp3',
  'dragon-roar': '/sounds/dragon-roar.mp3',
  'robot-beep': '/sounds/robot-beep.mp3',
  
  // General sounds
  'correct-answer': '/sounds/correct-answer.mp3',
  'wrong-answer': '/sounds/wrong-answer.mp3',
  'button-click': '/sounds/button-click.mp3',
  'level-complete': '/sounds/level-complete.mp3',
  'star-earned': '/sounds/star-earned.mp3',
  'achievement-unlock': '/sounds/achievement-unlock.mp3',
  'page-transition': '/sounds/page-transition.mp3',
  'theme-change': '/sounds/theme-change.mp3',
  'timer-tick': '/sounds/timer-tick.mp3',
  'game-start': '/sounds/game-start.mp3',
  'power-up': '/sounds/power-up.mp3'
};

export type SoundEffect = keyof typeof SOUND_EFFECTS;

class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private soundCache: Map<string, AudioBuffer> = new Map();
  private volume: number = 0.7;
  private muted: boolean = false;

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Pre-load essential sounds
      await this.preloadSounds([
        'correct-answer',
        'wrong-answer', 
        'button-click',
        'star-earned'
      ]);
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  async preloadSounds(soundIds: string[]) {
    if (!this.audioContext) return;

    const loadPromises = soundIds.map(async (soundId) => {
      try {
        // For demo purposes, we'll create synthetic sounds
        const buffer = this.createSyntheticSound(soundId);
        this.soundCache.set(soundId, buffer);
      } catch (error) {
        console.warn(`Failed to load sound: ${soundId}`, error);
      }
    });

    await Promise.all(loadPromises);
  }

  private createSyntheticSound(soundId: string): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not available');

    const sampleRate = this.audioContext.sampleRate;
    const duration = this.getSoundDuration(soundId);
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Generate different sound patterns based on sound type
    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      let value = 0;

      switch (soundId) {
        case 'correct-answer':
          // Happy ascending chime
          value = Math.sin(2 * Math.PI * (440 + t * 200) * t) * Math.exp(-t * 2) * 0.3;
          break;
        case 'wrong-answer':
          // Gentle descending tone
          value = Math.sin(2 * Math.PI * (300 - t * 100) * t) * Math.exp(-t * 3) * 0.2;
          break;
        case 'button-click':
          // Short pop sound
          value = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 20) * 0.4;
          break;
        case 'star-earned':
          // Sparkly sound
          value = (Math.sin(2 * Math.PI * 660 * t) + Math.sin(2 * Math.PI * 880 * t)) * Math.exp(-t * 1.5) * 0.3;
          break;
        case 'level-complete':
          // Triumphant fanfare
          value = Math.sin(2 * Math.PI * (440 + Math.sin(t * 10) * 50) * t) * Math.exp(-t * 1) * 0.4;
          break;
        case 'theme-change':
          // Whoosh sound
          value = (Math.random() * 2 - 1) * Math.exp(-t * 5) * 0.3;
          break;
        default:
          // Generic pleasant tone
          value = Math.sin(2 * Math.PI * 523 * t) * Math.exp(-t * 2) * 0.3;
      }

      channelData[i] = value;
    }

    return buffer;
  }

  private getSoundDuration(soundId: string): number {
    const durations: Record<string, number> = {
      'correct-answer': 0.8,
      'wrong-answer': 0.6,
      'button-click': 0.1,
      'star-earned': 1.0,
      'level-complete': 1.5,
      'theme-change': 0.4,
    };
    return durations[soundId] || 0.3;
  }

  async playSound(soundId: string, theme?: Theme) {
    if (this.muted || !this.audioContext) return;

    try {
      // Try to get theme-specific sound first
      let actualSoundId = soundId;
      if (theme?.sounds) {
        if (soundId === 'click' && theme.sounds.click) {
          actualSoundId = theme.sounds.click;
        } else if (soundId === 'success' && theme.sounds.success) {
          actualSoundId = theme.sounds.success;
        }
      }

      let buffer = this.soundCache.get(actualSoundId);
      
      if (!buffer) {
        // Create a fallback sound if not in cache
        buffer = this.createSyntheticSound(soundId);
        this.soundCache.set(actualSoundId, buffer);
      }

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('Failed to play sound:', soundId, error);
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  getVolume(): number {
    return this.volume;
  }
}

// Hook for using sound effects
export const useSoundEffects = (theme: Theme) => {
  const soundManager = useRef<SoundManager>(SoundManager.getInstance());

  useEffect(() => {
    soundManager.current.initialize();
  }, []);

  const playSound = (soundId: SoundEffect | string) => {
    soundManager.current.playSound(soundId, theme);
  };

  const playCorrect = () => playSound('correct-answer');
  const playIncorrect = () => playSound('wrong-answer');
  const playClick = () => playSound(theme.sounds?.click || 'button-click');
  const playSuccess = () => playSound(theme.sounds?.success || 'star-earned');
  const playThemeSound = (type: 'click' | 'success') => {
    if (type === 'click' && theme.sounds?.click) {
      playSound(theme.sounds.click);
    } else if (type === 'success' && theme.sounds?.success) {
      playSound(theme.sounds.success);
    } else {
      playSound(type === 'click' ? 'button-click' : 'star-earned');
    }
  };

  return {
    playSound,
    playCorrect,
    playIncorrect,
    playClick,
    playSuccess,
    playThemeSound,
    setVolume: (volume: number) => soundManager.current.setVolume(volume),
    setMuted: (muted: boolean) => soundManager.current.setMuted(muted),
    isMuted: () => soundManager.current.isMuted(),
    getVolume: () => soundManager.current.getVolume()
  };
};

export default SoundManager;