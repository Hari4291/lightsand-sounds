import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  // Always trigger the cinematic preloader on every page load / refresh
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={handlePreloadComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: isLoading ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full min-h-screen"
      >
        <Home />
      </motion.div>
    </>
  );
};

export default App;
