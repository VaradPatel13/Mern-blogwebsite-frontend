import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Share2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  // Use server-calculated readingTime if available, otherwise calculate client-side
  const minutesRead = post.readingTime || (post.body 
    ? Math.max(1, Math.ceil(post.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 225)) 
    : 1);
  const hoursRead = Math.floor(minutesRead / 60);
  const remainingMinutes = minutesRead % 60;

  const rawText = post.body
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent
    : '';
  const trimmedText = rawText.startsWith(post.title) ? rawText.slice(post.title.length).trim() : rawText;
  const snippet = trimmedText ? trimmedText.slice(0, 150) + '...' : '';

  const handleShare = (e) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: snippet, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link Copied!", description: "The article URL has been copied." });
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed" : "Saved",
      description: `Article has been ${isBookmarked ? 'removed from' : 'saved to'} your reading list.`,
    });
  };

  return (
    <Link to={`/blog/${post.slug}`} className="block group mb-12 pb-12 border-b border-gray-100 last:border-0 hover:opacity-[0.98] transition-opacity">
      <article className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8 items-start">

        {/* Content Side */}
        <div className="flex flex-col h-full">
          {/* Author Meta */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={post.author?.avatar || post.createdBy?.avatar || "https://i.pravatar.cc/100"} 
              alt="Author" 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <span className="text-sm font-medium text-black">{post.author?.fullName || post.createdBy?.fullName || 'Anonymous'}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-black text-black leading-[1.1] tracking-[-0.03em] mb-4 group-hover:underline decoration-1 underline-offset-[6px] transition-all line-clamp-2">
            {post.title || 'Untitled'}
          </h2>

          {/* Excerpt */}
          <p className="text-[#6B6B6B] font-medium text-[16px] leading-[1.6] mb-6 line-clamp-2">
            {snippet}
          </p>

          {/* Footer Meta */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-[13px] text-[#6B6B6B] font-medium">
              <span>
                {hoursRead > 0 
                  ? `${hoursRead}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}` 
                  : `${minutesRead} min`} read
              </span>
              <span className="mx-3 opacity-40">·</span>
              <span>{post.category?.name || 'General'}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <button onClick={handleBookmark} className={`hover:text-black transition-colors z-10 ${isBookmarked ? 'text-[#D4AF37]' : ''}`} title="Save">
                <Bookmark size={18} className={isBookmarked ? 'fill-[#D4AF37]' : ''} />
              </button>
              <button onClick={handleShare} className="hover:text-black transition-colors z-10" title="Share">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden md:block w-full aspect-[4/3] bg-gray-50 rounded-sm overflow-hidden relative shrink-0 shadow-sm border border-gray-100/50">
          <img
            src={post.coverImage || "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400"}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </article>
    </Link>
  );
};

export default BlogPostCard;
