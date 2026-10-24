import React, { useState } from 'react';
import { PixelMascot } from './PixelMascot';
import { FriendItem, MascotMood } from '../types';
import {
  Plus,
  Info,
  RefreshCw,
  Heart,
  Sparkles,
  Phone,
  MessageSquare,
  Camera,
  Users,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { LucideIcon } from './LucideIcon';
import { AppIcon } from './AppIcon';

interface GlanceWidgetSimulatorProps {
  todayCount: number;
  pairedFriend?: FriendItem;
  friends: FriendItem[];
  onSelectPairedFriend: (uid: string) => void;
  onLogPoop: () => void;
  onOpenApp: () => void;
}

export const GlanceWidgetSimulator: React.FC<GlanceWidgetSimulatorProps> = ({
  todayCount,
  pairedFriend,
  friends,
  onSelectPairedFriend,
  onLogPoop,
  onOpenApp,
}) => {
  const [showDocs, setShowDocs] = useState(false);
  const [isWidgetUpdating, setIsWidgetUpdating] = useState(false);

  const getMascotMood = (count: number): MascotMood => {
    if (count === 0) return 'sleepy';
    if (count < 3) return 'relieved';
    return 'champion';
  };

  const handleWidgetTapLog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWidgetUpdating(true);
    onLogPoop();
    setTimeout(() => setIsWidgetUpdating(false), 300);
  };

  const friendCount = pairedFriend?.todayCount ?? 0;
  const combinedTotal = todayCount + friendCount;

  return (
    <div className="flex-1 w-full h-full relative overflow-y-auto flex flex-col justify-between p-4 bg-gradient-to-b from-[#8C6D58] via-[#BCAAA4] to-[#795548] text-white">
      {/* Launcher Top Bar & Clock */}
      <div className="w-full space-y-3.5">
        <div className="pt-2 px-2 flex justify-between items-baseline">
          <div>
            <div className="text-3xl font-extrabold tracking-tight drop-shadow-md">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs font-medium text-amber-100 drop-shadow">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}{' '}
              · Paired Mode
            </div>
          </div>
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="flex items-center gap-1 text-[11px] font-bold bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 hover:bg-black/60 transition-all text-amber-200"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Glance Pairing Info</span>
          </button>
        </div>

        {/* Glance Paired Widget Info Drawer */}
        {showDocs && (
          <div className="bg-black/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-2.5 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-amber-300 font-bold">
              <span>Paired Friend Glance Widget Architecture</span>
              <button
                onClick={() => setShowDocs(false)}
                className="text-white hover:text-amber-200 px-1 font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-200 text-[11px] leading-relaxed">
              Similar to Widgetable&apos;s paired friends/couples widgets, this Glance widget pairs
              two users and displays both of their daily counts simultaneously on the home screen.
            </p>
            <ul className="text-slate-300 text-[10px] space-y-1 list-disc list-inside">
              <li>
                <strong>Paired Data Synchronization:</strong> The widget listens to today&apos;s
                aggregate count updates for both the local user and the paired user via DataStore &amp;
                Firestore document snapshot listeners.
              </li>
              <li>
                <strong>Direct Widget Action:</strong> Tapping &quot;+ Log Poop&quot; executes an
                <code>ActionCallback</code>, incrementing your count and triggering a combined total
                re-render in real time.
              </li>
              <li>
                <strong>Privacy Guaranteed:</strong> Neither friend sees timestamps or history;
                only today&apos;s current number is fetched.
              </li>
            </ul>
          </div>
        )}

        {/* 1. WIDE 4x2 PAIRED FRIEND GLANCE WIDGET (Main paired widget experience) */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1">
              <span>4×2 Paired Friend Widget</span>
              <span className="text-white/60">· PairedGlanceWidget.kt</span>
            </span>
            {isWidgetUpdating && (
              <span className="text-[10px] text-amber-300 flex items-center gap-1 font-mono animate-pulse">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Syncing...
              </span>
            )}
          </div>

          <div
            onClick={onOpenApp}
            className="w-full bg-[#FFF9EE] text-[#4E342E] rounded-3xl p-3.5 shadow-xl border-2 border-[#4E342E] cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex flex-col justify-between select-none relative"
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#4E342E]/15">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-pixel bg-[#FFE082] px-1.5 py-0.5 rounded text-[#4E342E]">
                  PoopPal Duo
                </span>
                <span className="text-xs font-bold text-[#4E342E] truncate">
                  {pairedFriend ? `Paired with ${pairedFriend.displayName}` : 'No Friend Paired'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#8D6E63] font-semibold">
                <span>Open App</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Paired Dual Comparison Centerpiece */}
            {pairedFriend ? (
              <div className="py-2.5 flex items-center justify-between">
                {/* User Side */}
                <div className="flex flex-col items-center w-28 text-center">
                  <PixelMascot mood={getMascotMood(todayCount)} size={44} animate={false} />
                  <div className="text-[10px] font-bold text-[#795548] mt-1">You</div>
                  <div className="text-2xl font-black font-pixel text-[#4E342E] tabular-nums">
                    {todayCount}
                  </div>
                  <div className="text-[8px] text-[#8D6E63]">flushes today</div>
                </div>

                {/* Middle Connection / Combined Total */}
                <div className="flex flex-col items-center justify-center px-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFE082] border border-[#4E342E]/20 flex items-center justify-center text-[#5D4037] shadow-xs">
                    <Heart className="w-4 h-4 fill-amber-500 text-amber-700" />
                  </div>
                  <div className="text-[9px] font-bold text-[#8D6E63] mt-1 uppercase">Together</div>
                  <div className="text-xl font-black font-pixel text-[#5D4037]">
                    {combinedTotal}
                  </div>
                </div>

                {/* Paired Friend Side */}
                <div className="flex flex-col items-center w-28 text-center">
                  <PixelMascot mood={getMascotMood(friendCount)} size={44} animate={false} />
                  <div className="text-[10px] font-bold text-[#795548] mt-1 truncate max-w-[80px]">
                    {pairedFriend.displayName}
                  </div>
                  <div className="text-2xl font-black font-pixel text-[#4E342E] tabular-nums">
                    {friendCount}
                  </div>
                  <div className="text-[8px] text-[#8D6E63]">flushes today</div>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-xs font-bold text-[#5D4037]">No friend paired yet!</p>
                <p className="text-[10px] text-[#8D6E63] mt-0.5">
                  Tap to open the app and pair with your bestie.
                </p>
              </div>
            )}

            {/* Quick Log Action on Widget */}
            <div className="pt-2 border-t border-[#4E342E]/10 flex items-center justify-between">
              <span className="text-[9px] text-[#8D6E63] font-semibold">
                {todayCount > 0 && friendCount > 0
                  ? 'Both logged today!'
                  : 'Log to keep duo synced!'}
              </span>
              <button
                onClick={handleWidgetTapLog}
                className="py-1 px-3 bg-[#5D4037] hover:bg-[#3E2723] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>+ Log My Poop</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. COMPACT 2x2 PAIRED GLANCE WIDGET */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1">
              <span>2×2 Compact Duo Widget</span>
            </span>
          </div>

          <div
            onClick={onOpenApp}
            className="w-48 h-48 bg-[#FFF9EE] text-[#4E342E] rounded-3xl p-3 shadow-xl border-2 border-[#4E342E] cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between select-none relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-pixel bg-[#FFE082] px-1.5 py-0.5 rounded text-[#4E342E]">
                Duo Count
              </span>
              <span className="text-[9px] font-bold text-[#8D6E63]">
                {pairedFriend ? pairedFriend.displayName.slice(0, 6) : 'Pair'}
              </span>
            </div>

            <div className="flex items-center justify-around py-1">
              <div className="text-center">
                <div className="text-[9px] font-bold text-[#8D6E63]">YOU</div>
                <div className="text-2xl font-black font-pixel text-[#4E342E]">{todayCount}</div>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#FFE082] flex items-center justify-center text-xs">
                <Heart className="w-3 h-3 fill-amber-500 text-amber-700" />
              </div>

              <div className="text-center">
                <div className="text-[9px] font-bold text-[#8D6E63]">PAL</div>
                <div className="text-2xl font-black font-pixel text-[#4E342E]">{friendCount}</div>
              </div>
            </div>

            <div className="text-center bg-white/70 py-1 rounded-lg border border-[#4E342E]/10">
              <span className="text-[9px] text-[#8D6E63] font-bold">Together Today: </span>
              <strong className="text-xs font-pixel text-[#5D4037]">{combinedTotal}</strong>
            </div>

            <button
              onClick={handleWidgetTapLog}
              className="w-full py-1.5 bg-[#5D4037] hover:bg-[#3E2723] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Log Poop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Android Dock / Bottom App Icons */}
      <div className="w-full pt-4 pb-2">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-3 flex items-center justify-around">
          <button
            onClick={onOpenApp}
            className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform relative"
          >
            <AppIcon size={48} count={todayCount} />
            <span className="text-[10px] font-medium text-white drop-shadow">PoopPal</span>
          </button>

          <div className="flex flex-col items-center gap-1 opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-[#1E88E5] flex items-center justify-center text-white shadow-md">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-white drop-shadow">Phone</span>
          </div>

          <div className="flex flex-col items-center gap-1 opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-[#43A047] flex items-center justify-center text-white shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-white drop-shadow">Chat</span>
          </div>

          <div className="flex flex-col items-center gap-1 opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-[#FB8C00] flex items-center justify-center text-white shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-white drop-shadow">Camera</span>
          </div>
        </div>
      </div>
    </div>
  );
};
