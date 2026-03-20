import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

import img1 from '../assets/photo-1558655146-d09347e92766.jpg';
import img2 from '../assets/photo-1544716278-ca5e3f4abd8c.jpg';
import img3 from '../assets/photo-1455390582262-044cdead277a.jpg';
import img4 from '../assets/photo-1519389950473-47ba0277781c.jpg';
import img5 from '../assets/photo-1507842217343-583bb7270b66.jpg';

const segmentVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const CommunitySection = () => {
  const cards = [
    { image: img1, user: "howard", color: "bg-[#A13333]", rotation: -8, x: 0, y: 0 },
    { image: img2, x: 120, y: 20, rotation: 5 },
    { image: img3, user: "robin", color: "bg-[#111]", x: 240, y: 80, rotation: -2 },
    { image: img4, x: 360, y: 160, rotation: 12 },
    { image: img5, x: 480, y: 220, rotation: -5 },
  ];

  return (
    <section className="bg-[#fcfdfd] py-16 px-6 md:px-12 overflow-hidden min-h-[80vh] flex items-center relative">
      <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <div className="flex flex-col gap-5 max-w-[550px] relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#A13333]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#A13333] uppercase">
              COMMUNITY
            </span>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col"
          >
            <div className="overflow-hidden h-[50px] md:h-[70px]">
              <motion.h2 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-none">
                Write, Share,
              </motion.h2>
            </div>
            <div className="overflow-hidden h-[50px] md:h-[70px]">
              <motion.h2 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-none">
                <span className="text-[#A13333] italic font-serif">&</span> connect with
              </motion.h2>
            </div>
            <div className="overflow-hidden h-[50px] md:h-[70px]">
              <motion.h2 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-none">
                our readers.
              </motion.h2>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[#666] font-medium text-[16px] max-w-[420px] leading-relaxed"
          >
            Dynamic community where writers and readers seamlessly merge. Scribloom brings together creators and enthusiasts to share stories.
          </motion.p>
        </div>

        {/* Right: Card Stack Animation */}
        <div className="relative h-[400px] w-full hidden lg:block perspective-1000">
          {cards.map((card, i) => {
            // Adjust card spread for smaller sizes
            const cardX = (i * 85);
            const cardY = (i * 45);

            return (
              <motion.div
                key={i}
                initial={{ x: 300, y: 200, opacity: 0, rotate: 45 }}
                whileInView={{ x: cardX, y: cardY, opacity: 1, rotate: card.rotation }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute"
                style={{ zIndex: 10 + i }}
              >
                {/* Badge for specific cards */}
                {card.user && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.2, type: "spring", stiffness: 200 }}
                    className={`absolute -top-10 -left-6 z-50`}
                  >
                    <div className={`${card.color} text-white px-4 py-1.5 rounded-full text-[12px] font-bold shadow-xl border-2 border-white/20 relative z-10 antialiased`}>
                      @{card.user}
                    </div>
                    <div className={`w-3 h-3 ${card.color} rotate-45 absolute -bottom-1 left-6 z-0`} />
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ y: -15, rotate: 0, scale: 1.05, zIndex: 100 }}
                  className="w-[150px] h-[200px] md:w-[170px] md:h-[220px] rounded-[24px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] border-2 border-white bg-white"
                >
                  <img src={card.image} alt="Blog card" className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
