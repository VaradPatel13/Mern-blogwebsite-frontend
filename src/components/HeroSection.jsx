import React from 'react';
import { Link } from 'react-router-dom';
import landingData from '../data/landingData.json';

const HeroSection = () => {
  const { categories, featuredPost, secondaryPosts } = landingData;

  return (
    <section className="pt-40 lg:pt-48 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Publication Title/Welcome */}
        <div className="max-w-3xl mb-12 border-b-2 border-slate-900 pb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-6">
            Ideas that matter, <br />from independent voices.
          </h1>
          <p className="text-xl text-slate-600 font-sans max-w-2xl leading-relaxed">
            Discover profound essays, breaking analysis, and intimate stories crafted by the world's most insightful writers.
          </p>
        </div>

        {/* Topics Bar - Requested by USER */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-16 pb-6 border-b border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Discover Topics</span>
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((topic) => (
              <Link 
                key={topic} 
                to="/home" 
                className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-700 transition-all hover:border-slate-300"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main Featured Post */}
          <Link to="/home" className="block lg:col-span-8 group cursor-pointer">
            <div className="w-full h-[400px] sm:h-[500px] bg-slate-200 rounded-xl overflow-hidden mb-6 relative shadow-sm">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-teal-700">
              <span>{featuredPost.category}</span>
              <span className="text-slate-300 mx-2">•</span>
              <span className="text-slate-500">By {featuredPost.author}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-4 leading-snug">
              {featuredPost.title}
            </h2>

            <p className="text-lg text-slate-600 font-sans leading-relaxed mb-4 line-clamp-2">
              {featuredPost.excerpt}
            </p>

            <div className="text-sm font-medium text-slate-400 font-sans">
              {featuredPost.date} · {featuredPost.readTime}
            </div>
          </Link>

          {/* Secondary Posts Column */}
          <div className="lg:col-span-4 flex flex-col gap-10 border-t lg:border-t-0 lg:border-l border-slate-200 pt-10 lg:pt-0 lg:pl-10">
            {secondaryPosts.map((post, idx) => (
              <React.Fragment key={idx}>
                <Link to="/home" className="block group cursor-pointer">
                  <div className="w-full h-[200px] bg-slate-200 rounded-lg overflow-hidden mb-4 relative shadow-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">{post.category}</div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-800 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2 bg-white">
                    {post.excerpt}
                  </p>
                  <div className="text-xs font-medium text-slate-400">{post.date} · {post.readTime}</div>
                </Link>
                {idx === 0 && <hr className="border-slate-100" />}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
