import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Pause, ChevronLeft, ChevronRight, Heart, Bookmark, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface RememberTruth {
  id: number;
  number: string;
  truth: string;
  tamilWhisper: string;
  context: string;
}

const REMEMBER_TRUTHS: RememberTruth[] = [
  {
    id: 1,
    number: "01",
    truth: "Never underestimate yourself.",
    tamilWhisper: "Un capability-ah eppovume koranja edaila paathuraadha da Ammu.",
    context: "You have an incredible quiet strength inside you that is capable of surpassing any hurdle.",
  },
  {
    id: 2,
    number: "02",
    truth: "You deserve genuine happiness.",
    tamilWhisper: "Unakku kidaikira joy fake-ah illaama, 100% genuine-ah irukkanum nu naan aasaipaduren.",
    context: "Never settle for half-hearted love or partial joy. You deserve pure, uncompromised peace.",
  },
  {
    id: 3,
    number: "03",
    truth: "You don't need to be perfect.",
    tamilWhisper: "Nee perfect-ah irukkanum nu avasiyam illa... un real-ah irukkura nature dhaan best.",
    context: "Perfection is an illusion. Your little flaws, your quirks, and your honesty are what make you lovable.",
  },
  {
    id: 4,
    number: "04",
    truth: "Your dreams matter.",
    tamilWhisper: "Un aasaiyum un goals-um yaarum reject panna mudiyadhu.",
    context: "Every ambition planted in your heart is valid. Chase them boldly without seeking anyone's permission.",
  },
  {
    id: 5,
    number: "05",
    truth: "Your feelings matter.",
    tamilWhisper: "Un manasula irukkura baratha chinna vishayam nu eduthukaadha.",
    context: "Whenever you feel sad, overwhelmed, or confused, your feelings deserve tenderness and respect.",
  },
  {
    id: 6,
    number: "06",
    truth: "Don't compare your journey with anyone else's.",
    tamilWhisper: "Vera yaarodavum un life path-ah compare panni nimmadhiya tholachidaadha.",
    context: "You run your own race at your own magnificent pace. Your timeline is unique to you.",
  },
  {
    id: 7,
    number: "07",
    truth: "Never stop smiling.",
    tamilWhisper: "Un smile namma veetoda lighting... adha eppovume off panna vidaadha.",
    context: "Your smile is a source of courage not only for you, but for everyone who loves you dearly.",
  },
  {
    id: 8,
    number: "08",
    truth: "Be proud of how far you've come.",
    tamilWhisper: "Nee thaandi vandha obstacles-ah paathu unna nee applaud pannanum.",
    context: "You have survived days you never thought you could. Celebrate every single step of your growth.",
  },
  {
    id: 9,
    number: "09",
    truth: "Always believe in yourself.",
    tamilWhisper: "World unna doubt panna kooda, un mela unakku irukkura faith udanjida koodaadhu.",
    context: "Self-trust is your North Star. Even when nobody else understands, trust your intuition.",
  },
  {
    id: 10,
    number: "10",
    truth: "You will always be someone special in my life.",
    tamilWhisper: "Enna aanaalum, nee en manasukku eppovum irreplaceable Mitu Chello dhaan.",
    context: "Through every changing year, season, or distance, my love and support as your brother will never fade.",
  },
];

export default function RememberForeverSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % REMEMBER_TRUTHS.length);
      }, 5500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    soundEngine.playChime(700 + (currentIndex % 5) * 40, 0.3);
    setCurrentIndex((prev) => (prev + 1) % REMEMBER_TRUTHS.length);
  };

  const handlePrev = () => {
    soundEngine.playChime(650 + (currentIndex % 5) * 40, 0.3);
    setCurrentIndex((prev) => (prev - 1 + REMEMBER_TRUTHS.length) % REMEMBER_TRUTHS.length);
  };

  const currentTruth = REMEMBER_TRUTHS[currentIndex];

  return (
    <section id="remember-forever" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#201D28] text-[#FAF7F2] overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#B87983]/15 via-[#F4DCE0]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F4DCE0] mb-4">
          <Compass className="w-3.5 h-3.5 text-[#F4DCE0]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] font-medium">
            Life Mantras From Your Brother
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white mb-3">
          Things I Want You To <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#F4DCE0] bg-gradient-to-r from-[#F4DCE0] to-[#DEC5B1] bg-clip-text text-transparent">
            Remember Forever.
          </span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-white/60 max-w-lg mx-auto mb-14">
          Ten timeless anchors to hold onto whenever life feels overwhelming.
        </p>

        {/* CINEMATIC SLIDE VIEWER */}
        <div className="relative bg-white/5 backdrop-blur-xl p-8 sm:p-14 md:p-16 rounded-3xl border border-white/15 shadow-2xl min-h-[380px] flex flex-col justify-between max-w-3xl mx-auto">
          {/* Top progress indicator & slide number */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4DCE0] font-semibold">
              Truth {currentTruth.number} of 10
            </span>

            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {REMEMBER_TRUTHS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playChime(700 + idx * 30, 0.2);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-[#F4DCE0]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to truth ${item.number}`}
                />
              ))}
            </div>
          </div>

          {/* Animated Center Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTruth.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="my-auto py-4"
            >
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
                "{currentTruth.truth}"
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-[#F4DCE0] mb-4">
                "{currentTruth.tamilWhisper}"
              </p>

              <p className="font-sans text-xs sm:text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
                {currentTruth.context}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white/80 transition-all flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="font-sans text-[11px] uppercase tracking-wider">{isPlaying ? 'Pause' : 'Autoplay'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all active:scale-95"
                aria-label="Previous truth"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B87983] to-[#F4DCE0] text-[#1A1824] font-bold flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Next truth"
              >
                <ChevronRight className="w-5 h-5 text-[#1A1824]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
