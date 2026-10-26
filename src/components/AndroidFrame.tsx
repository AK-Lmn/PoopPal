import React from 'react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#F5EFE6] dark:bg-[#120E0D] text-[#4E342E] dark:text-[#EFEBE9] flex items-center justify-center font-sans antialiased">
      {/* Native Mobile Screen Container with iOS Safe Area Inset Support */}
      <main className="w-full max-w-md h-[100dvh] sm:h-[840px] sm:max-h-[94vh] sm:rounded-3xl sm:shadow-2xl sm:border border-[#4E342E]/15 bg-[#FFFDF7] dark:bg-[#1E1715] flex flex-col overflow-hidden relative pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]">
        {children}
      </main>
    </div>
  );
};
