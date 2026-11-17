import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export default function SparkleCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-only
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const colors = ['#F4DCE0', '#F8E0D1', '#B87983', '#D4AF37', '#EEE9F6'];

    const handleMouseMove = (e: MouseEvent) => {
      // Spawn 1 subtle sparkle occasionally
      if (Math.random() > 0.4) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade and shrink particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - 0.8,
            opacity: p.opacity - 0.04,
            size: Math.max(0, p.size - 0.2),
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (isTouch || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

