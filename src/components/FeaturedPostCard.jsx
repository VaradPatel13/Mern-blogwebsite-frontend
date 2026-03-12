import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";

const FeaturedPostCard = ({ post }) => {
  if (!post) return null;

  // Use server-calculated readingTime if available, otherwise calculate client-side
  const minutesRead = post.readingTime || (post.body 
    ? Math.max(1, Math.ceil(post.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 225)) 
    : 1);
  const hoursRead = Math.floor(minutesRead / 60);
  const remainingMinutes = minutesRead % 60;

  const rawText = post.body
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent
    : '';
  // Remove the title from the start of the snippet to avoid duplication
  const trimmedText = rawText.startsWith(post.title) ? rawText.slice(post.title.length).trim() : rawText;
  const snippet = trimmedText ? trimmedText.slice(0, 180) + '...' : '';

  return (
    <Link to={`/blog/${post.slug}`} className="block group mb-8 md:mb-16">
      <div className="w-full bg-white transition-all overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image Section */}
          <div className="w-full lg:col-span-8 overflow-hidden rounded-sm bg-slate-50 relative aspect-[16/9] lg:aspect-[3/2] shadow-sm">
            <img
              src={post.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
              <span className="w-8 h-[2px] bg-teal-600 hidden lg:block"></span>
              <span>Featured Story</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-teal-900 transition-colors">
              {post.title || 'Untitled Post'}
            </h2>

            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
              {snippet}
            </p>

            <div className="flex items-center text-sm font-bold text-slate-400 mt-auto">
              <span className="text-slate-900 uppercase tracking-widest text-[11px]">{post.author?.fullName || post.createdBy?.fullName || 'Editor'}</span>
              <span className="mx-3 opacity-30">/</span>
              <span>
                {minutesRead} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostCard;
