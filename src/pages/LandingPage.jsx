import React from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from '@/components/LandingNavbar';
import HeroSection from '@/components/HeroSection';
import { TrendingSection, BenefitsSection } from '@/components/LandingSections';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const PublicationCTA = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100">
          
          <div className="w-full lg:w-3/5 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tighter">
                Start your <span className="text-teal-500">story.</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-md font-medium leading-relaxed mb-10">
                A sanctuary for your ideas. No noise, just a pure space to write and be heard.
              </p>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="/register" 
                className="inline-block px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
              >
                Join MindLoom
              </motion.a>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
             {/* Abstract Creative Visual */}
             <motion.div 
               animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="w-48 h-48 bg-gradient-to-tr from-teal-400 to-teal-100 rounded-[3rem] shadow-2xl shadow-teal-500/20 flex items-center justify-center p-8 relative"
             >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-[3rem]"></div>
                <div className="w-4 h-24 bg-teal-600 rounded-full rotate-45 relative z-10 blur-[0.5px]"></div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white text-slate-900 min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col"
    >
      <LandingNavbar />
      
      <main className="w-full flex-grow">
        <HeroSection />
        <TrendingSection />
        <BenefitsSection />
        <FeaturesSection />
        <PublicationCTA />
      </main>

      <Footer />

      <div className="relative z-50">
        <ScrollToTopButton />
      </div>
    </motion.div>
  );
};

export default LandingPage;
