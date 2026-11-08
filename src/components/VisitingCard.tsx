import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Download,
  Share2,
  Sparkles,
  ZoomIn,
  X,
  CreditCard,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { businessConfig } from '../config/business';
import {
  hasPhoneNumber,
  hasWhatsAppNumber,
  getPhoneCallUrl,
  getWhatsAppUrl
} from '../utils/whatsapp';
import {
  generateWhatsAppQRCode,
  shareBusinessCard
} from '../utils/visitingCard';

export const VisitingCard: React.FC = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'official' | 'digital'>('official');
  const [isZoomed, setIsZoomed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isPhoneConfigured = hasPhoneNumber();
  const isWhatsAppConfigured = hasWhatsAppNumber();
  const phoneUrl = getPhoneCallUrl();
  const secondaryPhoneUrl = businessConfig.secondaryPhoneNumber
    ? `tel:${businessConfig.secondaryPhoneNumber.replace(/[^0-9+]/g, '')}`
    : null;
  const whatsappUrl = getWhatsAppUrl(
    `Hello ${businessConfig.businessName}! I reached out via your visiting card.`
  );

  // Generate QR code if WhatsApp is available
  useEffect(() => {
    let mounted = true;
    if (isWhatsAppConfigured) {
      generateWhatsAppQRCode().then((data) => {
        if (mounted && data) {
          setQrCodeDataUrl(data);
        }
      });
    } else {
      setQrCodeDataUrl(null);
    }
    return () => {
      mounted = false;
    };
  }, [isWhatsAppConfigured]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadOfficialCard = () => {
    const cardUrl = businessConfig.visitingCardImage || '/images/visiting-card.jpg';
    const link = document.createElement('a');
    link.href = cardUrl;
    link.download = `${businessConfig.businessName.replace(/\s+/g, '-')}-VisitingCard.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Official visiting card downloaded successfully!');
  };

  const handleShare = async () => {
    const result = await shareBusinessCard();
    showToast(result.message);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-navy-900 border border-gold-400 text-slate-100 text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* View Switcher: Official Printed Card vs Digital Card */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('official')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'official'
              ? 'bg-gold-gradient text-navy-950 shadow-lg shadow-gold-500/20'
              : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Official Visiting Card</span>
        </button>

        <button
          onClick={() => setActiveTab('digital')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'digital'
              ? 'bg-gold-gradient text-navy-950 shadow-lg shadow-gold-500/20'
              : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Digital Card & QR Code</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: OFFICIAL PRINTED VISITING CARD (The Real User Card)
         ========================================================================= */}
      {activeTab === 'official' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0f17] via-[#090b12] to-[#05070a] border-2 border-gold-500/50 p-4 sm:p-8 shadow-2xl shadow-black/90"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400 pointer-events-none" />

          {/* Card Presentation Frame */}
          <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-black shadow-2xl">
              <img
                src={businessConfig.visitingCardImage || '/images/visiting-card.jpg'}
                alt={`${businessConfig.businessName} Official Visiting Card`}
                className="w-full h-auto object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Click to Zoom Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-navy-950/90 text-gold-300 border border-gold-500/40 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-xl">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>
          </div>

          {/* Key Card Information Badges */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800">
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold block mb-0.5">
                Proprietor
              </span>
              <span className="text-white font-medium text-sm">
                {businessConfig.ownerName || 'P. Guru Brahmam'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800">
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold block mb-0.5">
                Primary Contact
              </span>
              <a
                href={phoneUrl || `tel:${businessConfig.phoneNumber}`}
                className="text-white font-semibold text-sm hover:text-gold-400 transition-colors"
              >
                {businessConfig.phoneNumber}
              </a>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800">
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold block mb-0.5">
                Secondary Contact
              </span>
              <a
                href={secondaryPhoneUrl || '#'}
                className="text-white font-semibold text-sm hover:text-gold-400 transition-colors"
              >
                {businessConfig.secondaryPhoneNumber || '+91 79936 29400'}
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          TAB 2: DIGITAL INTERACTIVE CARD & WHATSAPP QR CODE
         ========================================================================= */}
      {activeTab === 'digital' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0f17] via-[#090b12] to-[#05070a] border-2 border-gold-500/50 p-6 sm:p-10 shadow-2xl shadow-black/90"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Brand Details */}
            <div className="md:col-span-7 space-y-5">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-black border border-gold-500/50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={businessConfig.logo}
                    alt={businessConfig.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                    {businessConfig.businessName}
                  </h3>
                  <p className="text-xs text-gold-400 font-semibold tracking-widest uppercase">
                    Proprietor: {businessConfig.ownerName || 'P. Guru Brahmam'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs sm:text-sm">
                <div className="text-slate-300">
                  <span className="text-gold-400 font-semibold">📍 Location: </span>
                  {businessConfig.location}
                </div>
                <div className="text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <span className="text-gold-400 font-semibold">📞 Phone 1: </span>
                    {businessConfig.phoneNumber}
                  </span>
                  {businessConfig.secondaryPhoneNumber && (
                    <span>
                      <span className="text-gold-400 font-semibold">📞 Phone 2: </span>
                      {businessConfig.secondaryPhoneNumber}
                    </span>
                  )}
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400 font-semibold">💬 WhatsApp: </span>
                  +{businessConfig.whatsappNumber}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-gold-400 block mb-2">
                  Our Specialities:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  DJ Services, Lighting, Tent House & Shamiana, Car/Driving, Sound Systems, and Event Decorations for weddings & celebrations.
                </p>
              </div>
            </div>

            {/* Right: Owner Image & QR Code */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden bg-navy-950 border-2 border-gold-500/40 shadow-lg">
                <img
                  src={businessConfig.ownerImage}
                  alt={businessConfig.ownerName || 'Business Owner'}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-navy-950/90 py-1 text-center border-t border-gold-500/30">
                  <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider">
                    {businessConfig.ownerName || 'P. Guru Brahmam'}
                  </span>
                </div>
              </div>

              {isWhatsAppConfigured && qrCodeDataUrl && (
                <div className="flex items-center space-x-3 bg-navy-950/90 p-2.5 rounded-xl border border-gold-500/30 max-w-[220px]">
                  <img
                    src={qrCodeDataUrl}
                    alt="Scan to Chat on WhatsApp"
                    className="w-14 h-14 rounded-lg bg-white p-0.5"
                  />
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-white block uppercase tracking-wider">
                      Scan to Chat
                    </span>
                    <span className="text-[9px] text-gold-400 block">
                      Direct WhatsApp
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* 1. Primary Call Button */}
        {isPhoneConfigured && phoneUrl && (
          <a
            href={phoneUrl}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-gold-gradient text-navy-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call {businessConfig.phoneNumber}</span>
          </a>
        )}

        {/* 2. Secondary Call Button */}
        {businessConfig.secondaryPhoneNumber && secondaryPhoneUrl && (
          <a
            href={secondaryPhoneUrl}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs sm:text-sm tracking-wide active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call {businessConfig.secondaryPhoneNumber}</span>
          </a>
        )}

        {/* 3. WhatsApp Us */}
        {isWhatsAppConfigured && whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        )}

        {/* 4. Download Visiting Card */}
        <button
          onClick={handleDownloadOfficialCard}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-navy-900 border border-gold-500/40 text-slate-100 hover:text-gold-300 hover:border-gold-400 font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-navy-800 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4 text-gold-400" />
          <span>Download Visiting Card</span>
        </button>

        {/* 5. Share Visiting Card */}
        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-navy-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-navy-800 active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4 text-slate-300" />
          <span>Share</span>
        </button>
      </div>

      {/* Lightbox Modal for Expanded Visiting Card */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-slate-900/80 text-white hover:text-gold-400 border border-slate-700"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={businessConfig.visitingCardImage || '/images/visiting-card.jpg'}
                alt={`${businessConfig.businessName} Visiting Card`}
                className="max-h-[85vh] w-auto max-w-full rounded-2xl border-2 border-gold-500/50 shadow-2xl object-contain"
              />

              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={handleDownloadOfficialCard}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gold-gradient text-navy-950 font-semibold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Card Image</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitingCard;
