import React, { useState } from 'react';
import { Sparkles, Heart, Smile, Coffee, BookOpen, Swords, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface Mood {
  id: string;
  name: string;
  emoji: string;
  icon: React.ElementType;
  quoteTamil: string;
  brotherResponse: string;
  color: string;
}

const MOODS: Mood[] = [
  {
    id: 'drama',
    name: 'Dramatic Queen',
    emoji: '👑',
    icon: Sparkles,
    quoteTamil: 'Naan solradha yaarum kekka maatingreenga!',
    brotherResponse: 'Dramatic-ah pesuradhula Oscars-eh kudukalaam unakku... aana un drama illana veedu bore adichidum da Ammu! 😄',
    color: 'from-[#F4DCE0] to-[#FAF7F2]',
  },
  {
    id: 'foodie',
    name: 'Hungry & Dangerous',
    emoji: '🍦',
    icon: Coffee,
    quoteTamil: 'Enakku ippo edhavadhu tasty-ah venum!',
    brotherResponse: 'Food order panna naan dhaan venuma? Seri sollamma, unakku enna ice cream venum nu vaangi tharen! 🍨',
    color: 'from-[#F8E0D1] to-[#FAF7F2]',
  },
  {
    id: 'boss',
    name: 'Boss Girl / Study Mode',
    emoji: '📚',
    icon: BookOpen,
    quoteTamil: 'Disturb pannadheenga, I am focusing!',
    brotherResponse: 'Un determination paatha romba perumaya irukku Thango. You are going to achieve great heights! 🚀',
    color: 'from-[#E8EEF5] to-[#FAF7F2]',
  },
  {
    id: 'fight',
    name: 'Ready To Fight Brother',
    emoji: '🥊',
    icon: Swords,
    quoteTamil: 'En TV remote-ah yen edutha?!',
    brotherResponse: 'Unkitta sandai podradhu dhaan en favourite full-time job! Come on, let the sibling war begin! ⚔️😂',
    color: 'from-[#EEE9F6] to-[#FAF7F2]',
  },
  {
    id: 'sweet',
    name: 'Sweetest Sister Ever',
    emoji: '✨',
    icon: Sun,
    quoteTamil: 'Anna, unakku edhavadhu venuma?',
    brotherResponse: 'Epavadhavadhu ipdi pesunaale enakku doubt varum... edho periya plan podra! Aana love you da Mitu! ❤️',
    color: 'from-[#F4DCE0] to-[#F8E0D1]',
  },
];

export default function MoodGenerator() {
  const [selectedMood, setSelectedMood] = useState<Mood>(MOODS[4]);

  const handleSelect = (m: Mood) => {
    setSelectedMood(m);
    soundEngine.playChime(750, 0.4);

    if (m.id === 'sweet') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F4DCE0', '#B87983', '#D4AF37'],
      });
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EBDCCE] shadow-sm mb-4">
          <Smile className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
            Daily Sibling Vibe Check
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#413B3B] mb-3">
          Ammu's Mood Generator <span className="italic font-normal text-[#B87983]">{selectedMood.emoji}</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#938681] max-w-lg mx-auto mb-10">
          Pick Mitra's mood right now to see her brother's official response.
        </p>

        {/* Mood Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {MOODS.map((m) => {
            const isCurrent = selectedMood.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-[#B87983] text-white border-[#B87983] shadow-md scale-105'
                    : 'bg-white text-[#413B3B] hover:text-[#B87983] border-[#EBDCCE] hover:border-[#B87983]'
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Mood Card */}
        <div className={`bg-gradient-to-br ${selectedMood.color} p-8 sm:p-12 rounded-3xl border border-[#EBDCCE] luxury-shadow max-w-2xl mx-auto text-left relative overflow-hidden transition-all duration-500`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest text-[#B87983] font-semibold">
              Current Vibe: {selectedMood.name}
            </span>
            <span className="text-3xl">{selectedMood.emoji}</span>
          </div>

          <div className="mb-6 p-4 rounded-2xl bg-white/70 border border-[#EBDCCE]">
            <span className="text-[10px] uppercase tracking-widest text-[#938681] block mb-1">
              Mitra Says:
            </span>
            <p className="font-serif italic text-xl text-[#413B3B]">
              "{selectedMood.quoteTamil}"
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-widest text-[#B87983] font-sans font-semibold block mb-1">
              Brother's Official Reaction:
            </span>
            <p className="font-serif text-base sm:text-lg text-[#413B3B] leading-relaxed">
              {selectedMood.brotherResponse}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#DEC5B1]/50 flex items-center justify-between text-xs text-[#938681]">
            <span className="font-serif italic">#MituVibeCheck</span>
            <Heart className="w-4 h-4 text-[#B87983] fill-[#F4DCE0]" />
          </div>
        </div>
      </div>
    </section>
  );
}

