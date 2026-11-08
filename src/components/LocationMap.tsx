import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { businessConfig } from '../config/business';

export const LocationMap: React.FC = () => {
  // Determine embed URL
  const embedUrl =
    businessConfig.latitude && businessConfig.longitude
      ? `https://maps.google.com/maps?q=${businessConfig.latitude},${businessConfig.longitude}&hl=en&z=15&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(
          businessConfig.defaultMapSearchQuery || businessConfig.location
        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl =
    businessConfig.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      businessConfig.location
    )}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Location Information Panel */}
      <div className="lg:col-span-5 p-5 sm:p-8 rounded-2xl bg-gradient-to-b from-navy-900 via-navy-900/90 to-navy-950 border border-slate-800 flex flex-col justify-between shadow-xl">
        <div>
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
            <Compass className="w-6 h-6 text-gold-400" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
            Local Village Service Base
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            We are locally stationed in{' '}
            <strong className="text-white font-semibold">{businessConfig.location}</strong>. 
            We actively travel and serve functions across Paluri Vari Palli, nearby villages, towns, and surrounding mandals.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Confirmed Regional Base</p>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  {businessConfig.displayAddress || businessConfig.location}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-navy-950/70 p-3.5 sm:p-4 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-gold-400 block mb-1">
                Note for Event Organizers:
              </span>
              Equipment dispatch and crew transport originate directly from Paluri Vari Palli. For exact site visits or venue coordination, reach out to us by phone or WhatsApp.
            </div>
          </div>
        </div>

        {/* Action Button: Get Directions */}
        <div className="pt-6 sm:pt-8 mt-6 border-t border-slate-800">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 w-full px-5 sm:px-6 py-3.5 rounded-full bg-gold-gradient text-navy-950 font-semibold text-sm tracking-wide shadow-md shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span className="truncate">Get Directions on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1 flex-shrink-0" />
          </a>
        </div>
      </div>

      {/* Right: Responsive Interactive Google Maps Embed */}
      <div className="lg:col-span-7 min-h-[320px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl relative bg-navy-900">
        <iframe
          title="Google Maps Location - Paluri Vari Palli"
          src={embedUrl}
          className="w-full h-full min-h-[340px] sm:min-h-[450px] border-0 filter contrast-[1.05] brightness-[0.92]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating location pin card overlay */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 max-w-[calc(100%-1.5rem)] bg-navy-950/90 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-gold-500/30 text-xs text-slate-200 flex items-center space-x-2 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-ping flex-shrink-0" />
          <span className="font-semibold text-white truncate">Guru Tent House &bull; Palurivari Palli</span>
        </div>
      </div>
    </div>
  );
};

