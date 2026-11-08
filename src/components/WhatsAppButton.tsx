import React, { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { businessConfig } from '../config/business';
import {
  hasPhoneNumber,
  hasWhatsAppNumber,
  getPhoneCallUrl,
  getWhatsAppUrl
} from '../utils/whatsapp';

export const WhatsAppButton: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<'phone' | 'whatsapp' | null>(null);

  const phoneUrl = getPhoneCallUrl();
  const whatsappUrl = getWhatsAppUrl(
    `Hello ${businessConfig.businessName}! I would like to enquire about your event services in Paluri Vari Palli.`
  );

  const isPhoneConfigured = hasPhoneNumber();
  const isWhatsAppConfigured = hasWhatsAppNumber();

  // If neither is configured, hide floating container
  if (!isPhoneConfigured && !isWhatsAppConfigured) {
    return null;
  }

  return (
    <aside
      aria-label="Quick contact links"
      className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end space-y-3 pointer-events-auto"
    >
      {/* 1. FLOATING CALL BUTTON (RIGHT SIDE) */}
      {isPhoneConfigured && phoneUrl && (
        <div className="relative flex items-center">
          {/* Tooltip on hover */}
          {hoveredButton === 'phone' && (
            <div className="mr-3 px-3 py-1.5 rounded-lg bg-navy-900/95 border border-gold-400 text-gold-300 text-xs font-semibold shadow-xl whitespace-nowrap animate-fadeIn">
              Call {businessConfig.phoneNumber}
            </div>
          )}

          <a
            href={phoneUrl}
            onMouseEnter={() => setHoveredButton('phone')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Call business owner"
            className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gold-gradient text-navy-950 shadow-xl shadow-gold-500/25 hover:shadow-gold-500/45 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-400/50"
          >
            {/* Subtle pulse ring */}
            <span className="absolute -inset-1 rounded-full bg-gold-400 opacity-30 group-hover:animate-ping pointer-events-none" />
            <Phone className="w-6 h-6 fill-navy-950 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>
      )}

      {/* 2. FLOATING WHATSAPP BUTTON (RIGHT SIDE) */}
      {isWhatsAppConfigured && whatsappUrl && (
        <div className="relative flex items-center">
          {/* Tooltip on hover */}
          {hoveredButton === 'whatsapp' && (
            <div className="mr-3 px-3 py-1.5 rounded-lg bg-navy-900/95 border border-emerald-400 text-emerald-300 text-xs font-semibold shadow-xl whitespace-nowrap animate-fadeIn">
              WhatsApp: 7989609307
            </div>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredButton('whatsapp')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Chat on WhatsApp"
            className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
          >
            {/* Ripple Pulse */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-navy-950 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      )}
    </aside>
  );
};
