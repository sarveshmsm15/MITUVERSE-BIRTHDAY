import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('mitu-music-state', { detail: { isPlaying: false } }));
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new CustomEvent('mitu-music-state', { detail: { isPlaying: true } }));
        })
        .catch((err) => {
          console.warn("Audio play prevented:", err);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;

    // Autoplay attempt
    const startRemoSong = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new CustomEvent('mitu-music-state', { detail: { isPlaying: true } }));
        })
        .catch(() => {
          // If browser policy requires user gesture first, unlock on first click/touch
          const unlock = () => {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                window.dispatchEvent(new CustomEvent('mitu-music-state', { detail: { isPlaying: true } }));
              })
              .catch(() => {});
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('scroll', unlock);
          };

          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true });
          window.addEventListener('scroll', unlock, { once: true });
        });
    };

    startRemoSong();

    // Listen to shared events from Navbar button
    const handleGlobalToggle = () => {
      toggleMusic();
    };
    window.addEventListener('mitu-toggle-music', handleGlobalToggle);

    return () => {
      window.removeEventListener('mitu-toggle-music', handleGlobalToggle);
    };
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src="/assets/music/remo-birthday.mp3"
      loop
      preload="auto"
    />
  );
}
