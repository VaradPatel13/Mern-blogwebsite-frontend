import React from 'react';
import { motion } from 'framer-motion';

// --- ANIMATION CONFIGS ---
const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const segmentVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const ArtCardFan = ({ image, index, total, user, color }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Final positions (the "Smile" Arc)
  const rotateZ = offset * 12;
  const xTranslate = offset * 110;
  const yTranslate = (offset * offset) * 8;
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
      {/* Social Badges - Pop in AFTER cards fan out */}
      {user && (
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

      {/* Card Image */}
      <motion.div
        whileHover={{
          y: -20,
          scale: 1.08,
          zIndex: 100,
          transition: { duration: 0.3 }
        }}
        className="w-[130px] h-[180px] md:w-[150px] md:h-[200px] rounded-[28px] overflow-hidden shadow-2xl cursor-pointer bg-white border border-gray-100"
      >
        <img src={image} alt={`Story ${index}`} className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
};

export default function MasterpieceHero() {
  const cards = [
    { image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400", user: null }, // Writing desk
    { image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", user: "coplin", color: "bg-blue-600" }, // Coffee & book
    { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", user: null }, // Tech/Team
    { image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400", user: null }, // Library (Center)
    { image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", user: null }, // Art/Creative
    { image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400", user: "andrea", color: "bg-teal-600" }, // Journaling
    { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", user: null }, // Nature/Inspiration
  ];

  return (
    <section className="bg-white min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-[1200px] mx-auto w-full px-6 flex flex-col items-center text-center">

        {/* 1. STAGGERED HEADLINE */}
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.15 }}
          className="mb-10 relative z-20"
        >
          <div className="overflow-hidden">
            <motion.h1 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-none">
              A place to publish
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 variants={segmentVariants} className="text-[2.5rem] md:text-[2.5rem] font-bold tracking-tighter text-[#111] leading-none mb-0">
              your best stories<span className="text-[#4FD1C5]">.</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* 2. ARC CARD FAN */}
        <div className="relative w-full max-w-[250px] h-[150px] mb-30 flex justify-center">
          {cards.map((card, i) => (
            <ArtCardFan
              key={i}
              index={i}
              total={cards.length}
              image={card.image}
              user={card.user}
              color={card.color}
              tailPosition={card.tailPosition}
            />
          ))}
        </div>

        {/* 3. SUBTITLE & BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-8 relative z-20"
        >
          <p className="text-[#666] font-medium text-[16px] max-w-[550px] leading-relaxed">
            Writers can share their unique perspectives, and readers can discover stories that inspire and shape the world.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-[#111] text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl">
              Start Writing
            </button>
            <button className="bg-white text-[#111] border border-gray-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors">
              Explore stories
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}