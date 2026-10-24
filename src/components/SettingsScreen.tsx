import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, RefreshCw, Trash2, Check, User, Info, Smartphone } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsScreenProps {
  userProfile: UserProfile;
  currentUserEmail?: string | null;
  onSignOut?: () => void;
  onUpdateDisplayName: (name: string) => void;
  onResetData: () => void;
  onBack: () => void;
  lifetimeCount: number;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userProfile,
  currentUserEmail,
  onSignOut,
  onUpdateDisplayName,
  onResetData,
  onBack,
  lifetimeCount,
}) => {
  const [nameInput, setNameInput] = useState(userProfile.displayName);
  const [savedName, setSavedName] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

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
    </div>
  );
};
