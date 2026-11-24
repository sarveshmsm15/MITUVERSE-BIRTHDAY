import React, { useState } from 'react';
import { 
  Smile, Flame, HeartHandshake, Sparkles, Laugh, MessageCircle, 
  Eye, Compass, Sun, Star, Heart, Shield, Music, Film, Trophy,
  Coffee, Palette, Zap, Gift, Award, CloudSun, Gem, Sparkle
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ReasonItem {
  number: string;
  title: string;
  tagline: string;
  descriptionTamil: string;
  descriptionEnglish: string;
  category: 'Heart' | 'Personality' | 'Sibling' | 'Vibe';
  icon: React.ElementType;
  accentBg: string;
  accentColor: string;
}

const REASONS_29: ReasonItem[] = [
  {
    number: '01',
    title: 'Your Beautiful Smile',
    tagline: 'Instant sunshine on the gloomiest days',
    descriptionTamil: 'When you smile genuinely, the whole vibe changes. Un sirippu namma veetoda biggest positive energy da.',
    descriptionEnglish: 'There is effortless warmth in your smile that instantly turns any gray day into pure sunshine.',
    category: 'Heart',
    icon: Smile,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '02',
    title: 'Your Signature Attitude',
    tagline: 'Fierce, dramatic, and impossible not to adore',
    descriptionTamil: 'Unakku attitude konjam jaasthi dhaan... aana adhudhaan unna authentic MITU-va preserve pannudhu!',
    descriptionEnglish: 'That playful eyebrow raise and little sassy attitude make you uniquely and wonderfully yourself.',
    category: 'Personality',
    icon: Flame,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '03',
    title: 'Your Childish Moments',
    tagline: 'Pure innocent joy that never grows old',
    descriptionTamil: 'Chinna chinna things-ku kutty paapa maari jump panni react panra un childishness romba cute.',
    descriptionEnglish: 'Watching you get delightfully excited over the smallest surprises keeps pure wonder alive.',
    category: 'Heart',
    icon: Sparkles,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '04',
    title: 'Your Caring Nature',
    tagline: 'Gentle warmth beneath all the teasing',
    descriptionTamil: 'Velila periya rowdy maari pesinaalum, yaaravadhu tired-ah irundha first care panra heart unnodadhu.',
    descriptionEnglish: 'Even when you act tough, you are always the first to check in and care when someone is down.',
    category: 'Heart',
    icon: HeartHandshake,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '05',
    title: 'Your Deep Kindness',
    tagline: 'Quiet compassion that expects nothing back',
    descriptionTamil: 'Un kitta irukkura kindness oru natural gift. Edhayum expect pannama people-ku help panra quality adhu.',
    descriptionEnglish: 'You care quietly and sincerely without ever asking for praise or recognition.',
    category: 'Heart',
    icon: Heart,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '06',
    title: 'Your Unique Personality',
    tagline: 'One in eight billion, completely irreplaceable',
    descriptionTamil: 'Nee yaaraiyum copy panna maatye... you live by your own crazy rules and vibrant rhythm.',
    descriptionEnglish: 'You never conform to the crowd. You radiate your own distinct, colorful personality.',
    category: 'Personality',
    icon: Gem,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '07',
    title: 'Your Calming Presence',
    tagline: 'Just knowing you are around brings comfort',
    descriptionTamil: 'Namma onnume pesaama ore room-la irundhaalum, un presence enakku periya peace tharum.',
    descriptionEnglish: 'Silence is never awkward with you. Your mere presence brings quiet reassurance and grounding.',
    category: 'Vibe',
    icon: Sun,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '08',
    title: 'Your Ambitious Dreams',
    tagline: 'Fearless wings ready to conquer heights',
    descriptionTamil: 'Un goals and future path-ah nee plan panra passion paakumbodhu enakku romba proud-ah irukku.',
    descriptionEnglish: 'Your drive to grow, study, and create an independent future fills my brother heart with pride.',
    category: 'Personality',
    icon: Compass,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '09',
    title: 'Our Silly Conversations',
    tagline: 'From deep philosophy to tea gossip in 5 seconds',
    descriptionTamil: 'Namma pesura silly arguments and weird topics-ah vera yaaraalayum imagine kooda panna mudiyadhu!',
    descriptionEnglish: 'No one else shares our wavelength of random banter, late-night theories, and effortless laughs.',
    category: 'Sibling',
    icon: MessageCircle,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '10',
    title: 'Making Ordinary Moments Special',
    tagline: 'Turning mundane routines into golden memories',
    descriptionTamil: 'Just oru normal evening tea time kooda un kooda irundha oru fun festival maari aagidum.',
    descriptionEnglish: 'You turn boring car rides, mundane grocery runs, and casual dinners into unforgettable episodes.',
    category: 'Vibe',
    icon: Sparkle,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '11',
    title: 'The Fact That You Are in My Life',
    tagline: 'A blessing I will always thank the universe for',
    descriptionTamil: 'Nee en life-la vandhadhu dhaan naan keta oru unspoken blessing. You make everything brighter.',
    descriptionEnglish: 'You may not be my blood sister, but having you in my life is the greatest gift of fate.',
    category: 'Heart',
    icon: Star,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '12',
    title: 'Your Contagious Laughter',
    tagline: 'The undisputed soundtrack of pure joy',
    descriptionTamil: 'Nee sirippa control panna mudiyaama sirikkumbodhu, surrounding full-ah automatic-ah sirichidum!',
    descriptionEnglish: 'When you laugh uncontrollably until your tears roll, the entire room is forced to smile with you.',
    category: 'Personality',
    icon: Laugh,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '13',
    title: 'Your Expressive Eyes',
    tagline: 'Your face confesses before words can form',
    descriptionTamil: 'Poi solla unnaala mudiyave mudiyadhu! Un eyes and eyebrows ellathayum instant-ah reveal pannidum.',
    descriptionEnglish: 'You have zero poker face. Your honest expressions betray every emotion instantly and adorably.',
    category: 'Personality',
    icon: Eye,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '14',
    title: 'Your Stubborn Determination',
    tagline: 'Once you decide, the world steps aside',
    descriptionTamil: 'Oru vishayam pannanum nu mudivu pannitta, un stubbornness unstoppable rocket maari aagidum.',
    descriptionEnglish: 'When you set your mind on a goal, nobody can deter your relentless spirit.',
    category: 'Personality',
    icon: Zap,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '15',
    title: 'Your Endless Curiosity',
    tagline: 'Always questioning, always learning',
    descriptionTamil: 'Aayiram questions kettu thala vali vara vechaalum, un curious mind romba sharp da.',
    descriptionEnglish: 'You ask a hundred questions about everything, proving your restless, bright intellect.',
    category: 'Vibe',
    icon: CloudSun,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '16',
    title: 'Your Pure Honesty',
    tagline: 'No fake sweetness, only real words',
    descriptionTamil: 'Nee frank-ah un opinion solra dhairiyam romba rare. Un kitta fake drama-ve irukkaadhu.',
    descriptionEnglish: 'With you, what I see is what I get. There is refreshing, unfiltered truth in everything you say.',
    category: 'Heart',
    icon: Shield,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '17',
    title: 'Defending Loved Ones',
    tagline: 'Small sister with roaring lioness energy',
    descriptionTamil: 'Unakku pudichavangala yaaravadhu sonna, nee oru kutty lion maari defend panna vandhuduva!',
    descriptionEnglish: 'You are fiercely loyal. If anyone dares speak against your loved ones, you stand like a rock.',
    category: 'Heart',
    icon: Shield,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '18',
    title: 'Your Taste in Music & Vibe',
    tagline: 'Certified aux controller of our universe',
    descriptionTamil: 'Un playlist and un vibe choices unmatched... un music choices-la oru separate soul irukku.',
    descriptionEnglish: 'You curate moods effortlessly. Hand you the aux cord, and the atmosphere transforms.',
    category: 'Vibe',
    icon: Music,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '19',
    title: 'Daily Overacting Masterpieces',
    tagline: 'Academy-award-winning routine reactions',
    descriptionTamil: 'Chinna injury-ku kooda nee panra overacting paathale comedy blockbuster cinema maari irukkum!',
    descriptionEnglish: 'Even stubbing a pinky toe gets transformed into high-drama cinema with theatrical flair.',
    category: 'Sibling',
    icon: Film,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '20',
    title: 'Patience with My Sarcasm',
    tagline: 'Tolerating a brother takes heroic strength',
    descriptionTamil: 'Naan unna evlo kalaaichaalum, tolerate panni thirumba counter podura un talent hats off!',
    descriptionEnglish: 'I tease you endlessly, yet you endure it with witty banter and return fire like a champion.',
    category: 'Sibling',
    icon: Trophy,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '21',
    title: 'Your Unshakable Loyalty',
    tagline: 'A bond that never wavers through storms',
    descriptionTamil: 'Enna aanaalum namma mutual trust and sibling bond eppovume rock solid-ah irukku.',
    descriptionEnglish: 'Through every misunderstanding or argument, your loyalty remains an unbreakable anchor.',
    category: 'Heart',
    icon: HeartHandshake,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '22',
    title: 'Your Aesthetic & Creative Eye',
    tagline: 'Making everything around you pretty and warm',
    descriptionTamil: 'Un room, un style, un notebooks... ellathulayum oru aesthetic beauty and order irukkum.',
    descriptionEnglish: 'You bring artistic grace and coziness to whatever space you occupy.',
    category: 'Vibe',
    icon: Palette,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '23',
    title: 'Your Sudden Tender Moments',
    tagline: 'A soft, sensitive heart hidden behind cool shades',
    descriptionTamil: 'Thideernu un emotional side velila varumbodhu, un innocence paathu heart melt aagidum.',
    descriptionEnglish: 'Behind your cool, independent facade lies a delightfully tender and sensitive heart.',
    category: 'Heart',
    icon: Heart,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '24',
    title: 'Your Fearless Comebacks',
    tagline: 'Sharp tongue with zero lag time',
    descriptionTamil: 'Enakku counter reply kudukka nee yosikka kooda maata... instant punch dialogue ready-ah vechiruppa!',
    descriptionEnglish: 'Your quick wit ensures I am never allowed to get the last word without a brilliant counter.',
    category: 'Sibling',
    icon: Zap,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '25',
    title: 'The Way You Celebrate Others',
    tagline: 'Genuinely cheering when loved ones win',
    descriptionTamil: 'Vera yaaravadhu succeed aanaalum, un own win maari clap panni celebrate panra broad heart.',
    descriptionEnglish: 'You never hold envy. You clap the loudest when your friends or family achieve their dreams.',
    category: 'Heart',
    icon: Award,
    accentBg: 'bg-[#F4DCE0]',
    accentColor: 'text-[#B87983]',
  },
  {
    number: '26',
    title: 'Your Instant Mood-Healing Power',
    tagline: 'Curing any bad mood in five minutes flat',
    descriptionTamil: 'Mood off-ah irundhaalum, un chinna smile and funny dance ellathayum instantly heal pannidum.',
    descriptionEnglish: 'No storm in the house can survive your goofy jokes and lighthearted cheer.',
    category: 'Vibe',
    icon: Coffee,
    accentBg: 'bg-[#F8E0D1]',
    accentColor: 'text-[#D9825B]',
  },
  {
    number: '27',
    title: 'Your Self-Respect & Boundaries',
    tagline: 'Knowing your worth and standing tall',
    descriptionTamil: 'Un self-respect-ah nee compromise pannika maata... andha quality enakku un mela periya respect tharum.',
    descriptionEnglish: 'You carry yourself with quiet dignity, demanding respect while offering it generously.',
    category: 'Personality',
    icon: Shield,
    accentBg: 'bg-[#EEE9F6]',
    accentColor: 'text-[#8E7BB0]',
  },
  {
    number: '28',
    title: 'Our Quick Post-Fight Pacts',
    tagline: 'Fighting at noon, best friends by tea time',
    descriptionTamil: 'Periya world war nadandhaalum, adutha five minutes-la snacks share panra cute sibling dynamic.',
    descriptionEnglish: 'No fight lasts past tea time. We argue over nothing and laugh about it five minutes later.',
    category: 'Sibling',
    icon: Gift,
    accentBg: 'bg-[#E8EEF5]',
    accentColor: 'text-[#6A8EB8]',
  },
  {
    number: '29',
    title: 'Simply Being MITRA: My Sister Forever',
    tagline: 'Not by blood, but by heart. Forever irreplaceable.',
    descriptionTamil: 'Nee vera edhuvume prove panna thevai illa da Ammu. Just being yourself makes you my greatest blessing.',
    descriptionEnglish: 'You do not need to be perfect or extraordinary. Just being my sister makes you forever unmatched.',
    category: 'Heart',
    icon: Star,
    accentBg: 'bg-gradient-to-br from-[#F4DCE0] to-[#F8E0D1]',
    accentColor: 'text-[#B87983]',
  },
];

export default function ReasonsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReasons = REASONS_29.filter((r) => {
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descriptionTamil.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descriptionEnglish.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="reasons" className="relative py-28 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/40 to-[#FAF7F2] overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#F4DCE0]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-[#EEE9F6]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
            <Star className="w-3.5 h-3.5 text-[#B87983]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681] font-medium">
              Curated Tribute for 29 November
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
            29 Reasons Why <span className="italic font-normal text-[#B87983]">You're So Special To Me.</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-2xl mx-auto">
            From your smile and stubborn attitude to our silly fights and unconditional brother-sister bond.
          </p>

          {/* Category Filter Pills & Search */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['All', 'Heart', 'Personality', 'Sibling', 'Vibe'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playChime(700, 0.2);
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#B87983] text-white shadow-md'
                    : 'bg-white/80 border border-[#EBDCCE] text-[#938681] hover:text-[#413B3B]'
                }`}
              >
                {cat === 'All' ? 'All 29 Reasons' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 29 CARDS IN RESPONSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredReasons.map((r, idx) => {
            const Icon = r.icon;
            const isLast = r.number === '29';

            return (
              <div
                key={r.number}
                onMouseEnter={() => soundEngine.playChime(650 + (idx % 12) * 25, 0.2)}
                className={`group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative overflow-hidden ${
                  isLast
                    ? 'border-[#B87983] bg-gradient-to-b from-white to-[#F4DCE0]/30 shadow-md ring-2 ring-[#B87983]/20 md:col-span-2 lg:col-span-3'
                    : 'border-[#EBDCCE] hover:border-[#B87983]/60 shadow-sm'
                }`}
              >
                {/* Decorative background watermark number */}
                <div className="absolute right-4 bottom-2 text-7xl sm:text-8xl font-serif font-bold text-[#EBDCCE]/20 group-hover:text-[#F4DCE0]/35 transition-colors select-none pointer-events-none">
                  {r.number}
                </div>

                <div>
                  {/* Top Bar: Icon + Category Tag + Number */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${r.accentBg} flex items-center justify-center ${r.accentColor} shadow-inner group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] text-[#938681]">
                        {r.category}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#DEC5B1] group-hover:text-[#B87983] transition-colors">
                      #{r.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="relative z-10 mb-4">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#413B3B] font-medium mb-1">
                      {r.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#B87983] font-sans font-medium">
                      {r.tagline}
                    </p>
                  </div>

                  {/* Tamil Description */}
                  <p className="font-serif text-base sm:text-lg text-[#413B3B]/90 leading-relaxed relative z-10 mb-3 italic">
                    "{r.descriptionTamil}"
                  </p>
                </div>

                {/* English Meaning / Subtitle */}
                <div className="pt-3 border-t border-[#EBDCCE]/50 relative z-10 mt-2">
                  <p className="font-serif italic text-xs text-[#938681]">
                    {r.descriptionEnglish}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
