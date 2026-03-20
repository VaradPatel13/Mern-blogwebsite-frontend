import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import LandingNavbar from '@/components/LandingNavbar';
import MasterpieceHero from '@/components/HeroSection';
import CommunitySection from '@/components/CommunitySection';
import VisionSection from '@/components/VisionSection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-white selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1400px] mx-auto w-full flex flex-col font-sans"
      >
        <LandingNavbar />
        
        <main className="w-full flex flex-col">
          <MasterpieceHero scrollProgress={scrollYProgress} />
          <CommunitySection scrollProgress={scrollYProgress} />
          <VisionSection scrollProgress={scrollYProgress} />
        </main>

        <Footer />
      </motion.div>

      <div className="relative z-50">
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default LandingPage;
