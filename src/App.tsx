import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import LoveLetterSection from './components/LoveLetterSection';
import UnsaidFeelingsSection from './components/UnsaidFeelingsSection';
import UniverseWishesSection from './components/UniverseWishesSection';
import ReasonsSection from './components/ReasonsSection';
import TroublemakerSection from './components/TroublemakerSection';
import MissYourBrotherSection from './components/MissYourBrotherSection';
import RememberForeverSection from './components/RememberForeverSection';
import MoodGenerator from './components/MoodGenerator';
import MemoriesSection from './components/MemoriesSection';
import ThuglishQuotesSection from './components/ThuglishQuotesSection';
import SurpriseSection from './components/SurpriseSection';
import Surprises29Section from './components/Surprises29Section';
import OpenWhenLettersSection from './components/OpenWhenLettersSection';
import SisterAwardSection from './components/SisterAwardSection';
import FinalMessageSection from './components/FinalMessageSection';
import SparkleCursor from './components/SparkleCursor';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#413B3B] font-sans selection:bg-[#F4DCE0] selection:text-[#413B3B] relative overflow-x-hidden">
      {/* Background Audio Engine (Anirudh's Remo Birthday BGM) */}
      <AudioPlayer />

      {/* Trailing Delicate Sparkle Cursor */}
      <SparkleCursor />

      {/* Top Boutique Navigation with Remo Music Toggle */}
      <Navbar />

      {/* Main Experience Journey */}
      <main>
        {/* 01. Hero Section with 3D Sculpted Bunny Cake & Curved Circular Typography */}
        <HeroSection />

        {/* 02. Birthday Countdown for 29 NOVEMBER */}
        <CountdownSection />

        {/* 03. The Heartfelt Brother's Love Letter */}
        <LoveLetterSection />

        {/* 04. NEW: Unakku Solla Nenacha, Aana Sollama Vitta Vishayangal... (15 Handwritten Notes) */}
        <UnsaidFeelingsSection />

        {/* 05. NEW: If I Could Give You The World — 29 Celestial Wishes for 29 November */}
        <UniverseWishesSection />

        {/* 06. UPGRADED: 29 Reasons Why You Are So Special To Me */}
        <ReasonsSection />

        {/* 07. NEW: MITU CHELLO: Official Troublemaker (Sibling Banter & Awards) */}
        <TroublemakerSection />

        {/* 08. NEW: Open This When You Miss Your Brother (Interactive Sealed Letter) */}
        <MissYourBrotherSection />

        {/* 09. NEW: Things I Want You To Remember Forever (Cinematic Life Anchors) */}
        <RememberForeverSection />

        {/* 10. Ammu's Mood Generator & Sibling Vibe Check */}
        <MoodGenerator />

        {/* 11. Her Special World: Photo Memories */}
        <MemoriesSection />

        {/* 12. Thuglish Quotes: Konjam Love... Neraya Sentiment */}
        <ThuglishQuotesSection />

        {/* 13. Exclusive Brother's Surprise (Realistic Gift Box & Celebration) */}
        <SurpriseSection />

        {/* 14. 29 Little Surprises (Directly Below the Exclusive Surprise) */}
        <Surprises29Section />

        {/* 15. Open When You Need Me (Interactive Sanctuary Envelopes) */}
        <OpenWhenLettersSection />

        {/* 16. Official Royal Citation of Sisterhood */}
        <SisterAwardSection />

        {/* 17. Cinematic Finale & 29 Birthday Candles Celebration */}
        <FinalMessageSection />
      </main>
    </div>
  );
}
