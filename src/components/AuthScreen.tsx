import React, { useState } from 'react';
import { PixelMascot } from './PixelMascot';
import {
  auth,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../services/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { playPlopSound, playCelebrationSound } from '../utils/sound';

interface AuthScreenProps {
  onAuthSuccess: (user: { uid: string; email: string | null; displayName: string | null }) => void;
  onSkipDemo?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthSuccess,
  onSkipDemo,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pwd: string): boolean => {
    return pwd.length >= 8;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    // Explicit requirement: password minimum 8 characters
    if (!validatePassword(password)) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    playPlopSound();

    try {
      if (mode === 'signup') {
        const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        playCelebrationSound();
        onAuthSuccess({
          uid: userCred.user.uid,
          email: userCred.user.email,
          displayName: displayName.trim() || userCred.user.email?.split('@')[0] || 'PoopPal',
        });
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
        playCelebrationSound();
        onAuthSuccess({
          uid: userCred.user.uid,
          email: userCred.user.email,
          displayName: userCred.user.displayName || userCred.user.email?.split('@')[0] || 'PoopPal',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('auth/email-already-in-use')) {
        setErrorMsg('This email is already registered. Please sign in instead.');
      } else if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
        setErrorMsg('Invalid email or password.');
      } else if (msg.includes('auth/weak-password')) {
        setErrorMsg('Password is too weak. Must be at least 8 characters.');
      } else {
        setErrorMsg(msg.replace('Firebase: ', ''));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    playPlopSound();

    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      playCelebrationSound();
      onAuthSuccess({
        uid: userCred.user.uid,
        email: userCred.user.email,
        displayName: userCred.user.displayName || 'PoopPal',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-5 py-6 flex flex-col justify-between bg-[#FFFDF7] dark:bg-[#201815] text-[#4E342E] dark:text-[#EFEBE9] select-none">
      <div>
        {/* Header Branding & Mascot */}
        <div className="flex flex-col items-center text-center space-y-2 mb-4">
          <PixelMascot mood="ready" size={90} animate={true} />
          <h2 className="text-xl font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
            PoopPal Account
          </h2>
          <p className="text-xs text-[#795548] dark:text-[#D7CCC8] max-w-xs">
            Sign in with Google or Email &amp; Password to sync your daily counts and paired friend
            widget across devices.
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Create Account */}
        <div className="flex bg-[#EFEBE9] dark:bg-[#2A201C] p-1 rounded-2xl mb-4 border border-[#4E342E]/15">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-pixel transition-all ${
              mode === 'signin'
                ? 'bg-[#5D4037] text-white shadow-xs'
                : 'text-[#795548] dark:text-[#D7CCC8]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-pixel transition-all ${
              mode === 'signup'
                ? 'bg-[#5D4037] text-white shadow-xs'
                : 'text-[#795548] dark:text-[#D7CCC8]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1. Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-white dark:bg-[#2A201C] hover:bg-amber-50 dark:hover:bg-[#3E2723] text-[#4E342E] dark:text-[#FFE082] rounded-2xl border-2 border-[#4E342E]/25 text-xs font-bold flex items-center justify-center gap-2.5 transition-colors shadow-xs active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-3.5">
          <div className="flex-1 border-t border-[#4E342E]/15" />
          <span className="px-3 text-[10px] text-[#8D6E63] font-bold uppercase">
            or with email
          </span>
          <div className="flex-1 border-t border-[#4E342E]/15" />
        </div>

        {/* 2. Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-2.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-[#5D4037] dark:text-[#D7CCC8] mb-1">
                Display Name:
              </label>
              <div className="flex items-center gap-2 bg-white dark:bg-[#1A1412] px-3 py-2 rounded-xl border border-[#4E342E]/25">
                <User className="w-3.5 h-3.5 text-[#8D6E63]" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full bg-transparent text-xs font-medium text-[#4E342E] dark:text-[#FFF8E1] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#5D4037] dark:text-[#D7CCC8] mb-1">
              Email Address:
            </label>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1A1412] px-3 py-2 rounded-xl border border-[#4E342E]/25">
              <Mail className="w-3.5 h-3.5 text-[#8D6E63]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent text-xs font-medium text-[#4E342E] dark:text-[#FFF8E1] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-[#5D4037] dark:text-[#D7CCC8]">
                Password:
              </label>
              <span className="text-[10px] text-[#8D6E63]">Min. 8 characters</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1A1412] px-3 py-2 rounded-xl border border-[#4E342E]/25">
              <Lock className="w-3.5 h-3.5 text-[#8D6E63]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full bg-transparent text-xs font-medium text-[#4E342E] dark:text-[#FFF8E1] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Validation / Error Alert */}
          {errorMsg && (
            <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-[11px] text-red-700 dark:text-red-300 font-bold flex items-start gap-1.5 animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-2xl text-xs font-pixel font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 mt-2"
          >
            <span>{isLoading ? 'PLEASE WAIT...' : mode === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Privacy Lock Banner */}
        <div className="mt-3.5 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[10px] text-emerald-900 dark:text-emerald-200 flex items-start gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Database: Cloud Firestore with security rules. Only today&apos;s daily total is shared with
            friends.
          </span>
        </div>
      </div>

      {/* Local Mode fallback */}
      {onSkipDemo && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onSkipDemo}
            className="text-[10px] text-[#8D6E63] hover:text-[#4E342E] hover:underline font-bold"
          >
            Or continue in Local Demo Mode
          </button>
        </div>
      )}
    </div>
  );
};
