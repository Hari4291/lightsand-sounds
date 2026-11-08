import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../sections/HeroSection';
import { ServicesSection } from '../sections/ServicesSection';
import { GallerySection } from '../sections/GallerySection';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { LocationSection } from '../sections/LocationSection';
import { ContactSection } from '../sections/ContactSection';
import { VisitingCardSection } from '../sections/VisitingCardSection';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 flex flex-col w-full max-w-full overflow-x-hidden">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* Main Content Sections in Exact Required Order */}
      <main className="flex-grow">
        {/* 2. Hero Section – Owner Photo on Right */}
        <HeroSection />

        {/* 3. Services – Six Categories */}
        <ServicesSection />

        {/* 4. Our Work – Gallery */}
        <GallerySection />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Google Maps Location */}
        <LocationSection />

        {/* 7. Contact – Call and WhatsApp Only */}
        <ContactSection />

        {/* 8. Digital Visiting Card */}
        <VisitingCardSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
};

