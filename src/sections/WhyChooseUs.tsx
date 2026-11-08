import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, HeartHandshake, CalendarCheck2 } from 'lucide-react';

const advantages = [
  {
    icon: Layers,
    title: 'Multiple Services in One Place',
    description:
      'Coordinate DJ entertainment, lighting, tent house, sound systems, decoration, and vehicle transportation through one single dedicated team without vendor hassle.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Equipment and Arrangements',
    description:
      'We invest in modern audio mixers, high-output speakers, safe electrical wiring, ambient stage lights, and clean, weather-ready shamiana canopies.'
  },
  {
    icon: HeartHandshake,
    title: 'Reliable and Friendly Service',
    description:
      'We arrive on schedule for early setup, provide responsive supervision throughout the celebration, and treat every family and guest with utmost warmth.'
  },
  {
    icon: CalendarCheck2,
    title: 'Support for Different Occasions',
    description:
      'From traditional wedding functions and sangeets to birthday parties, village festivals, and intimate family gatherings, our arrangements adapt to your needs.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-navy-900/60 border-t border-slate-800/80">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[25rem] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-950 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Dedicated Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Your Celebration.{' '}
              <span className="text-gold-gradient">Our Commitment.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Straightforward, genuine service you can depend on for life’s most cherished milestones.
            </p>
          </motion.div>
        </div>

        {/* 4 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gradient-to-b from-navy-800/60 to-navy-950/80 border border-slate-800 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon with Gold Accent Ring */}
                  <div className="w-14 h-14 rounded-xl bg-navy-900 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-400 transition-all shadow-md shadow-gold-500/10">
                    <Icon className="w-7 h-7 text-gold-400" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-[11px] font-semibold text-gold-400 tracking-wider uppercase">
                  <span>Advantage 0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

