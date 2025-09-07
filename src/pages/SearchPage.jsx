// src/pages/SearchPage.jsx (NEW FILE)
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchSite } from '../services/searchService';
import BlogPostCard from '../components/BlogPostCard'; 
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState({ blogs: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await searchSite(query);
        if (response.success) {
          setResults(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-amber-500">"{query}"</span>
      </h1>

      {loading && <p>Loading results...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="space-y-12">
          {/* Blog Results */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Blogs</h2>
            {results.blogs.length > 0 ? (
              <div className="space-y-8">
                {results.blogs.map(blog => <BlogPostCard key={blog._id} post={blog} />)}
              </div>
            ) : (
              <p className="text-gray-500">No blogs found matching your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;