import React, { useState } from 'react';
import { FriendItem } from '../types';
import {
  ChevronLeft,
  UserPlus,
  Sparkles,
  Trash2,
  ShieldCheck,
  User,
  Users,
  Check,
  Heart,
} from 'lucide-react';
import { LucideIcon } from './LucideIcon';

interface FriendsScreenProps {
  userDisplayName: string;
  userTodayCount: number;
  friends: FriendItem[];
  pairedFriendUid?: string;
  onSetPairedFriend: (uid: string) => void;
  onBack: () => void;
  onOpenAddFriend: () => void;
  onRemoveFriend: (uid: string) => void;
  onSendReaction: (friendUid: string, stickerIconName: string) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({
  userDisplayName,
  userTodayCount,
  friends,
  pairedFriendUid,
  onSetPairedFriend,
  onBack,
  onOpenAddFriend,
  onRemoveFriend,
  onSendReaction,
}) => {
  const [selectedFriendForSticker, setSelectedFriendForSticker] = useState<string | null>(null);

  const activePairedFriend = friends.find((f) => f.uid === pairedFriendUid);
  const quickReactionIcons = ['Crown', 'Sparkles', 'Zap', 'Coffee', 'Rocket', 'Flame'];

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
            <span>Home</span>
          </button>

          <span className="text-sm font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
            Poop Pals &amp; Pairing
          </span>

          <button
            onClick={onOpenAddFriend}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#5D4037] text-white hover:bg-[#4E342E] text-xs font-bold shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Friend</span>
          </button>
        </div>

        {/* 1. Active Paired Buddy Showcase */}
        <div className="my-3 bg-[#FFE082]/35 dark:bg-[#3E2723] p-3.5 rounded-3xl border-2 border-[#5D4037] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-pixel bg-[#5D4037] text-white px-2 py-0.5 rounded uppercase">
              Featured Buddy Duo
            </span>
            <span className="text-[10px] text-[#8D6E63] font-bold">Live Synced</span>
          </div>

          {activePairedFriend ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-around py-1">
                {/* You */}
                <div className="text-center">
                  <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFE082]">You</div>
                  <div className="text-2xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082] tabular-nums">
                    {userTodayCount}
                  </div>
                  <div className="text-[9px] text-[#8D6E63]">today</div>
                </div>

                {/* Paired heart badge */}
                <div className="w-8 h-8 rounded-full bg-[#FFE082] border border-[#4E342E]/20 flex items-center justify-center text-[#5D4037] shadow-xs">
                  <Heart className="w-4 h-4 fill-amber-500 text-amber-700" />
                </div>

                {/* Pal */}
                <div className="text-center">
                  <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFE082] truncate max-w-[80px]">
                    {activePairedFriend.displayName}
                  </div>
                  <div className="text-2xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082] tabular-nums">
                    {activePairedFriend.todayCount}
                  </div>
                  <div className="text-[9px] text-[#8D6E63]">today</div>
                </div>
              </div>

