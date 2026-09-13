import { useState, useEffect, useCallback } from 'react';
import { getAllBlogs } from '../services/blogService';
import { getBlogsByCategory } from '../services/categoryService';

const useBlogs = (selectedCategory = null) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const limit = 8;

  const fetchBlogs = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = selectedCategory
        ? await getBlogsByCategory(selectedCategory)
        : await getAllBlogs(pageNum, limit);

      if (response.success) {
        const data = response.data;
        setBlogs(data.docs || data);
        setPage(data.page || pageNum);
        setTotalPages(data.totalPages || 1);
        setTotalDocs(data.totalDocs || 0);
        setHasNextPage(data.hasNextPage || false);
        setHasPrevPage(data.hasPrevPage || false);
      }
    } catch (err) {
      setError(err.message || 'Could not fetch blog posts.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    fetchBlogs(1);
  }, [fetchBlogs]);

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages || pageNum === page) return;
    fetchBlogs(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    blogs, loading, error, refetch: fetchBlogs,
    page, totalPages, totalDocs, hasNextPage, hasPrevPage, goToPage
  };
};

export default useBlogs;
