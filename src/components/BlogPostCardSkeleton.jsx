import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const BlogPostCardSkeleton = () => {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 items-start mb-10 pb-10 border-b border-slate-200 last:border-0">
      <div className="flex flex-col h-full w-full">
        {/* Author Meta */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-6 h-6 rounded-full bg-slate-100" />
          <Skeleton className="h-4 w-24 bg-slate-100 rounded-md" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-3/4 bg-slate-100 rounded-md mb-3" />
        <Skeleton className="h-7 w-1/2 bg-slate-100 rounded-md mb-4" />

        {/* Excerpt */}
        <Skeleton className="h-4 w-full bg-slate-100 rounded-md mb-2" />
        <Skeleton className="h-4 w-5/6 bg-slate-100 rounded-md mb-4" />

        {/* Footer Meta */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <Skeleton className="h-4 w-32 bg-slate-100 rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="w-5 h-5 rounded-md bg-slate-100" />
            <Skeleton className="w-5 h-5 rounded-md bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Image Side */}
      <Skeleton className="hidden md:block w-full h-[140px] bg-slate-100 rounded-lg mt-2 shrink-0" />
    </article>
  );
};

export default BlogPostCardSkeleton;
