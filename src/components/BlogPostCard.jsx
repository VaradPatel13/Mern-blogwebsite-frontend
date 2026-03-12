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
    <Link to={`/blog/${post.slug}`} className="block group py-10 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0 hover:opacity-[0.98] transition-opacity">
      <article className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

        {/* Content Side */}
        <div className="flex-1 min-w-0">
          {/* Author Meta */}
          <div className="flex items-center gap-2.5 mb-3 text-xs font-semibold">
            <img 
              src={post.author?.avatar || post.createdBy?.avatar || "https://i.pravatar.cc/100"} 
              alt="Author" 
              className="w-6 h-6 rounded-full object-cover grayscale-[0.2]" 
            />
            <span className="text-slate-900">{post.author?.fullName || post.createdBy?.fullName || 'Anonymous'}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:underline decoration-1 underline-offset-[4px] transition-all line-clamp-3">
            {post.title || 'Untitled'}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {snippet}
          </p>

          {/* Footer Meta */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-[12px] text-slate-400 font-bold uppercase tracking-wider">
              <span>
                {hoursRead > 0 
                  ? `${hoursRead}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}` 
                  : `${minutesRead} min`} read
              </span>
              <span className="mx-2.5 opacity-30">·</span>
              <span className="text-teal-700">{post.category?.name || 'General'}</span>
            </div>

            <div className="flex items-center gap-5 text-slate-300">
              <button onClick={handleBookmark} className={`hover:text-slate-900 transition-colors z-10 ${isBookmarked ? 'text-teal-600' : ''}`} title="Save">
                <Bookmark size={16} className={isBookmarked ? 'fill-teal-600' : ''} />
              </button>
              <button onClick={handleShare} className="hover:text-slate-900 transition-colors z-10" title="Share">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-[200px] lg:w-[240px] aspect-[16/9] md:aspect-[4/3] bg-slate-50 rounded-sm overflow-hidden relative shrink-0">
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
