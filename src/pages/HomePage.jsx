import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/blogService';
import { getAllCategories, getBlogsByCategory } from '../services/categoryService';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';
import CategorySlider from '../components/CategorySlider';
import HomeSidebar from '../components/HomeSidebar';
import FeaturedPostCard from '../components/FeaturedPostCard';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetches categories for the slider
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
    // Fetches blogs based on the selected category (or all blogs)
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
    <>
      <div className="mb-10 pb-10 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-100 h-[400px] rounded-xl animate-pulse"></div>
          <div className="lg:col-span-4 flex flex-col justify-center h-full pt-4 lg:pt-0">
            <div className="h-4 w-24 bg-slate-100 rounded mb-4 animate-pulse"></div>
            <div className="h-10 w-full bg-slate-100 rounded mb-2 animate-pulse"></div>
            <div className="h-10 w-3/4 bg-slate-100 rounded mb-6 animate-pulse"></div>
            <div className="h-4 w-full bg-slate-100 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-100 rounded mb-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div>
        {Array.from({ length: 3 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
      </div>
    </>
  );

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const remainingPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="bg-[#FFFFFF] text-[#1A1A1A] min-h-screen font-inter selection:bg-[#FF4D00] selection:text-white">
      <Helmet>
        <title>MindLoom | Explore Stories that Inform and Inspire</title>
        <meta name="description" content="MindLoom is a premium editorial platform for long-form stories, insightful deep-dives, and technical excellence. Explore articles on technology, development, and more." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content="MindLoom | Premium Editorial Platform" />
        <meta property="og:description" content="Join MindLoom to discover deep-dives and high-fidelity stories on everything that matters in tech and lifestyle." />
        <meta property="og:image" content={`${window.location.origin}/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.origin} />
        <meta name="twitter:title" content="MindLoom | Premium Editorial Platform" />
        <meta name="twitter:description" content="Join MindLoom to discover deep-dives and high-fidelity stories." />
        <meta name="twitter:image" content={`${window.location.origin}/og-image.png`} />
        
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      {/* Editorial Category Navigation */}
      <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="pb-32">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 relative items-start">

          {/* Main Feed Area */}
          <main className="w-full lg:col-span-8">
            {loading ? (
              renderSkeletonLoader()
            ) : error ? (
              <div className="text-center p-12 bg-red-50 text-red-600 rounded-sm border border-red-100 font-bold uppercase tracking-widest text-[10px]">
                {error}
              </div>
            ) : blogs.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {featuredPost && <div className="pb-10"><FeaturedPostCard post={featuredPost} /></div>}
                <div className="pt-10 space-y-12">
                  {remainingPosts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-32 px-6 bg-gray-50 rounded-sm border border-gray-100 border-dashed">
                <h3 className="text-2xl font-black text-black mb-4 tracking-tight uppercase tracking-[0.1em]">No Stories Found</h3>
                <p className="text-[#6B6B6B] font-medium max-w-md mx-auto">There are no stories published in this category yet. Be the first to share your thoughts.</p>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
