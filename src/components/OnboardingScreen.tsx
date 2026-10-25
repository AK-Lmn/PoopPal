import React, { useState } from 'react';
import { PixelMascot } from './PixelMascot';
import { MascotMood, UserProfile } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  User,
  Heart,
  Smartphone,
  ChevronLeft,
} from 'lucide-react';
import { playPlopSound, playCelebrationSound } from '../utils/sound';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile, pairedFriendUid?: string) => void;
  defaultInviteCode: string;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  defaultInviteCode,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [displayName, setDisplayName] = useState('NewPooper');
  const [selectedMood, setSelectedMood] = useState<MascotMood>('ready');
  const [pairChoice, setPairChoice] = useState<'demo' | 'code' | 'solo'>('demo');
  const [customFriendCode, setCustomFriendCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleNext = () => {
    playPlopSound();
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    playPlopSound();
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleFinish = () => {
    playCelebrationSound();
    const finalProfile: UserProfile = {
      uid: `user_${Date.now()}`,
      displayName: displayName.trim() || 'PoopPal',
      avatarId: 'mascot_classic',
      inviteCode: defaultInviteCode,
      pairedFriendUid: pairChoice === 'demo' ? 'friend_sam' : undefined,
      createdAt: Date.now(),
    };
    onComplete(finalProfile, pairChoice === 'demo' ? 'friend_sam' : undefined);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(defaultInviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-5 py-6 flex flex-col justify-between bg-[#FFFDF7] dark:bg-[#201815] text-[#4E342E] dark:text-[#EFEBE9] select-none">
      {/* Top Progress Indicator */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="p-1 -ml-1 text-[#8D6E63] hover:text-[#4E342E] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-pixel text-[#8D6E63]">PoopPal</span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-[#5D4037] dark:bg-[#FFE082]'
                    : s < step
                    ? 'w-3 bg-[#8D6E63]'
                    : 'w-3 bg-[#4E342E]/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: WELCOME & MEET MASCOT */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            {/* Mascot Greeting */}
            <div className="relative mt-2">
              <PixelMascot mood="ready" size={120} animate={true} />
              <div className="absolute -top-2 -right-4 bg-[#FFE082] text-[#4E342E] text-[10px] font-pixel px-2 py-0.5 rounded-full border border-[#4E342E]/20">
                Hi there!
              </div>
            </div>

            <div className="space-y-1 max-w-xs">
              <h2 className="text-xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                Meet Sir Poops-a-Lot
              </h2>
              <p className="text-xs text-[#795548] dark:text-[#D7CCC8] leading-relaxed">
                Your cute 16-bit virtual buddy for tracking daily flushes and syncing with your best
                friends and pals!
              </p>
            </div>

            <div className="w-full bg-[#FFF9EE] dark:bg-[#2A201C] p-3 rounded-2xl border border-[#4E342E]/15 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#4E342E] dark:text-[#FFE082] font-bold">
                <Smartphone className="w-4 h-4 text-[#5D4037]" />
                <span>What PoopPal does:</span>
              </div>
              <ul className="text-[11px] text-[#795548] dark:text-[#BCAAA4] space-y-1 list-disc list-inside">
                <li>Log each flush with a single tactile tap</li>
                <li>Pair with a friend to compare today&apos;s counts together</li>
                <li>Real-time duo buddy sync and reactions</li>
                <li>Zero-leak privacy: only today&apos;s total is ever visible</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE & MASCOT STYLE */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h2 className="text-xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                Name Your Pal
              </h2>
              <p className="text-xs text-[#795548] dark:text-[#D7CCC8]">
                How should friends see you on their buddy feed?
              </p>
            </div>

            <div className="my-1">
              <PixelMascot mood={selectedMood} size={100} animate={false} />
            </div>

            {/* Display Name Input */}
            <div className="w-full max-w-xs text-left">
              <label className="block text-[11px] font-bold text-[#5D4037] dark:text-[#D7CCC8] mb-1">
                Your Nickname:
              </label>
              <div className="flex items-center gap-2 bg-white dark:bg-[#1A1412] px-3 py-2 rounded-2xl border-2 border-[#4E342E]/30 focus-within:border-[#4E342E]">
                <User className="w-4 h-4 text-[#8D6E63]" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={14}
                  placeholder="e.g. Alex"
                  className="w-full bg-transparent text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Starter Mood Selector */}
            <div className="w-full max-w-xs text-left">
              <label className="block text-[11px] font-bold text-[#5D4037] dark:text-[#D7CCC8] mb-1.5">
                Starter Mascot Mood:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ready', 'relieved', 'champion'] as MascotMood[]).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`py-2 px-1 rounded-xl text-center border-2 transition-all capitalize text-xs font-bold ${
                      selectedMood === mood
                        ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-sm'
                        : 'bg-white dark:bg-[#2A201C] text-[#5D4037] dark:text-[#D7CCC8] border-[#4E342E]/15'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: YOUR INVITE CODE & ZERO-LEAK PRIVACY */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h2 className="text-xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                Your Secret Code
              </h2>
              <p className="text-xs text-[#795548] dark:text-[#D7CCC8]">
                Share this with your friends to pair up instantly.
              </p>
            </div>

            {/* Code Box */}
            <div className="w-full max-w-xs bg-[#FFF9EE] dark:bg-[#2A201C] p-4 rounded-3xl border-2 border-[#4E342E] pixel-box-shadow space-y-3">
              <div className="text-[10px] font-mono text-[#8D6E63] uppercase tracking-wider font-bold">
                Unique Invite Code
              </div>
              <div className="text-3xl font-black font-pixel tracking-widest text-[#4E342E] dark:text-[#FFE082]">
                {defaultInviteCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy My Code'}</span>
              </button>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="w-full max-w-xs bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-left flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>100% Privacy Lock:</strong> No phone numbers, contacts, or emails are ever
                indexed. Friends only see today&apos;s aggregate number.
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: BUDDY PAIRING SETUP */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center space-y-3 py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h2 className="text-xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
                Pair with a Pal
              </h2>
              <p className="text-xs text-[#795548] dark:text-[#D7CCC8]">
                How would you like to get started with friend sync?
              </p>
            </div>

            {/* Choice 1: Pair with Sample Pal */}
            <div
              onClick={() => setPairChoice('demo')}
              className={`w-full max-w-xs p-3 rounded-2xl border-2 cursor-pointer transition-all text-left flex items-center justify-between ${
                pairChoice === 'demo'
                  ? 'bg-[#FFE082]/30 dark:bg-[#3E2723] border-[#5D4037] shadow-sm'
                  : 'bg-white dark:bg-[#2A201C] border-[#4E342E]/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFE082] flex items-center justify-center text-[#4E342E]">
                  <Heart className="w-4 h-4 text-amber-700 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                    Pair with SammySitz (Recommended)
                  </div>
                  <div className="text-[10px] text-[#8D6E63]">
                    Instant live preview of duo buddy sync
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  pairChoice === 'demo' ? 'border-[#5D4037] bg-[#5D4037]' : 'border-slate-300'
                }`}
              >
                {pairChoice === 'demo' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>

            {/* Choice 2: Start Solo */}
            <div
              onClick={() => setPairChoice('solo')}
              className={`w-full max-w-xs p-3 rounded-2xl border-2 cursor-pointer transition-all text-left flex items-center justify-between ${
                pairChoice === 'solo'
                  ? 'bg-[#FFE082]/30 dark:bg-[#3E2723] border-[#5D4037] shadow-sm'
                  : 'bg-white dark:bg-[#2A201C] border-[#4E342E]/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#3E2723] flex items-center justify-center text-[#5D4037]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                    Start Solo First
                  </div>
                  <div className="text-[10px] text-[#8D6E63]">
                    Track your own flushes; pair with a friend later
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  pairChoice === 'solo' ? 'border-[#5D4037] bg-[#5D4037]' : 'border-slate-300'
                }`}
              >
                {pairChoice === 'solo' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>

            <div className="p-2.5 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 text-[10px] text-[#795548] dark:text-[#BCAAA4]">
              You can change or add pals at any time from the Pals &amp; Pairing tab!
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#5D4037] hover:bg-[#4E342E] active:pixel-box-shadow-active pixel-box-shadow border-2 border-[#4E342E] text-white rounded-3xl text-sm font-pixel font-bold flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <span>{step === 4 ? 'LAUNCH POOPPAL' : 'CONTINUE'}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
