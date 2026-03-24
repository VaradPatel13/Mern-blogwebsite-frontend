import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import MasterpieceHero from '@/components/HeroSection';
import CommunitySection from '@/components/CommunitySection';
import VisionSection from '@/components/VisionSection';
import CreativeCraft from '@/components/CreativeCraft';
import LatestStories from '@/components/LatestStories';
import CommunityFind from '@/components/CommunityFind';
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
    "url": "https://scribloom.com", // Replace with your actual domain
    "description": "Cultivating stories in the digital greenhouse. A dynamic community where writers and readers seamlessly merge.",
    "publisher": {
      "@type": "Organization",
      "name": "Scribloom Logo"
    }
  };

  return (
    <>
      {/* Comprehensive SEO Head */}
      <Helmet>
        {/* Core Metadata */}
        <title>Scribloom - Cultivating Stories in the Digital Greenhouse</title>
        <meta name="description" content="Join Scribloom, a dynamic platform and community where creative writers and avid readers seamlessly connect, share ideas, and cultivate compelling stories." />
        <meta name="keywords" content="blogging platform, read stories, write articles, creative writing, digital greenhouse, Scribloom community, interactive blogs" />
        <meta name="author" content="Scribloom" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.com" /> {/* Replace when deployed */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scribloom.com/" />
        <meta property="og:title" content="Scribloom - The Digital Greenhouse for Writers" />
        <meta property="og:description" content="Discover, write, and share exceptional stories built for a modern reading experience." />
        <meta property="og:site_name" content="Scribloom" />
        {/* <meta property="og:image" content="https://scribloom.com/og-image.jpg" /> */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://scribloom.com/" />
        <meta property="twitter:title" content="Scribloom - The Digital Greenhouse" />
        <meta property="twitter:description" content="A premium blogging platform uniting writers and readers." />
        {/* <meta property="twitter:image" content="https://scribloom.com/og-image.jpg" /> */}

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Responsive Application Wrapper */}
      <div 
        ref={containerRef} 
        className="w-full min-h-screen overflow-x-hidden font-manrope text-[#00261b]"
      >
        
        {/* Responsive Content Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-full 2xl:max-w-[1400px] flex flex-col items-center relative z-10"
        >
          <main className="w-full flex flex-col flex-1">
            <MasterpieceHero scrollProgress={scrollYProgress} />
            <CommunitySection scrollProgress={scrollYProgress} />
            <VisionSection scrollProgress={scrollYProgress} />
            <CreativeCraft scrollProgress={scrollYProgress} />
            <LatestStories scrollProgress={scrollYProgress} />
            <CommunityFind scrollProgress={scrollYProgress} />
          </main>
        </motion.div>

        {/* Floating Utilities */}
        <div className="relative z-[100]">
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
