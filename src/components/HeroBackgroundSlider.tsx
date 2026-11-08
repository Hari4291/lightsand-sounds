import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businessConfig } from '../config/business';

interface HeroBackgroundSliderProps {
  images?: string[];
  intervalMs?: number;
}

export const HeroBackgroundSlider: React.FC<HeroBackgroundSliderProps> = ({
  images = businessConfig.heroBackgroundImages,
  intervalMs = 4600
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check accessibility for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload the next 2 images in background to avoid any blank flicker
  useEffect(() => {
    if (!images || images.length === 0) return;
    const nextIdx = (currentIndex + 1) % images.length;
    const nextNextIdx = (currentIndex + 2) % images.length;

    [images[nextIdx], images[nextNextIdx]].forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [currentIndex, images]);

  const handleNext = useCallback(() => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  // Slideshow interval timer with tab visibility pause
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!document.hidden) {
          handleNext();
        }
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [images, intervalMs, handleNext]);

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset timer on manual selection
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!document.hidden) {
        handleNext();
      }
    }, intervalMs);
  };

  if (!images || images.length === 0) return null;

  // Alternate pan direction for variety
  const isEven = currentIndex % 2 === 0;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* =========================================================================
          1. CINEMATIC SLIDESHOW IMAGES WITH KEN BURNS EFFECT
         ========================================================================= */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`hero-slide-${currentIndex}`}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{
            opacity: 1,
            scale: prefersReducedMotion ? 1 : 1.08,
            x: prefersReducedMotion ? 0 : isEven ? [-8, 8] : [8, -8]
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: 'easeInOut' },
            scale: { duration: intervalMs / 1000 + 1.2, ease: 'easeOut' },
            x: { duration: intervalMs / 1000 + 1.2, ease: 'linear' }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt="Guru Lights and Sounds Event Production"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.06]"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* =========================================================================
          2. MULTI-LAYERED LUXURY DARK OVERLAY
         ========================================================================= */}

      {/* Layer A: Asymmetrical directional gradient (Left darker for text, Right more open for stage visual) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030509] via-[#050810]/92 to-[#070b16]/65 lg:via-[#050810]/85 lg:to-[#080d1a]/55" />

      {/* Layer B: Vertical fade at top and bottom for seamless navbar & section blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030509]/80 via-transparent to-[#04060c]" />

      {/* Layer C: Subtle concert atmosphere lighting (Purple & Electric Blue ambient cones) */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 25%, rgba(139, 92, 246, 0.22) 0%, transparent 45%), radial-gradient(circle at 15% 75%, rgba(6, 182, 212, 0.16) 0%, transparent 45%)'
        }}
      />

      {/* Layer D: Muted gold stage glow accent */}
      <div
        className="absolute top-1/3 right-1/4 w-[420px] h-[420px] rounded-full pointer-events-none opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, transparent 70%)'
        }}
      />

      {/* Layer E: Fine architectural dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* =========================================================================
          3. ELEGANT SLIDESHOW INDICATORS (CLICKABLE)
         ========================================================================= */}
      <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 sm:space-x-2.5 pointer-events-auto">
        {images.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => handleSelectSlide(idx)}
              type="button"
              aria-label={`Go to background slide ${idx + 1}`}
              className={`group relative py-2 px-1 focus:outline-none transition-all duration-300`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-7 sm:w-9 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-200 shadow-[0_0_10px_rgba(212,175,55,0.7)]'
                    : 'w-2 sm:w-2.5 bg-white/25 hover:bg-white/50 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroBackgroundSlider;

