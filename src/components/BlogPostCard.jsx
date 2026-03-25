import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { getSnippet } from '../utils/blogTextUtils';

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const snippet = getSnippet(post.body, post.title, 100);

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="group"
    >
        <Link to={`/blog/${post.slug}`} className="block">
            <article className="flex flex-col gap-4 md:gap-6 bg-[#f5f3ef] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 hover:bg-white ambient-shadow h-full">
                {/* Image Wrap */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-[1rem] relative">
                    <img
                        src={post.coverImage || "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"}
                        alt={post.title}
                        loading="lazy"
                        width="800"
                        height="500"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#00261b]/0 group-hover:bg-[#00261b]/5 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 md:gap-3 px-1 md:px-2 flex-grow">
                    <div className="flex items-center gap-2 label-metadata flex-wrap">
                        <span className="text-[#a0d1bc] border-b border-transparent group-hover:border-[#a0d1bc] transition-all text-[11px] md:text-[13px] font-black uppercase tracking-wider">
                            {post.category?.name || 'Archive'}
                        </span>
                        <span className="opacity-30">•</span>
                        <span className="text-[#1a382c]/40 font-bold text-[10px] md:text-[12px] uppercase tracking-wide">
                            {post.createdAt 
                                ? new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.createdAt)) 
                                : 'Recently'}
                        </span>
                    </div>

                    <h2 className="text-[18px] md:text-[24px] font-black text-[#00261b] leading-[1.2] tracking-tight font-newsreader group-hover:text-[#7b5455] transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    <p className="text-[12px] md:text-[14px] text-[#00261b]/50 font-medium leading-relaxed line-clamp-2 md:line-clamp-3 font-manrope">
                        {snippet}
                    </p>
                </div>
            </article>
        </Link>
    </motion.div>
  );
};

export default memo(BlogPostCard);

