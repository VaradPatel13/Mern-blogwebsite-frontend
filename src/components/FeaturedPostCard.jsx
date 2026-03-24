import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeaturedPostCard = ({ post }) => {
  if (!post) return null;

  const rawText = post.body
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent
    : '';
  const trimmedText = rawText.startsWith(post.title) ? rawText.slice(post.title.length).trim() : rawText;
  const snippet = trimmedText ? trimmedText.slice(0, 160) + '...' : '';

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10] rounded-[40px] overflow-hidden group mb-16 shadow-2xl"
    >
        {/* Background Image — loading=eager since it's the LCP element */}
        <img
            src={post.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"}
            alt="" /* Decorative — title + content provides context */
            loading="eager"
            fetchPriority="high"
            width="1600"
            height="762"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[#00261b]/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-left max-w-[1000px]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6 flex flex-col items-start"
            >
                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white/80 mb-6 group-hover:bg-white/20 transition-colors">
                    Latest Essay
                </div>
                
                <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-black text-white leading-[1] mb-6 font-newsreader tracking-tighter drop-shadow-2xl">
                    {post.title}
                </h1>
                
                <p className="text-[14px] md:text-[16px] text-white/70 font-medium leading-relaxed mb-10 max-w-[600px] line-clamp-2 md:line-clamp-3 font-manrope">
                    {snippet}
                </p>

                <Link 
                    to={`/blog/${post.slug}`}
                    className="group/btn flex items-center gap-3 bg-white text-[#111] px-8 py-3.5 rounded-full text-[13px] font-black hover:scale-105 hover:bg-[#a0d1bc] hover:text-[#00261b] transition-all shadow-xl"
                >
                    Read More 
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 text-white/20 font-black text-[120px] leading-none select-none pointer-events-none opacity-10 font-newsreader -rotate-12 translate-x-1/2 translate-y-1/2">
            Archive
        </div>
    </motion.div>
  );
};

export default memo(FeaturedPostCard);

