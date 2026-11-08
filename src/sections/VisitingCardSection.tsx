import React from 'react';
import { motion } from 'framer-motion';
import { VisitingCard } from '../components/VisitingCard';

export const VisitingCardSection: React.FC = () => {
  return (
    <section id="visiting-card" className="relative py-24 sm:py-32 bg-navy-950 border-t border-slate-800/80">
      {/* Background Decorative Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-900 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Digital Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Connect With <span className="text-gold-gradient">Us</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Your trusted partner for celebrations and event services.
            </p>
          </motion.div>
        </div>

        {/* Digital Visiting Card Component */}
        <VisitingCard />
      </div>
    </section>
  );
};

