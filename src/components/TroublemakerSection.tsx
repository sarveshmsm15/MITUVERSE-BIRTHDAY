import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Award, Trophy, Smile, Laugh, Zap, AlertTriangle, 
  ShieldAlert, Sparkles, Heart, Crown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface FunnyItem {
  id: number;
  tamil: string;
  englishRoast: string;
  badge: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
}

const TROUBLE_MESSAGES: FunnyItem[] = [
  {
    id: 1,
    tamil: "Unakku attitude konjam jaasthi... aana enakku nee romba pudikkum!",
    englishRoast: "Your attitude is off the charts... but I secretly adore you anyway!",
    badge: "Attitude Queen",
    icon: Crown,
    accentBg: "bg-[#F8E0D1]",
    accentText: "text-[#D9825B]",
  },
  {
    id: 2,
    tamil: "Nee kovama irundha weather forecast kooda bayandhudum!",
    englishRoast: "When you get furious, even the weather forecast seeks emergency shelter!",
    badge: "Category 5 Storm",
    icon: Flame,
    accentBg: "bg-[#F4DCE0]",
    accentText: "text-[#B87983]",
  },
  {
    id: 3,
    tamil: "Unna tease pannaama irundha enakku daily routine incomplete!",
    englishRoast: "Without roasting you at least three times a day, my life feels hollow!",
    badge: "Daily Routine",
    icon: Zap,
    accentBg: "bg-[#E8EEF5]",
    accentText: "text-[#6A8EB8]",
  },
  {
    id: 4,
    tamil: "Ammu, nee oru masterpiece... konjam overacting version!",
    englishRoast: "Ammu, you are truly a masterpiece... just the dramatic, overacting director's cut!",
    badge: "Masterpiece",
    icon: Sparkles,
    accentBg: "bg-[#EEE9F6]",
    accentText: "text-[#8E7BB0]",
  },
  {
    id: 5,
    tamil: "Unakku sanda poda naan irukken, aana unna support panna adha vida adhigama irukken!",
    englishRoast: "I am always first to fight with you, but I'll fight ten times harder for you against the world!",
    badge: "Brotherly Shield",
    icon: Heart,
    accentBg: "bg-[#F4DCE0]",
    accentText: "text-[#B87983]",
  },
  {
    id: 6,
    tamil: "Unakku evlo attitude irundhaalum, enakku nee always kutty Mitu dhaan!",
    englishRoast: "No matter how bossy you act, to me you are forever my baby Mitu!",
    badge: "Kutty Mitu Forever",
    icon: Smile,
    accentBg: "bg-[#F8E0D1]",
    accentText: "text-[#D9825B]",
  },
  {
    id: 7,
    tamil: "Namma rendu perum sanda podama irundha adhu dhaan biggest miracle!",
    englishRoast: "If we go 24 hours without an argument, scientists should investigate the anomaly!",
    badge: "8th Wonder",
    icon: AlertTriangle,
    accentBg: "bg-[#E8EEF5]",
    accentText: "text-[#6A8EB8]",
  },
  {
    id: 8,
    tamil: "Thango, unakku oru award kudukkanum: Best Person in Creating Nonsense!",
    englishRoast: "Thango, you hereby win the Lifetime Oscar for inventing pure, unfiltered nonsense!",
    badge: "Golden Nonsense",
    icon: Trophy,
    accentBg: "bg-[#EEE9F6]",
    accentText: "text-[#8E7BB0]",
  },
  {
    id: 9,
    tamil: "Unna kalaaikkaradhu entertainment... un smile paakuradhu happiness!",
    englishRoast: "Pulling your leg is premium entertainment... seeing you smile is pure happiness!",
    badge: "Entertainment Unlimited",
    icon: Laugh,
    accentBg: "bg-[#F4DCE0]",
    accentText: "text-[#B87983]",
  },
  {
    id: 10,
    tamil: "Birthday gift expensive-ah irukkanum nu illa... indha website-ku naan evlo effort potten nu purinjiko!",
    englishRoast: "Birthday gifts don't need to be expensive... just appreciate the sweat and love poured into this site!",
    badge: "Effort > Millions",
    icon: Award,
    accentBg: "bg-[#F8E0D1]",
    accentText: "text-[#D9825B]",
  },
];

const FUNNY_AWARDS = [
  {
    title: "Chief Officer of Drama & Overacting",
    presentedFor: "Turning a stubbed toe into a 3-hour dramatic theater production.",
    stat: "Level: 99/100",
  },
  {
    title: "Best Person in Creating Nonsense",
    presentedFor: "Undisputed mastery in inventing random arguments out of thin air.",
    stat: "Win Rate: 100%",
  },
  {
    title: "Weather-Frightening Anger Trophy",
    presentedFor: "When her glare triggers localized weather advisories.",
    stat: "Danger Zone: High",
  },
  {
    title: "Professional Sibling Roaster Medal",
    presentedFor: "Coming up with instant punch comebacks before brother finishes talking.",
    stat: "Speed: 0.1s",
  },
];

