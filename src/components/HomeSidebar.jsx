// src/components/HomeSidebar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { getAllTags } from '../services/tagService';
import { Skeleton } from '@/components/ui/skeleton';

const HomeSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          getAllCategories(),
          getAllTags()
        ]);
        
        if (catRes.success) setCategories(catRes.data);
        if (tagRes.success) setTags(tagRes.data);
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const SkeletonLoader = () => (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Categories Section */}
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Discover by Category</h3>
          {loading ? <SkeletonLoader /> : (
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded-full hover:bg-amber-500 hover:text-white transition-colors font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Tags Section */}
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Popular Tags</h3>
          {loading ? <SkeletonLoader /> : (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link
                  key={tag._id}
                  to={`/tag/${tag.slug}`} // Note: We still need to build the /tag/:slug page
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default HomeSidebar;