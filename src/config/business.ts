export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  heroDescription: string;
  logo: string;
  ownerImage: string;
  ownerName?: string;
  ownerPlaceholderNote: string;
  visitingCardImage?: string;

  // Contact details
  phoneNumber: string; // primary phone number
  secondaryPhoneNumber?: string; // secondary phone number from visiting card
  whatsappNumber: string; // international format digits for wa.me

  // Location configuration
  location: string;
  displayAddress: string;
  googleMapsUrl: string;
  latitude: number | null;
  longitude: number | null;

  // Village search query fallback for Google Maps embed
  defaultMapSearchQuery: string;

  // Services offered
  services: ServiceItem[];

  // Hero section background image slideshow
  heroBackgroundImages: string[];

  // Gallery items
  galleryImages: GalleryItem[];

  // Social links (empty until owner provides verified profiles)
  socialLinks: Array<{ platform: string; url: string }>;
}

export const businessConfig: BusinessConfig = {
  // Official Business Name
  businessName: "Guru Lights and Sounds",
  tagline: "Making Every Celebration Unforgettable.",
  heroDescription:
    "From electrifying DJ performances and professional lighting to elegant tent arrangements, sound systems, decorations, and transportation — everything you need for your special occasions, all in one place.",
  logo: "/images/logo.jpg",
  
  // Real high-resolution owner photo representation
  ownerImage: "/images/owner-photo.jpg",
  ownerName: "P. Guru Brahmam",
  ownerPlaceholderNote: "Owner photograph: P. Guru Brahmam",
  visitingCardImage: "/images/visiting-card.jpg",

  // OFFICIAL CONTACT NUMBERS (From Official Visiting Card):
  phoneNumber: "+91 79896 09307",
  secondaryPhoneNumber: "+91 79936 29400",
  whatsappNumber: "917989609307",

  // LOCATION (Paluri Vari Palli, Thalluru, Andhra Pradesh):
  location: "Paluri Vari Palli, Thalluru, Andhra Pradesh 523111, India",
  displayAddress: "Guru Tent House, 9JCV+68F, Palurivari Palli, Thalluru, Andhra Pradesh 523111",
  googleMapsUrl: "https://maps.app.goo.gl/KSjNJwgXrG7ZAyS89?g_st=aw",
  latitude: null,
  longitude: null,
  defaultMapSearchQuery: "9JCV+68F Guru tent house, Palurivari Palli, Thalluru, Andhra Pradesh 523111",

  // Hero Section Cinematic Background Slideshow:
  heroBackgroundImages: [
    "/images/gallery/gallery-dj-1.jpg",     // 1. Professional DJ Concert Stages with Colorful Lighting
    "/images/gallery/event-decoration.jpg",  // 2. Grand Wedding Stage Decorations
    "/images/gallery/lighting-services.jpg", // 3. Professional LED Lighting & Stage Focus Shows
    "/images/gallery/tent-house.jpg",        // 4. Premium Tent House & Shamiana Event Setups
    "/images/gallery/sound-system.jpg",      // 5. Professional DJ Sound Systems & Speaker Stacks
    "/images/gallery/gallery-decor-1.jpg",   // 6. Beautiful Mandapam Floral & Event Decorations
  ],

  services: [
    {
      id: "dj-services",
      title: "DJ Services",
      shortDescription:
        "Bring energy to your celebrations with exciting DJ performances and music entertainment.",
      fullDescription:
        "High-energy DJ setups with custom party playlists, modern mixing consoles, and sound balancing tailored for weddings, sangeets, birthday celebrations, and village festivals.",
      image: "/images/gallery/dj-services.jpg",
      category: "DJ Events",
      features: [
        "Live DJ performance & crowd entertainment",
        "Curated playlists for weddings, birthdays & festivals",
        "High-output subwoofers and crystal-clear sound",
        "Microphones for announcements & toasts"
      ]
    },
    {
      id: "lighting-services",
      title: "Lighting Services",
      shortDescription:
        "Create the perfect atmosphere with beautiful lighting arrangements for every occasion.",
      fullDescription:
        "Transform every venue into a luminous wonderland with stage focus lights, ambient LED par lights, moving heads, serial fairy lights, and grand entrance illumination.",
      image: "/images/gallery/lighting-services.jpg",
      category: "Lighting",
      features: [
        "Ambient LED venue uplighting",
        "Intelligent moving head stage lights",
        "Fairy lights & serial decorative illumination",
        "Halogen & flood lights for outdoor grounds"
      ]
    },
    {
      id: "tent-house",
      title: "Tent House",
      shortDescription:
        "Comfortable and attractive tent arrangements for weddings, functions, and special gatherings.",
      fullDescription:
        "Sturdy and elegant shamiana setups, waterproof canopies, VIP seating chairs, dining arrangements, carpets, and decorative sidewalls designed for weather protection and aesthetic charm.",
      image: "/images/gallery/tent-house.jpg",
      category: "Tent House",
      features: [
        "Custom size shamianas & weather-safe canopies",
        "Comfortable seating & banquet chairs with covers",
        "Clean dining tables, buffet counters & carpets",
        "Side wall curtains & decorative ceiling drops"
      ]
    },
    {
      id: "car-driving-services",
      title: "Car / Driving Services",
      shortDescription:
        "Convenient vehicle and driving services for occasions, journeys, and transportation needs.",
      fullDescription:
        "Reliable vehicle and seasoned driving services to transport families, bridal parties, guests, and event VIPs safely and punctually between venues and homes.",
      image: "/images/gallery/car-services.jpg",
      category: "Special Events",
      features: [
        "Special wedding car arrangements",
        "Family & guest transport for functions",
        "Courteous, experienced local drivers",
        "Punctual pick-up and drop-off service"
      ]
    },
    {
      id: "sound-system",
      title: "Sound System",
      shortDescription:
        "Professional sound arrangements for events, functions, and celebrations.",
      fullDescription:
        "Heavy-duty amplification, balanced line arrays, monitor speakers, wireless UHF microphones, and audio mixing units engineered for distortion-free speech and music across large indoor and outdoor venues.",
      image: "/images/gallery/sound-system.jpg",
      category: "Sound Systems",
      features: [
        "Heavy-bass speakers & high-frequency horns",
        "Cordless UHF microphones for stage talks",
        "Audio mixers with vocal echo and equalizer control",
        "Continuous generator backup readiness"
      ]
    },
    {
      id: "event-decoration",
      title: "Event Decoration",
      shortDescription:
        "Enhance your celebrations with attractive decoration and event arrangements.",
      fullDescription:
        "Artistic stage backdrops, fresh and artificial floral archways, photobooth selfie points, fabric draping, and entrance arches tailored to traditional ceremonies and modern parties.",
      image: "/images/gallery/event-decoration.jpg",
      category: "Decorations",
      features: [
        "Grand stage backdrops & traditional mandap decor",
        "Floral entrance arches & welcome selfie points",
        "Ceiling fabric drapes with golden accents",
        "Themed setups for birthdays & anniversaries"
      ]
    }
  ],

  galleryImages: [
    {
      id: "gal-1",
      title: "Royal Kalyana Mandapam Floral Architecture",
      category: "Traditional Indian Wedding Mandap",
      image: "/images/gallery/indian-wedding-mandap-grand.jpg",
      description: "Grand wedding mandap pavilion featuring carved gold pillars, dense fresh marigolds, red roses, and sacred havan seating."
    },
    {
      id: "gal-2",
      title: "Grand Wedding Reception Stage & Royal Seating",
      category: "Grand Wedding Stage Decoration",
      image: "/images/gallery/grand-wedding-stage-luxury.jpg",
      description: "Luxurious royal wedding stage with crystal chandelier accents, velvet backdrops, floral archways, and Maharaja seating."
    },
    {
      id: "gal-3",
      title: "Grand Wedding Stage Ambient Lighting Setup",
      category: "Wedding Lighting Decoration",
      image: "/images/gallery/wedding-reception-stage-lighting.jpg",
      description: "Warm golden stage focus lighting, intelligent LED par cans, and luminous backdrop illumination for marriage reception."
    },
    {
      id: "gal-4",
      title: "Illuminated Wedding Entrance Passage & Drapes",
      category: "Wedding Lighting Decoration",
      image: "/images/gallery/wedding-entrance-passage-lighting.jpg",
      description: "Spectacular canopy walkway illuminated with golden fairy serial lights, crystal chandeliers, and decorative drapery."
    },
    {
      id: "gal-5",
      title: "Wedding Sangeet & Baaraat DJ Dance Celebration",
      category: "DJ and Sangeet Celebrations",
      image: "/images/gallery/indian-wedding-sangeet-dj.jpg",
      description: "Energetic wedding sangeet party with live DJ music, dynamic stage laser lighting, and guests dancing on the celebration floor."
    },
    {
      id: "gal-6",
      title: "Grand Indian Wedding Shamiana & Tent Pandal",
      category: "Wedding Tent House",
      image: "/images/gallery/grand-wedding-shamiana-pandal.jpg",
      description: "Expansive outdoor wedding shamiana pandal with royal ceiling fabric drapes, weather-safe canopies, and banquet dining setup."
    }
  ],

  socialLinks: []
};
