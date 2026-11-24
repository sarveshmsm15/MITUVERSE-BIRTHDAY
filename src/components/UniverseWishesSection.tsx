import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Globe, Heart, X, Compass, ChevronRight, Eye } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface StarWish {
  id: number;
  starNumber: string;
  wishTitle: string;
  tamilWish: string;
  englishWish: string;
  category: 'Joy' | 'Courage' | 'Love' | 'Dreams' | 'Protection';
  coords: { x: number; y: number }; // Percentage position on celestial canvas
}

const WISHES_29: StarWish[] = [
  {
    id: 1,
    starNumber: "★ 01",
    wishTitle: "Unlimited Happiness",
    tamilWish: "Life-la eppovume un mugathula sirippu mattum irukkanum da.",
    englishWish: "I wish you unlimited, unconditional happiness that never fades away.",
    category: "Joy",
    coords: { x: 18, y: 22 },
  },
  {
    id: 2,
    starNumber: "★ 02",
    wishTitle: "Confidence to Chase Every Dream",
    tamilWish: "Unakku thonura ella periya aasaiyum bayamillama chase panna mudiyanum.",
    englishWish: "I wish you fierce confidence to pursue and conquer every dream in your heart.",
    category: "Dreams",
    coords: { x: 32, y: 15 },
  },
  {
    id: 3,
    starNumber: "★ 03",
    wishTitle: "People Who Genuinely Value You",
    tamilWish: "Un innocence-ah purinjikittu, unna genuine-ah respect panra nalla manashanga kidaikkanum.",
    englishWish: "I wish you people in your life who genuinely appreciate your pure heart.",
    category: "Love",
    coords: { x: 50, y: 12 },
  },
  {
    id: 4,
    starNumber: "★ 04",
    wishTitle: "Strength During Difficult Days",
    tamilWish: "Sila naal tough-ah irundhaalum, un manasu udanjidaama ninnu jeikira theerpu venum.",
    englishWish: "I wish you unbreakable inner resilience on the days life feels heavy.",
    category: "Courage",
    coords: { x: 68, y: 16 },
  },
  {
    id: 5,
    starNumber: "★ 05",
    wishTitle: "Beautiful Memories",
    tamilWish: "Ovvovru varushamum thirumbi paarkumbodhu, 'Idhu nalla irundhuchu' nu sirikira memories amayanum.",
    englishWish: "I wish you a treasury of golden memories that make you smile in every season.",
    category: "Joy",
    coords: { x: 82, y: 24 },
  },
  {
    id: 6,
    starNumber: "★ 06",
    wishTitle: "Endless Reasons to Smile",
    tamilWish: "Chinna chinna unexpected moments kooda un mugathula periya smile create pannanum.",
    englishWish: "I wish you endless reasons to burst into uncontrollable cheerful smiles.",
    category: "Joy",
    coords: { x: 12, y: 38 },
  },
  {
    id: 7,
    starNumber: "★ 07",
    wishTitle: "A Future You Feel Proud Of",
    tamilWish: "Nee reach aagura place-ah paathu nee mattum illa, unna paathu ellarum proud-ah irukkanum.",
    englishWish: "I wish you a grand future that makes you beam with well-earned pride.",
    category: "Dreams",
    coords: { x: 26, y: 32 },
  },
  {
    id: 8,
    starNumber: "★ 08",
    wishTitle: "Never Forget How Special You Are",
    tamilWish: "World evlo perusa irundhaalum, un authentic uniqueness-ah eppovume tholachida koodaadhu.",
    englishWish: "I wish you never forget, even for a moment, how extraordinarily special you are.",
    category: "Love",
    coords: { x: 42, y: 28 },
  },
  {
    id: 9,
    starNumber: "★ 09",
    wishTitle: "Peace of Mind Above All",
    tamilWish: "Overthinking illaama, un heart-la calm-um nimmadhiyum eppovum niraya venum.",
    englishWish: "I wish you profound serenity and peace of mind on every single evening.",
    category: "Protection",
    coords: { x: 58, y: 28 },
  },
  {
    id: 10,
    starNumber: "★ 10",
    wishTitle: "Unconditional Love & Care",
    tamilWish: "Nee unna maathika thevai illaama, unna natural-ah love panra genuine souls un kooda irukkanum.",
    englishWish: "I wish you love that requires zero masks and accepts every part of you.",
    category: "Love",
    coords: { x: 74, y: 35 },
  },
  {
    id: 11,
    starNumber: "★ 11",
    wishTitle: "Unstoppable Laughter",
    tamilWish: "Vayiru valikkira alavukku silly jokes-ku sirikkira innocent moments daily kidaikkanum.",
    englishWish: "I wish you belly-deep laughter with tears of pure hilarity.",
    category: "Joy",
    coords: { x: 88, y: 42 },
  },
  {
    id: 12,
    starNumber: "★ 12",
    wishTitle: "Deep Courage for New Beginnings",
    tamilWish: "Pudhu paths explore panradhukku un heart eppovume fearless-ah munnera venum.",
    englishWish: "I wish you brave wings whenever you step into unchartered territories.",
    category: "Courage",
    coords: { x: 15, y: 55 },
  },
  {
    id: 13,
    starNumber: "★ 13",
    wishTitle: "Health & Boundless Radiance",
    tamilWish: "Physical-ah and mental-ah eppovume energy-oda, fresh-ah, vibrant-ah irukkanum.",
    englishWish: "I wish you blooming health, vibrant energy, and a glowing spirit.",
    category: "Protection",
    coords: { x: 30, y: 48 },
  },
  {
    id: 14,
    starNumber: "★ 14",
    wishTitle: "Safe Spaces to Speak Your Truth",
    tamilWish: "Un feelings-ah judge pannama kekkura safe environments unakku eppovum kidaikkanum.",
    englishWish: "I wish you sacred spaces where your voice is heard, honored, and comforted.",
    category: "Protection",
    coords: { x: 48, y: 45 },
  },
  {
    id: 15,
    starNumber: "★ 15",
    wishTitle: "Cosy Rainy Mornings & Warmth",
    tamilWish: "Hot tea, rain sound, zero worries irukkura peaceful days niraya kidaikkanum.",
    englishWish: "I wish you cosy slow mornings wrapped in soft blankets and zero stress.",
    category: "Joy",
    coords: { x: 65, y: 48 },
  },
  {
    id: 16,
    starNumber: "★ 16",
    wishTitle: "Genuine Friendships That Never Fade",
    tamilWish: "Time and distance thaandi un kooda loyal-ah nikira true companions kidaikkanum.",
    englishWish: "I wish you lifelong kindred spirits who hold your hand through thick and thin.",
    category: "Love",
    coords: { x: 80, y: 56 },
  },
  {
    id: 17,
    starNumber: "★ 17",
    wishTitle: "Protection from Negative Vibes",
    tamilWish: "Un innocence-ah spoil panra bad energy un kitta nerungave koodaadhu.",
    englishWish: "I wish you a celestial shield protecting your soft heart from all unkindness.",
    category: "Protection",
    coords: { x: 10, y: 72 },
  },
  {
    id: 18,
    starNumber: "★ 18",
    wishTitle: "Freedom to Express Wild Creativity",
    tamilWish: "Un artistic thoughts-ah thadukaama celebrate panra freedom irukkanum.",
    englishWish: "I wish you unlimited freedom to express every whimsical and artistic dream.",
    category: "Dreams",
    coords: { x: 25, y: 66 },
  },
  {
    id: 19,
    starNumber: "★ 19",
    wishTitle: "Pride in Every Step You Take",
    tamilWish: "Nee poraditta chinna vishayangalukku kooda self-appreciation feel pannanum.",
    englishWish: "I wish you the habit of pausing to applaud your own courage and perseverance.",
    category: "Courage",
    coords: { x: 40, y: 62 },
  },
  {
    id: 20,
    starNumber: "★ 20",
    wishTitle: "Unexpected Sweet Surprises",
    tamilWish: "Unexpected blessings and cute miracles un life path-la vandhute irukkanum.",
    englishWish: "I wish you delightful serendipities and sudden bursts of joyful good news.",
    category: "Joy",
    coords: { x: 58, y: 64 },
  },
  {
    id: 21,
    starNumber: "★ 21",
    wishTitle: "Patience & Grace with Yourself",
    tamilWish: "Mistakes nadandhaalum unna nee harsh-ah judge pannama gently learn pannanum.",
    englishWish: "I wish you infinite grace and gentleness with yourself as you navigate growth.",
    category: "Love",
    coords: { x: 72, y: 68 },
  },
  {
    id: 22,
    starNumber: "★ 22",
    wishTitle: "Wisdom & Sharp Clarity",
    tamilWish: "Confusing moments-la right choice pick panra clarity un kooda guide-ah irukkanum.",
    englishWish: "I wish you clear discernment and sharp wisdom whenever crossroads appear.",
    category: "Dreams",
    coords: { x: 88, y: 72 },
  },
  {
    id: 23,
    starNumber: "★ 23",
    wishTitle: "Healing Conversations",
    tamilWish: "Un manasula irukkura baratha korakra deep conversations kidaikkanum.",
    englishWish: "I wish you heart-to-heart talks that leave your spirit light as a feather.",
    category: "Protection",
    coords: { x: 20, y: 85 },
  },
  {
    id: 24,
    starNumber: "★ 24",
    wishTitle: "Independence & Self-Sufficiency",
    tamilWish: "Un own legs-la stand panni, un dreams-ah un effort-la reach panna mudiyanum.",
    englishWish: "I wish you fierce independence and the joy of creating your own destiny.",
    category: "Dreams",
    coords: { x: 36, y: 80 },
  },
  {
    id: 25,
    starNumber: "★ 25",
    wishTitle: "Joy in Tiny Everyday Wonders",
    tamilWish: "Chinna ice-cream, cold breeze, cute cat kooda unakku periya joy kudukkanum.",
    englishWish: "I wish you eyes that always spot wonder in the simplest daily blessings.",
    category: "Joy",
    coords: { x: 52, y: 78 },
  },
  {
    id: 26,
    starNumber: "★ 26",
    wishTitle: "Tears Only of Overwhelming Joy",
    tamilWish: "Un kannula irundhu kanneer vandhaalum, adhu excessive happiness-la vara kanneer-ah irukkanum.",
    englishWish: "I wish that any tears your eyes ever shed are born purely from overwhelming happiness.",
    category: "Love",
    coords: { x: 66, y: 82 },
  },
  {
    id: 27,
    starNumber: "★ 27",
    wishTitle: "Travel Across Beautiful Horizons",
    tamilWish: "Nee map-la paatha gorgeous places-ah live-ah explore panni enjoy pannanum.",
    englishWish: "I wish your passport fills with stamps and your soul with sunsets from around the world.",
    category: "Dreams",
    coords: { x: 80, y: 86 },
  },
  {
    id: 28,
    starNumber: "★ 28",
    wishTitle: "Unshakeable Self-Worth",
    tamilWish: "Un value-ah yaarum question panna mudiyaadha alavukku self-worth unakku irukkanum.",
    englishWish: "I wish you the knowledge that your worth is non-negotiable and divine.",
    category: "Courage",
    coords: { x: 45, y: 92 },
  },
  {
    id: 29,
    starNumber: "★ 29",
    wishTitle: "Eternal Brotherly Shield",
    tamilWish: "Enna aanaalum, world ethira ninnaalum, un annan un pinnadi shield-ah iruppaan!",
    englishWish: "I wish you never doubt: no matter where life leads, your brother is forever in your corner.",
    category: "Protection",
    coords: { x: 60, y: 93 },
  },
];

