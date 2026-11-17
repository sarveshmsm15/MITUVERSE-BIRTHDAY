import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Sparkles, Play, Pause, Copy, Check, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface QuoteItem {
  id: number;
  tamil: string;
  englishMeaning: string;
  tag: string;
  colorScheme: string;
}

const QUOTES: QuoteItem[] = [
  {
    id: 1,
    tamil: "Mitu chello, nee happy-ah irundha podhum... enakku adhuve biggest celebration da!",
    englishMeaning: "As long as you are happy, Mitu darling, that itself is the grandest celebration for me!",
    tag: "Pure Celebration",
    colorScheme: "from-[#F4DCE0]/40 to-[#FAF7F2]",
  },
  {
    id: 2,
    tamil: "Ammu, un smile-ku replacement eh illa... adhu dhaan namma veetoda happiness.",
    englishMeaning: "Ammu, your smile has no replacement in this entire universe... it is the heartbeat of our home.",
    tag: "Veetoda Happiness",
    colorScheme: "from-[#F8E0D1]/40 to-[#FAF7F2]",
  },
  {
    id: 3,
    tamil: "Thango, world full-ah people irundhaalum, un maari oru sister enakku mattum dhaan!",
    englishMeaning: "Thango, though the world is full of billions of people, a sister like you exists only for me!",
    tag: "One in a Billion",
    colorScheme: "from-[#E8EEF5]/40 to-[#FAF7F2]",
  },
  {
    id: 4,
    tamil: "Unna tease panradhu en birthright... aana unna hurt panna yaarukkum rights illa!",
    englishMeaning: "Teasing you is my divine birthright as your brother... but nobody on earth has the right to ever hurt you!",
    tag: "Brother's Shield",
    colorScheme: "from-[#EEE9F6]/40 to-[#FAF7F2]",
  },
  {
    id: 5,
    tamil: "Nee evlo periya aanaalum, enakku nee always and forever kutty Mitu dhaan.",
    englishMeaning: "No matter how grown-up you become, to me you will always and forever remain my little baby Mitu.",
    tag: "Forever Kutty Mitu",
    colorScheme: "from-[#F4DCE0]/40 to-[#FAF7F2]",
  },
  {
    id: 6,
    tamil: "Life la evlo problems vandhaalum, nee sirichite iru... naan un pakkathula iruppen.",
    englishMeaning: "Whatever challenges life throws, you just keep smiling... I will always be standing right beside you.",
    tag: "Unshakable Support",
    colorScheme: "from-[#F8E0D1]/40 to-[#FAF7F2]",
  },
  {
    id: 7,
    tamil: "Un happiness-ku expiry date kedaiyaadhu... adhu lifetime subscription!",
    englishMeaning: "There is never an expiry date on your happiness... that is a lifetime subscription guaranteed by your brother!",
    tag: "Lifetime Guarantee",
    colorScheme: "from-[#E8EEF5]/40 to-[#FAF7F2]",
  },
  {
    id: 8,
    tamil: "Ammu, un dreams ellame reality aaganum... un smile mattum eppovum same-ah irukkanum.",
    englishMeaning: "Ammu, every single one of your dreams must turn into reality... while that radiant smile stays forever unchanged.",
    tag: "Dreams & Prayers",
    colorScheme: "from-[#EEE9F6]/40 to-[#FAF7F2]",
  },
  {
    id: 9,
    tamil: "Sister nu oru relationship mattum illa... nee en life-la kidaicha special blessing.",
    englishMeaning: "You are not just a sister by relationship... you are the most precious blessing that ever entered my life.",
    tag: "Special Blessing",
    colorScheme: "from-[#F4DCE0]/40 to-[#FAF7F2]",
  },
  {
    id: 10,
    tamil: "Un birthday November 29... aana nee en life-ku vandha naal la irundhe every day special dhaan!",
    englishMeaning: "Your official birthday is November 29... but ever since the day you came into my life, every single day has been special!",
    tag: "29 November Magic",
    colorScheme: "from-[#F8E0D1]/40 to-[#FAF7F2]",
  },
  {
    id: 11,
    tamil: "Enna vena kalaaichiko... aana unakku kashtam na first varradhu naan dhaan!",
    englishMeaning: "Roast me or pull my leg all you want... but if you ever face any hardship, the first person running to you is ME!",
    tag: "First Responder",
    colorScheme: "from-[#E8EEF5]/40 to-[#FAF7F2]",
  },
  {
    id: 12,
    tamil: "Mitu chello, nee happy-ah irukkanum... adhu dhaan enakku eppovume mukkiyam.",
    englishMeaning: "Mitu darling, your happiness is the only thing that will ever truly matter to me above all else.",
    tag: "Prime Priority",
    colorScheme: "from-[#EEE9F6]/40 to-[#FAF7F2]",
  },
  {
    id: 13,
    tamil: "Namma rendu perum fight pannama irundha adhu day-ve illa... but veetoda vibe eh un lollu dhaan!",
    englishMeaning: "If we don't bicker at least once, the day doesn't feel complete... your playful banter is the real spark of our home!",
    tag: "Daily Banter",
    colorScheme: "from-[#F4DCE0]/40 to-[#FAF7F2]",
  },
  {
    id: 14,
    tamil: "Kadavul enakku best friend kudukkala nu thonave illa, yen na unna en thangachiya anupitaaru!",
    englishMeaning: "I never once wished for a best friend, because God already sent the very best one as my little sister!",
    tag: "Best Friend Forever",
    colorScheme: "from-[#F8E0D1]/40 to-[#FAF7F2]",
  },
];

