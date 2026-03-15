import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 z-0 hidden lg:block"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                MindLoom Pulse
              </div>
              
              <h1 className="text-6xl sm:text-8xl lg:text-[7rem] font-bold tracking-tight text-slate-900 leading-[0.9] mb-8">
                Ideas. <br />
                <span className="text-teal-500">Shared.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 max-w-md font-medium leading-relaxed mb-12">
                A simple home for your stories and the people who read them. No noise, just you.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => navigate('/home')}
                  className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl text-lg font-bold transition-all hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                >
                  Start Reading
                </button>
                <button 
                   onClick={() => navigate('/register')}
                   className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl text-lg font-bold transition-all hover:bg-slate-50 hover:border-slate-800 shadow-sm active:scale-95"
                >
                  Publish
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: AI-Inspired Visual */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/50 bg-white/40 backdrop-blur-md p-2">
                <img 
                  src="/blog-mockup.png" 
                  alt="MindLoom Platform" 
                  className="w-full h-auto rounded-[2.5rem] shadow-sm transform transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Decorative Floating Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 rounded-[2rem] blur-2xl z-0"
              />
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-900/5 rounded-[3rem] blur-2xl z-0"
              />
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>

    </div>
  );
};

export default HeroSection;
