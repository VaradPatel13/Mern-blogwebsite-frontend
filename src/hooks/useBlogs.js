/**
 * useBlogs — Antigravity custom hook
 * Encapsulates blog-list fetching logic (all blogs or by category).
 * Eliminates copy-paste useEffect across pages.
 */
import { useState, useEffect, useCallback } from 'react';
import { getAllBlogs } from '../services/blogService';
import { getBlogsByCategory } from '../services/categoryService';

const useBlogs = (selectedCategory = null) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = useCallback(async () => {
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
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => fetchBlogs(), 300);
    return () => clearTimeout(timer);
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs };
};

export default useBlogs;
