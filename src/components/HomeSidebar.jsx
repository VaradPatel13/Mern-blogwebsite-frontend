import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { getAllTags } from '../services/tagService';
import { Hash, Compass, TrendingUp } from 'lucide-react';

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
        <div key={i} className="h-9 w-24 bg-slate-100 animate-pulse rounded-2xl"></div>
      ))}
    </div>
  );

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:col-start-10 relative pl-4">
      <div className="sticky top-28 space-y-12">
        
        {/* Recommended Topics */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-2 mb-8">
            <Compass size={18} className="text-teal-500" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Discover
            </h4>
          </div>
          
          {loading ? <SkeletonLoader /> : (
            <div className="flex flex-wrap gap-3">
              {categories.slice(0, 8).map(category => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="px-5 py-2.5 text-[12px] font-bold bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white hover:shadow-lg transition-all border border-slate-100/50"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp size={18} className="text-teal-500" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Trending Tags
            </h4>
          </div>
          
          {loading ? <SkeletonLoader /> : (
            <div className="grid grid-cols-1 gap-4">
              {tags.slice(0, 6).map(tag => (
                <Link
                  key={tag._id}
                  to={`/tag/${tag.slug}`}
                  className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-teal-600 transition-colors group"
                >
                  <Hash size={14} className="text-teal-300 group-hover:text-teal-500" />
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mini Footer */}
        <div className="px-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-black uppercase tracking-[0.1em] text-slate-300">
          <Link to="#" className="hover:text-slate-900 transition-colors">About</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">Terms</Link>
          <p className="w-full mt-4 text-[10px] text-slate-200">© 2026 MindLoom</p>
        </div>
      </div>
    </aside>
  );
};

export default HomeSidebar;