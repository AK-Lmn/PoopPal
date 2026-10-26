import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const triggerHaptic = async (pattern: number | number[] = 40) => {
  try {
    const isHeavy = Array.isArray(pattern) ? pattern.length > 2 : pattern > 50;
    await Haptics.impact({
      style: isHeavy ? ImpactStyle.Medium : ImpactStyle.Light,
    });
  } catch {
    // Fallback to web vibration API for Android/browsers if native haptics fail
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore vibration error
      }
    }
  }
};
