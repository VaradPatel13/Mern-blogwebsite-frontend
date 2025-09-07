// src/components/ui/warm-loader.jsx (NEW FILE)
import React from 'react';
import { cn } from '@/lib/utils';

export const WarmLoader = ({ className }) => {
  return (
    <div className={cn("flex space-x-2 justify-center items-center", className)}>
      <span className='sr-only'>Loading...</span>
      <div className='h-4 w-4 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-amber-500 rounded-full animate-bounce'></div>
    </div>
  );
};