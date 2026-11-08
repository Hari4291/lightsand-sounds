import React from 'react';
import { motion } from 'framer-motion';
import { LocationMap } from '../components/LocationMap';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-16 sm:py-24 lg:py-32 bg-navy-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-900 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Regional Operations
            </span>
            <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Find Our <span className="text-gold-gradient">Location</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed">
              Visit us at Paluri Vari Palli, Andhra Pradesh.
            </p>
          </motion.div>
        </div>

        {/* Map Component */}
        <LocationMap />
      </div>
    </section>
  );
};

