/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AndroidFrame } from './components/AndroidFrame';
import { HomeScreen } from './components/HomeScreen';
import { FriendsScreen } from './components/FriendsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { GlanceWidgetSimulator } from './components/GlanceWidgetSimulator';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { AddFriendModal } from './components/AddFriendModal';
import { StickersAndChallengesModal } from './components/StickersAndChallengesModal';
import { UserProfile, FriendItem, FriendRequest } from './types';
import {
  DEFAULT_USER,
  INITIAL_FRIENDS,
  getTodayDateKey,
} from './data/mockData';
import {
  playPlopSound,
  playCelebrationSound,
  playUndoSound,
} from './utils/sound';
import { triggerHaptic } from './utils/haptics';
import { auth, db, testFirestoreConnection } from './firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pooppal_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pooppal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pooppal_theme', 'light');
    }
  }, [isDark]);

  // View state: 'app' (in-app screens) vs 'launcher' (Android home screen with Glance widgets)
  const [activeView, setActiveView] = useState<'app' | 'launcher'>('app');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'friends' | 'settings'>('home');

  // Modal states
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showStickers, setShowStickers] = useState(false);

  // Onboarding / First Start state
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pooppal_onboarded') === 'true';
    } catch {
      return false;
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pooppal_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Daily counts map: { "YYYY-MM-DD": number }
  const [dailyCounts, setDailyCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('pooppal_daily_counts');
      return saved ? JSON.parse(saved) : { [getTodayDateKey()]: 0 };
    } catch {
      return { [getTodayDateKey()]: 0 };
    }
  });

  // Selected date key for inspection (default today)
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateKey());

  // Friends state
  const [friends, setFriends] = useState<FriendItem[]>(() => {
    try {
      const saved = localStorage.getItem('pooppal_friends');
      return saved ? JSON.parse(saved) : INITIAL_FRIENDS;
    } catch {
      return INITIAL_FRIENDS;
    }
  });

  // Pending Friend Requests
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>(() => {
    try {
      const saved = localStorage.getItem('pooppal_pending_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Firebase Authentication & Cloud Sync
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pooppal_demo_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Undo and debounce state
  const [showUndo, setShowUndo] = useState(false);
  const [undoSeconds, setUndoSeconds] = useState(0);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastLogTimeRef = useRef<number>(0);

  // Today's date key
  const todayKey = getTodayDateKey();

  // Listen to Firebase Auth state
  useEffect(() => {
    testFirestoreConnection().catch(() => {});
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setCurrentUser(fbUser);
      if (fbUser) {
        setIsDemoMode(false);
        try {
          localStorage.removeItem('pooppal_demo_mode');
        } catch {
          // ignore
        }

        // Sync or initialize user profile document in Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            setUserProfile((prev) => ({
              ...prev,
              uid: fbUser.uid,
              displayName: data.displayName || fbUser.displayName || prev.displayName,
              inviteCode: data.inviteCode || prev.inviteCode,
              pairedFriendUid: data.pairedFriendUid || prev.pairedFriendUid,
            }));
          } else {
            const initialCode = fbUser.uid.slice(0, 6).toUpperCase();
            await setDoc(userDocRef, {
              uid: fbUser.uid,
              displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'PoopPal',
              inviteCode: initialCode,
              createdAt: Date.now(),
            });
            setUserProfile((prev) => ({
              ...prev,
              uid: fbUser.uid,
              displayName: fbUser.displayName || fbUser.email?.split('@')[0] || prev.displayName,
              inviteCode: initialCode,
            }));
          }
        } catch (e) {
          console.warn('Could not sync user profile with Firestore:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for today's count
  useEffect(() => {
    if (!currentUser) return;
    const countDocRef = doc(db, 'dailyCounts', `${currentUser.uid}_${todayKey}`);
    const unsubscribe = onSnapshot(
      countDocRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (typeof data.count === 'number') {
            setDailyCounts((prev) => ({
              ...prev,
              [todayKey]: data.count,
            }));
          }
        }
      },
      (err) => {
        console.warn('Firestore snapshot error:', err);
      }
    );

    return () => unsubscribe();
  }, [currentUser, todayKey]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pooppal_user_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('pooppal_daily_counts', JSON.stringify(dailyCounts));
    } catch {
      // ignore
    }
  }, [dailyCounts]);

  useEffect(() => {
    try {
      localStorage.setItem('pooppal_friends', JSON.stringify(friends));
    } catch {
      // ignore
    }
  }, [friends]);

  useEffect(() => {
    try {
      localStorage.setItem('pooppal_pending_requests', JSON.stringify(pendingRequests));
    } catch {
      // ignore
    }
  }, [pendingRequests]);

  // Today's count
  const todayCount = dailyCounts[todayKey] || 0;
  const currentViewCount = dailyCounts[selectedDate] || 0;

  // Total lifetime count
  const lifetimeCount = Object.values(dailyCounts).reduce((acc, curr) => acc + curr, 0);

  // Single-tap logging action
  const handleLogPoop = () => {
    const now = Date.now();
    // 1200ms debounce
    if (now - lastLogTimeRef.current < 1200) {
      return;
    }
    lastLogTimeRef.current = now;
    setIsDebouncing(true);
    setTimeout(() => setIsDebouncing(false), 1200);

    // Audio & Haptics
    playPlopSound();
    triggerHaptic([40, 60, 40]);

    const newTodayCount = todayCount + 1;

    setDailyCounts((prev) => ({
      ...prev,
      [todayKey]: newTodayCount,
    }));

    // If signed into Firebase, sync to Firestore
    if (currentUser) {
      setDoc(
        doc(db, 'dailyCounts', `${currentUser.uid}_${todayKey}`),
        {
          uid: currentUser.uid,
          dateKey: todayKey,
          count: newTodayCount,
          updatedAt: Date.now(),
        },
        { merge: true }
      ).catch((err) => console.warn('Could not sync count to Firestore:', err));
    }

    // If milestone reached (3+), trigger celebration fanfare
    if (newTodayCount >= 3) {
      setTimeout(() => playCelebrationSound(), 180);
    }

    // Party confetti particles
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FFD54F', '#795548', '#FF8A80', '#A1887F'],
    });

    // Start 5-second undo toast
    if (undoTimerRef.current) clearInterval(undoTimerRef.current);
    setShowUndo(true);
    setUndoSeconds(5);

    let remaining = 5;
    undoTimerRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        if (undoTimerRef.current) clearInterval(undoTimerRef.current);
        setShowUndo(false);
      } else {
        setUndoSeconds(remaining);
      }
    }, 1000);
  };

  // Undo action
  const handleUndoPoop = () => {
    if (undoTimerRef.current) clearInterval(undoTimerRef.current);
    setShowUndo(false);
    setUndoSeconds(0);

    playUndoSound();
    triggerHaptic(60);

    const newCount = Math.max(0, todayCount - 1);
    setDailyCounts((prev) => ({
      ...prev,
      [todayKey]: newCount,
    }));

    if (currentUser) {
      setDoc(
        doc(db, 'dailyCounts', `${currentUser.uid}_${todayKey}`),
        {
          uid: currentUser.uid,
          dateKey: todayKey,
          count: newCount,
          updatedAt: Date.now(),
        },
        { merge: true }
      ).catch((err) => console.warn('Could not sync undo to Firestore:', err));
    }
  };

  // Update display name
  const handleUpdateDisplayName = async (name: string) => {
    setUserProfile((prev) => ({ ...prev, displayName: name }));
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), { displayName: name }, { merge: true });
      } catch (err) {
        console.warn('Could not update display name in Firestore:', err);
      }
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsDemoMode(false);
      try {
        localStorage.removeItem('pooppal_demo_mode');
      } catch {
        // ignore
      }
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Reset all local data
  const handleResetData = () => {
    setDailyCounts({ [todayKey]: 0 });
    setFriends(INITIAL_FRIENDS);
    setPendingRequests([]);
    setIsOnboarded(false);
    try {
      localStorage.removeItem('pooppal_onboarded');
    } catch {
      // ignore
    }
    if (currentUser) {
      setDoc(
        doc(db, 'dailyCounts', `${currentUser.uid}_${todayKey}`),
        {
          uid: currentUser.uid,
          dateKey: todayKey,
          count: 0,
          updatedAt: Date.now(),
        },
        { merge: true }
      ).catch((err) => console.warn('Could not reset count in Firestore:', err));
    }
  };

  // Send friend code
  const handleSendCode = (code: string) => {
    if (code === userProfile.inviteCode) {
      return { success: false, message: 'You cannot add yourself!' };
    }
    const alreadyFriend = friends.some((f) => f.uid.toLowerCase().includes(code.toLowerCase()));
    if (alreadyFriend) {
      return { success: false, message: 'This user is already in your squad!' };
    }

    // Add new friend to list
    const newFriend: FriendItem = {
      uid: `friend_${Date.now()}`,
      displayName: `Pal_${code}`,
      avatarId: 'mascot_friend',
      todayCount: Math.floor(Math.random() * 3) + 1,
      statusBadge: 'Added via Code',
      lastReactionIcon: 'Sparkles',
      isOnline: true,
    };

    setFriends((prev) => [newFriend, ...prev]);
    return { success: true, message: `Connected with Pal_${code}!` };
  };

  // Simulate an incoming friend request for demo testing
  const handleSimulateIncomingRequest = () => {
    const mockNames = ['Alex_Bidet', 'TacoTony', 'CoffeeLover99', 'Sara_Flush'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const newReq: FriendRequest = {
      requestId: `req_${Date.now()}`,
      senderUid: `sender_${Date.now()}`,
      senderName: randomName,
      senderAvatar: 'mascot_classic',
      recipientCode: userProfile.inviteCode,
      timestamp: Date.now(),
    };
    setPendingRequests((prev) => [newReq, ...prev]);
  };

  // Accept incoming friend request
  const handleAcceptRequest = (reqId: string) => {
    const req = pendingRequests.find((r) => r.requestId === reqId);
    if (!req) return;

    const newFriend: FriendItem = {
      uid: req.senderUid,
      displayName: req.senderName,
      avatarId: req.senderAvatar,
      todayCount: 1,
      statusBadge: 'New Friend',
      lastReactionIcon: 'Zap',
      isOnline: true,
    };

    setFriends((prev) => [newFriend, ...prev]);
    setPendingRequests((prev) => prev.filter((r) => r.requestId !== reqId));
  };

  // Decline friend request
  const handleDeclineRequest = (reqId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.requestId !== reqId));
  };

  // Remove friend
  const handleRemoveFriend = (uid: string) => {
    setFriends((prev) => prev.filter((f) => f.uid !== uid));
  };

  // Send sticker reaction to a friend
  const handleSendReaction = (friendUid: string, stickerIconName: string) => {
    setFriends((prev) =>
      prev.map((f) => (f.uid === friendUid ? { ...f, lastReactionIcon: stickerIconName } : f))
    );
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  const pairedFriend = friends.find((f) => f.uid === userProfile.pairedFriendUid);

  const handleSetPairedFriend = (uid: string) => {
    setUserProfile((prev) => ({
      ...prev,
      pairedFriendUid: prev.pairedFriendUid === uid ? undefined : uid,
    }));
  };

  return (
    <AndroidFrame
      activeView={activeView}
      onViewChange={setActiveView}
      onReplayOnboarding={() => setIsOnboarded(false)}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
    >
      {activeView === 'launcher' ? (
        <GlanceWidgetSimulator
          todayCount={todayCount}
          pairedFriend={pairedFriend}
          friends={friends}
          onSelectPairedFriend={handleSetPairedFriend}
          onLogPoop={handleLogPoop}
          onOpenApp={() => setActiveView('app')}
        />
      ) : !currentUser && !isDemoMode ? (
        <AuthScreen
          onAuthSuccess={() => {
            setIsDemoMode(false);
          }}
          onSkipDemo={() => {
            setIsDemoMode(true);
            try {
              localStorage.setItem('pooppal_demo_mode', 'true');
            } catch {
              // ignore
            }
          }}
        />
      ) : !isOnboarded ? (
        <OnboardingScreen
          defaultInviteCode={userProfile.inviteCode}
          onComplete={(newProfile, pairedUid) => {
            setUserProfile(newProfile);
            setIsOnboarded(true);
            try {
              localStorage.setItem('pooppal_onboarded', 'true');
            } catch {
              // ignore
            }
            setDailyCounts({ [getTodayDateKey()]: 0 });
            if (pairedUid) {
              setFriends((prev) =>
                prev.map((f) => ({ ...f, isPaired: f.uid === pairedUid }))
              );
            }
          }}
        />
      ) : (
        <>
          {currentScreen === 'home' && (
            <HomeScreen
              todayCount={currentViewCount}
              onLogPoop={handleLogPoop}
              onUndoPoop={handleUndoPoop}
              showUndo={showUndo}
              undoSeconds={undoSeconds}
              isDebouncing={isDebouncing}
              friends={friends}
              pairedFriend={pairedFriend}
              onOpenFriends={() => setCurrentScreen('friends')}
              onOpenAddFriend={() => setShowAddFriend(true)}
              onOpenStickers={() => setShowStickers(true)}
              onOpenSettings={() => setCurrentScreen('settings')}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}

          {currentScreen === 'friends' && (
            <FriendsScreen
              userDisplayName={userProfile.displayName}
              userTodayCount={todayCount}
              friends={friends}
              pairedFriendUid={userProfile.pairedFriendUid}
              onSetPairedFriend={handleSetPairedFriend}
              onBack={() => setCurrentScreen('home')}
              onOpenAddFriend={() => setShowAddFriend(true)}
              onRemoveFriend={handleRemoveFriend}
              onSendReaction={handleSendReaction}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              userProfile={userProfile}
              currentUserEmail={currentUser ? currentUser.email : isDemoMode ? null : undefined}
              onSignOut={handleSignOut}
              onUpdateDisplayName={handleUpdateDisplayName}
              onResetData={handleResetData}
              onBack={() => setCurrentScreen('home')}
              lifetimeCount={lifetimeCount}
            />
          )}
        </>
      )}

      {/* Modals */}
      {showAddFriend && (
        <AddFriendModal
          userInviteCode={userProfile.inviteCode}
          onClose={() => setShowAddFriend(false)}
          onSendCode={handleSendCode}
          pendingRequests={pendingRequests}
          onAcceptRequest={handleAcceptRequest}
          onDeclineRequest={handleDeclineRequest}
          onSimulateIncomingRequest={handleSimulateIncomingRequest}
        />
      )}

      {showStickers && (
        <StickersAndChallengesModal
          onClose={() => setShowStickers(false)}
          todayCount={todayCount}
        />
      )}
    </AndroidFrame>
  );
}
