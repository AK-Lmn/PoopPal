import React, { useState } from 'react';
import { X, Sparkles, Trophy, Award, CheckCircle2 } from 'lucide-react';
import { STICKER_PACK, INITIAL_CHALLENGES } from '../data/mockData';
import { playStickerSound } from '../utils/sound';
import { LucideIcon } from './LucideIcon';

interface StickersAndChallengesModalProps {
  onClose: () => void;
  todayCount: number;
}

export const StickersAndChallengesModal: React.FC<StickersAndChallengesModalProps> = ({
  onClose,
  todayCount,
}) => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'challenges'>('stickers');
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleStickerClick = (name: string) => {
    setSelectedSticker(name);
    playStickerSound();
    setTimeout(() => setSelectedSticker(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] dark:bg-[#201815] text-[#4E342E] dark:text-[#EFEBE9] w-full max-w-sm rounded-3xl border-2 border-[#4E342E] p-4 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#4E342E]/10 text-[#5D4037] dark:text-[#D7CCC8]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-3 pb-3 border-b border-[#4E342E]/10">
          <button
            onClick={() => setActiveTab('stickers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-pixel flex items-center gap-1.5 transition-all ${
              activeTab === 'stickers'
                ? 'bg-[#5D4037] text-white shadow-xs'
                : 'bg-[#FFF9EE] dark:bg-[#2A201C] text-[#5D4037] dark:text-[#FFE082]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sticker Pack</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 rounded-xl text-xs font-pixel flex items-center gap-1.5 transition-all ${
              activeTab === 'challenges'
                ? 'bg-[#5D4037] text-white shadow-xs'
                : 'bg-[#FFF9EE] dark:bg-[#2A201C] text-[#5D4037] dark:text-[#FFE082]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Challenges</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === 'stickers' && (
            <div>
              <p className="text-[11px] text-[#8D6E63] text-center mb-3">
                Tap a 16-bit badge to preview retro audio synthesizer or send to friends.
              </p>

              {selectedSticker && (
                <div className="mb-3 p-2 bg-[#FFE082] text-[#4E342E] text-xs font-bold rounded-xl text-center border border-[#4E342E]/20 flex items-center justify-center gap-1.5 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{selectedSticker} sent!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                {STICKER_PACK.map((sticker) => (
                  <button
                    key={sticker.id}
                    onClick={() => handleStickerClick(sticker.name)}
                    className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] hover:bg-[#FFE082]/30 rounded-2xl border-2 border-[#4E342E]/15 hover:border-[#4E342E] text-left transition-all active:scale-95 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-[#3E2723] flex items-center justify-center text-[#5D4037] dark:text-[#FFE082] border border-[#4E342E]/10">
                        <LucideIcon name={sticker.iconName} className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[8px] font-pixel px-1.5 py-0.5 rounded uppercase ${
                          sticker.rarity === 'legendary'
                            ? 'bg-amber-400 text-amber-950 font-black'
                            : sticker.rarity === 'rare'
                            ? 'bg-purple-200 text-purple-900 font-bold'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {sticker.rarity}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                        {sticker.name}
                      </div>
                      <div className="text-[10px] text-[#8D6E63] line-clamp-1">
                        {sticker.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-2.5">
              <p className="text-[11px] text-[#8D6E63] text-center mb-2">
                Shared cooperative daily habit goals with your friends!
              </p>

              {INITIAL_CHALLENGES.map((ch) => {
                const progressPct = Math.min(100, Math.round((ch.currentCount / ch.targetCount) * 100));
                return (
                  <div
                    key={ch.id}
                    className="p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#3E2723] flex items-center justify-center text-[#5D4037] dark:text-[#FFE082] border border-[#4E342E]/10">
                          <LucideIcon name={ch.iconName} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1] flex items-center gap-1.5">
                            <span>{ch.title}</span>
                            {ch.completed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <div className="text-[10px] text-[#8D6E63]">{ch.description}</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-[#795548] dark:text-[#BCAAA4]">
                        <span>Progress: {ch.currentCount}/{ch.targetCount}</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#4E342E]/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#5D4037] dark:bg-[#FFE082] transition-all duration-300 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Reward badge */}
                    <div className="text-[9px] text-[#8D6E63] flex items-center gap-1 font-semibold">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Reward: {ch.rewardName}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
