import React, { useState } from 'react';
import { Camera, Eye, X, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface MemoryItem {
  id: string;
  assetPath: string;     // "/assets/memories/memory-1.jpg"
  badge: string;         // e.g. "PURE JOY"
  category: string;      // e.g. "VEETODA HAPPINESS"
  title: string;         // e.g. "The Smile That Lights The House"
  caption: string;
  defaultPlaceholderBg: string;
}

const MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    assetPath: '/assets/memories/memory-1.jpg',
    badge: 'PURE JOY',
    category: 'VEETODA HAPPINESS',
    title: 'The Smile That Lights The House',
    caption: 'No matter how stressful life gets, one glance at your genuine smile makes everything alright.',
    defaultPlaceholderBg: 'from-[#F4DCE0] via-[#FAF7F2] to-[#F8E0D1]',
  },
  {
    id: 'mem-2',
    assetPath: '/assets/memories/memory-2.jpg',
    badge: 'ATTITUDE QUEEN',
    category: 'SIGNATURE VIBE',
    title: 'Queen of Little Attitude',
    caption: 'That dramatic expression when you dont get your way... priceless and impossible to stay mad at!',
    defaultPlaceholderBg: 'from-[#F8E0D1] via-[#FAF7F2] to-[#EEE9F6]',
  },
  {
    id: 'mem-3',
    assetPath: '/assets/memories/memory-3.jpg',
    badge: 'DEEP TALKS',
    category: 'BROTHER & SISTER',
    title: 'Endless Midnight Conversations',
    caption: 'Talking about everything from your wildest career dreams to random tea, our talks are therapy.',
    defaultPlaceholderBg: 'from-[#E8EEF5] via-[#FAF7F2] to-[#F4DCE0]',
  },
  {
    id: 'mem-4',
    assetPath: '/assets/memories/memory-4.jpg',
    badge: 'PARTNER IN CRIME',
    category: 'LITTLE ADVENTURES',
    title: 'Shopping & Coffee Escapes',
    caption: 'You picking out outfits, making me carry the bags, and forcing me to buy you ice cream every single time.',
    defaultPlaceholderBg: 'from-[#EEE9F6] via-[#FAF7F2] to-[#F8E0D1]',
  },
  {
    id: 'mem-5',
    assetPath: '/assets/memories/memory-5.jpg',
    badge: 'THE DREAMER',
    category: 'AMBITION & GRACE',
    title: 'The Unstoppable Dreamer',
    caption: 'Watching you study, work hard, and pursue your goals with quiet determination makes me so proud.',
    defaultPlaceholderBg: 'from-[#F4DCE0] via-[#FAF7F2] to-[#E8EEF5]',
  },
  {
    id: 'mem-6',
    assetPath: '/assets/memories/memory-6.jpg',
    badge: 'FOREVER AMMU',
    category: 'ETERNAL BOND',
    title: 'Always and Forever Kutty Mitu',
    caption: 'Years may fly by and you may grow older, but to your brother, you will always be that cute little baby.',
    defaultPlaceholderBg: 'from-[#F8E0D1] via-[#FAF7F2] to-[#FAF7F2]',
  },
];

export default function MemoriesSection() {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  return (
    <section id="memories" className="relative py-28 px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Camera className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
              Her Special World
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
            Little Memories, <span className="italic font-normal text-[#B87983]">Timeless Moments.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-xl mx-auto">
            A curated gallery celebrating the beautiful chapters of our journey together.
          </p>
        </div>

        {/* CLEAN, ELEGANT UNIFORM PORTRAIT CARDS — ALL 6 IDENTICAL TO PURE JOY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {MEMORIES.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                soundEngine.playChime(700, 0.4);
                setActiveMemory(item);
              }}
              className="group cursor-pointer bg-white/80 backdrop-blur-sm p-5 rounded-3xl border border-[#EBDCCE] shadow-sm hover:border-[#B87983] hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Frame: Uniform aspect-[4/5] with smooth hover */}
              <div
                className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#DEC5B1]/50 bg-gradient-to-tr ${item.defaultPlaceholderBg} shadow-inner`}
              >
                {/* Badge top-left */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#EBDCCE] text-[10px] font-sans uppercase tracking-[0.2em] text-[#413B3B] font-medium shadow-sm">
                  {item.badge}
                </div>

                {/* Real Sister Photograph */}
                <img
                  src={item.assetPath}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle View Hint on Hover (Clean, no upload button) */}
                <div className="absolute inset-0 bg-[#413B3B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1.5px]">
                  <div className="px-4 py-2 rounded-full bg-white/95 text-[#413B3B] text-xs font-medium flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#B87983]" />
                    <span>View Memory</span>
                  </div>
                </div>
              </div>

              {/* Caption Details Below Card */}
              <div className="mt-5 text-left">
                <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B87983] font-medium block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-[#413B3B] font-normal group-hover:text-[#B87983] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#938681] leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROPORTIONATE, ELEGANT MODAL (PERFECT ON DESKTOP & MOBILE) */}
      {activeMemory && (
        <div
          className="fixed inset-0 z-50 bg-[#413B3B]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveMemory(null)}
        >
          <div
            className="bg-[#FAF7F2] max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-7 border border-[#EBDCCE] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveMemory(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#EBDCCE] text-[#413B3B] hover:text-[#B87983] shadow-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Frame: Proportioned Aspect Ratio */}
            <div className="w-full aspect-[4/5] max-h-[50vh] rounded-2xl overflow-hidden mb-5 bg-[#FAF7F2] border border-[#DEC5B1] shadow-inner">
              <img
                src={activeMemory.assetPath}
                alt={activeMemory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="text-left">
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.22em] text-[#B87983] font-medium block mb-1">
                {activeMemory.category} • {activeMemory.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#413B3B] mb-2 font-normal">
                {activeMemory.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#938681] leading-relaxed mb-4">
                {activeMemory.caption}
              </p>

              <div className="pt-3 border-t border-[#DEC5B1]/60 flex items-center justify-between text-xs text-[#938681]">
                <span className="font-serif italic text-sm text-[#B87983]">
                  A Brother's Memory ✨
                </span>
                <Heart className="w-3.5 h-3.5 text-[#B87983] fill-[#F4DCE0]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
