import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, PenTool, Pencil, Layers, Command, Wand2, Shapes, CircleDot } from 'lucide-react';

import img1 from '../assets/photo-1499750310107-5fef28a66643.jpg';
import img2 from '../assets/photo-1544716278-ca5e3f4abd8c.jpg';
import img3 from '../assets/photo-1507842217343-583bb7270b66.jpg';
import img4 from '../assets/photo-1455390582262-044cdead277a.jpg';
import img5 from '../assets/photo-1513364776144-60967b0f800f.jpg';
import img6 from '../assets/photo-1519389950473-47ba0277781c.jpg';

const fallBounce = {
  initial: { y: -400, rotate: -360, opacity: 0 },
  animate: { 
    y: 0, 
    rotate: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 14,
      mass: 1.2
    }
  }
};

const VisionSection = () => {
  const icons = [
    { icon: <Paintbrush size={30} strokeWidth={1.2} />, x: -40, y: -40 }, // Top
    { icon: <PenTool size={30} strokeWidth={1.2} />, x: -100, y: 30 }, // Left Nib
    { icon: <div className="border-[1.5px] border-black rounded-full p-2.5"><Pencil size={18} strokeWidth={1.5} /></div>, x: -50, y: 130 }, // Pencil in Circle
    { icon: <div className="relative w-10 h-10"><div className="absolute w-6 h-6 rounded-full border-[1.5px] border-black left-0 top-0" /><div className="absolute w-6 h-6 rounded-full border-[1.5px] border-black right-0 top-0" /><div className="absolute w-6 h-6 rounded-full border-[1.5px] border-black left-1/2 -translate-x-1/2 bottom-0" /></div>, x: 20, y: 45 }, // 3 Circles
    { icon: <Layers size={30} strokeWidth={1.2} />, x: 70, y: 140 }, // Layers
    { icon: <div className="border-[1.5px] border-black rounded-full p-1.5"><Command size={24} strokeWidth={1.5} /></div>, x: 160, y: 65 }, // Command Button
    { icon: <div className="rotate-[15deg]"><Wand2 size={32} strokeWidth={1.2} /></div>, x: 240, y: 120 }, // Magic Wand
    { icon: <div className="relative w-12 h-12"><div className="absolute w-6 h-6 border-[1.5px] border-black left-0 top-0" /><div className="absolute w-7 h-7 rounded-full border-[1.5px] border-black right-0 bottom-0" /><div className="absolute bottom-1 left-2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-black/80"><div className="absolute top-[2px] left-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white" /></div></div>, x: 310, y: 40 }, // Shapes Cluster
  ];

  const artCards = [
    img1, // Writing desk
    img2, // Coffee & book
    img3, // Library
    img4, // Journaling
    img5, // Creative
    img6, // Tech
  ];

  return (
    <section className="bg-transparent py-14 md:py-24 px-4 md:px-8 overflow-hidden min-h-fit md:min-h-[75vh] flex items-center justify-center">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Content + Icons */}
        <div className="flex flex-col gap-6">
          <div className="max-w-[500px] flex flex-col gap-5">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-[2rem] md:text-[3.6rem] font-black tracking-tighter text-[#00261b] leading-[0.9] font-newsreader"
            >
              Our vision for the modern writer.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-[#00261b]/60 font-medium text-[13px] md:text-[15px] max-w-[420px] leading-relaxed font-manrope"
            >
              We believe in the power of words to shape the world. Scribloom provides a sophisticated canvas for storytellers to reach their audience and spark meaningful global conversations.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-fit bg-[#e4e2de] text-[#00261b] px-8 py-2.5 rounded-full font-bold text-[11px] font-manrope uppercase tracking-widest hover:bg-[#dbdad6] transition-all mt-4 ambient-shadow"
            >
              Read more
            </motion.button>
          </div>

          {/* Falling Icon Cluster - Hidden on mobile to save space since icons are currently disabled */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
            className="relative hidden lg:block h-[220px] mt-6"
          >
            {/* {icons.map((item, i) => (
              <motion.div
                key={i}
                variants={fallBounce}
                className="absolute ambient-shadow flex items-center justify-center bg-white rounded-full"
                style={{ 
                   left: `calc(100px + ${item.x * 0.8}px)`, 
                   top: `${item.y * 0.7}px`,
                   width: i === 3 ? '40px' : '52px',
                   height: i === 3 ? '40px' : '52px',
                   zIndex: 10 + i,
                   border: 'none'
                }}
              >
                <div className="scale-50 text-[#7b5455]">{item.icon}</div>
              </motion.div>
            ))} */}
          </motion.div>
        </div>

        {/* Right Column: Tabbed Art Grid */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex items-end gap-1 px-4">
            <div className="bg-[var(--background)] text-[#111]/40 px-4 py-2 rounded-t-xl font-bold text-[10px] font-manrope uppercase tracking-widest border border-b-0 border-[#efeeea]">
              Business
            </div>
            <div className="bg-[#00261b] text-white px-6 py-3 rounded-t-xl font-bold text-[11px] font-manrope uppercase tracking-widest relative z-10 flex items-center gap-2 pr-8 shadow-xl border border-b-0 border-[#00261b]">
              Personal
              <div className="absolute top-0 right-0 h-full w-4 bg-[#00261b] skew-x-[15deg] origin-bottom -z-10 rounded-tr-xl" />
            </div>
          </div>

          {/* Grid Container (Folder Look) */}
          <div className="bg-[#00261b] p-3 rounded-[2.5rem] rounded-tl-none ambient-shadow">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
              className="bg-transparent rounded-[2rem] p-1.5 grid grid-cols-2 md:grid-cols-3 gap-2 h-[260px] overflow-hidden"
            >
              {artCards.map((url, i) => (
                <motion.div
                  key={i}
                  variants={fallBounce}
                  className="rounded-[1.5rem] overflow-hidden group cursor-pointer h-full"
                >
                  <img 
                    src={url} 
                    alt={`Art ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionSection;
