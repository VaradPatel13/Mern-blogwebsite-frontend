import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
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

        {/* Featured Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main Featured Post */}
          <Link to="/home" className="block lg:col-span-8 group cursor-pointer">
            <div className="w-full h-[400px] sm:h-[500px] bg-slate-200 rounded-xl overflow-hidden mb-6 relative shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                alt="Edge networks"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-teal-700">
              <span>Technology</span>
              <span className="text-slate-300 mx-2">•</span>
              <span className="text-slate-500">By Sarah Jenkins</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-4 leading-snug">
              The silent architecture of the modern web: How edge networks changed everything
            </h2>

            <p className="text-lg text-slate-600 font-sans leading-relaxed mb-4 line-clamp-2">
              We barely notice the milliseconds it takes to load a webpage, yet beneath the surface lies a terrifyingly sprawling global infrastructure of edge nodes, caching layers, and fiber-optic cables that dictate our digital reality.
            </p>

            <div className="text-sm font-medium text-slate-400 font-sans">
              Oct 24, 2026 · 12 min read
            </div>
          </Link>

          {/* Secondary Posts Column */}
          <div className="lg:col-span-4 flex flex-col gap-10 border-t lg:border-t-0 lg:border-l border-slate-200 pt-10 lg:pt-0 lg:pl-10">

            {/* Secondary Post 1 */}
            <Link to="/home" className="block group cursor-pointer">
              <div className="w-full h-[200px] bg-slate-200 rounded-lg overflow-hidden mb-4 relative shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600"
                  alt="Brain mapping"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">Science</div>
              <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-800 transition-colors">
                Mapping the human brain is harder than we thought
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-2 bg-white">
                Neurologists have uncovered a new layer of complexity in synaptic relationships.
              </p>
              <div className="text-xs font-medium text-slate-400">Oct 23 · 8 min read</div>
            </Link>

            <hr className="border-slate-100" />

            {/* Secondary Post 2 */}
            <Link to="/home" className="block group cursor-pointer">
              <div className="w-full h-[200px] bg-slate-200 rounded-lg overflow-hidden mb-4 relative shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1506509424263-ce90d4538805?auto=format&fit=crop&q=80&w=600"
                  alt="Brutalist architecture"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">Culture</div>
              <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-800 transition-colors">
                The resurgence of brutalist architecture in digital spaces
              </h3>
              <p className="text-sm text-slate-600 line-clamp-3 mb-2">
                Why high-end brands are abandoning soft curves and gradients for harsh borders and raw data formats.
              </p>
              <div className="text-xs font-medium text-slate-400">Oct 21 · 5 min read</div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
