import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, MessageSquare, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/business';
import {
  hasPhoneNumber,
  hasWhatsAppNumber,
  getPhoneCallUrl,
  getWhatsAppUrl
} from '../utils/whatsapp';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Our Work', href: '#work', sectionId: 'work' },
  { label: 'Why Us', href: '#why-us', sectionId: 'why-us' },
  { label: 'Location', href: '#location', sectionId: 'location' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
  { label: 'Visiting Card', href: '#visiting-card', sectionId: 'visiting-card' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phoneUrl = getPhoneCallUrl();
  const whatsappUrl = getWhatsAppUrl(
    `Hello ${businessConfig.businessName}! I am interested in your event services.`
  );
  const isPhoneConfigured = hasPhoneNumber();
  const isWhatsAppConfigured = hasWhatsAppNumber();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/90 backdrop-blur-md py-3 shadow-lg shadow-black/40 border-b border-gold-500/20'
          : 'bg-gradient-to-b from-navy-950/90 via-navy-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2.5 sm:space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1 min-w-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gold-500/40 bg-black flex-shrink-0 flex items-center justify-center group-hover:border-gold-400 transition-colors">
              <img
                src={businessConfig.logo}
                alt={`${businessConfig.businessName} Logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 max-w-[150px] min-[360px]:max-w-[190px] min-[400px]:max-w-[240px] sm:max-w-none">
              <span className="font-serif font-bold text-base min-[360px]:text-lg sm:text-xl text-white tracking-wide truncate group-hover:text-gold-300 transition-colors">
                {businessConfig.businessName}
              </span>
              <span className="hidden min-[380px]:block text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-gold-400 font-semibold uppercase truncate">
                Event Services &bull; Paluri Vari Palli
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-all rounded-md relative ${
                    isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT SIDE: Call Icon & WhatsApp Icon Quick Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
            {/* Right Side Call Button */}
            {isPhoneConfigured && phoneUrl && (
              <a
                href={phoneUrl}
                aria-label="Call business owner"
                className="hidden min-[400px]:inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-gold-gradient text-navy-950 hover:brightness-110 transition-all shadow-md shadow-gold-500/20 active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call</span>
              </a>
            )}

            {/* Right Side WhatsApp Button */}
            {isWhatsAppConfigured && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden min-[400px]:inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-navy-950" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}

            {!isPhoneConfigured && !isWhatsAppConfigured && (
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-gold-gradient text-navy-950 hover:brightness-110 transition-all shadow-md shadow-gold-500/20 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </a>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-gold-400 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-gold-500/20 px-4 pt-3 pb-6 max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-400 font-semibold border-l-2 border-gold-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800 flex flex-col space-y-2.5">
            {isPhoneConfigured && phoneUrl && (
              <a
                href={phoneUrl}
                className="flex items-center justify-center space-x-2 w-full min-h-[48px] py-3 rounded-xl bg-gold-gradient text-navy-950 font-semibold text-sm uppercase tracking-wider shadow-md shadow-gold-500/20 active:scale-98 transition-transform"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now: {businessConfig.phoneNumber}</span>
              </a>
            )}
            {businessConfig.secondaryPhoneNumber && (
              <a
                href={`tel:${businessConfig.secondaryPhoneNumber.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center space-x-2 w-full min-h-[44px] py-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider hover:bg-navy-800 active:scale-98 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                <span>Call Line 2: {businessConfig.secondaryPhoneNumber}</span>
              </a>
            )}
            {isWhatsAppConfigured && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full min-h-[48px] py-3 rounded-xl bg-emerald-500 text-navy-950 font-semibold text-sm uppercase tracking-wider shadow-md shadow-emerald-500/20 active:scale-98 transition-transform"
              >
                <MessageSquare className="w-4 h-4 fill-navy-950" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
