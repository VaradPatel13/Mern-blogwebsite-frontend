import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const FeaturedPostCard = ({ post }) => {
  if (!post) return null;

  const minutesRead = post.readingTime || (post.body 
    ? Math.max(1, Math.ceil(post.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 225)) 
    : 1);

  const rawText = post.body
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent
    : '';
  const trimmedText = rawText.startsWith(post.title) ? rawText.slice(post.title.length).trim() : rawText;
  const snippet = trimmedText ? trimmedText.slice(0, 180) + '...' : '';

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <Link to={`/blog/${post.slug}`} className="block group mb-16">
            <div className="relative bg-white rounded-[3rem] p-4 sm:p-6 border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-teal-900/5 transition-all duration-700">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    
                    {/* Image Section */}
                    <div className="w-full lg:w-3/5 aspect-[16/10] overflow-hidden rounded-[2.5rem] relative shadow-lg">
                        <img
                            src={post.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                           <Sparkles size={14} className="text-teal-600" /> Featured
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-2/5 pr-6 lg:py-6 text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <img 
                                src={post.author?.avatar || post.createdBy?.avatar || `https://i.pravatar.cc/100?u=${post.id}`} 
                                alt="" 
                                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100" 
                            />
                            <div>
                                <p className="text-[13px] font-bold text-slate-900 leading-none">{post.author?.fullName || post.createdBy?.fullName || 'Anonymous'}</p>
                                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1.5">{post.category?.name || 'General'}</p>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tighter group-hover:text-teal-600 transition-colors">
                            {post.title}
                        </h2>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                            {snippet}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                                {minutesRead} MIN READ
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center transition-all group-hover:bg-teal-600 group-hover:translate-x-1">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    </motion.div>
  );
};

export default FeaturedPostCard;
