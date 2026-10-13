import React from 'react';

interface ReframeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMotto?: boolean;
}

export const ReframeLogo: React.FC<ReframeLogoProps> = ({
  className = '',
  size = 'md',
  showMotto = false
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-36 h-36'
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <div className={`${sizeMap[size]} rounded-full overflow-hidden shadow-lg shadow-amber-500/10 border-2 border-amber-500/40 bg-white transition-transform hover:scale-105`}>
        <img
          src="/logo.svg"
          alt="Reframe Ministries International Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showMotto && (
        <span className="font-serif-church italic text-[11px] text-cyan-400 font-bold mt-1 tracking-wide">
          “The just shall live by faith”
        </span>
      )}
    </div>
  );
};