export default function TroublemakerSection() {
  const [troubleLevel, setTroubleLevel] = useState(85);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleBoostTrouble = () => {
    soundEngine.playCelebration();
    setTroubleLevel((prev) => (prev >= 100 ? 100 : prev + 5));
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D9825B', '#B87983', '#F4DCE0', '#8E7BB0'],
    });
  };

  return (
    <section id="troublemaker" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#F8E0D1]/40 via-[#F4DCE0]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DEC5B1] shadow-sm mb-4">
            <Flame className="w-3.5 h-3.5 text-[#D9825B]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.26em] text-[#938681] font-semibold">
              Sibling Roasting &amp; Banter
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#413B3B] mb-3">
            MITU CHELLO: <span className="italic font-normal text-[#D9825B]">Official Troublemaker.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-xl mx-auto">
            10 honest brother-sister confessions, signature roasts, and the official sibling hall of fame awards.
          </p>

          {/* Sibling Trouble-O-Meter */}
          <div className="mt-8 max-w-md mx-auto p-5 rounded-2xl bg-white/90 border border-[#DEC5B1] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-widest text-[#938681] font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#D9825B]" />
                Ammu's Danger &amp; Nonsense Meter
              </span>
              <span className="font-mono text-sm font-bold text-[#D9825B]">
                {troubleLevel}% (Critical)
              </span>
            </div>

            <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden border border-[#DEC5B1]/60 mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#F8E0D1] via-[#D9825B] to-[#B87983]"
                style={{ width: `${troubleLevel}%` }}
                animate={{ width: `${troubleLevel}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-serif italic text-[#938681]">
                Diagnosis: Overacting Masterpiece
              </span>
              <button
                onClick={handleBoostTrouble}
                className="px-3 py-1 rounded-full bg-[#D9825B] text-white text-[11px] font-sans uppercase tracking-wider hover:bg-[#c2704a] transition-all active:scale-95 shadow-sm"
              >
                Max Trouble 🔥
              </button>
            </div>
          </div>
        </div>

        {/* 10 FUNNY BROTHER-SISTER QUOTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {TROUBLE_MESSAGES.map((msg, idx) => {
            const Icon = msg.icon;
            const isSelected = activeCard === msg.id;

            return (
              <motion.div
                key={msg.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  soundEngine.playChime(750 + idx * 30, 0.3);
                  setActiveCard(isSelected ? null : msg.id);
                }}
                className={`cursor-pointer p-7 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden bg-white/90 backdrop-blur-sm ${
                  isSelected
                    ? 'border-[#D9825B] shadow-lg ring-1 ring-[#D9825B]/30'
                    : 'border-[#DEC5B1] hover:border-[#D9825B]/60 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${msg.accentBg} flex items-center justify-center ${msg.accentText}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-[#938681]">
                      {msg.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#DEC5B1]">#{String(msg.id).padStart(2, '0')}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#413B3B] font-medium leading-snug mb-3">
                  "{msg.tamil}"
                </h3>

                <p className="font-serif italic text-sm text-[#938681] border-t border-[#DEC5B1]/50 pt-3">
                  "{msg.englishRoast}"
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* INTERACTIVE FUNNY SIBLING AWARDS */}
        <div className="pt-12 border-t border-[#DEC5B1]/70">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#413B3B] font-light">
              Official Sibling <span className="italic font-normal text-[#B87983]">Hall of Fame Awards</span>
            </h3>
            <p className="font-serif italic text-sm text-[#938681]">
              Solemnly decreed and conferred upon Mitra by her elder brother.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FUNNY_AWARDS.map((award, i) => (
              <div
                key={award.title}
                onMouseEnter={() => soundEngine.playChime(800 + i * 50, 0.2)}
                className="p-6 rounded-2xl bg-white border border-[#DEC5B1] shadow-sm hover:shadow-md hover:border-[#B87983] transition-all flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] mx-auto mb-3 flex items-center justify-center text-[#B87983] group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6 text-[#D9825B]" />
                  </div>
                  <h4 className="font-serif text-lg text-[#413B3B] font-medium mb-2 leading-snug">
                    {award.title}
                  </h4>
                  <p className="font-serif italic text-xs text-[#938681] leading-relaxed mb-4">
                    "{award.presentedFor}"
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DEC5B1]/40">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B87983] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#DEC5B1]">
                    {award.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
