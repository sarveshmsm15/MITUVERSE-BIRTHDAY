import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

// Vibrant glowing candle flame with flickering light
function Flame({ position, isLit }: { position: [number, number, number]; isLit: boolean }) {
  const flameOuterRef = useRef<THREE.Mesh>(null);
  const flameInnerRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!isLit) return;
    const t = state.clock.getElapsedTime();
    const flicker = 1 + Math.sin(t * 22) * 0.15 + Math.cos(t * 31) * 0.1;
    const wave = Math.sin(t * 12) * 0.1;

    if (flameOuterRef.current) {
      flameOuterRef.current.scale.set(flicker, flicker * 1.15, flicker);
      flameOuterRef.current.rotation.z = wave;
    }
    if (flameInnerRef.current) {
      flameInnerRef.current.scale.set(flicker * 0.9, flicker * 1.05, flicker * 0.9);
      flameInnerRef.current.rotation.z = wave * 0.8;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.4 + Math.sin(t * 25) * 0.6 + Math.random() * 0.2;
    }
  });

  if (!isLit) {
    return (
      <group position={position}>
        {/* Extinguished wick */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.09, 8]} />
          <meshStandardMaterial color="#2B2727" roughness={0.9} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      {/* Black candle wick */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.09, 8]} />
        <meshStandardMaterial color="#2A2424" />
      </mesh>

      {/* Outer Golden Orange Flame Teardrop */}
      <mesh ref={flameOuterRef} position={[0, 0.18, 0]}>
        <coneGeometry args={[0.08, 0.28, 20]} />
        <meshBasicMaterial color="#FF9900" transparent opacity={0.92} />
      </mesh>

      {/* Inner White-Hot Flame Core */}
      <mesh ref={flameInnerRef} position={[0, 0.14, 0]}>
        <coneGeometry args={[0.04, 0.18, 16]} />
        <meshBasicMaterial color="#FFFBEA" />
      </mesh>

      {/* Outer Halo Glow */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#FFAE42" transparent opacity={0.25} />
      </mesh>

      {/* Warm Point Light Casting Glow on Bunny's Face & Ears */}
      <pointLight
        ref={lightRef}
        position={[0, 0.22, 0]}
        color="#FFA34D"
        intensity={2.6}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}

// Birthday Candle firmly seated on top of Bunny's head
function HeadCandle({ position, isLit }: { position: [number, number, number]; isLit: boolean }) {
  return (
    <group position={position}>
      {/* Candle Stand / Sugar Ring */}
      <mesh position={[0, 0.03, 0]}>
        <torusGeometry args={[0.075, 0.03, 12, 20]} />
        <meshStandardMaterial color="#F4DCE0" roughness={0.3} />
      </mesh>

      {/* Candle Stick */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.58, 20]} />
        <meshStandardMaterial color="#FFFBF5" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Gold Spiral Metallic Stripe */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.047, 0.047, 0.14, 20]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Glowing Flame on top */}
      <Flame position={[0, 0.61, 0]} isLit={isLit} />
    </group>
  );
}

