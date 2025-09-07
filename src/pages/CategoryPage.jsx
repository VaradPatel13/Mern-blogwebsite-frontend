// src/pages/CategoryPage.jsx (NEW FILE)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogsByCategory } from '../services/categoryService';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';

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
          // The data from this endpoint is a direct array
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
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-4xl font-bold mb-8">
        Category: <span className="text-amber-500 capitalize">{slug.replace('-', ' ')}</span>
      </h1>

      {loading ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : blogs.length > 0 ? (
        <div className="space-y-8">
          {blogs.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts found in this category yet.</p>
      )}
    </div>
  );
};

export default CategoryPage;
