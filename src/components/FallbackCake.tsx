import React from 'react';

export default function FallbackCake() {
  return (
    <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center">
      <div className="relative w-72 h-72 md:w-88 md:h-88 rounded-full bg-gradient-to-tr from-[#F8E0D1]/50 via-[#F4DCE0]/40 to-[#EEE9F6]/50 p-6 flex items-center justify-center border border-[#EBDCCE] shadow-2xl">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-bounce">🎂</div>
          <p className="font-serif text-2xl text-[#413B3B] italic">Mitra's Birthday Cake</p>
          <p className="text-xs text-[#938681] mt-2 tracking-widest uppercase">Mitu Chello • 29 November</p>
        </div>
      </div>
    </div>
  );
}

