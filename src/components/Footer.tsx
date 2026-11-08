import React from 'react';
import { MapPin, Phone, MessageSquare, ArrowUp, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/business';
import {
  hasPhoneNumber,
  hasWhatsAppNumber,
  getPhoneCallUrl,
  getWhatsAppUrl
} from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isPhoneConfigured = hasPhoneNumber();
  const isWhatsAppConfigured = hasWhatsAppNumber();
  const phoneUrl = getPhoneCallUrl();
  const whatsappUrl = getWhatsAppUrl();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#06080c] border-t border-gold-500/20 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Overview (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-gold-500/40 bg-black flex items-center justify-center">
                <img
                  src={businessConfig.logo}
                  alt={`${businessConfig.businessName} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl text-white tracking-wide">
                  {businessConfig.businessName}
                </h4>
                <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">
                  Event Services
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Providing complete, dependable event arrangements in Paluri Vari Palli. From DJ systems and lighting to tents, sound, car services, and stage decoration.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{businessConfig.location}</span>
              </div>
              {isPhoneConfigured && phoneUrl && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <a href={phoneUrl} className="hover:text-gold-300 transition-colors">
                    {businessConfig.phoneNumber}
                  </a>
                  {businessConfig.secondaryPhoneNumber && (
                    <span className="text-slate-400">
                      / <a href={`tel:${businessConfig.secondaryPhoneNumber.replace(/[^0-9+]/g, '')}`} className="hover:text-gold-300 transition-colors">{businessConfig.secondaryPhoneNumber}</a>
                    </span>
                  )}
                </div>
              )}
              {isWhatsAppConfigured && whatsappUrl && (
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 transition-colors"
                  >
                    +{businessConfig.whatsappNumber} (WhatsApp)
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-serif font-bold text-white text-sm tracking-wider uppercase">
              Quick Navigation
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'Our Work', href: '#work' },
                { label: 'Why Choose Us', href: '#why-us' },
                { label: 'Location Map', href: '#location' },
                { label: 'Contact Us', href: '#contact' },
                { label: 'Digital Visiting Card', href: '#visiting-card' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-gold-300 transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-gold-500/60">&rsaquo;</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All Six Services (Col 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-serif font-bold text-white text-sm tracking-wider uppercase">
              Our Event Services
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {businessConfig.services.map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="hover:text-gold-300 transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-gold-500/60">&bull;</span>
                    <span>{svc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Booking Policy & Scroll To Top (Col 11-12) */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <h5 className="font-serif font-bold text-white text-sm tracking-wider uppercase mb-3">
                Booking Policy
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct phone and WhatsApp bookings only. Transparent arrangements with personalized attention for your family.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-navy-900 border border-slate-700 hover:border-gold-400 text-slate-300 hover:text-gold-300 text-xs font-semibold transition-all w-fit active:scale-95"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>
            &copy; {currentYear} {businessConfig.businessName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Serving Paluri Vari Palli, Andhra Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