              <div className="text-center py-1 bg-white/70 dark:bg-black/20 rounded-xl text-xs font-bold text-[#4E342E] dark:text-[#EFEBE9]">
                Together Today:{' '}
                <span className="font-pixel text-[#5D4037] dark:text-[#FFE082]">
                  {userTodayCount + activePairedFriend.todayCount} flushes
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#8D6E63] text-center py-2">
              Select a friend below to feature as your primary synced buddy.
            </p>
          )}
        </div>

        {/* Privacy Lock Banner */}
        <div className="mb-3 bg-[#FFF9EE] dark:bg-[#2A201C] p-2.5 rounded-2xl border border-[#4E342E]/15 flex items-start gap-2 text-[10px] text-[#795548] dark:text-[#D7CCC8]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Zero-Leak Privacy:</strong> Friends can only see your aggregate total for today.
            No timestamps, log history, or notes are ever shared.
          </span>
        </div>

        {/* Friends List (Unranked, friendly list with "Pair with Widget" button) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider px-1">
            Connected Poop Pals ({friends.length})
          </div>

          {friends.map((friend) => {
            const isPaired = friend.uid === pairedFriendUid;
            return (
              <div
                key={friend.uid}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                  isPaired
                    ? 'bg-[#FFFDF7] dark:bg-[#2A201C] border-[#5D4037] shadow-sm'
                    : 'bg-white dark:bg-[#2A201C] border-[#4E342E]/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF9EE] dark:bg-[#3E2723] border border-[#4E342E]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#5D4037] dark:text-[#D7CCC8]" />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1] flex items-center gap-1.5">
                        <span>{friend.displayName}</span>
                        {isPaired && (
                          <span className="text-[9px] font-pixel bg-[#FFE082] text-[#4E342E] px-1.5 py-0.2 rounded border border-[#4E342E]/20">
                            PAIRED
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8D6E63] flex items-center gap-1.5">
                        <span>Today: {friend.todayCount} flushes</span>
                        {friend.lastReactionIcon && (
                          <span className="inline-flex items-center gap-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 px-1.5 py-0.2 rounded text-[9px] font-mono">
                            <LucideIcon
                              name={friend.lastReactionIcon}
                              className="w-2.5 h-2.5 inline"
                            />
                            <span>Reacted</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {/* Pair/Unpair Toggle Button */}
                    <button
                      onClick={() => onSetPairedFriend(friend.uid)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all ${
                        isPaired
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#FFF9EE] dark:bg-[#3E2723] text-[#5D4037] dark:text-[#FFE082] hover:bg-amber-100 border border-[#4E342E]/20'
                      }`}
                      title={isPaired ? 'Currently paired buddy' : 'Pair as primary buddy'}
                    >
                      {isPaired ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Paired</span>
                        </>
                      ) : (
                        <span>Pair Buddy</span>
                      )}
                    </button>

                    {/* Reaction button */}
                    <button
                      onClick={() =>
                        setSelectedFriendForSticker(
                          selectedFriendForSticker === friend.uid ? null : friend.uid
                        )
                      }
                      className="p-1.5 rounded-lg bg-amber-50 dark:bg-[#3E2723] hover:bg-amber-100 text-[#5D4037] dark:text-[#FFE082] transition-colors"
                      title="Send sticker reaction"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveFriend(friend.uid)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#8D6E63] hover:text-red-600 transition-colors"
                      title="Remove friend"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Reaction Strip */}
                {selectedFriendForSticker === friend.uid && (
                  <div className="pt-2 border-t border-[#4E342E]/10 flex items-center justify-between animate-in fade-in">
                    <span className="text-[10px] text-[#8D6E63] font-bold">Cheer your pal:</span>
                    <div className="flex items-center gap-1.5">
                      {quickReactionIcons.map((iconName) => (
                        <button
                          key={iconName}
                          onClick={() => {
                            onSendReaction(friend.uid, iconName);
                            setSelectedFriendForSticker(null);
                          }}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-black/30 hover:scale-110 active:scale-90 transition-transform border border-[#4E342E]/15 flex items-center justify-center text-[#5D4037] dark:text-[#FFE082]"
                          title={iconName}
                        >
                          <LucideIcon name={iconName} className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty state if user removed all friends */}
          {friends.length === 0 && (
            <div className="py-8 text-center bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-dashed border-[#4E342E]/20">
              <Users className="w-8 h-8 text-[#5D4037] mx-auto mb-2 opacity-70" />
              <div className="text-xs font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                No Friends Added Yet
              </div>
              <p className="text-[10px] text-[#8D6E63] max-w-[200px] mx-auto mt-1 mb-3">
                Share your invite code or enter a friend&apos;s code to pair up and sync!
              </p>
              <button
                onClick={onOpenAddFriend}
                className="px-3 py-1.5 rounded-xl bg-[#5D4037] text-white text-xs font-bold"
              >
                Add Friend with Code
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3">
        <button
          onClick={onOpenAddFriend}
          className="w-full py-2.5 rounded-2xl bg-[#FFF9EE] hover:bg-[#FFE082] text-[#4E342E] border-2 border-[#4E342E] text-xs font-pixel font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>INVITE NEW POOP PAL</span>
        </button>
      </div>
    </div>
  );
};
