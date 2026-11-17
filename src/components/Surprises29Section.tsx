import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Check, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface SurpriseItem {
  id: number;
  number: string;
  category: string;
  message: string;
  colorScheme: string;
}

const SURPRISES_29: SurpriseItem[] = [
  {
    id: 1,
    number: "01",
    category: "Daily Tease",
    message: "Mitu chello, unna kalaaikkaama enakku oru naal kooda complete aagadhu!",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 2,
    number: "02",
    category: "Signature Vibe",
    message: "Unakku attitude konjam jaasthi dhaan… aana andha kutty heart romba precious!",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 3,
    number: "03",
    category: "Bicker & Love",
    message: "Namma sandai-ku end eh illa… aana unna pesaama irukka ennaala mudiyadhu!",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 4,
    number: "04",
    category: "Limited Edition",
    message: "Nee limited edition… konjam crazy edition!",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 5,
    number: "05",
    category: "Brother's Duty",
    message: "Unna tease panradhu en duty… unna support panradhu en responsibility!",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 6,
    number: "06",
    category: "Genuine Heart",
    message: "Mitu, namakku blood relation illa… aana unna en thangachi-nu koopidumbodhu adhu enakku romba genuine-ah feel aagudhu.",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 7,
    number: "07",
    category: "Heart's Family",
    message: "Sila per family-la porakka maataanga… aana heart-la permanent-ah idam pudichiduvaanga. Nee appadi oruthi.",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 8,
    number: "08",
    category: "Always Here",
    message: "Un life-la nee evlo dhooram ponaalum, unakku support panna oru annan irukkaan-nu marandhudaadha.",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 9,
    number: "09",
    category: "Biggest Gift",
    message: "Un happiness-ku naan reason-ah irundha, adhu enakku biggest gift.",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 10,
    number: "10",
    category: "Real Bond",
    message: "Family nu solla blood test thevai illa da!",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 11,
    number: "11",
    category: "Special Dedication",
    message: "Thango, unakku birthday gift kudukka budget pathala… adhaan website full-ah unakku dedicate panniten!",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 12,
    number: "12",
    category: "Daily Torture",
    message: "November 29 un birthday… aana unna torture panra opportunity enakku daily kidaikkudhu!",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 13,
    number: "13",
    category: "Natural Beauty",
    message: "Un smile-ku filter thevai illa… adhuve original beauty!",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 14,
    number: "14",
    category: "Birthday Deal",
    message: "Nee enna evlo kalaaichalum parava illa… aana en birthday-ku gift mattum marandhudaadha!",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 15,
    number: "15",
    category: "Unlimited Joy",
    message: "Unakku life-la happiness unlimited-ah kidaikkanum!",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 16,
    number: "16",
    category: "Unbreakable Bond",
    message: "Years maaralaam, places maaralaam, life busy aagalaam… aana namma sibling bond maarakoodaadhu.",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 17,
    number: "17",
    category: "Keep Smiling",
    message: "Nee eppovume ippadiye sirichite iru Ammu!",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 18,
    number: "18",
    category: "Big Dreams",
    message: "Un dreams ellame reality aaganum.",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 19,
    number: "19",
    category: "Believe in Yourself",
    message: "Nee un mela nambikkai vechiko… unakku kandippa nalla future irukku.",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 20,
    number: "20",
    category: "No Expiry",
    message: "Namma bond-ku expiry date kedaiyaadhu!",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 21,
    number: "21",
    category: "Pakkathula Naan",
    message: "Unakku kashtam na, un pakkathula support-ah irukka try panren.",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 22,
    number: "22",
    category: "Just Be Happy",
    message: "Nee happy-ah irundha podhum da!",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 23,
    number: "23",
    category: "Best Things",
    message: "Unakku nee nenachadha vida nalla things life-la kidaikkanum.",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 24,
    number: "24",
    category: "Crazy Self",
    message: "Kutty Mitu, never stop being your crazy self!",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 25,
    number: "25",
    category: "No Cancellation",
    message: "Unakku permanent-ah oru sibling membership irukku. Cancellation option illa!",
    colorScheme: "from-[#F4DCE0] to-[#FAF7F2]",
  },
  {
    id: 26,
    number: "26",
    category: "Daily Special",
    message: "Un birthday special dhaan… aana nee enakku daily special!",
    colorScheme: "from-[#F8E0D1] to-[#FAF7F2]",
  },
  {
    id: 27,
    number: "27",
    category: "Protect Your Smile",
    message: "Un smile and happiness eppovum protect panniko.",
    colorScheme: "from-[#E8EEF5] to-[#FAF7F2]",
  },
  {
    id: 28,
    number: "28",
    category: "Birthday Wish",
    message: "Happy Birthday, my little sister!",
    colorScheme: "from-[#EEE9F6] to-[#FAF7F2]",
  },
  {
    id: 29,
    number: "29",
    category: "Heart Forever",
    message: "Namma relationship blood-la start aagala… aana heart-la permanent-ah irukku.",
    colorScheme: "from-[#F4DCE0] to-[#F8E0D1]",
  },
];