export default function UniverseWishesSection() {
  const [selectedWish, setSelectedWish] = useState<StarWish | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [unlockedStars, setUnlockedStars] = useState<number[]>([]);
  const [viewStyle, setViewStyle] = useState<'constellation' | 'cards'>('constellation');

  const handleSelectStar = (wish: StarWish) => {
    soundEngine.playChime(600 + (wish.id % 12) * 50, 0.4);
    if (!unlockedStars.includes(wish.id)) {
      setUnlockedStars((prev) => [...prev, wish.id]);
    }
    setSelectedWish(wish);
  };

  const filteredWishes =
    activeCategory === 'All'
      ? WISHES_29
      : WISHES_29.filter((w) => w.category === activeCategory);

  return (
    <section id="universe-wishes" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#1A1824] text-[#FAF7F2] overflow-hidden">
      {/* Dynamic Cosmic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#B87983]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,220,224,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F4DCE0] mb-4">
            <Globe className="w-3.5 h-3.5 text-[#F4DCE0] animate-spin-slow" />
            <span className="text-[11px] font-sans uppercase tracking-[0.28em] font-medium">
              If I Could Give You The World
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-4 tracking-tight">
            Unakku Kidaiganum Nu Naan <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#F4DCE0] bg-gradient-to-r from-[#F4DCE0] via-[#F8E0D1] to-[#DEC5B1] bg-clip-text text-transparent">
              Manasara Nenaikira 29 Vishayangal.
            </span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            29 floating celestial stars for 29 November. Click on each glowing star to unlock a brother's personal wish for you.
          </p>

          {/* Progress Tracker & View Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F4DCE0]">
              ✨ {unlockedStars.length} of 29 Stars Unveiled
            </div>

            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
              <button
                onClick={() => {
                  soundEngine.playChime(700, 0.2);
                  setViewStyle('constellation');
                }}
                className={`px-3 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                  viewStyle === 'constellation'
                    ? 'bg-[#B87983] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Constellation
              </button>
              <button
                onClick={() => {
                  soundEngine.playChime(700, 0.2);
                  setViewStyle('cards');
                }}
                className={`px-3 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                  viewStyle === 'cards'
                    ? 'bg-[#B87983] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Card Grid
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE 3D/2D CONSTELLATION MAP */}
        {viewStyle === 'constellation' && (
          <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl bg-black/40 border border-white/15 backdrop-blur-xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-12">
            {/* Ambient Star Dust Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Hint message overlay */}
            <div className="absolute top-4 left-6 text-xs text-white/50 font-serif italic pointer-events-none">
              Hover &amp; click any glowing star node
            </div>

            {/* Interactive Stars */}
            {WISHES_29.map((wish) => {
              const isUnlocked = unlockedStars.includes(wish.id);
              return (
                <button
                  key={wish.id}
                  onClick={() => handleSelectStar(wish)}
                  style={{
                    left: `${wish.coords.x}%`,
                    top: `${wish.coords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 group transition-all duration-300 focus:outline-none`}
                  title={`${wish.starNumber}: ${wish.wishTitle}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Aura */}
                    <div
                      className={`absolute w-8 h-8 rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-[#F4DCE0]/30 animate-ping'
                          : 'bg-white/10 group-hover:scale-150 group-hover:bg-[#B87983]/40'
                      }`}
                    />

                    {/* Star core icon */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-[#B87983] to-[#F4DCE0] border-white text-white scale-110'
                          : 'bg-white/15 border-white/30 text-white/80 group-hover:bg-white group-hover:text-[#1A1824] group-hover:scale-125'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isUnlocked ? 'fill-white' : ''}`} />
                    </div>

                    {/* Mini Tooltip Label */}
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] whitespace-nowrap text-[#F4DCE0] border border-white/20 pointer-events-none shadow-md">
                      {wish.starNumber} • {wish.wishTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* VIEW 2: CURATED 29 CARDS GRID */}
        {viewStyle === 'cards' && (
          <div className="space-y-6 mb-12">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['All', 'Joy', 'Dreams', 'Love', 'Courage', 'Protection'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEngine.playChime(750, 0.2);
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-[#B87983] text-white shadow-md'
                      : 'bg-white/10 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWishes.map((wish) => {
                const isUnlocked = unlockedStars.includes(wish.id);
                return (
                  <div
                    key={wish.id}
                    onClick={() => handleSelectStar(wish)}
                    className="cursor-pointer p-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#F4DCE0] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold text-[#F4DCE0]">
                          {wish.starNumber}
                        </span>
                        <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {wish.category}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-white font-medium mb-2 group-hover:text-[#F4DCE0] transition-colors">
                        {wish.wishTitle}
                      </h4>
                      <p className="font-serif italic text-sm text-[#F4DCE0]/90 leading-relaxed mb-3">
                        "{wish.tamilWish}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                      <span>Click to reveal wish</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F4DCE0]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL / DRAWER FOR SELECTED WISH */}
        <AnimatePresence>
          {selectedWish && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-gradient-to-br from-[#272338] to-[#1A1824] p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full text-center overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedWish(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Glowing Star Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B87983] to-[#F4DCE0] mx-auto flex items-center justify-center text-white shadow-xl mb-6">
                  <Star className="w-8 h-8 fill-white" />
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F4DCE0] block mb-2">
                  {selectedWish.starNumber} • Wish for Mitra
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-6">
                  {selectedWish.wishTitle}
                </h3>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6 text-left">
                  <p className="font-serif text-lg text-[#F4DCE0] leading-relaxed mb-3 italic">
                    "{selectedWish.tamilWish}"
                  </p>
                  <p className="font-serif italic text-sm text-white/70 leading-relaxed border-t border-white/10 pt-3">
                    "{selectedWish.englishWish}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-white/50 pt-2">
                  <span>Brotherly Promise • 29 Nov</span>
                  <span className="text-[#F4DCE0] flex items-center gap-1 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-[#B87983] text-[#B87983]" />
                    For Mitu Chello
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
