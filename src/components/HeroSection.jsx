import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import img1 from '../assets/photo-1499750310107-5fef28a66643.jpg';
import img2 from '../assets/photo-1544716278-ca5e3f4abd8c.jpg';
import img3 from '../assets/photo-1519389950473-47ba0277781c.jpg';
import img4 from '../assets/photo-1507842217343-583bb7270b66.jpg';
import img5 from '../assets/photo-1513364776144-60967b0f800f.jpg';
import img6 from '../assets/photo-1455390582262-044cdead277a.jpg';
import img7 from '../assets/photo-1441974231531-c6227db76b6e.jpg';

// --- ANIMATION CONFIGS ---
const segmentVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const ArtCardFan = ({ image, index, total, user, color, isMobile, isTablet }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Spacing scales based on device
  const spreadScale = isMobile ? 45 : (isTablet ? 75 : 110);
  const arcScale = isMobile ? 4 : 8;

  // Final positions (the "Smile" Arc)
  const rotateZ = offset * (isMobile ? 8 : 12);
  const xTranslate = offset * spreadScale;
  const yTranslate = (offset * offset) * arcScale;
  const scale = 1 - Math.abs(offset) * 0.04;

  return (
    <motion.div
      initial={{ x: 0, y: 0, rotateZ: 0, opacity: 0, scale: 0.8 }}
      animate={{
        x: xTranslate,
        y: yTranslate,
        rotateZ: rotateZ,
        opacity: 1,
        scale: scale
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.8 + index * 0.05
      }}
      className="absolute left-1/2 -translate-x-1/2 top-0 group"
      style={{ zIndex: 10 + index }}
    >
      {/* Social Badges - Hidden on mobile if too crowded, or scaled down */}
      {user && !isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 + index * 0.1, type: "spring", stiffness: 200 }}
          className={`absolute -top-14 ${index < centerIndex ? '-left-4' : '-right-6'} z-50`}
        >
          <div className={`${color} text-white px-4 py-1.5 rounded-full text-[12px] font-bold shadow-lg relative z-10 antialiased`}>
            @{user}
          </div>
          <div className={`w-3.5 h-3.5 ${color} rotate-45 absolute -bottom-1 ${index < centerIndex ? 'left-6' : 'right-6'} z-0`} />
        </motion.div>
      )}

      {/* Card Container */}
      <motion.div
        whileHover={{
          y: -20,
          scale: 1.08,
          zIndex: 100,
          transition: { duration: 0.3 }
        }}
        className="w-[100px] h-[140px] md:w-[130px] md:h-[180px] rounded-[1.2rem] md:rounded-[1.8rem] overflow-hidden shadow-2xl cursor-pointer"
      >
        <div className="w-full h-full">
            <img src={image} alt={`Story ${index}`} className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MasterpieceHero() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width < 1024;

  const cards = [
    { image: img1, user: null },
    { image: img2, user: "coplin", color: "bg-blue-600" },
    { image: img3, user: null },
    { image: img4, user: null },
    { image: img5, user: null },
    { image: img6, user: "andrea", color: "bg-teal-600" },
    { image: img7, user: null },
  ];

  return (
    <section className="bg-transparent min-h-fit md:min-h-[70vh] flex justify-center overflow-hidden pt-8 md:pt-16 pb-16 md:pb-32 relative">
      <div className="absolute top-0 right-[-10%] w-[40%] h-[60%] bg-[#bcedd7]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-[-5%] w-[30%] h-[50%] bg-[#ffdad9]/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1100px] mx-auto w-full px-6 flex flex-col items-center text-center relative z-20">

        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.15 }}
          className="mb-10 md:mb-14 relative"
        >
          <div className="overflow-hidden">
            <motion.h1 variants={segmentVariants} className="text-[2.2rem] md:text-[4.5rem] font-black tracking-tighter text-[#00261b] leading-[1] md:leading-[0.9] font-newsreader">
              A place to publish
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 variants={segmentVariants} className="text-[2.2rem] md:text-[4.5rem] font-black tracking-tighter text-[#00261b] leading-[1] md:leading-[0.9] mb-0 font-newsreader">
              your best stories<span className="text-[#a0d1bc]">.</span>
            </motion.h1>
          </div>
        </motion.div>

        <div className="relative w-full max-w-[180px] md:max-w-[250px] h-[140px] md:h-[150px] mb-24 md:mb-32 flex justify-center">
          {cards.map((card, i) => (
            <ArtCardFan
              key={i}
              index={i}
              total={cards.length}
              image={card.image}
              user={card.user}
              color={card.color}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          <p className="text-[#00261b]/60 font-medium text-[12px] md:text-[16px] max-w-[400px] md:max-w-[500px] leading-relaxed font-manrope">
            Writers can share their unique perspectives, and readers can discover stories that inspire and shape the world.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 font-manrope w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto gradient-primary text-white px-10 py-4 rounded-full font-black text-[12px] md:text-[13px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Start Writing
              </button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#e4e2de] text-[#00261b] px-10 py-4 rounded-full font-black text-[12px] md:text-[13px] uppercase tracking-widest hover:bg-[#dbdad6] transition-all">
                Explore stories
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
