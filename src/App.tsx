import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import LoveLetterSection from './components/LoveLetterSection';
import ThuglishQuotesSection from './components/ThuglishQuotesSection';
import MoodGenerator from './components/MoodGenerator';
import MemoriesSection from './components/MemoriesSection';
import ReasonsSection from './components/ReasonsSection';
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

        {/* 04. Thuglish Quotes: Konjam Love... Neraya Sentiment */}
        <ThuglishQuotesSection />

        {/* 05. Ammu's Mood Generator & Sibling Vibe Check */}
        <MoodGenerator />

        {/* 06. Her Special World: Photo Memories (Uniform & Clean) */}
        <MemoriesSection />

        {/* 07. 10 Reasons Why You're Irreplaceable (Equal 3-in-a-Row Grid) */}
        <ReasonsSection />

        {/* 08. Exclusive Brother's Surprise (Realistic Gift Box & Celebration) */}
        <SurpriseSection />

        {/* 09. 29 Little Surprises (Directly Below the Exclusive Surprise) */}
        <Surprises29Section />

        {/* 10. Open When You Need Me (6 Interactive Sanctuary Envelopes) */}
        <OpenWhenLettersSection />

        {/* 11. Official Royal Citation of Sisterhood */}
        <SisterAwardSection />

        {/* 12. Cinematic Finale & Blessing Jar */}
        <FinalMessageSection />
      </main>
    </div>
  );
}
