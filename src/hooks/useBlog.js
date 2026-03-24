/**
 * useBlog — Antigravity custom hook
 * Encapsulates single blog post + comments + related articles fetching.
 * Eliminates copy-paste useEffect in BlogPostPage.
 */
import { useState, useEffect } from 'react';
import { getBlogBySlug, getAllBlogs } from '../services/blogService';
import { getCommentsForBlog } from '../services/commentService';

const useBlog = (slug) => {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchAll = async () => {
      setLoading(true);
      setError('');
      try {
        const blogResponse = await getBlogBySlug(slug);
        if (!blogResponse.success) throw new Error('Post not found.');

        const blogData = blogResponse.data;
        setBlog(blogData);

        const [allBlogsResponse, commentsResponse] = await Promise.all([
          getAllBlogs(),
          getCommentsForBlog(blogData._id),
        ]);

        if (allBlogsResponse.success) {
          setRelatedBlogs(
            allBlogsResponse.data.docs.filter(b => b._id !== blogData._id).slice(0, 3)
          );
        }
        if (commentsResponse.success) {
          setComments(commentsResponse.data.docs);
        }
      } catch (err) {
        setError(err.message || 'Could not fetch the blog post.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    window.scrollTo(0, 0);
  }, [slug]);

  return { blog, setBlog, relatedBlogs, comments, setComments, loading, error };
};

export default useBlog;
