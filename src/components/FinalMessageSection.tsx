import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, Star, ArrowUp, Cake, Flame, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface Wish {
  id: string;
  sender: string;
  text: string;
  date: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: 'w-1',
    sender: 'Your Brother',
    text: 'May this year unlock every door to your biggest dreams, Ammu! Stay happy always!',
    date: '29 Nov',
  },
  {
    id: 'w-2',
    sender: 'Your Brother',
    text: 'No matter what happens, you will always have my unconditional love and support, Mitu Chello!',
    date: '29 Nov',
  },
  {
    id: 'w-3',
    sender: 'Your Brother',
    text: 'Not by blood, but by heart. Forever my little sister.',
    date: '29 Nov',
  },
];

export default function FinalMessageSection() {
  const [wishes, setWishes] = useState<Wish[]>(DEFAULT_WISHES);
  const [newSender, setNewSender] = useState('');
  const [newText, setNewText] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [messageRevealed, setMessageRevealed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mitu_birthday_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRevealMessage = () => {
    soundEngine.playCelebration();
    setMessageRevealed(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F4DCE0', '#B87983', '#D4AF37', '#FAF7F2'],
    });
  };

  const handleBlowCandles = () => {
    soundEngine.playCandleBlow();
    setCandlesLit(!candlesLit);
    if (candlesLit) {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F4DCE0', '#F8E0D1', '#B87983', '#D4AF37', '#EEE9F6'],
      });
    }
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const wish: Wish = {
      id: `w-${Date.now()}`,
      sender: newSender.trim() || 'Well Wisher',
      text: newText.trim(),
      date: 'Today',
    };

    const updated = [wish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('mitu_birthday_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewSender('');
    setNewText('');
    setIsOpenForm(false);
    soundEngine.playCelebration();

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F4DCE0', '#F8E0D1', '#B87983'],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundEngine.playChime(660, 0.4);
  };

  return (
    <section id="finale" className="relative pt-28 pb-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F8ECE8] to-[#FAF7F2] overflow-hidden">
      {/* Decorative large backdrop watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-light text-[#EBDCCE]/20 select-none pointer-events-none whitespace-nowrap">
        FOREVER AMMU
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Top Monogram / Star Icon */}
        <div className="w-16 h-16 rounded-full bg-white border border-[#EBDCCE] mx-auto flex items-center justify-center text-[#B87983] shadow-md mb-8">
          <Star className="w-7 h-7 fill-[#F4DCE0]" />
        </div>

        {/* Cinematic Headlines */}
        <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#938681] font-semibold block mb-3">
          TO MY FOREVER LITTLE STAR
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#413B3B] mb-4 tracking-tight">
          Happy Birthday, <span className="font-normal italic text-[#B87983]">MITRA.</span>
        </h2>

        <p className="font-serif text-base sm:text-lg md:text-xl text-[#938681] tracking-widest uppercase mb-12">
          29 NOVEMBER — YOUR DAY, YOUR WORLD, YOUR MAGIC.
        </p>

        {/* 29 CELEBRATION CANDLES & CAKE DISPLAY */}
        <div className="relative max-w-2xl mx-auto bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#DEC5B1] luxury-shadow mb-16 text-center">
          {/* Subtle floating butterflies & flower accents */}
          <div className="flex items-center justify-center gap-3 text-xs font-serif italic text-[#B87983] mb-4">
            <Flower2 className="w-4 h-4 text-[#B87983]" />
            <span>29 Floating Birthday Candles For You</span>
            <Flower2 className="w-4 h-4 text-[#B87983]" />
          </div>

          {/* 29 Animated Glowing Candle Flames */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto py-4">
            {Array.from({ length: 29 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center group"
                title={`Candle ${idx + 1}`}
              >
                {/* Flame */}
                <motion.div
                  animate={{
                    scale: candlesLit ? [1, 1.15, 0.95, 1.05] : 0,
                    opacity: candlesLit ? [0.9, 1, 0.85, 1] : 0,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2 + (idx % 5) * 0.2,
                    ease: "easeInOut",
                  }}
                  className={`w-2.5 h-3.5 rounded-full ${
                    candlesLit
                      ? 'bg-gradient-to-t from-orange-400 via-yellow-300 to-amber-100 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                      : 'bg-transparent'
                  }`}
                />
                {/* Candle Stick */}
                <div className="w-1.5 h-5 bg-gradient-to-b from-[#F4DCE0] to-[#EBDCCE] rounded-sm mt-0.5 border border-white/50" />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <button
              onClick={handleBlowCandles}
              className="px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-xs font-sans uppercase tracking-widest text-[#413B3B] hover:border-[#B87983] hover:text-[#B87983] transition-all shadow-sm active:scale-95"
            >
              {candlesLit ? '💨 Make a Wish & Blow Out 29 Candles' : '✨ Relight All 29 Candles'}
            </button>
          </div>
        </div>

        {/* ONE LAST MESSAGE TRIGGER OR REVEAL */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          {!messageRevealed ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRevealMessage}
              className="cursor-pointer bg-white/90 backdrop-blur-md p-10 sm:p-14 rounded-3xl border-2 border-dashed border-[#B87983] shadow-lg text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] mx-auto flex items-center justify-center text-[#B87983] shadow-md mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 fill-[#F4DCE0]" />
              </div>
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#938681] block mb-2 font-semibold">
                Click To Unfold
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#413B3B] font-light">
                ONE LAST MESSAGE FOR MY <span className="italic font-normal text-[#B87983]">MITU CHELLO...</span>
              </h3>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/95 backdrop-blur-md p-8 sm:p-14 md:p-16 rounded-3xl border border-[#DEC5B1] luxury-shadow text-left relative overflow-hidden"
            >
              {/* Gold decorative header */}
              <div className="border-b border-[#EBDCCE] pb-6 mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#938681] font-sans block mb-1">
                    Brother's Final Birthday Dedication
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#413B3B] font-medium">
                    Happy Birthday, Mitu Chello.
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-xl shadow-inner">
                  M
                </div>
              </div>

              {/* Exact Text Prescribed in Specification */}
              <div className="space-y-6 font-serif text-lg sm:text-xl text-[#413B3B] leading-relaxed">
                <p>
                  Unna en life-la kidaicha oru special person-ah mattum naan paakala...
                </p>

                <p>
                  Enakku romba pidicha, romba care panra, en sondha thangachi maari nenakkura oruthi-ah paakuren.
                </p>

                <p className="italic text-[#938681]">
                  Nee en blood sister illa... but that doesn't make this bond any less meaningful.
                </p>

                <p className="font-medium text-[#B87983]">
                  Un mela enakku irukkura paasam genuine-ah irukku.
                </p>

                <p>
                  Unakku life-la ella nalla vishayangalum nadakkanum.
                </p>

                {/* Blessings Staccato */}
                <div className="py-2 pl-4 border-l-2 border-[#B87983] space-y-1 font-serif text-lg sm:text-xl text-[#413B3B]">
                  <p>Nee sirikkanum.</p>
                  <p>Nee happy-ah irukkanum.</p>
                  <p>Nee un dreams ellathayum achieve pannanum.</p>
                  <p>Nee unnoda life-ah proud-ah live pannanum.</p>
                </div>

                <p>
                  Sometimes naan express pannaama irukkalam.<br />
                  Sometimes unna tease pannitu irukkalam.<br />
                  Sometimes namma sanda podalam.
                </p>

                <p className="font-semibold text-xl sm:text-2xl text-[#413B3B]">
                  But please, oru vishayam marandhudaadha...
                </p>

                {/* Golden Key Statement */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F4DCE0]/50 via-[#F8E0D1]/50 to-[#FAF7F2] border border-[#DEC5B1] text-center my-6">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#B87983] tracking-wide">
                    UNAKKU EN LIFE-LA ORU ROMBA SPECIAL PLACE IRUKKU.
                  </p>
                </div>

                <p>
                  And I'm genuinely happy that you are part of my life.
                </p>

                <div className="space-y-1 font-serif text-xl sm:text-2xl text-[#413B3B] pt-2">
                  <p>Happy Birthday, <span className="italic text-[#B87983]">Ammu.</span></p>
                  <p>Happy Birthday, <span className="italic text-[#B87983]">Thango.</span></p>
                  <p>Happy Birthday, <span className="italic text-[#B87983]">Mitu Chello.</span></p>
                </div>

                {/* Animated Signature Sign-off */}
                <div className="pt-8 border-t border-[#DEC5B1]/70 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#938681] font-sans mb-1">
                      With lots and lots of love,
                    </p>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-serif italic text-3xl sm:text-4xl text-[#413B3B] font-semibold"
                    >
                      YOUR BROTHER.
                    </motion.p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono tracking-widest text-[#B87983] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#DEC5B1]">
                      MITUVERSE • FOREVER SPECIAL
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Interactive Sister's Wish Jar */}
        <div className="max-w-xl mx-auto bg-white/70 p-6 sm:p-8 rounded-3xl border border-[#DEC5B1] shadow-sm mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B87983]" />
              <h3 className="font-serif text-xl text-[#413B3B]">Sister's Blessing Jar</h3>
            </div>
            <button
              onClick={() => setIsOpenForm(!isOpenForm)}
              className="text-xs font-sans uppercase tracking-widest text-[#B87983] hover:underline font-semibold"
            >
              {isOpenForm ? 'Close Form' : '+ Add a Blessing'}
            </button>
          </div>

          <p className="font-serif italic text-sm text-[#938681] text-left mb-6">
            Leave an eternal wish in Mitu's memory jar. Saved on her personal site.
          </p>

          <AnimatePresence>
            {isOpenForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddWish}
                className="space-y-4 mb-6 text-left"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Your Brother, Friend)"
                    value={newSender}
                    onChange={(e) => setNewSender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DEC5B1] bg-white text-sm text-[#413B3B] focus:outline-none focus:border-[#B87983]"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="Write a sweet prayer, blessing, or happy wish for Mitu..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DEC5B1] bg-white text-sm text-[#413B3B] focus:outline-none focus:border-[#B87983]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#B87983] text-white text-xs font-sans uppercase tracking-widest hover:bg-[#a66872] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Drop In Blessing Jar
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* List of wishes */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 text-left">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-xl bg-white/80 border border-[#EBDCCE] shadow-xs text-xs font-serif"
              >
                <div className="flex items-center justify-between text-[#938681] text-[10px] uppercase font-sans tracking-widest mb-1">
                  <span>{w.sender}</span>
                  <span>{w.date}</span>
                </div>
                <p className="text-[#413B3B] text-sm italic leading-relaxed">
                  "{w.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#DEC5B1] text-xs font-sans uppercase tracking-widest text-[#413B3B] hover:border-[#B87983] hover:text-[#B87983] shadow-sm transition-all hover:-translate-y-1"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top of Mituverse</span>
        </button>

        {/* Footer Dedication */}
        <div className="mt-16 pt-8 border-t border-[#DEC5B1]/50 text-center">
          <p className="font-serif italic text-sm text-[#938681]">
            MITUVERSE — NOT BY BLOOD, BUT BY HEART. FOREVER SPECIAL.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#DEC5B1] mt-2">
            Created with unconditional brotherly love for Mitra • 29 November
          </p>
        </div>
      </div>
    </section>
  );
}
