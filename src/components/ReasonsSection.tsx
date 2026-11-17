import React from 'react';
import { 
  Smile, Flame, HeartHandshake, Sparkles, Laugh, MessageCircle, 
  Eye, Compass, Sun, Star, CheckCircle2 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ReasonItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentBg: string;
  accentColor: string;
}

const REASONS: ReasonItem[] = [
  {
    number: '01',
    title: 'Your Beautiful Smile',
    tagline: 'Instant sunshine on the gloomiest days',
    description: 'When you genuinely smile, the whole mood of our home shifts. There is an effortless warmth in your expression that lights up everyone around you.',
    icon: Smile,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '02',
    title: 'Your Little Attitude',
    tagline: 'Fierce, dramatic, and impossible not to adore',
    description: 'That signature eyebrow raise, that playful side-eye when you disagree, and your dramatic reactions make you authentically MITU. Never lose that spark!',
    icon: Flame,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '03',
    title: 'Your Deep Kindness',
    tagline: 'A gentle, caring heart beneath the teasing',
    description: 'Even when you pretend to be tough, you are always the first to worry if someone is sick or tired. You care deeply for the people you love.',
    icon: HeartHandshake,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '04',
    title: 'Your Unique Personality',
    tagline: 'One in eight billion, genuinely irreplaceable',
    description: 'You do not follow the crowd; you bring your own rhythm, your own style, and your own perspective to everything you touch.',
    icon: Sparkles,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '05',
    title: 'Your Contagious Laughter',
    tagline: 'The undisputed soundtrack of our house',
    description: 'When you start laughing uncontrollably at the silliest inside jokes, no one in the room can resist joining in. It is pure happiness in audio form.',
    icon: Laugh,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '06',
    title: 'Your Crazy Conversations',
    tagline: 'From serious philosophy to tea time gossip in 5 seconds',
    description: 'Only with you can a conversation jump from five-year life goals to dissecting a funny video without missing a beat.',
    icon: MessageCircle,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '07',
    title: 'Your Adorable Expressions',
    tagline: 'Your face speaks before your words do',
    description: 'You cannot hide a single thought because your eyes and expressions give everything away instantly. It is the cutest thing about you.',
    icon: Eye,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '08',
    title: 'Your Ambitious Dreams',
    tagline: 'Wings that will carry you to incredible heights',
    description: 'Your goals, your dedication, and the quiet passion with which you pursue what matters to you inspire me as your brother every single day.',
    icon: Compass,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '09',
    title: 'Your Comforting Presence',
    tagline: 'Just knowing you are around makes everything okay',
    description: 'Home feels like home because of you. Even when we are simply in the same room doing our own work in silence, your presence brings peace.',
    icon: Sun,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '10',
    title: 'Simply Being YOU',
    tagline: 'My sister, my blessing, my pride',
    description: 'You do not need to do or prove anything extraordinary. Just being Mitra—my Mitu Chello, Ammu, and Thango—makes you the greatest sister in the world.',
    icon: Star,
    accentBg: 'bg-gradient-to-br from-[#F4DCE0] to-[#F8E0D1]',
    accentColor: 'text-[#B87983]',
  },
];

export default function ReasonsSection() {
  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/40 to-[#FAF7F2] overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#F4DCE0]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-[#EEE9F6]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Star className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
              A Curated Tribute
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
            10 Reasons Why <span className="italic font-normal text-[#B87983]">You're Irreplaceable.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681]">
            Just a few of the million reasons why my sister is unmatched.
          </p>
        </div>

        {/* ALL 10 CARDS IN EQUAL SIZE: SIDE BY SIDE IN 3-PER-ROW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {REASONS.map((r, idx) => {
            const Icon = r.icon;
            const isTenth = idx === 9; // 10th card can be prominently styled or centered

            return (
              <div
                key={r.number}
                onMouseEnter={() => soundEngine.playChime(650 + idx * 25, 0.2)}
                className={`group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative overflow-hidden ${
                  isTenth
                    ? 'border-[#B87983]/60 bg-gradient-to-b from-white to-[#F4DCE0]/20 shadow-md lg:col-span-1 md:col-span-2 lg:col-start-2'
                    : 'border-[#EBDCCE] hover:border-[#B87983]/60 shadow-sm'
                }`}
              >
                {/* Large Subtle Background Watermark Number */}
                <div className="absolute top-2 right-4 font-serif text-7xl sm:text-8xl font-light text-[#EBDCCE]/25 select-none pointer-events-none group-hover:text-[#B87983]/15 transition-colors">
                  {r.number}
                </div>

                {/* Top: Number Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#938681] group-hover:text-[#B87983] transition-colors bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EBDCCE]">
                      REASON #{r.number}
                    </span>

                    <div className={`w-11 h-11 rounded-2xl ${r.accentBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${r.accentColor}`} />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#413B3B] font-normal mb-2 group-hover:text-[#B87983] transition-colors">
                    {r.title}
                  </h3>

                  <p className="font-serif italic text-sm sm:text-base text-[#938681] mb-4">
                    "{r.tagline}"
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#413B3B]/80 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-5 mt-6 border-t border-[#EBDCCE]/60 flex items-center justify-between text-[11px] font-sans text-[#938681]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B87983]" />
                    <span>Certified 100% True</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#BAAEAA]">
                    Mitu Universe
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
