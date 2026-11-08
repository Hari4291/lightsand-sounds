import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/business';
import {
  hasPhoneNumber,
  hasWhatsAppNumber,
  getPhoneCallUrl,
  getWhatsAppUrl
} from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const isPhoneReady = hasPhoneNumber();
  const isWhatsAppReady = hasWhatsAppNumber();
  const phoneUrl = getPhoneCallUrl();
  const whatsappUrl = getWhatsAppUrl(
    'Hello! I am interested in your services. I would like to know more details.'
  );

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 bg-navy-900/70 border-t border-slate-800/80">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 bg-navy-950 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block mb-4">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Let's Talk About{' '}
              <span className="text-gold-gradient">Your Next Event.</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed">
              Have an upcoming function or need any of our services? Get in touch with us directly. We would be happy to assist you.
            </p>
          </motion.div>
        </div>

        {/* Two Premium Contact Cards: CALL US & WHATSAPP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* CARD 1: CALL US */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-5 sm:p-8 md:p-10 bg-gradient-to-b from-navy-800/90 via-navy-900 to-navy-950 border border-slate-800 hover:border-gold-500/50 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-gold-400" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                Call Us
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Talk directly with us for event date availability, custom requirements, and quick consultation.
              </p>

              {isPhoneReady ? (
                <div className="space-y-2">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-sm flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase text-gold-400 block font-semibold">
                        Primary Line
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                        {businessConfig.phoneNumber}
                      </span>
                    </div>
                    {phoneUrl && (
                      <a
                        href={phoneUrl}
                        className="px-3 py-1.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 text-xs font-semibold hover:bg-gold-500 hover:text-navy-950 transition-colors flex-shrink-0"
                      >
                        Dial
                      </a>
                    )}
                  </div>

                  {businessConfig.secondaryPhoneNumber && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-sm flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                          Secondary Line
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                          {businessConfig.secondaryPhoneNumber}
                        </span>
                      </div>
                      <a
                        href={`tel:${businessConfig.secondaryPhoneNumber.replace(/[^0-9+]/g, '')}`}
                        className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-colors flex-shrink-0"
                      >
                        Dial
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-navy-950/50 border border-slate-800/70 text-xs text-slate-400 flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-gold-400/80 flex-shrink-0" />
                  <span>Phone number will be displayed as soon as provided by the owner.</span>
                </div>
              )}
            </div>

            {/* Call Now Button - Hidden if not configured */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800">
              {isPhoneReady && phoneUrl ? (
                <a
                  href={phoneUrl}
                  className="inline-flex items-center justify-center space-x-2 w-full py-3.5 sm:py-4 rounded-full bg-gold-gradient text-navy-950 font-semibold text-sm uppercase tracking-wider shadow-md shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <div className="text-center py-3 text-xs text-slate-500 font-medium">
                  Awaiting phone configuration in <code className="text-gold-400/80">business.ts</code>
                </div>
              )}
            </div>
          </motion.div>

          {/* CARD 2: WHATSAPP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl p-5 sm:p-8 md:p-10 bg-gradient-to-b from-navy-800/90 via-navy-900 to-navy-950 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Message Us on WhatsApp
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Send us your requirements on WhatsApp. Share event dates, venue location, or ask for photos and estimates.
              </p>

              {isWhatsAppReady ? (
                <div className="p-3.5 sm:p-4 rounded-xl bg-navy-950/80 border border-slate-800 text-sm">
                  <span className="text-xs uppercase text-slate-400 block mb-1 font-semibold">
                    Official WhatsApp Line
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    +91 79896 09307
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-navy-950/50 border border-slate-800/70 text-xs text-slate-400 flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400/80 flex-shrink-0" />
                  <span>WhatsApp number will be activated once configured in business.ts.</span>
                </div>
              )}
            </div>

            {/* WhatsApp Us Button - Hidden if not configured */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800">
              {isWhatsAppReady && whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3.5 sm:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-semibold text-sm uppercase tracking-wider shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <div className="text-center py-3 text-xs text-slate-500 font-medium">
                  Awaiting WhatsApp configuration in <code className="text-emerald-400/80">business.ts</code>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Direct Conversation Policy Guarantee (Reinforcing No Forms / No Intermediaries) */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-slate-400 flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Direct conversation with the business owner only &bull; No online booking fees or middlemen.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

