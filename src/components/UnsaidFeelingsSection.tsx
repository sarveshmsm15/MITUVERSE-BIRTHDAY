import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Copy, Check, Feather, BookOpen, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface UnsaidMessage {
  id: number;
  number: string;
  title: string;
  tagline: string;
  tamil: string;
  englishMeaning: string;
}

const UNSAID_MESSAGES: UnsaidMessage[] = [
  {
    id: 1,
    number: "01",
    title: "Ennaala Words-la Solla Mudiyadhu",
    tagline: "More than words could ever hold",
    tamil: "Mitu chello, un mela enakku evlo paasam irukku nu ennaala words-la solla mudiyadhu da. Sometimes unna paakumbodhu, ivlo special-ah oru person en life-la irukkaangale nu santhoshama irukkum.",
    englishMeaning: "Mitu darling, I can never put into words how much affection I have for you. Sometimes looking at you, my heart just fills with pure gratitude that such a special person is in my life.",
  },
  {
    id: 2,
    number: "02",
    title: "Heart-ku Nee En Sondha Thangachi",
    tagline: "Not bound by blood, bonded by heart",
    tamil: "Nee en blood sister illa nu theriyum... aana en heart-ku nee en sondha thangachi dhaan. Indha relationship-ah naan romba precious-ah paakuren.",
    englishMeaning: "I know we don't share the same blood... but to my soul and heart, you are truly my own little sister. I cherish this relationship as something deeply precious.",
  },
  {
    id: 3,
    number: "03",
    title: "Normal Incident, Extraordinary Blessing",
    tagline: "How an ordinary day became unforgettable",
    tamil: "Unna en life-la meet pannadhu oru normal incident-ah irundhirukkalam... aana nee enakku ivlo important aanaadhu romba special.",
    englishMeaning: "Meeting you might have started as just an everyday coincidence... but how important and irreplaceable you became to me is truly magical.",
  },
  {
    id: 4,
    number: "04",
    title: "Un Happiness Dhaan En Happiness",
    tagline: "Your joy echoes right into my heart",
    tamil: "Ammu, nee happy-ah irukkanum nu naan evlo aasai paduren theriyuma? Unakku nalla things nadakkumbodhu, adha paathu naanum genuinely happy aaguren.",
    englishMeaning: "Ammu, do you know how desperately I wish for your happiness? Whenever good things happen to you, watching your joy makes me genuinely happy from within.",
  },
  {
    id: 5,
    number: "05",
    title: "Paasam Kammi Nu Nenachidaadha",
    tagline: "Unspoken care runs deepest",
    tamil: "Sila neram naan un mela irukkura paasatha express panna theriyama irukkalam. Aana adhanaala paasam kammi nu nenachidaadha da.",
    englishMeaning: "Sometimes I might not know how to openly express my brotherly love. But never ever think that silence means less affection, my little one.",
  },
  {
    id: 6,
    number: "06",
    title: "Un Smile-um Innocence-um Lose Pannidaadha",
    tagline: "Your purest superpower",
    tamil: "Thango, unakku life-la evlo periya success vandhaalum, un smile-um un innocence-um lose pannidaadha. Adhu dhaan unna nee-ah vechirukku.",
    englishMeaning: "Thango, no matter how immense your success grows in life, never lose that radiant smile and innocent soul. That is what makes you authentically YOU.",
  },
  {
    id: 7,
    number: "07",
    title: "Nee Enakku Special-ah Irukkura Place Maaradhu",
    tagline: "Permanently etched in my corner",
    tamil: "Namma daily pesala naalum, daily meet pannala naalum, nee enakku special-ah irukkura place maaradhu.",
    englishMeaning: "Even if we don't speak every single day or meet often, the special place you hold in my life will never change for eternity.",
  },
  {
    id: 8,
    number: "08",
    title: "Un Feelings Mukkiyam Da",
    tagline: "You never have to carry weight alone",
    tamil: "Unakku oru naal kashtama irundha, ellathayum unakkulla vechikama yaaravadhu kitta pesu. Un feelings important da.",
    englishMeaning: "If ever a day feels heavy, don't bottle everything inside your little heart—talk to someone who cares. Your feelings truly matter to me.",
  },
  {
    id: 9,
    number: "09",
    title: "Unakku Nalladhu Nadakkanum Nu Wish Panren",
    tagline: "My most honest and eternal wish",
    tamil: "Naan unakku always perfect brother-ah irukka mudiyama pogalam. Aana unakku nalladhu nadakkanum nu wish panradhu mattum eppovume true-ah irukkum.",
    englishMeaning: "I may not always be a flawless brother. But my wish for every wonderful thing in life to happen to you will forever remain 100% genuine and true.",
  },
  {
    id: 10,
    number: "10",
    title: "Ella Dreams-um Achieve Pannanum",
    tagline: "Growing into someone you love being",
    tamil: "Mitu, un life-la nee nenacha ella dreams-um achieve pannanum. Unna nee proud-ah feel panra alavukku nee grow aaganum.",
    englishMeaning: "Mitu, I want you to conquer every single dream you dare to dream. Grow to a place where you look in the mirror and feel deeply proud of yourself.",
  },
  {
    id: 11,
    number: "11",
    title: "Silly Conversations Kooda Romba Valuable",
    tagline: "Treasuring even our nonsense talks",
    tamil: "Unna paathu sirikkira moments mattum illa, un kooda share panra silly conversations kooda enakku romba valuable.",
    englishMeaning: "It's not just the big happy moments; even the random, silly, pointless conversations we share are priceless treasures to me.",
  },
  {
    id: 12,
    number: "12",
    title: "Thangachi Nu Koopidradhu Oru Nickname Mattum Illa",
    tagline: "A sacred brotherly vow",
    tamil: "Unna thangachi nu koopidradhu oru nickname mattum illa da... adhu enakku romba special-ah feel aagura relationship.",
    englishMeaning: "Calling you my sister isn't just a casual nickname... it's a sacred bond that gives my heart warmth and genuine responsibility.",
  },
  {
    id: 13,
    number: "13",
    title: "Indha Chinna Website-la Unakkaga Oru World",
    tagline: "A tiny universe crafted with heart",
    tamil: "Unakku evlo periya world irundhaalum, indha chinna website-la unakkaga oru special world create pannirukken.",
    englishMeaning: "The world outside is big and bustling, but inside this small website, I've built a whole little sanctuary dedicated just to celebrating you.",
  },
  {
    id: 14,
    number: "14",
    title: "Never Think That You Are Ordinary",
    tagline: "You are wonderfully, astonishingly unique",
    tamil: "Ammu, unakku nee evlo special nu sometimes unakke theriyama irukkalam. But please, never think that you are ordinary.",
    englishMeaning: "Ammu, sometimes you might not realize just how breathtakingly special you are. But please, never ever let anyone convince you that you're ordinary.",
  },
  {
    id: 15,
    number: "15",
    title: "Un Happiness-ah Eppovume Mukkiyam-ah Paathuko",
    tagline: "My only birthday promise to you",
    tamil: "Oru vishayam mattum promise pannu... un happiness-ah eppovume important-ah paathuko. Unna nee love pannika kathuko.",
    englishMeaning: "Promise me just this one thing: always prioritize your own peace and happiness. Learn to love and value yourself unconditionally.",
  },
];

