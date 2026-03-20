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
      gridSpan: "lg:col-span-12 xl:col-span-7",
    },
    {
      id: 2,
      title: "How Storytelling became UX.",
      category: "LIFE",
      image: img2,
      date: "Mar 10, 2024",
      aspect: "aspect-square",
      gridSpan: "lg:col-span-6 xl:col-span-5",
    },
    {
      id: 3,
      title: "Modern Writing Strategy.",
      category: "WORK",
      image: img3,
      date: "Mar 08, 2024",
      aspect: "aspect-[3/4]",
      gridSpan: "lg:col-span-6 xl:col-span-4",
    },
    {
      id: 4,
      title: "Finding inspiration in the quiet corners of your city.",
      category: "TRAVEL",
      image: img4,
      date: "Mar 05, 2024",
      aspect: "aspect-video",
      gridSpan: "lg:col-span-7 xl:col-span-5",
    },
    {
      id: 5,
      title: "Tech Minimalism.",
      category: "APPLE",
      image: img5,
      date: "Mar 01, 2024",
      aspect: "aspect-square",
      gridSpan: "lg:col-span-5 xl:col-span-3",
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 overflow-hidden flex flex-col items-center relative z-10">
      <div className="max-w-[1200px] w-full flex flex-col gap-16">
        
        {/* Header - Staggered Segment Reveal */}
        <div className="flex flex-col gap-4 max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-blue-600 uppercase">
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
               <motion.h2 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-[0.95]">
                 Unstructured stories.
               </motion.h2>
            </div>
            <div className="overflow-hidden">
               <motion.h2 variants={segmentVariants} className="text-[2.5rem] md:text-[4rem] font-bold tracking-tighter text-[#111] leading-[0.95]">
                 Published your way.
               </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* Masonry/Collage Grid - Spring Sequence Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
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
              <div className={`relative ${story.aspect} rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`}>
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                   <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
                      <span className="text-[12px] font-bold text-[#111]">Read article</span>
                      <ArrowUpRight size={18} className="text-[#111]" />
                   </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-2 px-2">
                <span className="text-[11px] font-bold tracking-[.15em] text-blue-500 uppercase">
                   {story.category}
                </span>
                <h3 className={`font-bold leading-tight tracking-tight text-[#111] group-hover:text-blue-500 transition-colors ${story.id === 1 ? 'text-[1.8rem] md:text-[2.2rem]' : 'text-[1.4rem]'}`}>
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
