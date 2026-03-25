import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import MasterpieceHero from '@/components/HeroSection';
import CommunitySection from '@/components/CommunitySection';
import VisionSection from '@/components/VisionSection';
import CreativeCraft from '@/components/CreativeCraft';
import LatestStories from '@/components/LatestStories';
import CommunityFind from '@/components/CommunityFind';
import LandingNavbar from '@/components/LandingNavbar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Scribloom",
    "url": "https://scribloom.com",
    "description": "Cultivating stories in the digital greenhouse. A dynamic community where writers and readers seamlessly merge.",
    "publisher": {
      "@type": "Organization",
      "name": "Scribloom Logo"
    }
  };

  return (
    <>
      <Helmet>
        <title>Scribloom - Cultivating Stories in the Digital Greenhouse</title>
        <meta name="description" content="Join Scribloom, a dynamic platform and community where creative writers and avid readers seamlessly connect, share ideas, and cultivate compelling stories." />
        <meta name="keywords" content="blogging platform, read stories, write articles, creative writing, digital greenhouse, Scribloom community, interactive blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.com" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <LandingNavbar />

      <div 
        ref={containerRef} 
        className="w-full min-h-screen overflow-x-hidden font-manrope text-[#00261b] bg-[var(--background)]"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-full 2xl:max-w-[1400px] flex flex-col items-center relative z-10"
        >
          <main className="w-full flex flex-col flex-1 divide-y divide-[#efeeea]/30">
            <section id="hero" className="w-full pt-20">
              <MasterpieceHero scrollProgress={scrollYProgress} />
            </section>
            
            <section id="community" className="w-full">
              <CommunitySection scrollProgress={scrollYProgress} />
            </section>
            
            <section id="vision" className="w-full">
              <VisionSection scrollProgress={scrollYProgress} />
            </section>
            
            <section id="craft" className="w-full">
              <CreativeCraft scrollProgress={scrollYProgress} />
            </section>
            
            <section id="stories" className="w-full">
              <LatestStories scrollProgress={scrollYProgress} />
            </section>
            
            <section id="find" className="w-full">
              <CommunityFind scrollProgress={scrollYProgress} />
            </section>
          </main>
        </motion.div>

        <div className="relative z-[100]">
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
