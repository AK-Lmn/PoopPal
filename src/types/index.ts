export interface UserProfile {
  uid: string;
  displayName: string;
  avatarId: string;
  inviteCode: string;
  pairedFriendUid?: string;
  createdAt: number;
}

export interface DailyCount {
  uid: string;
  dateKey: string; // "YYYY-MM-DD"
  count: number;
  updatedAt: number;
}

export interface FriendItem {
  uid: string;
  displayName: string;
  avatarId: string;
  todayCount: number;
  statusBadge: string;
  lastReactionIcon?: string;
  isOnline?: boolean;
  isPaired?: boolean;
}

export interface FriendRequest {
  requestId: string;
  senderUid: string;
  senderName: string;
  senderAvatar: string;
  recipientCode: string;
  timestamp: number;
}

export interface Sticker {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  description: string;
  tag: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  targetCount: number;
  currentCount: number;
  daysRemaining: number;
  rewardName: string;
  completed: boolean;
}

export type MascotMood = 'sleepy' | 'ready' | 'relieved' | 'champion' | 'dancing';
