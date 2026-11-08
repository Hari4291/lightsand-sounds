import React from 'react';
import { motion } from 'framer-motion';
import { businessConfig } from '../config/business';
import { Gallery } from '../components/Gallery';

export const GallerySection: React.FC = () => {
  return (
    <section id="work" className="relative py-24 sm:py-32 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-900 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Portfolio &amp; Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Moments We've{' '}
              <span className="text-gold-gradient">Helped Create.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Explore our grand wedding mandapams, royal stages, ambient lighting illumination, DJ dance floors, and tent house setups.
            </p>
          </motion.div>
        </div>

        {/* Interactive Gallery */}
        <Gallery items={businessConfig.galleryImages} />
      </div>
    </section>
  );
};

