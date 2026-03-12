import React from 'react';
import LandingNavbar from '@/components/LandingNavbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// A Clean, highly trustworthy CTA block. Deep Navy builds immense trust.
const PublicationCTA = () => {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      
      {/* Subtle texture for the dark background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Why MindLoom? Because your words deserve better.
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
          Tired of chaotic interfaces, paywalls blocking your readers, and algorithms burying your best work? MindLoom is built from the ground up for a pure reading and writing experience. No noise. Just your ideas, reaching the people who care.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <a href="/register" className="w-full sm:w-auto px-10 py-4 bg-teal-500 text-slate-900 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(20,184,166,0.2)] whitespace-nowrap">
            Join the Resistance
          </a>
        </div>
        
        <p className="mt-8 text-xs text-slate-400 font-semibold tracking-widest uppercase flex items-center justify-center gap-3">
          <span>Free Forever</span>
          <span className="w-1 h-1 rounded-full bg-slate-500"></span>
          <span>No Ads</span>
          <span className="w-1 h-1 rounded-full bg-slate-500"></span>
          <span>Full Data Ownership</span>
        </p>

      </div>
    </section>
  )
}

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900">
      
      <LandingNavbar />
      
      <main className="w-full flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PublicationCTA />
      </main>

      <Footer />

      <div className="relative z-50">
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default LandingPage;
