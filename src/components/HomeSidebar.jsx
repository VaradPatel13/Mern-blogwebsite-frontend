import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { getAllTags } from '../services/tagService';

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
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-8 w-20 bg-slate-100 animate-pulse rounded-full"></div>
      ))}
    </div>
  );

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:col-start-10 relative bg-gray-50 min-h-full rounded-sm -mr-6 lg:-mr-16 pl-8 pr-6 pt-12">
      <div className="sticky top-28 space-y-12">
        
        {/* Recommended Topics */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#999] border-b border-gray-200 pb-4">
            Recommended Topics
          </h4>
          {loading ? <SkeletonLoader /> : (
            <div className="flex flex-wrap gap-2.5">
              {categories.slice(0, 8).map(category => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="px-4 py-2 text-[12px] font-bold bg-white text-black rounded-full hover:bg-black hover:text-white transition-all border border-gray-200 shadow-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#999] border-b border-gray-200 pb-4">
            Trending Tags
          </h4>
          {loading ? <SkeletonLoader /> : (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map(tag => (
                <Link
                  key={tag._id}
                  to={`/tag/${tag.slug}`}
                  className="text-[12px] font-bold text-[#777] hover:text-black transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mini Footer / Links */}
        <div className="pt-12 border-t border-gray-200">
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-bold uppercase tracking-wider text-[#BBB]">
            <Link to="#" className="hover:text-black transition-colors">Help</Link>
            <Link to="#" className="hover:text-black transition-colors">About</Link>
            <Link to="#" className="hover:text-black transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-black transition-colors">Terms</Link>
          </div>
          <p className="mt-8 text-[11px] font-bold text-[#DDD] tracking-widest uppercase">© 2026 Bolify</p>
        </div>
      </div>
    </aside>
  );
};

export default HomeSidebar;