export default function ThuglishQuotesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentQuote = QUOTES[currentIndex];

  const nextQuote = () => {
    soundEngine.playChime(750, 0.4);
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    soundEngine.playChime(700, 0.4);
    setCurrentIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${currentQuote.tamil}" — For Mitra (Mitu Chello)`);
    setCopied(true);
    soundEngine.playChime(880, 0.5);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quotes" className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/30 to-[#FAF7F2] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F4DCE0]/30 to-[#EEE9F6]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
              The Heart of the Website
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
            Konjam Love... <span className="italic font-normal text-[#B87983]">Neraya Sentiment.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681]">
            Original brotherly Thuglish thoughts for my Mitu Chello.
          </p>
        </div>

        {/* Interactive Quote Card Player */}
        <div className="relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full bg-gradient-to-br ${currentQuote.colorScheme} p-8 sm:p-12 md:p-14 rounded-3xl border border-[#EBDCCE] luxury-shadow relative overflow-hidden`}
            >
              {/* Decorative top quote icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#DEC5B1]/70 text-[10px] font-sans uppercase tracking-[0.2em] text-[#B87983] font-medium">
                  {currentQuote.tag}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-widest text-[#938681]">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(QUOTES.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-full bg-white/70 hover:bg-white text-[#938681] hover:text-[#B87983] border border-[#EBDCCE] transition-colors"
                    title="Copy Quote"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Main Thuglish Quote */}
              <div className="relative z-10 mb-6">
                <Quote className="w-8 h-8 text-[#B87983]/30 mb-2" />
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#413B3B] leading-snug font-normal">
                  "{currentQuote.tamil}"
                </p>
              </div>

              {/* English Subtitle / Meaning */}
              <div className="pt-4 border-t border-[#EBDCCE]/60 flex items-center justify-between">
                <p className="font-sans text-xs sm:text-sm text-[#938681] italic font-light max-w-xl">
                  {currentQuote.englishMeaning}
                </p>
                <Heart className="w-4 h-4 text-[#B87983] fill-[#F4DCE0] shrink-0 ml-4" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#938681] hover:text-[#413B3B] transition-colors bg-white/60 px-4 py-2 rounded-full border border-[#EBDCCE]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#B87983]" />
                <span>Pause Autoplay</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#B87983]" />
                <span>Start Autoplay</span>
              </>
            )}
          </button>

          {/* Quick Dots Pagination */}
          <div className="flex items-center gap-1.5 max-w-xs overflow-x-auto py-1">
            {QUOTES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  soundEngine.playChime(700 + idx * 20, 0.3);
                  setCurrentIndex(idx);
                }}
                className={`transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#B87983]'
                    : 'w-2 h-2 bg-[#DEC5B1] hover:bg-[#B87983]/60'
                }`}
                title={`Quote ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevQuote}
              className="p-3 rounded-full bg-white border border-[#EBDCCE] shadow-sm hover:border-[#B87983] hover:text-[#B87983] text-[#413B3B] transition-all"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextQuote}
              className="p-3 rounded-full bg-white border border-[#EBDCCE] shadow-sm hover:border-[#B87983] hover:text-[#B87983] text-[#413B3B] transition-all"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

