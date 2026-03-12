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
    <Link to={`/blog/${post.slug}`} className="block group mb-12">
      <div className="w-full bg-white rounded-none border-0 border-b border-gray-100 pb-12 shadow-none transition-transparent overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image Section */}
          <div className="lg:col-span-7 overflow-hidden rounded-sm bg-gray-50 relative aspect-[16/9]">
            <img
              src={post.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Content Section */}
          <div className="lg:col-span-5 flex flex-col justify-center py-1">
            <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D00]">
              <span>Featured Story</span>
            </div>

            <h2 className="text-2xl lg:text-[32px] font-black text-black mb-4 leading-[1.1] tracking-[-0.03em] group-hover:underline decoration-1 underline-offset-[6px] transition-all line-clamp-3">
              {post.title || 'Untitled Post'}
            </h2>

            <p className="text-[16px] text-[#6B6B6B] font-medium leading-[1.5] mb-6 line-clamp-3 pr-2">
              {snippet}
            </p>

            <div className="flex items-center text-[13px] font-medium text-[#6B6B6B] mt-auto">
              <span>By {post.author?.fullName || post.createdBy?.fullName || 'Unknown'}</span>
              <span className="mx-3 opacity-40">·</span>
              <span>
                {hoursRead > 0 
                  ? `${hoursRead}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}` 
                  : `${minutesRead} min`} read
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostCard;
