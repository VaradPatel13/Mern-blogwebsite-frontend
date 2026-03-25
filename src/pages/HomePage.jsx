import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import CategorySlider from '../components/CategorySlider';
import HomeSidebar from '../components/HomeSidebar';
import FeaturedPostCard from '../components/FeaturedPostCard';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import useCategories from '../hooks/useCategories';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories } = useCategories();
  const { blogs, loading, error } = useBlogs(selectedCategory);

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const remainingPosts = blogs.length > 1 ? blogs.slice(1) : [];


  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--background)] min-h-screen selection:bg-[#a0d1bc]/30 selection:text-[#00261b]"
    >
      <Helmet>
        <title>Scribloom | Digital Archives</title>
      </Helmet>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 md:top-[72px] z-[45] bg-[var(--background)]">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-20 font-manrope">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 relative">

          {/* Left Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1">
             <div className="sticky top-40">
                <HomeSidebar />
             </div>
          </div>

          {/* Main Content Area */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            {loading ? (
               <div className="space-y-12 animate-pulse">
                   <div className="w-full aspect-[21/10] bg-[#efeeea] rounded-[40px]" />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-[#efeeea] rounded-[24px]" />)}
                   </div>
               </div>
            ) : error ? (
              <div className="p-10 bg-red-50 text-red-600 rounded-[32px] border border-red-100 text-center">
                 <p className="text-sm font-black uppercase tracking-widest">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                {/* Hero Section */}
                {featuredPost && !selectedCategory && <FeaturedPostCard post={featuredPost} />}
                
                {/* Grid Section */}
                <div className="flex flex-col gap-10">
                   <div className="flex items-center justify-between px-2">
                      <h3 className="text-[32px] font-black text-[#111] font-newsreader">
                          {selectedCategory ? `${selectedCategory} Archives` : 'Recent Thoughts'}
                      </h3>
                      <Link to="#" className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#111]/30 hover:text-[#a0d1bc] transition-all">
                          View All <ArrowUpRight size={14} />
                      </Link>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-16">
                      {(selectedCategory ? blogs : remainingPosts).map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                      ))}
                   </div>

                   {blogs.length === 0 && (
                      <div className="text-center py-40 bg-white/50 rounded-[40px] border border-[#efeeea] border-dashed">
                        <h3 className="text-2xl font-black text-[#111] font-newsreader mb-4">The archives are silent.</h3>
                        <p className="text-[#111]/40 text-sm font-medium">Be the first to curate a thought here.</p>
                      </div>
                   )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;

