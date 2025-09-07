// src/components/BlogPostCardSkeleton.jsx (NEW FILE)

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const BlogPostCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center space-x-4 pt-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCardSkeleton;