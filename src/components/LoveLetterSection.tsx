import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleLetter = () => {
    soundEngine.playChime(660, 0.8);
    setIsOpen(!isOpen);
  };

  return (
    <section id="love-letter" className="relative py-28 px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative floral watermark / background accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#F4DCE0]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Heart className="w-3.5 h-3.5 text-[#B87983] fill-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
              A Brother's Words
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] max-w-2xl mx-auto leading-tight">
            Some people make life beautiful.<br />
            <span className="italic font-normal text-[#B87983]">You're one of them.</span>
          </h2>
        </div>

        {/* Tactile Luxury Envelope / Letter Container */}
        <div className="relative">
          {/* Subtle paper letter stack effect */}
          <div className="absolute inset-0 bg-[#F3E9DF] rounded-3xl transform rotate-1 scale-[0.99] opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-[#F4DCE0] rounded-3xl transform -rotate-1 scale-[0.98] opacity-50 pointer-events-none" />

          {/* Main Letter Parchment */}
          <div className="relative bg-white/90 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-3xl border border-[#EBDCCE] luxury-shadow">
            {/* Top Monogram Seal */}
            <div className="flex items-center justify-between border-b border-[#EBDCCE]/70 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-lg shadow-inner">
                  M
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#413B3B] block font-medium">To My Sister, Mitra</span>
                  <span className="text-[10px] text-[#938681] tracking-wider uppercase font-sans">Strictly Personal &amp; Heartfelt</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-serif italic text-[#938681]">
                <span>29 November</span>
                <Sparkles className="w-3.5 h-3.5 text-[#B87983]" />
              </div>
            </div>

            {/* Letter Body */}
            {isOpen ? (
              <div className="space-y-6 text-[#413B3B]/90 font-serif text-base sm:text-lg md:text-xl leading-relaxed">
                <p className="font-sans font-medium text-sm tracking-widest uppercase text-[#B87983]">
                  Dearest Mitu Chello,
                </p>

                <p>
                  I was thinking about what to give you for your birthday, and I realized that no gift in this world could ever match what your presence means to our family—and especially to me as your brother.
                </p>

                <p>
                  You have this rare, quiet magic about you, <span className="font-semibold text-[#413B3B]">Ammu</span>. Whenever you walk into the room with your crazy laughter, your little attitude, or even when you're dramatically complaining about the smallest things—the house just instantly feels alive. You bring a warmth that nobody else can replicate.
                </p>

                <p>
                  I know I tease you all the time. I know I pull your leg, fight with you over silly things, and pretend that you annoy me. But the truth is, <span className="font-semibold text-[#413B3B]">Thango</span>, having you as my sister is one of the greatest blessings life has handed me. 
                </p>

                <p>
                  No matter how tall you grow, how successful you become, or how many years pass by, remember one thing: in my eyes, you will always be my little sister. Whenever the world feels overwhelming, or you feel lost or tired, you will always have me standing right behind you—ready to back you up, protect you, and cheer for you.
                </p>

                <p>
                  You deserve every happiness, every dream fulfilled, and every piece of joy that this universe has to offer. Never let that radiant smile fade.
                </p>

                <div className="pt-8 mt-6 border-t border-[#EBDCCE]/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#938681] font-sans mb-1">
                      Forever in your corner,
                    </p>
                    <p className="font-serif italic text-2xl text-[#413B3B]">
                      Your Brother ❤️
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono tracking-widest text-[#B87983] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#EBDCCE]">
                      #MituChelloForever
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <Mail className="w-12 h-12 text-[#B87983] mx-auto mb-4 opacity-70" />
                <p className="font-serif italic text-lg text-[#938681] mb-4">The letter is neatly folded with brotherly love.</p>
                <button
                  onClick={toggleLetter}
                  className="px-6 py-2.5 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-xs uppercase tracking-widest text-[#413B3B] hover:border-[#B87983] hover:text-[#B87983] transition-all"
                >
                  Unfold Letter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

