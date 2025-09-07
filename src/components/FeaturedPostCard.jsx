// src/components/FeaturedPostCard.jsx (NEW FILE)

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

const FeaturedPostCard = ({ post }) => {
  if (!post) return null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const snippet = post.body 
    ? new DOMParser().parseFromString(post.body, 'text/html').body.textContent.slice(0, 150) + '...' 
    : '';

  return (
    <Card className="w-full bg-white rounded-2xl border border-amber-200/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-300/80 overflow-hidden">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="md:order-2">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-64 md:h-full object-cover" 
            />
          </div>
          
          {/* Content Section */}
          <div className="md:order-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={post.author?.avatar} alt={post.author?.fullName} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-semibold text-gray-800 text-sm">{post.author?.fullName || 'Unknown'}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {post.title || 'Untitled Post'}
              </h2>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                {snippet}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <span>{formattedDate}</span>
              <span className="flex items-center font-semibold text-amber-600">
                Read More <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default FeaturedPostCard;
