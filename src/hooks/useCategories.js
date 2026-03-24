/**
 * useCategories — Antigravity custom hook
 * Encapsulates category fetching logic.
 */
import { useState, useEffect } from 'react';
import { getAllCategories } from '../services/categoryService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useCategories;
