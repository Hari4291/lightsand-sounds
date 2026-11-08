import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { businessConfig } from '../config/business';
import { hasPhoneNumber, hasWhatsAppNumber, getPhoneCallUrl, getWhatsAppUrl } from '../utils/whatsapp';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';

export const HeroSection: React.FC = () => {
  const phoneUrl = getPhoneCallUrl();
  const whatsappUrl = getWhatsAppUrl();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 flex items-center overflow-hidden bg-navy-950"
    >
      {/* Cinematic Animated Hero Background Slideshow with Multi-Layered Dark Overlay */}
      <HeroBackgroundSlider />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Main 2-Column Desktop Layout: Left = Content, Right = Owner Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT SIDE: HEADLINE, DESCRIPTION, ACTIONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Location Indicator Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-navy-900/90 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-medium w-fit max-w-full mb-5 sm:mb-6 shadow-sm shadow-gold-500/10">
              <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 animate-pulse" />
              <span className="truncate">Serving Paluri Vari Palli and nearby areas.</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-6">
              Making Every Celebration{' '}
              <span className="text-gold-gradient block sm:inline">
                Unforgettable.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {businessConfig.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, 'services')}
                className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-gold-gradient text-navy-950 font-semibold text-sm tracking-wide shadow-lg shadow-gold-500/20 hover:brightness-110 hover:shadow-gold-500/35 transition-all active:scale-95 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Contact Us button */}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3.5 rounded-full border border-gold-500/40 text-slate-100 hover:text-gold-300 hover:border-gold-400 bg-navy-900/60 backdrop-blur-sm text-sm font-semibold tracking-wide transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Contact Us</span>
              </a>

              {/* Direct Call Button (if phone number is configured) */}
              {hasPhoneNumber() && phoneUrl && (
                <a
                  href={phoneUrl}
                  className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700 active:scale-95"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {businessConfig.phoneNumber}</span>
                </a>
              )}

              {/* Direct WhatsApp Button (if whatsapp number is configured) */}
              {hasWhatsAppNumber() && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-200 text-sm font-medium transition-colors border border-emerald-500/40 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Us</span>
                </a>
              )}
            </div>

            {/* Quick Service Highlights Badges */}
            <div className="pt-6 border-t border-slate-800/80">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3 block">
                All-in-One Event Capabilities:
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {[
                  'DJ Entertainment',
                  'Stage & Ambient Lighting',
                  'Tent House & Shamiana',
                  'Car & Driving Services',
                  'Sound System Engineering',
                  'Stage Decoration'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-1 rounded-md bg-navy-900/80 border border-slate-800 text-slate-300 text-[11px] sm:text-xs"
                  >
                    &bull; {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE: BUSINESS OWNER ORIGINAL PHOTOGRAPH ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-sm lg:max-w-none mx-auto group">
              {/* Outer Decorative Glow & Accent Frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-gold-600/30 via-gold-400/20 to-gold-700/30 blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-navy-900 border-2 border-gold-500/40 shadow-2xl shadow-black/80">
                {/* Subtle Gold Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400 pointer-events-none z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400 pointer-events-none z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400 pointer-events-none z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400 pointer-events-none z-10" />

                {/* Owner Photo: 3:4 portrait aspect ratio, never cropped face */}
                <div className="aspect-[3/4] w-full relative bg-navy-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={businessConfig.ownerImage}
                    alt="Business Owner"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                </div>

                {/* Bottom Verification Label */}
                <div className="px-5 py-3.5 bg-navy-950/95 border-t border-gold-500/30 flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-white text-sm sm:text-base tracking-wide">
                      {businessConfig.ownerName || 'P. Guru Brahmam'}
                    </p>
                    <p className="text-[11px] text-gold-400 font-medium">
                      Proprietor &bull; Direct Supervision
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-gold-500/15 text-gold-300 border border-gold-500/30">
                      Owner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

