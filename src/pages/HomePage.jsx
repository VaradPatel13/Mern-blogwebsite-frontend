import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/blogService';
import { getAllCategories, getBlogsByCategory } from '../services/categoryService';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';
import CategorySlider from '../components/CategorySlider';
import HomeSidebar from '../components/HomeSidebar';
import FeaturedPostCard from '../components/FeaturedPostCard';
import { motion } from "framer-motion";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = selectedCategory
          ? await getBlogsByCategory(selectedCategory)
          : await getAllBlogs();

        if (response.success) {
          setBlogs(response.data.docs || response.data);
        }
      } catch (err) {
        setError(err.message || 'Could not fetch blog posts.');
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => fetchBlogs(), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const renderSkeletonLoader = () => (
    <div className="space-y-8">
      <div className="h-[500px] w-full bg-slate-100 rounded-[3rem] animate-pulse"></div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-64 w-full bg-slate-50 rounded-[2rem] animate-pulse"></div>
      ))}
    </div>
  );

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const remainingPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen selection:bg-teal-100 selection:text-teal-900"
    >
      <Helmet>
        <title>MindLoom | Ideas Woven.</title>
      </Helmet>

      {/* Modern Category Navigation */}
      <div className="sticky top-[80px] z-[45] bg-white/70 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 relative items-start">

          {/* Main Feed Area */}
          <main className="w-full lg:col-span-8">
            {loading ? (
              renderSkeletonLoader()
            ) : error ? (
              <div className="p-10 bg-red-50 text-red-600 rounded-[2rem] border border-red-100 text-center">
                 <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
              </div>
            ) : blogs.length > 0 ? (
              <div className="">
                {featuredPost && <FeaturedPostCard post={featuredPost} />}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-12 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Latest Feed</h3>
                  </div>
                  {remainingPosts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-40 px-6 bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tighter">No ideas found.</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">Be the first to weave a story here.</p>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <HomeSidebar />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
