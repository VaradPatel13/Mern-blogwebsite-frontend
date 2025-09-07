// src/components/BlogPostCard.jsx (FIXED)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Eye, Heart, Share2, Bookmark } from 'lucide-react';
import { useToast } from "@/components/ui/toast";
import { motion } from 'framer-motion';

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const snippet = post.body 
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent.slice(0, 100) + '...' 
    : '';

  const handleShare = (e) => {
    e.preventDefault(); // Prevent navigation
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: snippet, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "The blog post URL has been copied to your clipboard.",
      });
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Bookmarked!",
      description: `"${post.title}" has been ${isBookmarked ? 'removed from' : 'added to'} your bookmarks.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(245, 158, 11, 0.2)" }}
    >
      {/* The outer Link has been removed. The Card itself is no longer a link. */}
      <Card className="w-full bg-white rounded-xl border border-amber-200/50 p-6 shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-start">
          {/* Left Side: Content */}
          <div className="flex-grow pr-8">
            <div className="flex items-center space-x-2 mb-2">
              {/* This Link is now independent */}
              <Link to={`/profile/${post.author?.username}`} className="flex items-center space-x-2">
                <img src={post.author?.avatar} alt={post.author?.fullName} className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-gray-800 text-sm hover:underline">
                  {post.author?.fullName || 'Unknown'}
                </span>
              </Link>
            </div>
            
            {/* The title and snippet are now their own link */}
            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 hover:text-amber-800 transition-colors duration-200">
                {post.title || 'Untitled Post'}
              </h2>
              <p className="hidden md:block text-gray-600 text-base mb-4">
                {snippet}
              </p>
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{formattedDate}</span>
                <span className="flex items-center space-x-1" title="Views">
                  <Eye size={16} /> 
                  <span>{post.views || 0}</span>
                </span>
                <span className="flex items-center space-x-1" title="Likes">
                  <Heart size={16} /> 
                  <span>{post.likes || 0}</span>
                </span>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                  <button onClick={handleShare} className="hover:text-amber-600 transition-colors z-10" title="Share">
                      <Share2 size={18} />
                  </button>
                  <button onClick={handleBookmark} className="hover:text-amber-600 transition-colors z-10" title="Bookmark">
                      <Bookmark size={18} className={`transition-all ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
              </div>
            </div>
          </div>

          {/* The image is also its own link */}
          <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
            <img 
              src={post.coverImage} 
              alt={post.title || 'Blog post'} 
              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-md" 
            />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default BlogPostCard;
