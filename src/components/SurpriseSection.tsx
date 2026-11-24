import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import { getAssetUrl } from '../utils/assets';

export default function SurpriseSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [boxLifting, setBoxLifting] = useState(false);
  const [customGiftImgFailed, setCustomGiftImgFailed] = useState(false);

  const handleOpenSurprise = () => {
    soundEngine.playCelebration();
    setBoxLifting(true);

    // Multi-stage confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F4DCE0', '#F8E0D1', '#E8EEF5', '#EEE9F6', '#B87983', '#D4AF37'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#F4DCE0', '#B87983', '#D4AF37'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#E8EEF5', '#EEE9F6', '#D4AF37'],
      });
      setIsOpened(true);
      setBoxLifting(false);
    }, 850);
  };

  const handleReset = () => {
    soundEngine.playChime(600, 0.4);
    setIsOpened(false);
    setBoxLifting(false);
  };

  const popExtraConfetti = () => {
    soundEngine.playCelebration();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F4DCE0', '#F8E0D1', '#B87983', '#D4AF37'],
    });
  };

  // Check if custom png exists in public/assets/gift/gift-box.png, otherwise use realistic SVG
  const giftBoxImageSrc = !customGiftImgFailed 
    ? getAssetUrl('assets/gift/gift-box.png') 
    : getAssetUrl('assets/gift/gift-box.svg');

  return (
    <section id="surprise" className={`relative py-32 px-6 md:px-12 transition-colors duration-1000 overflow-hidden ${
      isOpened ? 'bg-gradient-to-b from-[#F4DCE0]/40 via-[#FAF7F2] to-[#FAF7F2]' : 'bg-[#FAF7F2]'
    }`}>
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#F4DCE0]/50 via-[#F8E0D1]/30 to-[#EEE9F6]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Gift className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
              Exclusive Brother's Surprise
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
            Something Special, <span className="italic font-normal text-[#B87983]">Just For Mitra.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-lg mx-auto">
            Ready to unwrap your little universe?
          </p>
        </div>

        {/* Surprise Box Stage */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col items-center justify-center py-6"
            >
              {/* REALISTIC LUXURY 3D GIFT BOX PRESENTATION */}
              <div 
                className="relative mb-10 group cursor-pointer max-w-[340px] sm:max-w-[400px] w-full"
                onClick={handleOpenSurprise}
              >
                {/* Soft Ambient Halo Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#F4DCE0] via-[#F8E0D1] to-[#EEE9F6] rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Gift Box Image / Render Container with 3D Lifting Animation */}
                <div className={`relative transition-transform duration-500 transform ${
                  boxLifting ? 'scale-110 -translate-y-6 rotate-1' : 'group-hover:scale-105 group-hover:-translate-y-2'
                }`}>
                  <img
                    src={giftBoxImageSrc}
                    alt="Realistic Luxury Birthday Gift Box for Mitra"
                    onError={() => setCustomGiftImgFailed(true)}
                    className="w-full h-auto drop-shadow-2xl select-none"
                    draggable={false}
                  />

                  {/* Pulsing Hint Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#D4AF37] shadow-lg flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#B87983]">
                    <Sparkles className="w-3 h-3 text-[#D4AF37] animate-spin-slow" />
                    <span>Click Box to Open</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOpenSurprise}
                disabled={boxLifting}
                className="group relative px-9 py-4 rounded-full bg-[#B87983] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.24em] font-medium shadow-xl hover:bg-[#965A64] hover:shadow-2xl transition-all duration-300 flex items-center gap-3 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                <span>{boxLifting ? 'Unwrapping Magic...' : 'OPEN YOUR LITTLE SURPRISE'}</span>
                <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
              </button>

              <span className="text-[11px] font-serif italic text-[#938681] mt-3">
                (Click the gift box or button to unveil the celebration)
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="opened-surprise"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-md p-8 sm:p-14 rounded-3xl border border-[#B87983]/30 luxury-shadow relative overflow-hidden"
            >
              {/* Floating Butterflies / Flowers Accents */}
              <div className="absolute top-4 left-6 text-2xl animate-bounce delay-100">🦋</div>
              <div className="absolute top-8 right-8 text-2xl animate-bounce delay-300">🌸</div>
              <div className="absolute bottom-6 left-8 text-2xl animate-bounce delay-200">✨</div>
              <div className="absolute bottom-6 right-6 text-2xl animate-bounce delay-500">🦋</div>

              {/* Celebration Cake Icon with glowing candles */}
              <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#F4DCE0] rounded-full blur-xl opacity-80 animate-pulse" />
                <div className="relative text-6xl">🎂</div>
              </div>

              {/* Main Headline */}
              <span className="text-xs uppercase tracking-[0.3em] text-[#B87983] font-semibold block mb-2">
                29 NOVEMBER ROYAL DEDICATION
              </span>

              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#413B3B] font-light tracking-tight mb-4 leading-tight">
                HAPPY BIRTHDAY <span className="font-normal italic text-[#B87983]">MITU CHELLO!</span>
              </h3>

              <p className="font-serif italic text-xl sm:text-2xl text-[#938681] font-light max-w-xl mx-auto mb-8">
                "Stay happy, stay crazy, and keep shining forever."
              </p>

              {/* Brother's Final Heartfelt Message Card */}
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#EBDCCE] text-left max-w-2xl mx-auto mb-8">
                <p className="font-serif text-base sm:text-lg text-[#413B3B] leading-relaxed mb-4">
                  Ammu, having you as my sister is one of the greatest privileges of my life. Seeing your smile, watching you chase your aspirations, and sharing daily laughs with you makes every day special.
                </p>
                <p className="font-serif text-base sm:text-lg text-[#413B3B] leading-relaxed">
                  Never forget how capable, brilliant, and loved you are. Whenever you need a helping hand, advice, or just someone to laugh at silly things with, your brother is right here.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DEC5B1]/50 flex items-center justify-between">
                  <span className="font-serif italic text-base text-[#B87983]">
                    Love you always, Thango ❤️
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#938681]">
                    Your Brother
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={popExtraConfetti}
                  className="px-6 py-3 rounded-full bg-[#B87983] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#965A64] shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Shower More Confetti!</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full bg-white border border-[#EBDCCE] text-[#938681] hover:text-[#413B3B] text-xs uppercase tracking-widest font-medium hover:border-[#B87983] shadow-sm transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Close &amp; Wrap Again</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
