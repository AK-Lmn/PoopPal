import React from 'react';

interface AppIconProps {
  size?: number; // size in pixels, e.g. 48, 64, 96, 128
  count?: number; // optional daily count badge
  className?: string;
  onClick?: () => void;
  showBadge?: boolean;
}

export const AppIcon: React.FC<AppIconProps> = ({
  size = 48,
  count,
  className = '',
  onClick,
  showBadge = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <img
        src="/app-icon.svg"
        alt="PoopPal App Icon"
        className="w-full h-full object-contain filter drop-shadow-md rounded-[24%]"
        draggable={false}
      />

      {/* Android Notification Badge with Today's Count */}
      {showBadge && typeof count === 'number' && count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#D32F2F] text-white text-[10px] font-bold font-mono rounded-full flex items-center justify-center border-2 border-white dark:border-[#201815] shadow-sm animate-in zoom-in"
          style={{
            fontSize: size < 40 ? '8px' : '10px',
            height: size < 40 ? '16px' : '20px',
            minWidth: size < 40 ? '16px' : '20px',
          }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};
