import React, { useState } from 'react';
import { PixelMascot } from './PixelMascot';
import { FriendItem, MascotMood } from '../types';
import { AppIcon } from './AppIcon';
import { Users, Sparkles, Trophy, Settings, RotateCcw, ChevronLeft, ChevronRight, Share2, Award, Lock, Volume2, VolumeX, Sun, Moon } from 'lucide-react';

interface HomeScreenProps {
  todayCount: number;
  onLogPoop: () => void;
  onUndoPoop: () => void;
  showUndo: boolean;
  undoSeconds: number;
  isDebouncing: boolean;
  friends: FriendItem[];
  pairedFriend?: FriendItem;
  onOpenFriends: () => void;
  onOpenAddFriend: () => void;
  onOpenStickers: () => void;
  onOpenSettings: () => void;
  selectedDate: string;
  onDateChange: (dateKey: string) => void;
  soundOn?: boolean;
  onToggleSound?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  todayCount,
  onLogPoop,
  onUndoPoop,
  showUndo,
  undoSeconds,
  isDebouncing,
  friends,
  pairedFriend,
  onOpenFriends,
  onOpenAddFriend,
  onOpenStickers,
  onOpenSettings,
  selectedDate,
  onDateChange,
  soundOn = true,
  onToggleSound,
  isDark = false,
  onToggleTheme,
}) => {
  const [mascotMoodOverride, setMascotMoodOverride] = useState<MascotMood | null>(null);

  // Determine mascot mood based on count
  const getMascotMood = (): MascotMood => {
    if (mascotMoodOverride) return mascotMoodOverride;
    if (todayCount === 0) return 'sleepy';
    if (todayCount < 3) return 'relieved';
    return 'champion';
  };

  // Get funny contextual speech bubble text
  const getSpeechBubble = (): string => {
    if (todayCount === 0) return "Waiting for nature's call...";
    if (todayCount === 1) return "First flush logged! Fresh start.";
    if (todayCount === 2) return "Double drop! Fiber routine going strong.";
    if (todayCount === 3) return "Hat trick! Daily royal milestone.";
    return "Legendary streak! Throne master.";
  };

  const handleMascotPoke = () => {
    setMascotMoodOverride('dancing');
    setTimeout(() => setMascotMoodOverride(null), 1500);
  };

  // Date formatting
  const todayKey = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === todayKey;

  const handleDayShift = (delta: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + delta);
    const newKey = current.toISOString().split('T')[0];
    onDateChange(newKey);
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-4 py-3 flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#4E342E]/10">
          <div className="flex items-center gap-2">
            <AppIcon size={24} showBadge={false} />
            <span className="text-sm font-black font-pixel text-[#4E342E] dark:text-[#FFE082] tracking-wider">
              PoopPal
            </span>
            <span className="text-[10px] text-[#8D6E63] font-semibold">v1.0</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleSound && (
              <button
                onClick={onToggleSound}
                className="p-1.5 rounded-xl bg-[#FFF8E1] dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 border border-[#4E342E]/15 transition-all"
                title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
              </button>
            )}

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-xl bg-[#FFF8E1] dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 border border-[#4E342E]/15 transition-all"
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={onOpenStickers}
              className="p-1.5 rounded-xl bg-[#FFF8E1] dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 border border-[#4E342E]/15 transition-all text-xs flex items-center gap-1 font-bold"
              title="Stickers & Challenges"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stickers</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-xl bg-[#FFF8E1] dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 border border-[#4E342E]/15 transition-all"
              title="Profile & Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Date Selector Banner (Private historical browsing) */}
        <div className="mt-2.5 flex items-center justify-between bg-[#FFF9EE] dark:bg-[#2A201C] p-2 rounded-2xl border border-[#4E342E]/15">
          <button
            onClick={() => handleDayShift(-1)}
            className="p-1 hover:bg-[#4E342E]/10 rounded-lg text-[#5D4037] dark:text-[#FFE082]"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center">
            <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
              {isToday ? "Today's Log" : selectedDate}
            </div>
            <div className="text-[10px] text-[#8D6E63] dark:text-[#BCAAA4] flex items-center justify-center gap-1">
              {isToday ? (
                'Local Calendar Day'
              ) : (
                <>
                  <Lock className="w-2.5 h-2.5 inline" />
                  <span>Private Historical View</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => handleDayShift(1)}
            disabled={isToday}
            className={`p-1 rounded-lg text-[#5D4037] dark:text-[#FFE082] ${
              isToday ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#4E342E]/10'
            }`}
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot Center Stage with Speech Bubble */}
        <div className="my-3 flex flex-col items-center relative">
          {/* Speech Bubble */}
          <div className="mb-2 bg-white dark:bg-[#3E2723] px-3.5 py-1.5 rounded-2xl border-2 border-[#4E342E] shadow-sm text-xs font-semibold text-[#4E342E] dark:text-[#FFF8E1] relative animate-fade-in max-w-[260px] text-center">
            {getSpeechBubble()}
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#4E342E]" />
          </div>

          {/* Interactive 16-Bit Mascot */}
          <div
            onClick={handleMascotPoke}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="Poke Sir Poops-a-Lot!"
          >
            <PixelMascot mood={getMascotMood()} size={110} />
          </div>
          <div className="text-[10px] text-[#8D6E63] dark:text-[#BCAAA4] font-pixel mt-1">
            Sir Poops-a-Lot
          </div>
        </div>

        {/* Large Prominent Today Count Card */}
        <div className="bg-[#FFFDF7] dark:bg-[#2A201C] p-4 rounded-3xl border-2 border-[#4E342E] pixel-box-shadow flex flex-col items-center relative overflow-hidden">
          <div className="text-[10px] font-pixel tracking-wider text-[#8D6E63] uppercase">
            {isToday ? "TODAY'S TOTAL" : "DAILY RECORD"}
          </div>

          <div className="flex items-baseline justify-center gap-2 my-1">
            <span className="text-6xl font-black font-pixel tabular-nums text-[#4E342E] dark:text-[#FFE082]">
              {todayCount}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-[#795548] dark:text-[#D7CCC8]">
            <span>{todayCount === 1 ? '1 flush logged' : `${todayCount} flushes logged`}</span>
            <span>·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              {todayCount > 0 ? '✓ On Track' : 'Waiting'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Zone: "I Pooped!" Button & Undo Toast */}
      <div className="space-y-2 mt-3">
        {/* Floating 5-Second Undo Toast */}
        {showUndo && (
          <div className="w-full bg-[#FFE082] dark:bg-[#FFB74D] border-2 border-[#4E342E] p-2.5 rounded-2xl flex items-center justify-between text-xs font-bold text-[#4E342E] shadow-md animate-bounce">
            <div className="flex items-center gap-1.5">
              <span>Logged! Accidental tap?</span>
              <span className="bg-[#4E342E] text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                {undoSeconds}s
              </span>
            </div>
            <button
              onClick={onUndoPoop}
              className="flex items-center gap-1 bg-[#4E342E] text-white px-3 py-1 rounded-xl text-xs font-pixel hover:bg-[#3E2723] active:scale-95 transition-transform"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          </div>
        )}

        {/* The BIG "I Pooped!" Retro Button */}
        <button
          onClick={onLogPoop}
          disabled={isDebouncing}
          className={`w-full py-4 rounded-3xl font-pixel text-lg text-white border-2 border-[#4E342E] transition-all flex items-center justify-center gap-3 select-none ${
            isDebouncing
              ? 'bg-[#8D6E63] cursor-wait opacity-80'
              : 'bg-[#5D4037] hover:bg-[#4E342E] active:pixel-box-shadow-active pixel-box-shadow'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-300 stroke-[2.5]" />
          <span>{isDebouncing ? 'LOGGING...' : 'I POOPED!'}</span>
        </button>

        {/* Paired Buddy Live Status */}
        <div className="bg-[#FFF9EE] dark:bg-[#2A201C] p-3 rounded-2xl border border-[#4E342E]/15">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
              <Users className="w-3.5 h-3.5 text-[#5D4037]" />
              <span>Paired Buddy Sync</span>
            </div>
            <button
              onClick={onOpenFriends}
              className="text-[11px] font-bold text-[#5D4037] dark:text-[#FFE082] hover:underline flex items-center gap-0.5"
            >
              <span>{pairedFriend ? 'Change Pal' : 'Select Pal'}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {pairedFriend ? (
            <div className="bg-white/80 dark:bg-black/20 p-2.5 rounded-xl border border-[#4E342E]/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FFE082] flex items-center justify-center text-[#4E342E]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#4E342E] dark:text-[#EFEBE9]">
                      {pairedFriend.displayName}
                    </div>
                    <div className="text-[10px] text-[#8D6E63]">Live synced duo buddy</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <span className="text-xs text-[#8D6E63] font-medium mr-1">You:</span>
                    <span className="font-pixel text-sm font-bold text-[#4E342E] dark:text-[#FFE082]">
                      {todayCount}
                    </span>
                  </div>
                  <span className="text-[#8D6E63]">·</span>
                  <div>
                    <span className="text-xs text-[#8D6E63] font-medium mr-1">Pal:</span>
                    <span className="font-pixel text-sm font-bold text-[#4E342E] dark:text-[#FFE082]">
                      {pairedFriend.todayCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Combined Together Metric */}
              <div className="pt-2 border-t border-[#4E342E]/10 flex items-center justify-between text-[11px]">
                <span className="text-[#8D6E63] font-semibold">Together today:</span>
                <span className="font-bold text-[#5D4037] dark:text-[#FFE082] font-pixel">
                  {todayCount + pairedFriend.todayCount} flushes
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 text-center bg-white/60 dark:bg-black/20 rounded-xl">
              <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                No Paired Buddy Selected
              </div>
              <p className="text-[10px] text-[#8D6E63] mt-0.5 mb-2">
                Pair with a friend to sync daily milestones and celebrate goals together.
              </p>
              <button
                onClick={onOpenFriends}
                className="px-3 py-1 bg-[#5D4037] text-white rounded-lg text-xs font-bold"
              >
                Pair a Friend Now
              </button>
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-2 text-[9px] text-[#8D6E63] text-center flex items-center justify-center gap-1">
            <span className="font-mono text-[10px]">PRIVATE</span>
            <span>· Friends only see today&apos;s aggregate count</span>
          </div>
        </div>
      </div>
    </div>
  );
};
