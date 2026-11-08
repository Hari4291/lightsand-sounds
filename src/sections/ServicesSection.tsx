import React from 'react';
import { motion } from 'framer-motion';
import { businessConfig } from '../config/business';
import { ServiceCard } from '../components/ServiceCard';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32 bg-navy-950/70 border-t border-slate-800/60">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-900 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Comprehensive Capabilities
            </span>
            <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Everything You Need.{' '}
              <span className="text-gold-gradient">One Place.</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed">
              Complete event solutions designed to make your celebrations special.
            </p>
          </motion.div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessConfig.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

