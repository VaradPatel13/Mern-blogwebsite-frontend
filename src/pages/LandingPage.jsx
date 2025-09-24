import React from 'react';
import LandingNavbar from '@/components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import Footer from '@/components/Footer';

const LandingPage = () => {
  // The main content is now rendered directly, without the loading sequence.
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="relative z-50">
        <LandingNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* Features Section */}
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
};

export default LandingPage;
