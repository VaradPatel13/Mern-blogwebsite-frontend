import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Bold, Underline, Type, AlignLeft, Sparkles, ChevronRight } from 'lucide-react';

const segmentVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const CreativeCraft = () => {
  return (
    <section className="bg-transparent py-10 md:py-24 px-4 md:px-8 min-h-fit md:min-h-[75vh] overflow-hidden flex items-center justify-center relative z-10">
      <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Floating Canvas / Editor UI */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative order-2 lg:order-1"
        >
          {/* Main Canvas Container */}
          <div className="bg-white rounded-[2rem] p-5 md:p-8 ambient-shadow relative overflow-hidden group">
            
            <div className="flex flex-col gap-8">
              {/* Fake Title - Typing Effect */}
              <div className="flex flex-col gap-3">
                <div className="h-4 w-24 bg-teal-50 rounded-full" />
                <div className="flex flex-wrap gap-x-2">
                  {"The Untold Story of Digital Design.".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="text-[1.2rem] md:text-[1.8rem] font-black tracking-tighter text-[#00261b] leading-tight font-newsreader"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Staggered Text Lines - Writing Story Animation */}
              <div className="flex flex-col gap-4 relative">
                {[0.9, 0.8, 1, 0.6, 0.85].map((w, i) => (
                  <div key={i} className="relative w-full h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${w * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + i * 0.4, duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-[#efeeea] rounded-full origin-left"
                    />
                    {/* Blinking Cursor */}
                    {i === 4 && (
                      <motion.div
                        initial={{ left: "0%" }}
                        whileInView={{ left: `${w * 100 + 1}%` }}
                        viewport={{ once: true }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ 
                          left: { delay: 1.2 + i * 0.4, duration: 1.5, ease: "easeInOut" },
                          opacity: { repeat: Infinity, duration: 0.8 }
                        }}
                        className="absolute top-0 w-1 h-full bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Formatting Bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 mt-4"
              >
                {[
                  { icon: <Bold size={16} />, label: "B" },
                  { icon: <Type size={16} />, label: "T" },
                  { icon: <Sparkles size={16} />, color: "text-teal-500" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-[#f5f3ef] ambient-shadow flex items-center justify-center text-[#00261b] hover:bg-[#bcedd7] transition-colors cursor-pointer"
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Background Decorative Blob */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50 rounded-full blur-[80px] -z-10 opacity-60" />
        </motion.div>

        {/* Right: Text Content */}
        <div className="flex flex-col gap-6 order-1 lg:order-2 max-w-[500px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-teal-600 uppercase">
              EXPERIENCE
            </span>
          </motion.div>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="overflow-hidden">
               <motion.h2 variants={segmentVariants} className="text-[1.8rem] md:text-[3.2rem] font-black tracking-tighter text-[#00261b] leading-[0.9] font-newsreader">
                 Master the art of 
               </motion.h2>
            </div>
            <div className="overflow-hidden">
               <motion.h2 variants={segmentVariants} className="text-[1.8rem] md:text-[3.2rem] font-black tracking-tighter text-[#00261b] leading-[0.9] font-newsreader">
                 storytelling.
               </motion.h2>
            </div>
            
            <motion.p 
              variants={segmentVariants}
              className="mt-2 text-[#00261b]/60 font-medium text-[13px] md:text-[15px] leading-relaxed font-manrope max-w-[420px]"
            >
              Experience a clutter-free environment designed to let your ideas flow. Scribloom strips away the noise so you can focus on what matters most: your craft. 
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 10 }}
            className="w-fit flex items-center gap-3 gradient-primary text-white px-8 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest font-manrope hover:scale-105 transition-all ambient-shadow"
          >
            <span className="relative z-10 font-[700] tracking-tight">Start creating your story</span>
            <ChevronRight size={18} className="translate-y-[1px]" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default CreativeCraft;
