import React from 'react';
import {
  Crown,
  Apple,
  Coffee,
  Ghost,
  Rocket,
  Sparkles,
  Droplets,
  Smile,
  Flame,
  Target,
  Sunrise,
  Trophy,
  Medal,
  Award,
  Zap,
  Activity,
  User,
  Users,
  ShieldCheck,
  Heart,
  ThumbsUp,
  Star,
  CheckCircle2,
  LucideProps,
} from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const iconMap: Record<string, React.FC<LucideProps>> = {
  Crown,
  Apple,
  Coffee,
  Ghost,
  Rocket,
  Sparkles,
  Droplets,
  Smile,
  Flame,
  Target,
  Sunrise,
  Trophy,
  Medal,
  Award,
  Zap,
  Activity,
  User,
  Users,
  ShieldCheck,
  Heart,
  ThumbsUp,
  Star,
  CheckCircle2,
};

export const LucideIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent {...props} />;
};
