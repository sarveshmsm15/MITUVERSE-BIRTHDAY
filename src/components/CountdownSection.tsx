import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Check if today is November 29 (month is 0-indexed: 10 = November)
      const isToday = now.getMonth() === 10 && now.getDate() === 29;

      // Determine next November 29
      let targetDate = new Date(currentYear, 10, 29, 0, 0, 0);

      // If November 29 of this year has already passed (and not today), aim for next year
      if (now.getTime() > targetDate.getTime() && !isToday) {
        targetDate = new Date(currentYear + 1, 10, 29, 0, 0, 0);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (isToday || difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isToday: false };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F4DCE0', '#F8E0D1', '#E8EEF5', '#EEE9F6', '#B87983'],
    });
  };

  return (
    <section id="countdown" className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F3E9DF]/40 to-[#FAF7F2] overflow-hidden">
      {/* Decorative luxury watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-serif text-[18vw] leading-none text-[#413B3B] font-bold">
        29
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EBDCCE] shadow-sm mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#B87983]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#938681]">
            Annual Royal Celebration
          </span>
        </div>

        {/* Big Date Typography */}
        <div className="mb-8">
          <span className="block font-serif text-7xl sm:text-8xl md:text-9xl font-light text-[#B87983] tracking-tighter leading-none mb-1">
            29
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.22em] text-[#413B3B] font-normal">
            NOVEMBER
          </h2>
          <p className="mt-3 font-serif italic text-base sm:text-lg text-[#938681] tracking-wide">
            A DAY AS SPECIAL AS YOU
          </p>
        </div>

        {/* Countdown or Celebration Display */}
        {timeLeft.isToday ? (
          <div className="bg-white/80 backdrop-blur-md max-w-2xl mx-auto p-8 rounded-3xl border border-[#B87983]/30 luxury-card-shadow">
            <div className="inline-flex p-3 rounded-full bg-[#F4DCE0] text-[#B87983] mb-4">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-[#413B3B] mb-2">
              🎉 TODAY IS THE DAY! 🎉
            </h3>
            <p className="font-serif italic text-lg text-[#B87983] mb-6">
              Happy Birthday, Mitu Chello! The whole world is celebrating you today!
            </p>
            <button
              onClick={triggerCelebrationConfetti}
              className="px-6 py-3 rounded-full bg-[#B87983] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#965A64] transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Shower Confetti for Mitra</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={unit.label}
                className="group bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-[#EBDCCE] shadow-sm hover:border-[#B87983] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#F4DCE0]/50 to-transparent rounded-bl-3xl pointer-events-none" />
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#413B3B] block mb-2 tabular-nums group-hover:text-[#B87983] transition-colors">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#938681]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Small Footer Supporting Note */}
        <p className="mt-8 text-xs font-serif italic text-[#938681] flex items-center justify-center gap-2">
          <Heart className="w-3 h-3 text-[#B87983] fill-[#B87983]" />
          <span>Counting down every heartbeat until we celebrate you again.</span>
          <Heart className="w-3 h-3 text-[#B87983] fill-[#B87983]" />
        </p>
      </div>
    </section>
  );
}

