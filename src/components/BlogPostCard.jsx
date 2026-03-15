import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Share2, ArrowUpRight } from 'lucide-react';
import { useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const minutesRead = post.readingTime || (post.body 
    ? Math.max(1, Math.ceil(post.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 225)) 
    : 1);

  const rawText = post.body
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent
    : '';
  const trimmedText = rawText.startsWith(post.title) ? rawText.slice(post.title.length).trim() : rawText;
  const snippet = trimmedText ? trimmedText.slice(0, 140) + '...' : '';

  const handleShare = (e) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: snippet, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link Copied!", description: "URL copied to clipboard." });
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <Link to={`/blog/${post.slug}`} className="block group bg-white/40 p-6 sm:p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 mb-8">
            <article className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left: Content */}
                <div className="flex-1 order-2 md:order-1">
                    {/* Meta */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <img 
                                src={post.author?.avatar || post.createdBy?.avatar || `https://i.pravatar.cc/100?u=${post.id}`} 
                                alt="" 
                                className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-100" 
                            />
                            <div>
                                <p className="text-[12px] font-bold text-slate-900 leading-none">{post.author?.fullName || post.createdBy?.fullName || 'Anonymous'}</p>
                                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1">{post.category?.name || 'Idea'}</p>
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{minutesRead} MIN</div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900 leading-[1.2] mb-4 tracking-tight group-hover:text-teal-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-500 font-medium text-base leading-relaxed mb-8 line-clamp-3">
                        {snippet}
                    </p>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-4 text-slate-400">
                            <button onClick={handleBookmark} className={`transition-colors h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 ${isBookmarked ? 'text-teal-500 bg-teal-50 border-teal-100' : 'hover:text-slate-900'}`}>
                                <Bookmark size={16} className={isBookmarked ? 'fill-teal-500' : ''} />
                            </button>
                            <button onClick={handleShare} className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 hover:text-slate-900 transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-teal-600 font-bold text-[13px] transition-colors">
                            Read Story <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-[240px] aspect-[16/10] md:aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-sm order-1 md:order-2 shrink-0">
                    <img
                        src={post.coverImage || "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600"}
                        alt=""
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                </div>
            </article>
        </Link>
    </motion.div>
  );
};

export default BlogPostCard;
