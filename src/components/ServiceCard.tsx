import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../config/business';
import { getServiceEnquiryUrl, hasWhatsAppNumber } from '../utils/whatsapp';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const whatsappEnquiryUrl = getServiceEnquiryUrl(service.title);
  const isWhatsAppConfigured = hasWhatsAppNumber();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-navy-900/90 via-navy-900/60 to-navy-950 border border-slate-800/80 hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-gold-500/10"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-navy-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>{service.category}</span>
          </span>
        </div>

        {/* Index Number */}
        <div className="absolute top-4 right-4">
          <span className="font-serif text-lg font-bold text-slate-400/40 group-hover:text-gold-400/70 transition-colors">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2.5 sm:mb-3 group-hover:text-gold-300 transition-colors">
            {service.title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          {/* Key Features List */}
          <div className="space-y-2.5 mb-8">
            {service.features.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action: Enquire Now via WhatsApp */}
        <div className="pt-4 sm:pt-5 border-t border-slate-800/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
          {isWhatsAppConfigured && whatsappEnquiryUrl ? (
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full min-[380px]:w-auto px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/40 text-emerald-300 hover:text-navy-950 text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm group/btn active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Enquire on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center justify-center space-x-2 w-full min-[380px]:w-auto px-4 py-2 rounded-full bg-navy-900 border border-slate-700 text-slate-300 hover:text-gold-300 hover:border-gold-500/50 text-xs uppercase tracking-wider font-semibold transition-all active:scale-95"
            >
              <span>Contact for Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          <span className="text-[11px] text-slate-500 font-medium">
            Fast Response
          </span>
        </div>
      </div>
    </motion.div>
  );
};

