import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import landingData from '../data/landingData.json';

const FeaturesSection = () => {
  const { latestPosts } = landingData;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-slate-300">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Latest from the network</h2>
          <Link to="/home" className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center group transition-colors">
            View all stories
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {latestPosts.map((post, idx) => (
            <Link to="/home" key={idx} className="group cursor-pointer flex flex-col h-full bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">

              {/* Image Placeholder */}
              <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden mb-5 relative shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
                <span>{post.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-800 transition-colors shrink-0">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm font-sans leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author & Date */}
              <div className="flex items-center justify-between mt-auto pt-4 text-xs shrink-0 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${idx}`} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-semibold text-slate-800">{post.author}</span>
                </div>
                <div className="text-slate-500">
                  {post.date} · {post.readTime}
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
