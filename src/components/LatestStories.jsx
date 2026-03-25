import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import img1 from '../assets/photo-1499750310107-5fef28a66643.jpg';
import img2 from '../assets/photo-1544716278-ca5e3f4abd8c.jpg';
import img3 from '../assets/photo-1507842217343-583bb7270b66.jpg';
import img4 from '../assets/photo-1513364776144-60967b0f800f.jpg';
import img5 from '../assets/photo-1519389950473-47ba0277781c.jpg';

const segmentVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const LatestStories = () => {
  const stories = [
    {
      id: 1,
      title: "The Silent Evolution of Minimalist Digital Design.",
      category: "DESIGN",
      image: img1,
      date: "Mar 12, 2024",
      aspect: "aspect-[16/10]",
      gridSpan: "md:col-span-2 lg:col-span-12 xl:col-span-7",
    },
    {
      id: 2,
      title: "How Storytelling became UX.",
      category: "LIFE",
      image: img2,
      date: "Mar 10, 2024",
      aspect: "aspect-square",
      gridSpan: "md:col-span-1 lg:col-span-6 xl:col-span-5",
    },
    {
      id: 3,
      title: "Modern Writing Strategy.",
      category: "WORK",
      image: img3,
      date: "Mar 08, 2024",
      aspect: "aspect-[3/4]",
      gridSpan: "md:col-span-1 lg:col-span-6 xl:col-span-4",
    },
    {
      id: 4,
      title: "Finding inspiration in the corners of your city.",
      category: "TRAVEL",
      image: img4,
      date: "Mar 05, 2024",
      aspect: "aspect-video",
      gridSpan: "md:col-span-1 lg:col-span-7 xl:col-span-5",
    },
    {
      id: 5,
      title: "Tech Minimalism.",
      category: "APPLE",
      image: img5,
      date: "Mar 01, 2024",
      aspect: "aspect-square",
      gridSpan: "md:col-span-1 lg:col-span-5 xl:col-span-3",
    }
  ];

  return (
    <section className="bg-[#f5f3ef] py-14 md:py-28 px-4 md:px-6 overflow-hidden flex flex-col items-center justify-center min-h-fit md:min-h-[75vh] relative z-10 transition-colors duration-700">
      <div className="max-w-[1000px] w-full flex flex-col gap-10">
        
        {/* Header - Staggered Segment Reveal */}
        <div className="flex flex-col gap-4 max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#7b5455]" />
            <span className="label-metadata">
              EDITORIAL
            </span>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
            className="flex flex-col"
          >
            <div className="overflow-hidden">
               <motion.h2 variants={segmentVariants} className="text-[1.8rem] md:text-[2.6rem] font-black tracking-tighter text-[#00261b] leading-[0.9] font-newsreader">
                 Unstructured stories.
               </motion.h2>
            </div>
            <div className="overflow-hidden">
               <motion.h2 variants={segmentVariants} className="text-[1.8rem] md:text-[2.6rem] font-black tracking-tighter text-[#00261b] leading-[0.9] font-newsreader">
                 Published your way.
               </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Masonry/Collage Grid - Spring Sequence Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 45, 
                damping: 15, 
                delay: i * 0.15 
              }}
              className={`${story.gridSpan} group cursor-pointer flex flex-col gap-5`}
            >
              {/* Image Container with Hover Depth */}
              <div className={`relative ${story.aspect} rounded-[1rem] overflow-hidden bg-white ambient-shadow`}>
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                   <div className="glass-surface px-3 py-1.5 rounded-full ambient-shadow flex items-center gap-1.5">
                      <span className="text-[8px] font-bold text-[#00261b] uppercase tracking-widest font-manrope">Read article</span>
                      <ArrowUpRight size={12} className="text-[#00261b]" />
                   </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-1 px-1 mt-2">
                <span className="label-metadata text-[#7b5455]">
                   {story.category}
                </span>
                <h3 className={`font-black leading-tight tracking-tight text-[#00261b] font-newsreader group-hover:text-[#7b5455] transition-colors ${story.id === 1 ? 'text-[1.2rem] md:text-[1.5rem]' : 'text-[1rem]'}`}>
                  {story.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestStories;
