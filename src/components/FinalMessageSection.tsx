import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Send, Star, ArrowUp } from 'lucide-react';
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
];

export default function FinalMessageSection() {
  const [wishes, setWishes] = useState<Wish[]>(DEFAULT_WISHES);
  const [newSender, setNewSender] = useState('');
  const [newText, setNewText] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

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
    <section className="relative pt-24 pb-16 px-6 md:px-12 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative large backdrop watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-light text-[#EBDCCE]/25 select-none pointer-events-none whitespace-nowrap">
        FOREVER STAR
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Top Monogram / Star Icon */}
        <div className="w-16 h-16 rounded-full bg-white border border-[#EBDCCE] mx-auto flex items-center justify-center text-[#B87983] shadow-md mb-8">
          <Star className="w-7 h-7 fill-[#F4DCE0]" />
        </div>

        {/* Cinematic Headlines */}
        <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#938681] font-medium block mb-3">
          TO MY FOREVER LITTLE STAR
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#413B3B] mb-4 tracking-tight">
          Happy Birthday, <span className="font-normal italic text-[#B87983]">MITRA.</span>
        </h2>

        <p className="font-serif text-base sm:text-lg md:text-xl text-[#938681] tracking-widest uppercase mb-12">
          29 NOVEMBER — YOUR DAY, YOUR WORLD, YOUR MAGIC.
        </p>

        {/* Final Brother Message Box */}
        <div className="bg-white/85 backdrop-blur-md p-8 sm:p-14 rounded-3xl border border-[#EBDCCE] luxury-shadow max-w-2xl mx-auto mb-16 text-left relative">
          <div className="space-y-4 font-serif text-lg sm:text-xl text-[#413B3B] leading-relaxed">
            <p className="italic">
              "Enna dhaan daily sandai potaalum, unna vida special-ah en life-la yaarum illa da Ammu."
            </p>
            <p>
              Keep smiling, keep dreaming, keep being the amazing person you are.
            </p>
            <p className="font-medium text-[#B87983]">
              Love you always, Mitu Chello!
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EBDCCE]/70 flex items-center justify-between">
            <div>
              <p className="text-xs font-sans uppercase tracking-widest text-[#938681]">
                With endless love,
              </p>
              <p className="font-serif italic text-2xl text-[#413B3B]">
                Your Brother ❤️
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#DEC5B1] flex items-center justify-center text-[#B87983] font-serif font-bold text-xl shadow-inner">
              M
            </div>
          </div>
        </div>

        {/* Interactive Sister's Wish Jar */}
        <div className="max-w-xl mx-auto bg-white/60 p-6 sm:p-8 rounded-3xl border border-[#EBDCCE] shadow-sm mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B87983]" />
              <h3 className="font-serif text-xl text-[#413B3B]">Sister's Blessing Jar</h3>
            </div>
            <button
              onClick={() => setIsOpenForm(!isOpenForm)}
              className="text-xs font-sans uppercase tracking-widest text-[#B87983] hover:underline"
            >
              {isOpenForm ? 'Close Form' : '+ Add a Blessing'}
            </button>
          </div>

          {/* Form */}
          {isOpenForm && (
            <form onSubmit={handleAddWish} className="mb-6 text-left space-y-3 p-4 bg-[#FAF7F2] rounded-2xl border border-[#EBDCCE]">
              <div>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Brother, Family)"
                  value={newSender}
                  onChange={(e) => setNewSender(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EBDCCE] rounded-xl focus:outline-none focus:border-[#B87983]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Write a sweet birthday wish for Mitra..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EBDCCE] rounded-xl focus:outline-none focus:border-[#B87983]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#B87983] text-white text-xs uppercase tracking-widest rounded-xl hover:bg-[#965A64] transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Drop into Jar</span>
              </button>
            </form>
          )}

          {/* Wishes List */}
          <div className="space-y-3 text-left max-h-48 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div key={w.id} className="p-3 bg-white rounded-xl border border-[#EBDCCE]/70 text-xs shadow-sm">
                <p className="font-serif italic text-sm text-[#413B3B] mb-1">"{w.text}"</p>
                <div className="flex items-center justify-between text-[10px] text-[#938681]">
                  <span>— {w.sender}</span>
                  <span>{w.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to top & Editorial Colophon */}
        <div className="pt-8 border-t border-[#EBDCCE]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#938681]">
          <p>© 2026 MITU • The World's Littlest Universe. Created with endless brotherly love.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#B87983] transition-colors uppercase tracking-widest text-[11px]"
          >
            <span>Back to Beginning</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

