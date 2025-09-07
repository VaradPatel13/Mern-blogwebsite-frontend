import React, { useState, useEffect } from 'react';
import LustreText from '@/components/ui/lustretext';
import { WarmLoader } from '@/components/ui/warm-loader';
import LandingNavbar from '@/components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const [loadingStep, setLoadingStep] = useState('loader');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Rotating quotes about writing, blogging, and creativity
  const inspirationalQuotes = [
    "Words have power to inspire change",
    "Every story begins with a single word",
    "Write your truth, share your voice",
    "Creativity flows through every keystroke",
    "Blog your way to meaningful connections",
    "Ideas become reality through writing",
    "Your story matters, tell it boldly",
    "Writing is thinking on paper",
    "Create content that sparks conversations",
    "Transform thoughts into digital legacy"
  ];

  useEffect(() => {
    // Select random quote on component mount
    setCurrentQuoteIndex(Math.floor(Math.random() * inspirationalQuotes.length));

    const timer1 = setTimeout(() => setLoadingStep('lustre'), 2000);
    const timer2 = setTimeout(() => setLoadingStep('content'), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Main Content with improved responsive structure
  const renderContent = () => (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="relative z-50">
        <LandingNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with improved spacing */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* Features Section with better container */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturesSection />
            {/* Scroll to Top Button */}
            <ScrollToTopButton />
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="relative">
        <Footer />
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Loading Animation Phase */}
      {loadingStep === 'loader' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 transition-opacity duration-700 ease-in-out">
          <div className="text-center space-y-6">
            <WarmLoader />
            <p className="text-sm text-amber-600/70 font-medium tracking-wide">
              Loading your creative space...
            </p>
          </div>
        </div>
      )}

      {/* Inspirational Quote Phase */}
      {loadingStep === 'lustre' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 transition-opacity duration-700 ease-in-out">
          <div className="text-center max-w-2xl mx-auto px-6">
            <div className="animate-fade-in">
              <LustreText
                text={inspirationalQuotes[currentQuoteIndex]}
                className="text-amber-700 text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed"
              />
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse mt-6"></div>
          </div>
        </div>
      )}

      {/* Main Content Phase */}
      {loadingStep === 'content' && (
        <div className="animate-fade-in transition-opacity duration-700 ease-in-out">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default LandingPage;