import React from 'react';

/**
 * BlogPostSkeleton — Antigravity skeleton loader that mimics the exact
 * layout of the BlogPostPage article content (skill: no full-page spinners).
 */
const BlogPostSkeleton = () => {
  return (
    <div className="bg-[var(--background)] min-h-screen animate-pulse" aria-label="Loading article…" aria-busy="true">
      
      {/* Header region */}
      <div className="pt-20 pb-12 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Category pill */}
        <div className="w-28 h-6 bg-[#eae8e4] rounded-full mb-8"></div>
        
        {/* Title — 3 lines */}
        <div className="w-full space-y-4 mb-10">
          <div className="h-10 md:h-14 bg-[#eae8e4] rounded-2xl w-11/12 mx-auto"></div>
          <div className="h-10 md:h-14 bg-[#eae8e4] rounded-2xl w-4/5 mx-auto"></div>
          <div className="h-10 md:h-14 bg-[#eae8e4] rounded-2xl w-2/3 mx-auto"></div>
        </div>
        
        {/* Author meta row */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#eae8e4] shrink-0"></div>
          <div className="flex flex-col gap-2 text-left">
            <div className="w-32 h-4 bg-[#eae8e4] rounded-lg"></div>
            <div className="w-48 h-3 bg-[#e4e2de] rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="aspect-[21/9] rounded-2xl bg-[#eae8e4]"></div>
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-12 lg:gap-16 pb-32">
        {/* Left sidebar (desktop) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 pt-2">
          <div className="w-24 h-3 bg-[#eae8e4] rounded-lg mb-4"></div>
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#e4e2de] shrink-0"></div>
              <div className={`h-3 bg-[#eae8e4] rounded-lg ${i % 2 === 0 ? 'w-3/4' : 'w-full'}`}></div>
            </div>
          ))}
        </aside>

        {/* Article prose body */}
        <div className="lg:col-span-7 space-y-5 pt-2">
          {/* Paragraph blocks */}
          {[1,2,3].map(p => (
            <div key={p} className="space-y-3">
              <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-11/12"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-4/5"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
            </div>
          ))}

          {/* Sub-heading */}
          <div className="h-8 bg-[#e4e2de] rounded-xl w-2/3 mt-8"></div>

          {/* More paragraphs */}
          {[1,2].map(p => (
            <div key={p} className="space-y-3">
              <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-5/6"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
              <div className="h-4 bg-[#eae8e4] rounded-lg w-3/4"></div>
            </div>
          ))}

          {/* Block-quote */}
          <div className="border-l-4 border-[#c0c8c3] pl-6 py-4 space-y-2 mt-10">
            <div className="h-5 bg-[#eae8e4] rounded-lg w-full"></div>
            <div className="h-5 bg-[#eae8e4] rounded-lg w-4/5"></div>
          </div>

          {/* Inline image */}
          <div className="aspect-[16/9] rounded-2xl bg-[#eae8e4] mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
