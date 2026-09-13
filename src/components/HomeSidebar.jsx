import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingCategories } from '../services/categoryService';
import { getTrendingTags } from '../services/tagService';
import { useToast } from '@/components/ui/toast';
import { Hash, Sparkles, Sprout, BookOpen, Layers, Zap, TrendingUp } from 'lucide-react';

const HomeSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          getTrendingCategories(5),
          getTrendingTags(5)
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

  const getTopicIcon = (name) => {
      const n = name.toLowerCase();
      if (n.includes('botany')) return <Sprout size={14} />;
      if (n.includes('editorial')) return <BookOpen size={14} />;
      if (n.includes('growth')) return <Zap size={14} />;
      if (n.includes('archives')) return <Layers size={14} />;
      return <Hash size={14} />;
  }

  return (
    <aside className="hidden lg:flex flex-col gap-10 w-full font-manrope">
        {/* Trending Categories */}
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-[28px] font-black text-[#111] font-newsreader leading-tight">Explore</h2>
                <p className="text-[12px] font-medium text-[#111]/40">Curated Collections</p>
            </div>

            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 w-full px-5 py-3 bg-[#5c4b4b] text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-[#5c4b4b]/20 hover:scale-[1.02] transition-all">
                    <Sparkles size={14} className="fill-white/20" />
                    Trending
                </button>

                <div className="mt-2 space-y-1">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 px-5 py-3">
                                <div className="w-3.5 h-3.5 bg-[#eae8e4] rounded animate-pulse" />
                                <div className="h-3 w-24 bg-[#eae8e4] rounded animate-pulse" />
                            </div>
                        ))
                    ) : categories.length > 0 ? (
                        categories.map(cat => (
                            <Link 
                                key={cat._id} 
                                to={`/category/${cat.slug}`}
                                className="flex items-center justify-between px-5 py-3 text-[11px] font-black text-[#111]/60 uppercase tracking-widest hover:text-[#111] hover:bg-[#efeeea]/50 rounded-full transition-all group"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-[#111]/20">{getTopicIcon(cat.name)}</span>
                                    #{cat.name}
                                </span>
                                <span className="text-[9px] font-bold text-[#111]/25 group-hover:text-[#111]/50 transition-colors tabular-nums">
                                    {cat.blogCount} {cat.blogCount === 1 ? 'post' : 'posts'}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="px-5 py-3 text-[11px] text-[#111]/30">No categories yet</p>
                    )}
                </div>
            </div>

            <button 
              onClick={() => toast({ title: "Coming Soon", description: "Newsletter subscriptions will be available soon." })}
              className="w-full py-4 bg-[#001f18] text-white rounded-full text-[13px] font-black hover:bg-black transition-all shadow-xl shadow-black/5 mt-2 transition-transform hover:scale-[1.02]"
            >
                Subscribe
            </button>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-col gap-6 pt-6 border-t border-[#efeeea]">
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111]/30">Trending Tags</h4>
                <TrendingUp size={12} className="text-[#111]/20" />
            </div>
            
            <div className="flex flex-col gap-3">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="h-3 w-20 bg-[#eae8e4] rounded animate-pulse" />
                    ))
                ) : tags.length > 0 ? (
                    tags.map(tag => (
                        <Link 
                            key={tag._id} 
                            to={`/tag/${tag.slug}`}
                            className="flex items-center justify-between text-[12px] font-bold text-[#111]/40 hover:text-[#111] transition-colors group"
                        >
                            <span>#{tag.name}</span>
                            <span className="text-[9px] font-bold text-[#111]/20 group-hover:text-[#111]/40 transition-colors tabular-nums">
                                {tag.blogCount}
                            </span>
                        </Link>
                    ))
                ) : (
                    <p className="text-[11px] text-[#111]/30">No tags yet</p>
                )}
            </div>
        </div>
    </aside>
  );
};

export default HomeSidebar;
