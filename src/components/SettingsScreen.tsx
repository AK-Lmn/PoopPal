import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, RefreshCw, Trash2, Check, User, Info, Smartphone, Volume2, VolumeX, Sun, Moon, Sparkles, LayoutGrid, X, Zap, Sliders, Users } from 'lucide-react';
import { UserProfile } from '../types';
import { AppIcon } from './AppIcon';

interface SettingsScreenProps {
  userProfile: UserProfile;
  currentUserEmail?: string | null;
  onSignOut?: () => void;
  onUpdateDisplayName: (name: string) => void;
  onResetData: () => void;
  onBack: () => void;
  lifetimeCount: number;
  soundOn?: boolean;
  onToggleSound?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onReplayOnboarding?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userProfile,
  currentUserEmail,
  onSignOut,
  onUpdateDisplayName,
  onResetData,
  onBack,
  lifetimeCount,
  soundOn = true,
  onToggleSound,
  isDark = false,
  onToggleTheme,
  onReplayOnboarding,
}) => {
  const [nameInput, setNameInput] = useState(userProfile.displayName);
  const [savedName, setSavedName] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showWidgetGuide, setShowWidgetGuide] = useState(false);
  const [showTileGuide, setShowTileGuide] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateDisplayName(nameInput.trim());
      setSavedName(true);
      setTimeout(() => setSavedName(false), 2000);
    }
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-4 py-3 flex flex-col justify-between select-none">
      <div>
        {/* Top App Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4E342E]/10">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#5D4037] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <span className="text-sm font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
            Settings & Profile
          </span>

          <div className="w-8" />
        </div>

        <div className="space-y-3 mt-3">
          {/* 1. Profile Editor */}
          <div className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15">
            <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider mb-2">
              Your Public Profile
            </div>

            <form onSubmit={handleSaveName} className="space-y-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#5D4037] dark:text-[#D7CCC8] mb-1">
                  Display Name:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength={16}
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-[#1A1412] border border-[#4E342E]/20 rounded-xl text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    {savedName ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : 'Save'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-2 text-[10px] text-[#8D6E63]">
              Your Invite Code: <strong className="font-mono text-[#4E342E] dark:text-[#FFE082]">{userProfile.inviteCode}</strong>
            </div>
          </div>

          {/* App Preferences */}
          <div className="p-3 bg-white dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 space-y-2">
            <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider mb-2">
              App Preferences
            </div>

            <div className="grid grid-cols-2 gap-2">
              {onToggleSound && (
                <button
                  type="button"
                  onClick={onToggleSound}
                  className="p-2.5 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/10 flex items-center justify-between text-xs font-bold text-[#4E342E] dark:text-[#FFE082] hover:bg-amber-100/50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {soundOn ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 opacity-50" />}
                    <span>Sound</span>
                  </span>
                  <span className="text-[10px] text-[#8D6E63]">{soundOn ? 'On' : 'Muted'}</span>
                </button>
              )}

              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="p-2.5 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/10 flex items-center justify-between text-xs font-bold text-[#4E342E] dark:text-[#FFE082] hover:bg-amber-100/50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-[#5D4037]" />}
                    <span>Theme</span>
                  </span>
                  <span className="text-[10px] text-[#8D6E63]">{isDark ? 'Dark' : 'Light'}</span>
                </button>
              )}
            </div>

            {onReplayOnboarding && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onReplayOnboarding}
                  className="w-full p-2 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/10 flex items-center justify-center gap-1.5 text-xs font-bold text-[#4E342E] dark:text-[#FFE082] hover:bg-amber-100/50 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Replay Tutorial / Onboarding</span>
                </button>
              </div>
            )}
          </div>

          {/* Home Screen & Widgets */}
          <div className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border-2 border-[#4E342E]/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4E342E] dark:text-[#FFE082]">
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Add to Home Screen &amp; Widgets</span>
              </div>
              <span className="text-[9px] font-bold bg-amber-200 dark:bg-amber-900/60 text-[#4E342E] dark:text-[#FFE082] px-2 py-0.5 rounded-full border border-amber-300">
                Android Widget
              </span>
            </div>

            <p className="text-[11px] text-[#795548] dark:text-[#D7CCC8] leading-relaxed">
              Place the PoopPal companion widget directly on your phone&apos;s home screen for instant one-tap tracking!
            </p>

            {/* Widget Preview Box */}
            <div className="p-2.5 bg-white dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/15 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <AppIcon size={38} showBadge={false} />
                <div>
                  <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">PoopPal Duo Widget</div>
                  <div className="text-[10px] text-[#8D6E63]">4x2 &amp; 2x2 Paired Android Widgets</div>
                </div>
              </div>

              <div className="px-2.5 py-1 bg-[#4E342E] text-white rounded-lg text-[10px] font-bold">
                + Log My Poop
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowWidgetGuide(true)}
              className="w-full py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>How to Add Widget to Home Screen</span>
            </button>
          </div>

          {/* Quick Access & Android Shortcuts */}
          <div className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border-2 border-[#4E342E]/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4E342E] dark:text-[#FFE082]">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Quick Access &amp; Android Shortcuts</span>
              </div>
              <span className="text-[9px] font-bold bg-amber-200 dark:bg-amber-900/60 text-[#4E342E] dark:text-[#FFE082] px-2 py-0.5 rounded-full border border-amber-300">
                Power Features
              </span>
            </div>

            <p className="text-[11px] text-[#795548] dark:text-[#D7CCC8] leading-relaxed">
              Log in seconds without navigating menus using Android launcher long-press shortcuts and notification shade tiles.
            </p>

            {/* Launcher Shortcuts Showcase */}
            <div className="p-2.5 bg-white dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/15 space-y-1.5">
              <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider">
                App Icon Long-Press Menu
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                <div className="p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-lg border border-[#4E342E]/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Log Flush Now</span>
                </div>
                <div className="p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-lg border border-[#4E342E]/10 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>View Paired Pal</span>
                </div>
              </div>
            </div>

            {/* Quick Settings Tile Button */}
            <button
              type="button"
              onClick={() => setShowTileGuide(true)}
              className="w-full py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Enable Quick Settings Pull-Down Tile</span>
            </button>
          </div>

          {/* 2. Personal Private Stats */}
          <div className="p-3 bg-white dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15">
            <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider mb-2">
              Private Personal Statistics
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/10">
                <div className="text-2xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                  {lifetimeCount}
                </div>
                <div className="text-[9px] text-[#8D6E63] font-bold">Lifetime Flushes</div>
              </div>

              <div className="p-2 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl border border-[#4E342E]/10">
                <div className="text-2xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                  100%
                </div>
                <div className="text-[9px] text-[#8D6E63] font-bold">Local Sync Health</div>
              </div>
            </div>
          </div>

          {/* 3. Strict Privacy Guarantee */}
          <div className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4E342E] dark:text-[#FFE082]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy & Architecture Guarantee</span>
            </div>
            <p className="text-[10px] text-[#795548] dark:text-[#D7CCC8] leading-relaxed">
              • Friends can <strong>ONLY</strong> see your aggregate count for the current calendar day.<br />
              • Exact timestamps and log times are <strong>never stored</strong> in friends-visible collections.<br />
              • Historical counts from previous days are strictly private to your own device.<br />
              • No email addresses or personal phone numbers are ever required or indexed.
            </p>
          </div>

          {/* 4. Firebase Cloud Firestore & Auth Status */}
          <div className="p-3 bg-white dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#4E342E] dark:text-[#FFF8E1]">Cloud Firestore DB</div>
                <div className="text-[10px] text-[#8D6E63]">
                  {currentUserEmail ? `Account: ${currentUserEmail}` : 'Local Demo Mode'}
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300">
                Firestore Active
              </span>
            </div>

            <div className="p-2 bg-[#FFF9EE] dark:bg-[#1A1412] rounded-xl text-[10px] text-[#795548] dark:text-[#D7CCC8] space-y-1">
              <div><strong>Database:</strong> Google Cloud Firestore</div>
              <div><strong>Auth:</strong> Google Sign-In &amp; Email/Password (&ge;8 chars)</div>
              <div><strong>Sync:</strong> Real-time listener on daily counts &amp; paired pals</div>
            </div>

            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="w-full py-1.5 px-3 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold transition-colors"
              >
                {currentUserEmail ? 'Sign Out of Account' : 'Sign In with Account'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="pt-3">
        {confirmReset ? (
          <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 text-center space-y-2">
            <p className="text-[11px] text-red-700 dark:text-red-300 font-bold">
              Are you sure? This will reset all today and historical logs!
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  onResetData();
                  setConfirmReset(false);
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
              >
                Yes, Reset All
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="w-full py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local App Data</span>
          </button>
        )}
      </div>

      {/* Widget Guide Modal */}
      {showWidgetGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#FFFDF7] dark:bg-[#201815] rounded-3xl p-5 border-2 border-[#4E342E] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#4E342E]/10">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold font-pixel text-[#4E342E] dark:text-[#FFE082]">
                  Add PoopPal Widget
                </span>
              </div>
              <button
                onClick={() => setShowWidgetGuide(false)}
                className="p-1 rounded-full hover:bg-[#4E342E]/10 text-[#8D6E63] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5D4037] dark:text-[#D7CCC8]">
              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </span>
                <p>
                  Go to your Android phone or emulator <strong>Home Screen</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </span>
                <p>
                  <strong>Press and hold (long-press)</strong> any empty space on your wallpaper.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </span>
                <p>
                  Tap the <strong>Widgets</strong> icon from the popup menu at the bottom.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  4
                </span>
                <p>
                  Scroll down to <strong>PoopPal</strong>, touch and drag the widget onto your home screen!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowWidgetGuide(false)}
              className="w-full py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Quick Settings Tile Guide Modal */}
      {showTileGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#FFFDF7] dark:bg-[#201815] rounded-3xl p-5 border-2 border-[#4E342E] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#4E342E]/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold font-pixel text-[#4E342E] dark:text-[#FFE082]">
                  Quick Settings Tile Setup
                </span>
              </div>
              <button
                onClick={() => setShowTileGuide(false)}
                className="p-1 rounded-full hover:bg-[#4E342E]/10 text-[#8D6E63] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5D4037] dark:text-[#D7CCC8]">
              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </span>
                <p>
                  Swipe down <strong>twice</strong> from the top of your Android screen to open full Quick Settings.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </span>
                <p>
                  Tap the <strong>Edit (pencil)</strong> button at the bottom or corner of the panel.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </span>
                <p>
                  Find <strong>PoopPal Log</strong> in the available tiles list.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-xl border border-[#4E342E]/10">
                <span className="w-5 h-5 rounded-full bg-[#5D4037] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  4
                </span>
                <p>
                  Touch and drag the tile into your <strong>active Quick Settings</strong>. Tap it anytime for instant background logging with a system toast!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowTileGuide(false)}
              className="w-full py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