export default function Surprises29Section() {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [activeSurprise, setActiveSurprise] = useState<SurpriseItem | null>(null);

  const handleOpenGift = (item: SurpriseItem) => {
    soundEngine.playCelebration();
    if (!openedIds.includes(item.id)) {
      setOpenedIds((prev) => [...prev, item.id]);
    }
    setActiveSurprise(item);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F4DCE0', '#F8E0D1', '#B87983', '#D4AF37'],
    });
  };

  const handleReset = () => {
    soundEngine.playChime(600, 0.4);
    setOpenedIds([]);
    setActiveSurprise(null);
  };

  return (
    <section id="surprises-29" className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/30 to-[#FAF7F2] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#F4DCE0]/30 via-[#F8E0D1]/20 to-[#EEE9F6]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
          <Gift className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
            29 November Special Tribute
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#413B3B] mb-3">
          29 Little <span className="italic font-normal text-[#B87983]">Surprises.</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-xl mx-auto mb-6">
          Twenty-nine interactive gift boxes crafted with jokes, promises, appreciation, and unconditional brotherly love.
        </p>

        {/* Progress Tracker & Controls */}
        <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#EBDCCE] text-xs text-[#938681] mb-12 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="font-mono font-medium text-[#413B3B]">{openedIds.length}</span>
            <span>of 29 Gifts Unwrapped</span>
          </div>

          {openedIds.length > 0 && (
            <>
              <span className="text-[#DEC5B1]">|</span>
              <button
                onClick={handleReset}
                className="hover:text-[#B87983] flex items-center gap-1 transition-colors"
                title="Wrap all gifts again"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>

        {/* 29 INTERACTIVE GIFT BOXES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {SURPRISES_29.map((item) => {
            const isOpened = openedIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenGift(item)}
                className={`group cursor-pointer p-4 rounded-3xl border transition-all duration-300 relative flex flex-col items-center justify-between text-center ${
                  isOpened
                    ? 'bg-white/95 border-[#B87983] shadow-md'
                    : 'bg-white/70 hover:bg-white border-[#EBDCCE] shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Number Badge */}
                <div className="flex items-center justify-between w-full mb-3 text-[10px] font-mono font-semibold">
                  <span className={`px-2 py-0.5 rounded-full border ${isOpened ? 'bg-[#F4DCE0] text-[#B87983] border-[#B87983]/30' : 'bg-[#FAF7F2] text-[#938681] border-[#EBDCCE]'}`}>
                    #{item.number}
                  </span>
                  {isOpened && <Check className="w-3 h-3 text-[#B87983]" />}
                </div>

                {/* 3D-Styled Gift Box Icon */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-2">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${item.colorScheme} border border-[#DEC5B1]/60 shadow-sm transition-transform duration-300 ${
                    isOpened ? 'rotate-6 scale-95 opacity-80' : 'group-hover:scale-105'
                  }`}>
                    {/* Ribbon */}
                    <div className="absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 bg-[#B87983]/50" />
                    <div className="absolute inset-y-0 w-2 left-1/2 -translate-x-1/2 bg-[#B87983]/50" />
                  </div>

                  <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {isOpened ? '✨' : '🎁'}
                  </span>
                </div>

                {/* Category & Status */}
                <div className="mt-2 w-full">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#938681] block truncate font-medium">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-serif italic text-[#B87983] mt-0.5 block">
                    {isOpened ? 'Unwrapped' : 'Click to Open'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* POPUP MODAL REVEALING THE SURPRISE MESSAGE */}
      <AnimatePresence>
        {activeSurprise && (
          <div
            className="fixed inset-0 z-50 bg-[#413B3B]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActiveSurprise(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-br ${activeSurprise.colorScheme} max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border border-[#EBDCCE] luxury-shadow relative text-center`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveSurprise(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 border border-[#EBDCCE] text-[#413B3B] hover:text-[#B87983] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gift Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#EBDCCE] text-xs font-mono text-[#B87983] font-semibold mb-4">
                <Gift className="w-3.5 h-3.5" />
                <span>SURPRISE #{activeSurprise.number} • {activeSurprise.category}</span>
              </div>

              {/* Message Typography */}
              <div className="p-6 rounded-2xl bg-white/80 border border-[#EBDCCE] shadow-inner mb-6">
                <p className="font-serif text-xl sm:text-2xl text-[#413B3B] leading-relaxed">
                  "{activeSurprise.message}"
                </p>
              </div>

              {/* Sign-off */}
              <div className="flex items-center justify-between text-xs text-[#938681] pt-2">
                <span className="font-serif italic text-sm text-[#B87983]">
                  Made for Mitu Chello ❤️
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