export default function UnsaidFeelingsSection() {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const handleNext = () => {
    soundEngine.playChime(700 + (currentIndex % 5) * 40, 0.3);
    setCurrentIndex((prev) => (prev + 1) % UNSAID_MESSAGES.length);
  };

  const handlePrev = () => {
    soundEngine.playChime(650 + (currentIndex % 5) * 40, 0.3);
    setCurrentIndex((prev) => (prev - 1 + UNSAID_MESSAGES.length) % UNSAID_MESSAGES.length);
  };

  const handleCopy = (msg: UnsaidMessage) => {
    navigator.clipboard.writeText(`"${msg.tamil}" — For Mitu Chello ❤️`);
    setCopiedId(msg.id);
    soundEngine.playChime(950, 0.4);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBookmark = (id: number) => {
    soundEngine.playChime(820, 0.3);
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentMsg = UNSAID_MESSAGES[currentIndex];

  return (
    <section id="unsaid-feelings" className="relative py-28 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F6ECE4]/50 to-[#FAF7F2] overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-b from-[#F4DCE0]/30 via-[#F8E0D1]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Editorial Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DEC5B1] shadow-sm mb-4">
            <Feather className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.26em] text-[#938681] font-semibold">
              Unspoken Brotherly Notes
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#413B3B] max-w-3xl mx-auto leading-tight mb-4">
            Unakku Solla Nenacha, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#B87983]">Aana Sollama Vitta Vishayangal...</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#938681] max-w-2xl mx-auto">
            15 sincere thoughts straight from a brother's heart that often stay unsaid during daily life.
          </p>

          {/* Toggle View: Carousel vs Grid */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => {
                soundEngine.playChime(750, 0.2);
                setViewMode('carousel');
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all ${
                viewMode === 'carousel'
                  ? 'bg-[#B87983] text-white shadow-md'
                  : 'bg-white/80 border border-[#DEC5B1] text-[#938681] hover:text-[#413B3B]'
              }`}
            >
              Letter by Letter
            </button>
            <button
              onClick={() => {
                soundEngine.playChime(750, 0.2);
                setViewMode('grid');
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#B87983] text-white shadow-md'
                  : 'bg-white/80 border border-[#DEC5B1] text-[#938681] hover:text-[#413B3B]'
              }`}
            >
              All 15 Letters
            </button>
          </div>
        </div>

        {/* CAROUSEL MODE: ELEGANT SINGLE LETTER EXPERIENCE */}
        {viewMode === 'carousel' && (
          <div className="relative max-w-3xl mx-auto">
            {/* Parchment Deck Layering Effect */}
            <div className="absolute inset-0 bg-[#F3E9DF] rounded-3xl transform rotate-1 scale-[0.99] opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-[#F4DCE0] rounded-3xl transform -rotate-1.5 scale-[0.98] opacity-60 pointer-events-none" />

            <div className="relative bg-white/95 backdrop-blur-md p-7 sm:p-12 md:p-16 rounded-3xl border border-[#DEC5B1] luxury-shadow min-h-[460px] flex flex-col justify-between">
              {/* Top Letter Header */}
              <div className="flex items-center justify-between border-b border-[#EBDCCE] pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-lg shadow-inner">
                    {currentMsg.number}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#413B3B] block font-semibold">
                      Letter {currentMsg.number} of 15
                    </span>
                    <span className="text-[11px] text-[#B87983] font-serif italic">
                      {currentMsg.tagline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(currentMsg.id)}
                    className="p-2 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-[#938681] hover:text-[#B87983] transition-colors"
                    title="Bookmark this letter"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarked.includes(currentMsg.id)
                          ? 'fill-[#B87983] text-[#B87983]'
                          : ''
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => handleCopy(currentMsg)}
                    className="p-2 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-[#938681] hover:text-[#B87983] transition-colors"
                    title="Copy letter"
                  >
                    {copiedId === currentMsg.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Letter Content Animated */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMsg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="py-4 my-auto"
                >
                  <span className="font-sans text-xs uppercase tracking-widest text-[#B87983] block mb-2 font-medium">
                    To My Mitu Chello,
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#413B3B] font-medium mb-6 leading-snug">
                    "{currentMsg.tamil}"
                  </h3>
                  <div className="pt-4 border-t border-[#EBDCCE]/60">
                    <p className="font-serif italic text-sm sm:text-base text-[#938681] leading-relaxed">
                      "{currentMsg.englishMeaning}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Controls & Navigation */}
              <div className="pt-6 border-t border-[#EBDCCE] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif italic text-[#938681]">
                    Written with brotherly care •
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#B87983] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#DEC5B1]">
                    Forever Ammu
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#413B3B] hover:border-[#B87983] hover:text-[#B87983] transition-all shadow-sm active:scale-95"
                    aria-label="Previous letter"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-[#938681] min-w-[50px] text-center">
                    {currentMsg.number} / 15
                  </span>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-[#B87983] text-white flex items-center justify-center hover:bg-[#a66872] transition-all shadow-md active:scale-95"
                    aria-label="Next letter"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRID MODE: ALL 15 LETTERS ACCESSIBLE AT ONCE */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {UNSAID_MESSAGES.map((msg) => {
              const isSaved = bookmarked.includes(msg.id);
              const isCopied = copiedId === msg.id;

              return (
                <div
                  key={msg.id}
                  className="flex flex-col justify-between p-7 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#DEC5B1] hover:border-[#B87983] hover:shadow-xl transition-all duration-300 relative group"
                >
                  {/* Top Seal & Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-sm shadow-inner">
                        {msg.number}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleBookmark(msg.id)}
                          className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#938681] hover:text-[#B87983] transition-colors"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#B87983] text-[#B87983]' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleCopy(msg)}
                          className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#938681] hover:text-[#B87983] transition-colors"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <h4 className="font-serif text-lg font-medium text-[#413B3B] mb-3 leading-snug">
                      "{msg.tamil}"
                    </h4>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EBDCCE]/60">
                    <p className="font-serif italic text-xs text-[#938681] leading-relaxed">
                      "{msg.englishMeaning}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
