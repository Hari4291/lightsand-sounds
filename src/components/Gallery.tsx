import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../config/business';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = React.useMemo(() => {
    const list = Array.from(new Set(items.map((item) => item.category)));
    return ['All', ...list];
  }, [items]);

  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = useCallback(() => {
    setActiveImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev! === 0 ? filteredItems.length - 1 : prev! - 1
    );
  }, [activeImageIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev! === filteredItems.length - 1 ? 0 : prev! + 1
    );
  }, [activeImageIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-gold-gradient text-navy-950 font-semibold shadow-md shadow-gold-500/20'
                  : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Balanced Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenLightbox(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-900 border border-slate-800 hover:border-gold-500/40 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/70 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-gold-400" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-navy-950/80 backdrop-blur-sm text-gold-400 border border-gold-500/20">
                  {item.category}
                </span>
              </div>

              {/* Title & Description at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform">
                <h4 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={handleCloseLightbox}
          >
            {/* Top Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-slate-700 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 text-white hover:text-gold-400 hover:bg-slate-800 border border-slate-700 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden border border-gold-500/30 max-h-[70vh] bg-navy-950 flex items-center justify-center shadow-2xl">
                <img
                  src={filteredItems[activeImageIndex].image}
                  alt={filteredItems[activeImageIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-gold-500/15 text-gold-400 border border-gold-500/30 mb-2">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>{filteredItems[activeImageIndex].category}</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {filteredItems[activeImageIndex].title}
                </h3>
                {filteredItems[activeImageIndex].description && (
                  <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
                    {filteredItems[activeImageIndex].description}
                  </p>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  Image {activeImageIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

