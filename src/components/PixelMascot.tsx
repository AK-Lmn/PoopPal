import React from 'react';
import { MascotMood } from '../types';

interface PixelMascotProps {
  mood?: MascotMood;
  size?: number; // size in pixels, e.g. 120
  animate?: boolean;
}

export const PixelMascot: React.FC<PixelMascotProps> = ({
  mood = 'ready',
  size = 120,
  animate = true,
}) => {
  // 16x16 pixel art matrix design for Sir Poops-a-Lot
  // Palette codes:
  // . = transparent
  // B = Chocolate Outline (#4E342E)
  // M = Milk Chocolate Body (#795548)
  // L = Light Caramel Highlight (#8D6E63)
  // D = Darker Shadow (#3E2723)
  // W = White (#FFFFFF)
  // P = Pink Blush (#FF8A80)
  // G = Gold Crown (#FFD700)
  // O = Orange Gem (#FF6D00)
  // K = Black Pupil (#212121)

  const pixelSize = size / 16;

  return (
    <div
      className={`relative inline-block select-none ${
        animate ? (mood === 'dancing' ? 'animate-bounce' : 'animate-pulse') : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="pixelated drop-shadow-md"
        shapeRendering="crispEdges"
      >
        {/* Crown for Champion mood */}
        {mood === 'champion' && (
          <g>
            <rect x="5" y="0" width="1" height="2" fill="#FFD700" />
            <rect x="7" y="0" width="2" height="2" fill="#FFD700" />
            <rect x="10" y="0" width="1" height="2" fill="#FFD700" />
            <rect x="5" y="2" width="6" height="1" fill="#FFC107" />
            <rect x="7" y="1" width="2" height="1" fill="#FF6D00" />
          </g>
        )}

        {/* Mascot Swirl Top (rows 2 to 4) */}
        <rect x="7" y="3" width="2" height="1" fill="#4E342E" />
        <rect x="6" y="4" width="4" height="1" fill="#795548" />
        <rect x="7" y="4" width="2" height="1" fill="#8D6E63" />

        {/* Tier 1 (rows 5 to 7) */}
        <rect x="5" y="5" width="6" height="1" fill="#4E342E" />
        <rect x="5" y="6" width="6" height="2" fill="#795548" />
        <rect x="6" y="6" width="2" height="1" fill="#8D6E63" />
        <rect x="4" y="6" width="1" height="2" fill="#4E342E" />
        <rect x="11" y="6" width="1" height="2" fill="#4E342E" />

        {/* Tier 2 & Face (rows 8 to 11) */}
        <rect x="3" y="8" width="10" height="4" fill="#795548" />
        <rect x="2" y="8" width="1" height="4" fill="#4E342E" />
        <rect x="13" y="8" width="1" height="4" fill="#4E342E" />
        <rect x="4" y="8" width="3" height="1" fill="#8D6E63" />

        {/* Tier 3 Base (rows 12 to 14) */}
        <rect x="2" y="12" width="12" height="2" fill="#795548" />
        <rect x="1" y="12" width="1" height="2" fill="#4E342E" />
        <rect x="14" y="12" width="1" height="2" fill="#4E342E" />
        <rect x="2" y="14" width="12" height="1" fill="#3E2723" />
        <rect x="3" y="15" width="10" height="1" fill="#4E342E" />

        {/* Facial Expressions based on Mood */}
        {mood === 'sleepy' && (
          <g>
            {/* Sleeping eyes - flat lines */}
            <rect x="4" y="9" width="3" height="1" fill="#3E2723" />
            <rect x="9" y="9" width="3" height="1" fill="#3E2723" />
            {/* Small mouth */}
            <rect x="7" y="11" width="2" height="1" fill="#3E2723" />
            {/* Sleeping Zs */}
            <rect x="12" y="4" width="2" height="1" fill="#4E342E" />
            <rect x="13" y="5" width="1" height="1" fill="#4E342E" />
            <rect x="12" y="6" width="2" height="1" fill="#4E342E" />
          </g>
        )}

        {(mood === 'ready' || mood === 'dancing') && (
          <g>
            {/* Big 16-bit cute round eyes */}
            <rect x="4" y="8" width="3" height="3" fill="#FFFFFF" />
            <rect x="5" y="9" width="2" height="2" fill="#212121" />
            <rect x="5" y="9" width="1" height="1" fill="#FFFFFF" />

            <rect x="9" y="8" width="3" height="3" fill="#FFFFFF" />
            <rect x="9" y="9" width="2" height="2" fill="#212121" />
            <rect x="9" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Rosy cheeks */}
            <rect x="3" y="11" width="2" height="1" fill="#FF8A80" opacity="0.8" />
            <rect x="11" y="11" width="2" height="1" fill="#FF8A80" opacity="0.8" />

            {/* Happy open smile */}
            <rect x="7" y="11" width="2" height="1" fill="#3E2723" />
            <rect x="7" y="12" width="2" height="1" fill="#D32F2F" />
          </g>
        )}

        {(mood === 'relieved' || mood === 'champion') && (
          <g>
            {/* Happy anime arch eyes ^ ^ */}
            <rect x="4" y="9" width="1" height="1" fill="#3E2723" />
            <rect x="5" y="8" width="1" height="1" fill="#3E2723" />
            <rect x="6" y="9" width="1" height="1" fill="#3E2723" />

            <rect x="9" y="9" width="1" height="1" fill="#3E2723" />
            <rect x="10" y="8" width="1" height="1" fill="#3E2723" />
            <rect x="11" y="9" width="1" height="1" fill="#3E2723" />

            {/* Rosy glowing cheeks */}
            <rect x="3" y="10" width="2" height="2" fill="#FF8A80" />
            <rect x="11" y="10" width="2" height="2" fill="#FF8A80" />

            {/* Wide joyful smile */}
            <rect x="6" y="11" width="4" height="1" fill="#3E2723" />
            <rect x="7" y="12" width="2" height="1" fill="#FF5252" />
          </g>
        )}

        {/* Sparkles around mascot for high mood */}
        {(mood === 'relieved' || mood === 'champion' || mood === 'dancing') && (
          <g fill="#FFD54F">
            <rect x="1" y="4" width="1" height="1" />
            <rect x="0" y="5" width="3" height="1" />
            <rect x="1" y="6" width="1" height="1" />

            <rect x="14" y="5" width="1" height="1" />
            <rect x="13" y="6" width="3" height="1" />
            <rect x="14" y="7" width="1" height="1" />
          </g>
        )}
      </svg>
    </div>
  );
};
