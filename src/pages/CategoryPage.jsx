import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogsByCategory } from '../services/categoryService';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';
import { ArrowLeft, Library } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await getBlogsByCategory(slug);
        if (response.success) {
          setBlogs(response.data);
        }
      } catch (err) {
        setError(err.message || 'Could not fetch posts for this category.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-12 font-sans px-4 sm:px-0">

      {/* Back Link */}
      <div className="mb-8">
        <Link to="/home" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Browse all stories
        </Link>
      </div>

      {/* Category Header */}
      <div className="mb-12 pb-8 border-b border-slate-200">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight capitalize mb-3">
          {slug.replace('-', ' ')}
        </h1>
        <p className="text-lg text-slate-500 font-medium font-sans">
          Stories, ideas, and perspectives exploring {slug.replace('-', ' ')}.
        </p>
      </div>

      {/* Feed Content */}
      <div className="w-full">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium">
            {error}
          </div>
        ) : blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
              <Library className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">No Stories Found</h3>
            <p className="text-slate-500 font-medium">There are no published stories in this topic yet.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default CategoryPage;
