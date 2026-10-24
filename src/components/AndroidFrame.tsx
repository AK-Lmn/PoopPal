import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, Home, Moon, Sun, Sparkles } from 'lucide-react';
import { getSoundEnabled, setSoundEnabled } from '../utils/sound';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeView: 'app' | 'launcher';
  onViewChange: (view: 'app' | 'launcher') => void;
  onReplayOnboarding?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  activeView,
  onViewChange,
  onReplayOnboarding,
  isDark,
  onToggleTheme,
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] dark:bg-[#1A1412] text-[#4E342E] dark:text-[#EFEBE9] flex flex-col items-center justify-start p-2 sm:p-6 transition-colors font-sans">
      {/* Top Bar for Desktop Controls */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 py-3 px-4 mb-4 bg-white/80 dark:bg-[#2A201C]/80 backdrop-blur-md rounded-2xl border border-[#4E342E]/15 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4E342E] text-white flex items-center justify-center font-pixel text-sm">
            PP
          </div>
          <div>
            <h1 className="text-base font-bold text-[#4E342E] dark:text-[#FFF8E1] tracking-tight flex items-center gap-2">
              PoopPal
              <span className="text-[10px] font-pixel bg-[#FFE082] text-[#4E342E] px-2 py-0.5 rounded-md border border-[#4E342E]/20">
                16-BIT RETRO
              </span>
            </h1>
            <p className="text-xs text-[#795548] dark:text-[#BCAAA4]">
              Android Jetpack Compose & Glance Widget Architecture
            </p>
          </div>
        </div>

        {/* View Switcher: App vs Home Screen Glance Widget */}
        <div className="flex items-center bg-[#EFEBE9] dark:bg-[#3E2723] p-1 rounded-xl border border-[#4E342E]/10">
          <button
            onClick={() => onViewChange('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'app'
                ? 'bg-[#4E342E] text-white shadow-sm'
                : 'text-[#5D4037] dark:text-[#D7CCC8] hover:text-[#4E342E]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Screen</span>
          </button>
          <button
            onClick={() => onViewChange('launcher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'launcher'
                ? 'bg-[#4E342E] text-white shadow-sm'
                : 'text-[#5D4037] dark:text-[#D7CCC8] hover:text-[#4E342E]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Glance Widget Launcher</span>
          </button>
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute 8-bit Sound Effects' : 'Enable 8-bit Sound Effects'}
            className="p-2 rounded-xl bg-amber-50 dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 dark:hover:bg-[#4E342E] transition-colors border border-[#4E342E]/15"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          <button
            onClick={onToggleTheme}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-xl bg-amber-50 dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 dark:hover:bg-[#4E342E] transition-colors border border-[#4E342E]/15"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {onReplayOnboarding && (
            <button
              onClick={onReplayOnboarding}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 dark:bg-[#3E2723] hover:bg-amber-200 dark:hover:bg-[#4E342E] text-[#4E342E] dark:text-[#FFE082] text-xs font-bold transition-all border border-[#4E342E]/20 shadow-xs"
              title="Preview the First Launch & Onboarding Experience"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>First Launch View</span>
            </button>
          )}
        </div>
      </header>

      {/* Android Device Hardware Frame */}
      <div className="relative w-full max-w-[412px] h-[840px] max-h-[92vh] bg-[#121212] rounded-[44px] p-3 shadow-2xl border-[4px] border-[#2B231F] ring-1 ring-black/30 flex flex-col overflow-hidden">
        {/* Device Front Camera Cutout (Pill punch-hole) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-50 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#333]" />
        </div>

        {/* Inner Screen Canvas */}
        <div className="relative w-full h-full bg-[#FFFDF7] dark:bg-[#201815] rounded-[36px] overflow-hidden flex flex-col text-[#4E342E] dark:text-[#EFEBE9]">
          {/* Android Status Bar */}
          <div className="h-10 w-full px-6 flex items-center justify-between text-xs font-semibold text-[#5D4037] dark:text-[#D7CCC8] select-none z-40 bg-transparent shrink-0">
            <span>{currentTime || '12:00'}</span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="font-mono">5G</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              </svg>
              {/* Battery indicator */}
              <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                <div className="w-3.5 h-1.5 bg-current rounded-xs" />
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 w-full overflow-hidden relative flex flex-col">
            {children}
          </div>

          {/* Android Gesture Navigation Pill */}
          <div className="h-5 w-full flex items-center justify-center select-none bg-transparent shrink-0 z-40">
            <div className="w-32 h-1 bg-[#4E342E]/30 dark:bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
