import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Volume2, VolumeX, Music, Check, Copy } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function MissYourBrotherSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      setIsPlayingMusic(customEvent.detail.isPlaying);
    };
    window.addEventListener('mitu-music-state', handleStateChange);
    return () => window.removeEventListener('mitu-music-state', handleStateChange);
  }, []);

  const handleToggleLetter = () => {
    soundEngine.playChime(660, 0.4);
    setIsOpen(!isOpen);
  };

  const handleMusicToggle = () => {
    window.dispatchEvent(new CustomEvent('mitu-toggle-music'));
  };

  const handleCopyLetter = () => {
    const text = `Hey Mitu chello...

Indha letter-ah nee open panra time-la naan un pakkathula irukka vendiyadhu illa.
But indha words padikkumbodhu, unakku oru vishayam puriyanum.
Nee enakku romba special da.

Unna daily paakanum, daily pesanum nu avasiyam illa. But nee en life-la irukkura fact itself enakku happy-ah irukku.
Namma relationship-la perfect moments mattum irukkanum nu illa. Sandai, teasing, silly arguments, laughter, ellame irukkattum.
Aana oru vishayam mattum change aagakoodaadhu...
Indha bond-ah naan romba value panren.

Take care of yourself, Ammu.
Always keep smiling.

- Un Brother sarvesh msm ❤️`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    soundEngine.playChime(900, 0.3);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="miss-brother" className="relative py-28 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F5ECE5] to-[#FAF7F2] overflow-hidden">
      {/* Decorative floral aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#F4DCE0]/35 via-[#F8E0D1]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DEC5B1] shadow-sm mb-4">
          <Mail className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.26em] text-[#938681] font-semibold">
            Special Sanctuary Letter
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#413B3B] mb-3">
          Open This When You <span className="italic font-normal text-[#B87983]">Miss Your Brother.</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-xl mx-auto mb-12">
          Whenever distances feel far or your heart feels quiet, tap the wax-sealed envelope to unroll this handwritten note.
        </p>

        {/* INTERACTIVE LUXURY ENVELOPE / LETTER */}
        <div className="relative max-w-2xl mx-auto">
          {!isOpen ? (
            /* CLOSED ENVELOPE WITH WAX SEAL */
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleToggleLetter}
              className="cursor-pointer relative bg-gradient-to-br from-[#FFFDF9] via-[#F8F1EB] to-[#EFE6DD] p-10 sm:p-14 rounded-3xl border-2 border-[#DEC5B1] shadow-xl overflow-hidden group"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-[#F4E9E0] border-b border-[#DEC5B1] [clip-path:polygon(0_0,50%_100%,100%_0)] shadow-sm pointer-events-none" />

              {/* Monogram Wax Seal */}
              <div className="relative z-10 my-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C65D6E] via-[#B87983] to-[#8C4A54] mx-auto p-1.5 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-white/70 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-inner">
                    M
                  </div>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#B87983] block mt-4 font-semibold">
                  Click To Break Wax Seal
                </span>
              </div>

              {/* Envelope Address Labels */}
              <div className="pt-4 border-t border-[#DEC5B1]/60 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#938681] font-sans block">To</span>
                    <span className="font-serif text-lg text-[#413B3B] font-medium">Mitu Chello (Ammu / Thango)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#938681] font-sans block">From</span>
                    <span className="font-serif italic text-base text-[#B87983]">Your Brother</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* OPENED HANDWRITTEN LETTER PARCHMENT */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white/95 backdrop-blur-md p-8 sm:p-14 md:p-16 rounded-3xl border border-[#DEC5B1] luxury-shadow text-left"
            >
              {/* Paper Stack Shadow Accents */}
              <div className="absolute inset-0 bg-[#F4DCE0]/40 rounded-3xl transform rotate-1 scale-[0.99] pointer-events-none -z-10" />

              {/* Top Controls: Music & Seal & Close */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#EBDCCE] pb-5 mb-8 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-lg shadow-inner">
                    M
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#413B3B] block font-semibold">
                      A Letter From Your Brother
                    </span>
                    <span className="text-[10px] text-[#938681] tracking-wider uppercase font-sans">
                      Keep this close to your heart
                    </span>
                  </div>
                </div>

                {/* Background Music Toggle + Copy + Fold */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMusicToggle}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border flex items-center gap-1.5 ${
                      isPlayingMusic
                        ? 'bg-[#F4DCE0] border-[#B87983] text-[#413B3B]'
                        : 'bg-[#FAF7F2] border-[#DEC5B1] text-[#938681] hover:text-[#413B3B]'
                    }`}
                    title="Toggle Remo Birthday BGM"
                  >
                    {isPlayingMusic ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#B87983]" />
                        <span className="text-[11px] font-sans">Remo BGM Playing</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-sans">Play Soft BGM</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyLetter}
                    className="p-2 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-[#938681] hover:text-[#B87983] transition-colors"
                    title="Copy letter"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleToggleLetter}
                    className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-xs font-sans uppercase tracking-wider text-[#938681] hover:text-[#B87983] transition-colors"
                  >
                    Fold Envelope
                  </button>
                </div>
              </div>

              {/* Exact Letter Body Content */}
              <div className="space-y-6 font-serif text-lg sm:text-xl text-[#413B3B] leading-relaxed">
                <p className="font-sans font-semibold text-sm tracking-widest uppercase text-[#B87983]">
                  Hey Mitu chello...
                </p>

                <p>
                  Indha letter-ah nee open panra time-la naan un pakkathula irukka vendiyadhu illa.
                </p>

                <p>
                  But indha words padikkumbodhu, unakku oru vishayam puriyanum.
                </p>

                <p className="font-medium text-[#B87983] text-xl sm:text-2xl">
                  Nee enakku romba special da.
                </p>

                <p>
                  Unna daily paakanum, daily pesanum nu avasiyam illa. But nee en life-la irukkura fact itself enakku happy-ah irukku.
                </p>

                <p>
                  Namma relationship-la perfect moments mattum irukkanum nu illa. Sandai, teasing, silly arguments, laughter, ellame irukkattum.
                </p>

                <p className="italic text-[#938681]">
                  Aana oru vishayam mattum change aagakoodaadhu...
                </p>

                <p className="font-semibold text-[#413B3B]">
                  Indha bond-ah naan romba value panren.
                </p>

                <p>
                  Take care of yourself, Ammu.
                </p>

                <p>
                  Always keep smiling.
                </p>

                {/* Sign-off */}
                <div className="pt-8 border-t border-[#DEC5B1]/70 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#938681] font-sans mb-1">
                      Always with you,
                    </p>
                    <p className="font-serif italic text-3xl text-[#413B3B]">
                      - Un sarvesh maran.m ❤️
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono tracking-widest text-[#B87983] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#DEC5B1]">
                      #NotByBlood #ByHeartForever
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
