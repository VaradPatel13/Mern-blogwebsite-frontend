import React from 'react';
import { motion } from 'framer-motion';

const avatars = [
  "https://i.pravatar.cc/300?img=25",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Green2&backgroundColor=c7f0d8",
  "https://i.pravatar.cc/300?img=12",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dark1&backgroundColor=2c2c2c",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Blue1&backgroundColor=b6e3f4",
  "https://i.pravatar.cc/300?img=30",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Brown2&backgroundColor=e6ccb2",
  "https://i.pravatar.cc/300?img=10",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Green1&backgroundColor=d1f7c4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dark2&backgroundColor=1a1a1a",
  "https://i.pravatar.cc/300?img=20",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Blue2&backgroundColor=c0e7ff",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Brown1&backgroundColor=eddcc7",
  "https://i.pravatar.cc/300?img=15"
];

const marqueeList = [...avatars, ...avatars, ...avatars, ...avatars];

const CommunityFind = () => {
  return (
    <section className="bg-white pt-20 pb-24 overflow-hidden relative flex flex-col items-center">
      
      {/* Top Banner - Moving RIGHT with Intense Water Wave */}
      <div className="w-full flex mb-8 overflow-visible h-[180px] items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="flex gap-4 md:gap-5 whitespace-nowrap px-4"
        >
          {marqueeList.map((url, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                y: [0, -45, 0, 35, 0], // Full up and down wave
                rotate: [0, 6, 0, -4, 0]
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: i * 0.25 },
                rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: i * 0.2 }
              }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] border-[2.5px] border-white flex-shrink-0"
            >
              <img src={url} alt="User" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Centered Content - Unified Text Sizes */}
      <div className="max-w-[700px] text-center px-4 z-20 flex flex-col items-center gap-5 my-2">
        {/* Brand Icon Badge */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="w-10 h-10 rounded-full border-[1.5px] border-gray-100 shadow-sm flex items-center justify-center bg-white mb-1"
        >
          <div className="w-5 h-5 rounded-full border-[1.5px] border-[#111] flex items-center justify-center">
            <div className="w-1.2 h-2.5 border-r-[1.5px] border-b-[1.5px] border-[#111] rotate-[-45deg] translate-y-[-1px]" />
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-[0.95]"
        >
          You will find yourself <br /> among us
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[#666] font-medium text-[16px] max-w-[420px] leading-relaxed"
        >
          Dive into a dynamic community where writers find their true voice.
        </motion.p>
      </div>

      {/* Bottom Banner - Moving LEFT with Intense Water Wave */}
      <div className="w-full flex mt-8 overflow-visible h-[180px] items-center">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="flex gap-4 md:gap-5 whitespace-nowrap px-4"
        >
          {marqueeList.map((url, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                y: [0, 35, 0, -45, 0], // Inverted wave
                rotate: [0, -6, 0, 4, 0]
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: i * 0.25 },
                rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: i * 0.2 }
              }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] border-[2.5px] border-white flex-shrink-0"
            >
              <img src={url} alt="User" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-gray-50 rounded-full blur-[100px] opacity-60 -z-10" />
    </section>
  );
};

export default CommunityFind;
