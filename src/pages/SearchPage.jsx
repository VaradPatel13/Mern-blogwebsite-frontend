import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchSite } from '../services/searchService';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';
import { Search, ArrowLeft, Frown } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto py-8 lg:py-12 font-sans px-4 sm:px-0">

      {/* Search Header */}
      <div className="mb-12 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 rounded-full text-slate-500">
            <Search size={20} />
          </div>
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Search Results
          </h1>
        </div>

        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          {query ? (
            <span>Results for <span className="text-teal-700 italic">"{query}"</span></span>
          ) : (
            "Search"
          )}
        </h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium">
          {error}
        </div>
      ) : (!query) ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Search the archive</h3>
          <p className="text-slate-500 font-medium">Enter a query above to search through our published stories.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Blog Results */}
          <div>
            {results.blogs.length > 0 ? (
              <div className="space-y-4">
                {results.blogs.map(blog => <BlogPostCard key={blog._id} post={blog} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
                  <Frown className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">No matching stories</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  We couldn't find any stories matching "{query}". Try checking your spelling or use more general terms.
                </p>

                <div className="mt-8">
                  <Link to="/home" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to feed
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;