// Bunny Ear with soft pink interior
function BunnyEar({ isLeft }: { isLeft: boolean }) {
  const angleZ = isLeft ? 0.2 : -0.2;
  const angleY = isLeft ? -0.08 : 0.08;

  return (
    <group rotation={[0.05, angleY, angleZ]}>
      {/* Outer fluffy ear */}
      <mesh position={[0, 0.58, 0]} scale={[0.2, 0.58, 0.11]} castShadow>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#C5D3E3" roughness={0.65} />
      </mesh>
      {/* Inner pink groove */}
      <mesh position={[0, 0.58, 0.05]} scale={[0.12, 0.46, 0.06]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#F4BAC4" roughness={0.5} />
      </mesh>
    </group>
  );
}

// Pink sugar blossom flower tucked by ear
function SugarBlossom({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={0.18}>
      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.4} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.45, Math.sin(angle) * 0.45, 0]}
            scale={[0.25, 0.35, 0.08]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#EC4899" roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// Sugar Basket held by paws
function SugarBasket({ position }: { position: [number, number, number] }) {
  const eggs = [
    { pos: [-0.18, 0.2, 0.04], color: '#FCD34D' }, // yellow
    { pos: [0.0, 0.23, 0.07], color: '#60A5FA' },  // blue
    { pos: [0.18, 0.2, 0.04], color: '#F472B6' },  // pink
    { pos: [-0.09, 0.26, -0.04], color: '#34D399' },// green
    { pos: [0.09, 0.26, -0.04], color: '#C084FC' }, // lavender
  ];

  return (
    <group position={position}>
      {/* Basket Wicker Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.28, 0.32, 24]} />
        <meshStandardMaterial color="#8D5B28" roughness={0.8} />
      </mesh>
      {/* Basket Rim */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.38, 0.035, 12, 28]} />
        <meshStandardMaterial color="#6B3F18" roughness={0.8} />
      </mesh>

      {/* Colorful Eggs / Macarons */}
      {eggs.map((egg, idx) => (
        <mesh
          key={idx}
          position={egg.pos as [number, number, number]}
          scale={[0.09, 0.12, 0.09]}
          castShadow
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={egg.color} roughness={0.4} />
        </mesh>
      ))}

      {/* Pink Ribbon Bow */}
      <group position={[0, 0.05, 0.38]}>
        <mesh scale={[0.065, 0.065, 0.065]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#F472B6" roughness={0.35} />
        </mesh>
        <mesh position={[-0.11, 0.02, 0]} rotation={[0, 0, 0.3]} scale={[0.13, 0.07, 0.035]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#F472B6" roughness={0.35} />
        </mesh>
        <mesh position={[0.11, 0.02, 0]} rotation={[0, 0, -0.3]} scale={[0.13, 0.07, 0.035]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#F472B6" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

// Bunny Foot with pink toe pads
function BunnyFoot({ isLeft }: { isLeft: boolean }) {
  const posX = isLeft ? -0.48 : 0.48;

  return (
    <group position={[posX, -0.52, 0.42]} rotation={[0.2, isLeft ? 0.3 : -0.3, 0]}>
      {/* White fluffy foot */}
      <mesh scale={[0.24, 0.15, 0.35]} castShadow>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.6} />
      </mesh>
      {/* Pink Main Pad */}
      <mesh position={[0, 0.11, -0.04]} scale={[0.11, 0.03, 0.14]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#F472B6" roughness={0.4} />
      </mesh>
      {/* 3 Toe Beans */}
      {[-0.07, 0, 0.07].map((x, i) => (
        <mesh key={i} position={[x, 0.11, 0.14]} scale={[0.035, 0.022, 0.045]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#F472B6" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// The Complete 3D Sculpted Bunny Cake Model
function BunnyCakeModel({ isLit, onToggleCandle }: { isLit: boolean; onToggleCandle: () => void }) {
  const bunnyRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (bunnyRef.current) {
      bunnyRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group
      ref={bunnyRef}
      onClick={(e) => { e.stopPropagation(); onToggleCandle(); }}
      position={[0, -0.55, 0]}
      scale={0.78}
    >
      {/* 1. CAKE STAND / WOODEN BOARD */}
      {/* Platter top */}
      <mesh position={[0, -0.75, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.7, 1.65, 0.12, 48]} />
        <meshStandardMaterial color="#DFC8B5" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Gold Rim */}
      <mesh position={[0, -0.74, 0]}>
        <cylinderGeometry args={[1.72, 1.72, 0.03, 48]} />
        <meshStandardMaterial color="#E8C382" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Stand Stem */}
      <mesh position={[0, -1.02, 0]}>
        <cylinderGeometry args={[0.42, 0.6, 0.45, 32]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.3} />
      </mesh>
      {/* Stand Foot */}
      <mesh position={[0, -1.26, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.09, 36]} />
        <meshStandardMaterial color="#F3E9DF" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Sugar grass / moss bed under bunny */}
      <mesh position={[0, -0.68, 0]} receiveShadow>
        <cylinderGeometry args={[1.42, 1.42, 0.04, 36]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.9} />
      </mesh>

      {/* 2. BUNNY BODY */}
      <mesh position={[0, -0.28, 0]} scale={[0.82, 0.78, 0.76]} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C5D3E3" roughness={0.65} />
      </mesh>
      {/* White tummy patch */}
      <mesh position={[0, -0.26, 0.4]} scale={[0.52, 0.58, 0.32]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.6} />
      </mesh>

      {/* 3. BUNNY HEAD */}
      <mesh position={[0, 0.5, 0.05]} scale={[0.74, 0.68, 0.7]} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C5D3E3" roughness={0.65} />
      </mesh>

      {/* Chubby White Cheeks */}
      <mesh position={[-0.17, 0.38, 0.62]} scale={[0.25, 0.2, 0.18]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
      </mesh>
      <mesh position={[0.17, 0.38, 0.62]} scale={[0.25, 0.2, 0.18]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
      </mesh>
      {/* Rosy Pink Cheeks Blush */}
      <mesh position={[-0.35, 0.44, 0.55]} scale={[0.13, 0.07, 0.04]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#F472B6" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 0.44, 0.55]} scale={[0.13, 0.07, 0.04]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#F472B6" roughness={0.7} />
      </mesh>

      {/* Pink Heart Nose */}
      <mesh position={[0, 0.48, 0.74]} scale={[0.08, 0.065, 0.07]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#F472B6" roughness={0.4} />
      </mesh>

      {/* Cheerful Open Smile with Pink Tongue */}
      <mesh position={[0, 0.32, 0.65]} scale={[0.12, 0.11, 0.07]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#BE185D" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, 0.67]} scale={[0.075, 0.055, 0.04]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#F472B6" roughness={0.4} />
      </mesh>

      {/* Big Cartoon Eyes */}
      {/* Left Eye */}
      <group position={[-0.24, 0.6, 0.58]} rotation={[0, -0.25, 0]}>
        <mesh scale={[0.15, 0.2, 0.07]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#2D1810" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.04]} scale={[0.13, 0.17, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#B45309" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.06]} scale={[0.09, 0.13, 0.035]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#0A0706" roughness={0.1} />
        </mesh>
        <mesh position={[-0.035, 0.05, 0.08]} scale={[0.04, 0.04, 0.025]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.035, -0.035, 0.08]} scale={[0.022, 0.022, 0.018]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.24, 0.6, 0.58]} rotation={[0, 0.25, 0]}>
        <mesh scale={[0.15, 0.2, 0.07]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#2D1810" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.04]} scale={[0.13, 0.17, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#B45309" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.06]} scale={[0.09, 0.13, 0.035]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#0A0706" roughness={0.1} />
        </mesh>
        <mesh position={[-0.035, 0.05, 0.08]} scale={[0.04, 0.04, 0.025]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.035, -0.035, 0.08]} scale={[0.022, 0.022, 0.018]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Whiskers */}
      {[-0.08, 0, 0.08].map((y, i) => (
        <group key={`wh-l-${i}`} position={[-0.42, 0.38 + y, 0.58]} rotation={[0, -0.3, y * 2]}>
          <mesh scale={[0.22, 0.007, 0.007]}>
            <cylinderGeometry args={[1, 1, 1, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
      {[-0.08, 0, 0.08].map((y, i) => (
        <group key={`wh-r-${i}`} position={[0.42, 0.38 + y, 0.58]} rotation={[0, 0.3, -y * 2]}>
          <mesh scale={[0.22, 0.007, 0.007]}>
            <cylinderGeometry args={[1, 1, 1, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* 4. TALL BUNNY EARS */}
      <group position={[-0.3, 1.0, -0.05]}>
        <BunnyEar isLeft={true} />
      </group>
      <group position={[0.3, 1.0, -0.05]}>
        <BunnyEar isLeft={false} />
      </group>

      {/* Pink Sugar Blossom tucked by left ear */}
      <SugarBlossom position={[-0.38, 0.96, 0.18]} />

      {/* 5. BIRTHDAY CANDLE CLEARLY VISIBLE ON HEAD BETWEEN EARS */}
      <HeadCandle position={[0, 1.05, 0.02]} isLit={isLit} />

      {/* 6. BASKET HELD BY BUNNY'S PAWS */}
      <SugarBasket position={[0, -0.2, 0.48]} />

      {/* Bunny Paws */}
      <mesh position={[-0.3, -0.04, 0.54]} scale={[0.12, 0.11, 0.16]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
      </mesh>
      <mesh position={[0.3, -0.04, 0.54]} scale={[0.12, 0.11, 0.16]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
      </mesh>

      {/* 7. FEET WITH TOE BEANS */}
      <BunnyFoot isLeft={true} />
      <BunnyFoot isLeft={false} />

      {/* Fluffy Tail at back */}
      <mesh position={[0, -0.34, -0.72]} scale={[0.22, 0.22, 0.2]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Complete 3D Bunny Cake Scene with Perfect Framing
export default function ThreeCake() {
  const [isLit, setIsLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const toggleCandles = () => {
    if (isLit) {
      setIsLit(false);
      setWishMade(true);
      soundEngine.playCandleBlow();
      soundEngine.playCelebration();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#F4DCE0', '#F8E0D1', '#E8EEF5', '#EEE9F6', '#B87983', '#D4AF37'],
      });
    } else {
      setIsLit(true);
      setWishMade(false);
      soundEngine.playChime(950, 0.8);
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[560px] md:h-[620px] flex items-center justify-center">
      <Canvas
        shadows
        camera={{ position: [0, 0.45, 5.2], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight
          position={[4, 8, 5]}
          intensity={1.9}
          castShadow
          shadow-mapSize={[1024, 1024]}
          color="#FFF8F2"
        />
        <pointLight position={[-4, 3, -2]} intensity={0.65} color="#F4DCE0" />
        <pointLight position={[3, -1, 3]} intensity={0.55} color="#EEE9F6" />

        <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.14}>
          <BunnyCakeModel isLit={isLit} onToggleCandle={toggleCandles} />
        </Float>

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.36}
          scale={5.2}
          blur={2.4}
          far={3}
          color="#4A3B3D"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.8}
          maxPolarAngle={Math.PI / 2.05}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Floating Micro-Pill to blow candle */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
        <button
          onClick={toggleCandles}
          className="group px-5 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#EBDCCE] shadow-lg hover:border-[#B87983] transition-all duration-300 flex items-center gap-2 text-xs md:text-sm font-medium text-[#413B3B] hover:text-[#B87983]"
          title="Click to blow or relight candle"
        >
          <span className="w-2 h-2 rounded-full animate-ping bg-[#B87983]" style={{ display: isLit ? 'inline-block' : 'none' }}></span>
          <span>{isLit ? '🐰✨ Blow Bunny\'s Birthday Candle & Make a Wish' : '🕯️ Candle Blown! Click to Relight'}</span>
        </button>

        {wishMade && (
          <p className="text-[11px] font-serif italic text-[#B87983] animate-fade-in bg-white/80 px-3 py-0.5 rounded-full shadow-sm">
            May every dream come true, Mitu Chello! 💫
          </p>
        )}
      </div>
    </div>
  );
}
