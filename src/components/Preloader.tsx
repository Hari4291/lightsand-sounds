import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { businessConfig } from '../config/business';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'awakening' | 'equalizer' | 'reveal' | 'concert' | 'exit'>('awakening');
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check accessibility for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload critical assets
  useEffect(() => {
    let isMounted = true;
    const criticalImages = [
      businessConfig.logo,
      businessConfig.ownerImage,
      '/images/gallery/dj-services.jpg',
      '/images/gallery/lighting-services.jpg'
    ];

    const imagePromises = criticalImages.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // graceful fallback
      });
    });

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([...imagePromises, fontPromise])
      .then(() => {
        if (isMounted) setAssetsLoaded(true);
      })
      .catch(() => {
        if (isMounted) setAssetsLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Cinematic Progress & Phase Synchronization
  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const startTime = performance.now();
    const targetDuration = 3200; // ~3.2 seconds for cinematic stage sequence

    const updateInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / targetDuration) * 100));

      // Phase state transitions based on exact timing
      if (elapsed < 800) {
        setPhase('awakening');
      } else if (elapsed < 1600) {
        setPhase('equalizer');
      } else if (elapsed < 2600) {
        setPhase('reveal');
      } else if (elapsed < 3200) {
        setPhase('concert');
      } else {
        setPhase('exit');
      }

      // Smooth progress update, capping at 95% until assets are actually loaded
      if (!assetsLoaded && rawProgress > 95) {
        setProgress(95);
      } else {
        setProgress(rawProgress);
      }

      if (elapsed >= targetDuration && assetsLoaded) {
        clearInterval(updateInterval);
        setProgress(100);
        setPhase('exit');

        // Cinematic exit delay: pause slightly, let the golden flare sweep, then fade out
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 650);

        return () => clearTimeout(exitTimer);
      }
    }, 30);

    return () => clearInterval(updateInterval);
  }, [assetsLoaded, prefersReducedMotion, onComplete]);

  // Generate 28 symmetric audio visualizer bars
  const equalizerBars = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const distanceFromCenter = Math.abs(i - 13.5) / 14;
      // Peak near center-left & center-right, tapering outward
      const baseHeight = Math.max(15, Math.sin((i / 27) * Math.PI) * 90);
      return {
        id: i,
        baseHeight,
        delay: (i % 7) * 0.08,
        duration: 0.45 + (i % 5) * 0.12,
        distanceFromCenter
      };
    });
  }, []);

  return (
    <motion.aside
      key="guru-cinematic-preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020204] overflow-hidden select-none pointer-events-auto"
      role="status"
      aria-live="polite"
      aria-label="Loading Guru Lights and Sounds"
    >
      {/* =========================================================================
          STAGE ATMOSPHERE: CONCERT LIGHTS, LASERS & FOG
         ========================================================================= */}

      {/* Atmospheric Fog / Smoke Cloud Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-purple-950/25 via-blue-950/15 to-transparent pointer-events-none blur-3xl" />

      {/* Left Stage Spotlight (Cyan / Electric Blue) */}
      <motion.div
        initial={{ opacity: 0, rotate: -40 }}
        animate={{
          opacity: phase !== 'awakening' ? [0.25, 0.55, 0.35] : 0.15,
          rotate: phase !== 'awakening' ? [-35, -25, -35] : -40,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-20 -left-20 w-[600px] h-[900px] origin-top-left pointer-events-none"
        style={{
          background: 'conic-gradient(from 120deg at 10% 10%, rgba(6, 182, 212, 0.22) 0deg, rgba(59, 130, 246, 0.12) 35deg, transparent 65deg)',
          filter: 'blur(35px)'
        }}
      />

      {/* Right Stage Spotlight (Vibrant Purple / Magenta) */}
      <motion.div
        initial={{ opacity: 0, rotate: 40 }}
        animate={{
          opacity: phase !== 'awakening' ? [0.25, 0.6, 0.3] : 0.15,
          rotate: phase !== 'awakening' ? [35, 22, 35] : 40,
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-20 -right-20 w-[600px] h-[900px] origin-top-right pointer-events-none"
        style={{
          background: 'conic-gradient(from 210deg at 90% 10%, rgba(168, 85, 247, 0.25) 0deg, rgba(217, 70, 239, 0.12) 35deg, transparent 65deg)',
          filter: 'blur(35px)'
        }}
      />

      {/* Center Golden Stage Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: phase === 'awakening' ? 0.3 : [0.45, 0.75, 0.5],
          scale: phase === 'exit' ? 1.4 : [0.9, 1.1, 0.95]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[700px] h-[340px] sm:h-[540px] md:h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
          filter: 'blur(45px)'
        }}
      />

      {/* Diagonal Concert Laser 1 (Electric Blue from Top-Left) */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: phase !== 'awakening' ? [0.4, 0.9, 0.4] : 0.2,
          scaleX: 1,
          rotate: [-28, -24, -28]
        }}
        transition={{
          scaleX: { duration: 0.8, ease: 'easeOut' },
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute top-0 left-0 w-[140vw] h-[1.5px] origin-top-left pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(6,182,212,0.9) 0%, rgba(59,130,246,0.6) 50%, transparent 100%)',
          boxShadow: '0 0 16px 2px rgba(6, 182, 212, 0.8)'
        }}
      />

      {/* Diagonal Concert Laser 2 (Electric Purple from Top-Right) */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: phase !== 'awakening' ? [0.4, 0.95, 0.4] : 0.2,
          scaleX: 1,
          rotate: [28, 23, 28]
        }}
        transition={{
          scaleX: { duration: 0.8, ease: 'easeOut', delay: 0.1 },
          opacity: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute top-0 right-0 w-[140vw] h-[1.5px] origin-top-right pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, rgba(168,85,247,0.9) 0%, rgba(217,70,239,0.6) 50%, transparent 100%)',
          boxShadow: '0 0 16px 2px rgba(168, 85, 247, 0.8)'
        }}
      />

      {/* Sub-bass Stage Glow Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.1, 0.22, 0.1]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-24 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)',
          filter: 'blur(25px)'
        }}
      />

      {/* =========================================================================
          MAIN CONTAINER: LOGO, EQUALIZER & BRAND
         ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">

        {/* 1. Behind-the-Logo Dynamic Audio Equalizer Bars */}
        <div className="relative w-full max-w-[280px] sm:max-w-[480px] md:max-w-[580px] h-14 sm:h-20 flex items-end justify-center gap-1 sm:gap-1.5 mb-2 overflow-hidden">
          {equalizerBars.map((bar) => {
            const isPlaying = phase !== 'awakening' && phase !== 'exit';
            return (
              <motion.div
                key={bar.id}
                initial={{ height: 4, opacity: 0.2 }}
                animate={{
                  height: isPlaying
                    ? [
                        bar.baseHeight * 0.25,
                        bar.baseHeight,
                        bar.baseHeight * 0.5,
                        bar.baseHeight * 0.9,
                        bar.baseHeight * 0.15
                      ]
                    : 6,
                  opacity: isPlaying ? [0.6, 1, 0.7, 0.95, 0.5] : 0.25
                }}
                transition={{
                  duration: bar.duration,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: bar.delay
                }}
                className="w-1 sm:w-1.5 rounded-t-sm"
                style={{
                  background:
                    bar.id < 9
                      ? 'linear-gradient(to top, #3b82f6, #06b6d4, #f59e0b)'
                      : bar.id > 18
                      ? 'linear-gradient(to top, #8b5cf6, #ec4899, #f59e0b)'
                      : 'linear-gradient(to top, #6366f1, #a855f7, #fef08a)',
                  boxShadow: '0 0 8px rgba(168, 85, 247, 0.45)'
                }}
              />
            );
          })}
        </div>

        {/* 2. THE MASTER LOGO CONTAINER */}
        <div className="relative flex items-center justify-center">
          
          {/* Subtle Stage Backlight Behind Logo Image */}
          <div
            className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-60 pointer-events-none transition-opacity duration-700"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, rgba(139,92,246,0.18) 50%, transparent 75%)',
              filter: 'blur(24px)'
            }}
          />

          {/* Logo Card & Image with Exact Original Proportions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            animate={{
              opacity: phase === 'awakening' ? 0.35 : 1,
              scale: phase === 'exit' ? 1.04 : phase !== 'awakening' ? 1 : 0.92,
              filter: phase === 'awakening' ? 'blur(8px)' : 'blur(0px)'
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative overflow-hidden rounded-2xl bg-black border border-gold-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] group"
            style={{
              boxShadow:
                phase !== 'awakening'
                  ? '0 0 35px -5px rgba(212, 175, 55, 0.35), 0 0 65px -10px rgba(168, 85, 247, 0.25)'
                  : '0 0 20px rgba(0,0,0,0.8)'
            }}
          >
            {/* The Original Guru Lights & Sounds Logo */}
            <img
              src={businessConfig.logo}
              alt="Guru Lights & Sounds"
              className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[540px] max-w-[85vw] h-auto object-contain block mx-auto transition-transform duration-700"
              loading="eager"
            />

            {/* Cinematic Golden Light Streak Passing Across Logo */}
            <motion.div
              initial={{ x: '-150%', opacity: 0 }}
              animate={
                phase === 'reveal' || phase === 'concert' || phase === 'exit'
                  ? {
                      x: ['-150%', '200%'],
                      opacity: [0, 0.85, 0]
                    }
                  : { x: '-150%', opacity: 0 }
              }
              transition={{
                duration: 1.4,
                repeat: phase === 'concert' ? Infinity : 0,
                repeatDelay: 1.8,
                ease: 'easeInOut'
              }}
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(254, 240, 138, 0.7))'
              }}
            />

            {/* Subtle Gold Hairline Border Frame Highlight */}
            <div className="absolute inset-0 rounded-2xl border border-gold-400/20 pointer-events-none" />
          </motion.div>
        </div>

        {/* 3. Event Tagline & Serving Region */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: phase !== 'awakening' ? 1 : 0,
            y: phase !== 'awakening' ? 0 : 8
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 flex flex-col items-center space-y-1"
        >
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-gold-400/90 font-sans">
            Premium All-In-One Event Production
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-400 tracking-wider font-light">
            Paluri Vari Palli &bull; Andhra Pradesh
          </span>
        </motion.div>

        {/* =========================================================================
            PHASE 5: LOADING INDICATOR & SMOOTH PERCENTAGE COUNTER
           ========================================================================= */}
        <div className="w-full max-w-xs sm:max-w-sm mt-8 flex flex-col items-center">
          
          {/* Header Caption */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-slate-300 uppercase mb-2">
            <span className="flex items-center gap-1.5 text-gold-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Setting the stage...
            </span>
            <span className="font-mono text-gold-300 tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Sleek Golden Progress Track */}
          <div className="relative w-full h-[3px] bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-gold-400 to-amber-200"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)'
              }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Stage Experience Subtitle */}
          <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-3">
            DJ &bull; Lighting &bull; Sound &bull; Tent House &bull; Decor
          </p>
        </div>

      </div>

      {/* Decorative Stage Rim Light Lines at Bottom Edge */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </motion.aside>
  );
};

export default Preloader;

