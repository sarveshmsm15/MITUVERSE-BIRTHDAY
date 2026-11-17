import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, X, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LetterItem {
  id: number;
  tag: string;
  title: string;
  emoji: string;
  envelopeColor: string;
  sealColor: string;
  messageTamil: string;
}

const LETTERS: LetterItem[] = [
  {
    id: 1,
    tag: "Letter 01",
    title: "OPEN WHEN YOU ARE SAD",
    emoji: "🌧️",
    envelopeColor: "from-[#F4DCE0] to-[#FAF7F2]",
    sealColor: "#B87983",
    messageTamil: "Hey Ammu, ellaa naalum perfect-ah irukka mudiyadhu. Sila naal kashtama irukkum. Aana andha naal un value-ah decide pannaadhu. Nee romba special. Konjam smile pannu. Unakku thevai na naan irukken.",
  },
  {
    id: 2,
    tag: "Letter 02",
    title: "OPEN WHEN YOU ARE ANGRY WITH ME",
    emoji: "😤",
    envelopeColor: "from-[#F8E0D1] to-[#FAF7F2]",
    sealColor: "#D9825B",
    messageTamil: "First of all, kovam koranjiducha? Illana parava illa, konjam time eduthuko! Namma sandai pottalum, nee enakku special dhaan. Un feelings important. Namma pesi sari pannikkalaam.",
  },
  {
    id: 3,
    tag: "Letter 03",
    title: "OPEN WHEN YOU MISS ME",
    emoji: "💌",
    envelopeColor: "from-[#E8EEF5] to-[#FAF7F2]",
    sealColor: "#6A8EB8",
    messageTamil: "Distance irundhaalum bond change aagathu. Namma pesina silly conversations, jokes, memories ellame enakku special. Nee eppo vena message pannu.",
  },
  {
    id: 4,
    tag: "Letter 04",
    title: "OPEN WHEN YOU FEEL ALONE",
    emoji: "🫂",
    envelopeColor: "from-[#EEE9F6] to-[#FAF7F2]",
    sealColor: "#8E7BB0",
    messageTamil: "Unakku sila neram yaarum purinjukka maataanga nu thonalaam. Aana nee thaniya illa. Un feelings-ah respect panra people irukkaanga. Naanum unakku support-ah irukka try panren.",
  },
  {
    id: 5,
    tag: "Letter 05",
    title: "OPEN WHEN YOU NEED A LAUGH",
    emoji: "😂",
    envelopeColor: "from-[#F4DCE0] to-[#FAF7F2]",
    sealColor: "#B87983",
    messageTamil: "Thango, life serious-ah eduthukkaadha… already unna serious-ah eduthukka romba kashtam! Ippo sirichidu!",
  },
  {
    id: 6,
    tag: "Letter 06",
    title: "OPEN WHEN YOU FORGET HOW SPECIAL YOU ARE",
    emoji: "👑",
    envelopeColor: "from-[#F8E0D1] to-[#EEE9F6]",
    sealColor: "#D4AF37",
    messageTamil: "Nee perfect-ah irukkanum nu avasiyam illa. Un mistakes, dreams, crazy moments, kindness, everything makes you who you are. Never underestimate yourself.",
  },
];

export default function OpenWhenLettersSection() {
  const [activeLetter, setActiveLetter] = useState<LetterItem | null>(null);
  const [openedLetters, setOpenedLetters] = useState<number[]>([]);

  const handleOpenLetter = (letter: LetterItem) => {
    soundEngine.playChime(750, 0.4);
    if (!openedLetters.includes(letter.id)) {
      setOpenedLetters((prev) => [...prev, letter.id]);
    }
    setActiveLetter(letter);
  };

  return (
    <section id="open-when" className="relative py-28 px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative floral watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#F4DCE0]/20 to-[#EEE9F6]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
          <Mail className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
            Brother's Sanctuary Letters
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#413B3B] mb-3">
          Open When You <span className="italic font-normal text-[#B87983]">Need Me.</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-lg mx-auto mb-14">
          Six handwritten notes for life's moments. Whenever you need comfort, a smile, or reassurance, just open the matching letter.
        </p>

        {/* 6 LUXURY ENVELOPES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LETTERS.map((letter) => {
            const isOpened = openedLetters.includes(letter.id);

            return (
              <motion.div
                key={letter.id}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenLetter(letter)}
                className={`group cursor-pointer rounded-3xl p-7 border transition-all duration-300 relative flex flex-col justify-between text-left ${
                  isOpened
                    ? 'bg-white/90 border-[#B87983]/60 shadow-md'
                    : 'bg-white/70 hover:bg-white border-[#EBDCCE] shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Envelope Top Flap Design */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#938681] uppercase bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EBDCCE]">
                    {letter.tag}
                  </span>
                  <span className="text-xl">{letter.emoji}</span>
                </div>

                {/* Envelope Visual Simulation */}
                <div className={`w-full aspect-[16/10] rounded-2xl bg-gradient-to-br ${letter.envelopeColor} border border-[#DEC5B1]/70 p-4 relative flex flex-col items-center justify-center shadow-inner mb-5 group-hover:border-[#B87983] transition-colors`}>
                  {/* Wax Seal in Center */}
                  <div
                    className="w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white font-serif font-bold text-lg border-2 border-white/60 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: letter.sealColor }}
                  >
                    M
                  </div>

                  {/* Stamp status */}
                  <span className="text-[10px] font-mono tracking-widest text-[#938681] uppercase mt-3">
                    {isOpened ? '✓ UNSEALED' : 'SEALED WITH LOVE'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#413B3B] font-normal leading-snug group-hover:text-[#B87983] transition-colors mb-1">
                    {letter.title}
                  </h3>
                  <span className="text-[11px] font-serif italic text-[#938681] flex items-center gap-1">
                    <span>Click to read brother's words</span>
                    <Sparkles className="w-3 h-3 text-[#B87983]" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* UNFOLDED LETTER PARCHMENT MODAL */}
      <AnimatePresence>
        {activeLetter && (
          <div
            className="fixed inset-0 z-50 bg-[#413B3B]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur-md max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-12 border border-[#EBDCCE] luxury-shadow relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] border border-[#EBDCCE] text-[#413B3B] hover:text-[#B87983] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Envelope Header Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{activeLetter.emoji}</span>
                <span className="text-xs uppercase tracking-widest text-[#B87983] font-semibold">
                  {activeLetter.title}
                </span>
              </div>

              {/* Letter Parchment Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#DEC5B1]/70 shadow-inner mb-6 relative">
                <p className="font-serif text-lg sm:text-xl text-[#413B3B] leading-relaxed mb-6">
                  "{activeLetter.messageTamil}"
                </p>

                <div className="pt-4 border-t border-[#DEC5B1]/50 flex items-center justify-between text-xs text-[#938681]">
                  <span className="font-serif italic text-base text-[#B87983]">
                    Your Brother ❤️
                  </span>
                  <span className="font-sans uppercase tracking-widest text-[10px]">
                    29 November Always
                  </span>
                </div>
              </div>

              {/* Footer reassurance note */}
              <div className="flex items-center justify-between text-xs text-[#938681]">
                <span className="font-serif italic">
                  Keep this letter close to your heart, Ammu.
                </span>
                <Heart className="w-4 h-4 text-[#B87983] fill-[#F4DCE0]" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

