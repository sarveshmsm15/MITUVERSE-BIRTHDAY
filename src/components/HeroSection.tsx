import React from 'react';
import ThreeCake from './ThreeCake';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex flex-col items-center justify-between overflow-hidden paper-texture">
      {/* Decorative ambient background blur orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[680px] md:h-[680px] bg-gradient-to-tr from-[#F4DCE0]/40 via-[#F8E0D1]/30 to-[#EEE9F6]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-16 left-8 md:left-24 w-48 h-48 bg-[#E8EEF5]/40 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-8 md:right-24 w-60 h-60 bg-[#F4DCE0]/30 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Top Editorial Tagline */}
      <div className="text-center px-4 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#EBDCCE] shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#938681]">
            A Little Universe, Created Just For You
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#B87983]" />
        </div>
      </div>

      {/* Central Circular 3D Hero Composition */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-auto">
        {/* Curved Circular Rotating Typography Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 scale-90 sm:scale-100 md:scale-110">
          <svg className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] animate-spin-slow opacity-85" viewBox="0 0 500 500">
            <defs>
              <path
                id="textCircle"
                d="M 250, 250 m -215, 0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0"
                fill="none"
              />
            </defs>
            <text className="font-serif text-[13.5px] uppercase tracking-[0.32em] fill-[#938681]">
              <textPath href="#textCircle" startOffset="0%">
                THE WORLD IS MORE BEAUTIFUL WITH YOU • MITU CHELLO • AMMU • THANGO • 29 NOVEMBER • 
              </textPath>
            </text>
          </svg>
        </div>

        {/* Decorative Delicate Nested Concentric Circles */}
        <div className="absolute w-[330px] h-[330px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full border border-[#DEC5B1]/40 pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-[#B87983]/30 pointer-events-none animate-spin-reverse-slow" />

        {/* Floating Editorial Badges */}
        <div className="hidden lg:block absolute -left-12 top-1/4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#EBDCCE] shadow-lg text-left -rotate-6 transition-transform hover:rotate-0 duration-300">
          <span className="text-[10px] tracking-widest uppercase text-[#938681] block">Edition No. 1</span>
          <span className="font-serif italic text-sm text-[#413B3B]">The World's Littlest Universe</span>
        </div>

        <div className="hidden lg:block absolute -right-12 bottom-1/4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#EBDCCE] shadow-lg text-right rotate-6 transition-transform hover:rotate-0 duration-300">
          <span className="text-[10px] tracking-widest uppercase text-[#B87983] block font-semibold">29 November</span>
          <span className="font-serif text-sm text-[#413B3B]">Her Special Day ✨</span>
        </div>

        {/* 3D Birthday Cake Interactive Stage */}
        <div className="relative z-0 w-full max-w-[620px]">
          <ThreeCake />
        </div>
      </div>

      {/* Below Central Object Editorial Typography */}
      <div className="text-center px-4 mt-6 z-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#413B3B] mb-3">
          Happy Birthday, <span className="font-normal italic text-[#B87983]">MITRA</span>
        </h1>

        <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#938681] font-light max-w-xl mx-auto mb-2">
          "To my Mitu Chello, Ammu &amp; Thango..."
        </p>

        <p className="text-xs sm:text-sm font-sans tracking-[0.18em] uppercase text-[#BAAEAA] max-w-md mx-auto">
          A little website, with a whole lot of love.
        </p>

        {/* Scroll down indicator */}
        <div className="mt-8">
          <a
            href="#countdown"
            className="inline-flex flex-col items-center gap-1 text-[#938681] hover:text-[#B87983] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]"></span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#B87983]" />
          </a>
        </div>
      </div>
    </section>
  );
}

