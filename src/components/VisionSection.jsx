import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, PenTool, Pencil, Layers, Command, Wand2, Shapes, CircleDot } from 'lucide-react';

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
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400", // Writing desk
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", // Coffee & book
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400", // Library
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400", // Journaling
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", // Creative
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", // Tech
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Content + Icons */}
        <div className="flex flex-col gap-6">
          <div className="max-w-[500px] flex flex-col gap-5">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-[0.95]"
            >
              Our vision for the modern writer.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#666] font-medium text-[16px] max-w-[420px] leading-relaxed"
            >
              We believe in the power of words to shape the world. MindLoom provides a sophisticated canvas for storytellers to reach their audience and spark meaningful global conversations.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-fit bg-transparent border border-gray-200 text-[#111] px-8 py-3 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors mt-2"
            >
              Read more
            </motion.button>
          </div>

          {/* Falling Icon Cluster */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
            className="relative h-[220px] mt-6"
          >
            {icons.map((item, i) => (
              <motion.div
                key={i}
                variants={fallBounce}
                className="absolute shadow-lg flex items-center justify-center bg-white rounded-full border border-gray-100/50"
                style={{ 
                  left: `calc(100px + ${item.x * 0.8}px)`, 
                  top: `${item.y * 0.7}px`,
                  width: i === 3 ? '50px' : '58px',
                  height: i === 3 ? '50px' : '58px',
                  zIndex: 10 + i
                }}
              >
                <div className="scale-75 text-[#111]">{item.icon}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Tabbed Art Grid */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex items-end gap-1 px-4">
            <div className="bg-gray-50 text-gray-400 px-6 py-2.5 rounded-t-xl font-bold text-[12px]">
              Business
            </div>
            <div className="bg-[#111] text-white px-8 py-4 rounded-t-[24px] font-bold text-md relative z-10 flex items-center gap-2 pr-10 shadow-xl">
              Personal
              <div className="absolute top-0 right-0 h-full w-6 bg-[#111] skew-x-[15deg] origin-bottom -z-10 rounded-tr-[24px]" />
            </div>
          </div>

          {/* Grid Container (Folder Look) */}
          <div className="bg-[#111] p-5 rounded-[32px] rounded-tl-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/10">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
              className="bg-white rounded-[26px] p-5 grid grid-cols-2 md:grid-cols-3 gap-3 h-[440px] overflow-hidden"
            >
              {artCards.map((url, i) => (
                <motion.div
                  key={i}
                  variants={fallBounce}
                  className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group cursor-pointer h-full"
                >
                  <img 
                    src={url} 
                    alt={`Art ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
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
