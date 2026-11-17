import React, { useRef, useState } from 'react';
import { Award, Sparkles, Download, Heart, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function SisterAwardSection() {
  const [downloaded, setDownloaded] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleCelebrate = () => {
    soundEngine.playCelebration();
    setDownloaded(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#F4DCE0', '#B87983', '#FAF7F2'],
    });
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    soundEngine.playChime(880, 0.4);
    window.print();
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/30 to-[#FAF7F2] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#F4DCE0]/20 to-[#EEE9F6]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
          <Award className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
            Official Lifetime Recognition
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
          The Royal Citation of <span className="italic font-normal text-[#B87983]">Sisterhood.</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-lg mx-auto mb-12">
          An irrevocable, certified decree awarded to Mitra by her brother.
        </p>

        {/* Certificate Parchment */}
        <div
          ref={certRef}
          className="relative bg-white/95 backdrop-blur-md p-8 sm:p-14 md:p-16 rounded-3xl border-4 border-double border-[#D4AF37]/40 luxury-shadow max-w-3xl mx-auto text-center print:border-solid print:shadow-none"
        >
          {/* Ornate Gold Corner Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Certificate Header */}
          <div className="mb-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#938681] font-sans font-medium block mb-2">
              The Sovereign Kingdom of Siblinghood
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#413B3B] uppercase tracking-wider font-light">
              Certificate of Irreplaceable Excellence
            </h3>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-3" />
          </div>

          <p className="font-serif italic text-sm sm:text-base text-[#938681] mb-4">
            This royal honor is affectionately conferred upon:
          </p>

          {/* Recipient Name in Luxury Serif */}
          <div className="mb-6">
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#B87983] font-normal tracking-wide block">
              MITRA
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#938681] font-sans block mt-1">
              (A.K.A. Mitu Chello • Ammu • Thango)
            </span>
          </div>

          {/* Decree Body */}
          <p className="font-serif text-sm sm:text-base md:text-lg text-[#413B3B] leading-relaxed max-w-xl mx-auto mb-8">
            For outstanding services in brightening our household, executing signature dramatic expressions, providing continuous emotional warmth, and holding the undisputed title of the world's most cherished little sister.
          </p>

          {/* Badges / Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs font-sans text-[#413B3B] max-w-lg mx-auto">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBDCCE] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B87983]" />
              <span>Lifetime Protected</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBDCCE] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>100% Irreplaceable</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBDCCE] flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#B87983] fill-[#F4DCE0]" />
              <span>Endless Love</span>
            </div>
          </div>

          {/* Certificate Signatures & Wax Seal */}
          <div className="pt-6 border-t border-[#DEC5B1]/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#938681] font-sans block">Date of Conferment</span>
              <span className="font-serif text-sm sm:text-base text-[#413B3B] font-medium">29 November • Every Year</span>
            </div>

            {/* Gold Wax Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5C158] via-[#D4AF37] to-[#B38F24] p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-dashed border-white/60 flex items-center justify-center text-white font-serif font-bold text-xl">
                M
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#938681] font-sans block">Certified &amp; Conferred By</span>
              <span className="font-serif italic text-lg sm:text-xl text-[#B87983]">Your Brother ❤️</span>
            </div>
          </div>
        </div>

        {/* Certificate Action Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handleCelebrate}
            className="px-6 py-2.5 rounded-full bg-[#B87983] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#965A64] shadow-md transition-all flex items-center gap-2"
          >
            {downloaded ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Honored with Love!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Salute the Queen</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-full bg-white border border-[#EBDCCE] text-[#413B3B] hover:text-[#B87983] text-xs uppercase tracking-widest font-medium hover:border-[#B87983] shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save Citation</span>
          </button>
        </div>
      </div>
    </section>
  );
}

