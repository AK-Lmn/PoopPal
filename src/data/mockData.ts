import { FriendItem, Sticker, Challenge, UserProfile } from '../types';

export const getTodayDateKey = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const DEFAULT_USER: UserProfile = {
  uid: 'user_local_123',
  displayName: 'PixelPooper',
  avatarId: 'mascot_classic',
  inviteCode: 'POOP-77',
  pairedFriendUid: undefined,
  createdAt: Date.now(),
};

export const INITIAL_FRIENDS: FriendItem[] = [];

export const STICKER_PACK: Sticker[] = [
  {
    id: 'sticker_throne',
    name: 'Golden Throne',
    iconName: 'Crown',
    description: 'For absolute daily royalty',
    tag: 'Royal',
    rarity: 'legendary',
  },
  {
    id: 'sticker_fiber',
    name: 'Fiber Bro',
    iconName: 'Apple',
    description: 'Power of 30g daily fiber',
    tag: 'Health',
    rarity: 'common',
  },
  {
    id: 'sticker_coffee',
    name: 'Coffee Assist',
    iconName: 'Coffee',
    description: 'The morning dark roast',
    tag: 'Energy',
    rarity: 'common',
  },
  {
    id: 'sticker_ghost',
    name: 'Ghost Poop',
    iconName: 'Ghost',
    description: 'Clean wipe mystery',
    tag: 'Mystery',
    rarity: 'rare',
  },
  {
    id: 'sticker_turbo',
    name: 'Turbo Flush',
    iconName: 'Rocket',
    description: 'Under 45 seconds total',
    tag: 'Speed',
    rarity: 'rare',
  },
  {
    id: 'sticker_sparkle',
    name: 'Sparkle Fresh',
    iconName: 'Sparkles',
    description: 'Refreshed and clean',
    tag: 'Vibes',
    rarity: 'common',
  },
  {
    id: 'sticker_bidet',
    name: 'Bidet Master',
    iconName: 'Droplets',
    description: 'Water pressure comfort',
    tag: 'Comfort',
    rarity: 'rare',
  },
  {
    id: 'sticker_zen',
    name: 'Zen Toilet',
    iconName: 'Smile',
    description: 'Peaceful quiet break',
    tag: 'Mindset',
    rarity: 'legendary',
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal_streak',
    title: '3-Day Consistency',
    description: 'Log at least once a day for 3 days',
    iconName: 'Flame',
    targetCount: 3,
    currentCount: 2,
    daysRemaining: 1,
    rewardName: 'Golden Crown Badge',
    completed: false,
  },
  {
    id: 'chal_fiber',
    title: 'Fiber Squad Goal',
    description: 'You and your friends log 10 total poops today',
    iconName: 'Target',
    targetCount: 10,
    currentCount: 7,
    daysRemaining: 1,
    rewardName: 'Fiber Champion Badge',
    completed: false,
  },
  {
    id: 'chal_morning',
    title: 'The Morning Club',
    description: 'Log before 10:00 AM local time',
    iconName: 'Sunrise',
    targetCount: 1,
    currentCount: 1,
    daysRemaining: 1,
    rewardName: 'Golden Mug Badge',
    completed: true,
  },
];
