// src/pages/HomePage.jsx (UPDATED with Sticky Slider)

import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/blogService';
import { getAllCategories, getBlogsByCategory } from '../services/categoryService';
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
    // Add a small delay to showcase the skeleton loader
    const timer = setTimeout(() => fetchBlogs(), 500); 
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const renderSkeletonLoader = () => (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 mb-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 animate-pulse" />
                </div>
                <div className="h-8 w-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse" />
                <div className="h-4 w-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse" />
            </div>
            <div className="h-64 w-full rounded-lg bg-gray-200 animate-pulse" />
         </div>
      </div>
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
      </div>
    </>
  );
  
  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const remainingPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <>
      <div className="sticky top-20 z-40 -mx-4">
        <div className="bg-white/80  border-b border-gray-200">
            <div className="container mx-auto px-4">
                <CategorySlider 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-25">
        {/* Main Content: Blog Feed */}
        <div className="lg:col-span-2">
          {loading ? (
            renderSkeletonLoader()
          ) : error ? (
            <p className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</p>
          ) : blogs.length > 0 ? (
            <div className="space-y-8">
              {featuredPost && <FeaturedPostCard post={featuredPost} />}
              {remainingPosts.length > 0 && <div className="border-t pt-8 border-dashed"></div>}
              {remainingPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-dashed">
              <h3 className="text-xl font-semibold text-gray-800">No Posts Yet</h3>
              <p className="text-gray-500 mt-2">There are no posts in this category. Why not be the first?</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <HomeSidebar />
        </div>
      </div>
    </>
  );
};

export default HomePage;

