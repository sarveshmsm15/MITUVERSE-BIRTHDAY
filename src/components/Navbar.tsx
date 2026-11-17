import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Heart, Music } from 'lucide-react';

export default function Navbar() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      setIsPlayingMusic(customEvent.detail.isPlaying);
    };
    window.addEventListener('mitu-music-state', handleStateChange);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mitu-music-state', handleStateChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    window.dispatchEvent(new CustomEvent('mitu-toggle-music'));
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Her Story', href: '#love-letter' },
    { name: 'Little Memories', href: '#memories' },
    { name: 'Love Notes', href: '#quotes' },
    { name: '29 Surprises', href: '#surprises-29' },
    { name: 'Open When', href: '#open-when' },
    { name: 'Surprise', href: '#surprise', highlight: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-3.5 border-b border-[#EBDCCE]/60 shadow-sm'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo + Remo Music Controller */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#home"
            className="group flex items-center gap-2 text-decoration-none"
          >
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#413B3B] group-hover:text-[#B87983] transition-colors">
              MITU<span className="text-[#B87983]">.</span>
            </span>
          </a>

          {/* Music Button in Top Left Bar (Replacing Play Melody button) */}
          <button
            onClick={handleAudioToggle}
            className={`group px-3 py-1.5 rounded-full text-xs transition-all duration-300 border flex items-center gap-2 shadow-sm ${
              isPlayingMusic
                ? 'bg-[#F4DCE0] border-[#B87983] text-[#413B3B]'
                : 'bg-white/80 hover:bg-white border-[#EBDCCE] text-[#938681] hover:text-[#413B3B]'
            }`}
            title={isPlayingMusic ? 'Mute Music' : 'Play Remo Birthday BGM (Anirudh)'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#B87983] animate-pulse" />
                <span className="font-sans text-[11px] font-medium hidden sm:inline flex items-center gap-1">
                  <Music className="w-2.5 h-2.5 text-[#B87983]" />
                  <span>Remo BGM</span>
                </span>
                {/* Mini Equalizer Waves */}
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] h-2 bg-[#B87983] animate-pulse"></span>
                  <span className="w-[2px] h-3 bg-[#B87983] animate-pulse delay-75"></span>
                  <span className="w-[2px] h-1.5 bg-[#B87983] animate-pulse delay-150"></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#938681]" />
                <span className="font-sans text-[11px] hidden sm:inline">Play Remo BGM</span>
              </>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-medium tracking-[0.15em] uppercase text-[#413B3B]/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 relative group py-1 ${
                link.highlight
                  ? 'text-[#B87983] font-semibold flex items-center gap-1 px-3 py-1 rounded-full bg-[#F4DCE0]/60 hover:bg-[#F4DCE0]'
                  : 'hover:text-[#B87983]'
              }`}
            >
              {link.highlight && <Sparkles className="w-3 h-3 text-[#B87983]" />}
              <span>{link.name}</span>
              {!link.highlight && (
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B87983] transition-all duration-300 group-hover:w-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#413B3B] hover:bg-[#F3E9DF] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#EBDCCE] px-6 py-5 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-3 text-xs font-medium tracking-wider uppercase text-[#413B3B]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                  link.highlight
                    ? 'bg-[#F4DCE0] text-[#B87983] font-semibold'
                    : 'hover:bg-[#F3E9DF]'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight ? <Sparkles className="w-4 h-4" /> : <Heart className="w-3 h-3 text-[#DEC5B1]" />}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
