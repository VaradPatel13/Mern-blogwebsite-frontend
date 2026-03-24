import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchSite } from '../services/searchService';
import BlogPostCard from '../components/BlogPostCard';
import { Search, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SearchResultSkeleton = () => (
  <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-10">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex flex-col gap-4">
        <div className="aspect-[16/10] bg-[#eae8e4] rounded-[24px]"></div>
        <div className="h-4 bg-[#eae8e4] rounded-lg w-1/3"></div>
        <div className="h-7 bg-[#e4e2de] rounded-lg w-full"></div>
        <div className="h-7 bg-[#e4e2de] rounded-lg w-4/5"></div>
        <div className="h-4 bg-[#eae8e4] rounded-lg w-full"></div>
        <div className="h-4 bg-[#eae8e4] rounded-lg w-5/6"></div>
      </div>
    ))}
  </div>
);

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState({ blogs: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = useCallback(async () => {
    if (!query) { setLoading(false); return; }
    setLoading(true);
    setError('');
    try {
      const response = await searchSite(query);
      if (response.success) setResults(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>{query ? `"${query}" — Search` : 'Search'} | Scribloom</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-20">
        
        {/* Header */}
        <header className="mb-16">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 hover:text-[#00261b] transition-colors mb-10 group"
            aria-label="Back to home"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Return to Garden
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#eae8e4] rounded-2xl flex items-center justify-center shrink-0">
              <Search size={18} className="text-[#714949]" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">
              Archive Search
            </span>
          </div>

          <h1 className="font-newsreader text-5xl md:text-6xl lg:text-[72px] font-bold text-[#00261b] tracking-tighter leading-[1.05]">
            {query
              ? <span>Results for <em className="text-[#7b5455] not-italic">"{query}"</em></span>
              : 'Search the Archive'
            }
          </h1>
        </header>

        {/* Results */}
        <main aria-live="polite" aria-busy={loading}>
          {loading ? (
            <SearchResultSkeleton />
          ) : error ? (
            <div
              role="alert"
              className="p-8 bg-[#ffdad6]/30 border border-[#fecbcb] text-[#ba1a1a] rounded-[2rem] font-bold text-sm"
            >
              {error}
            </div>
          ) : !query ? (
            <div className="text-center py-32 bg-[#f5f3ef] rounded-[3rem] border border-[#c0c8c3]/20">
              <p className="font-newsreader text-3xl font-bold text-[#00261b] mb-3">The archive awaits.</p>
              <p className="text-[#414944] font-medium text-sm">Enter a search query in the navigation bar above.</p>
            </div>
          ) : results.blogs.length === 0 ? (
            <div className="text-center py-32 bg-[#f5f3ef] rounded-[3rem] border border-[#c0c8c3]/20 border-dashed">
              <p className="font-newsreader text-4xl font-bold text-[#00261b] mb-3">No blooms found.</p>
              <p className="text-[#414944] font-medium text-sm max-w-sm mx-auto mb-10">
                No stories matching <strong>"{query}"</strong>. Try checking your spelling or using more general terms.
              </p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b] border-b-2 border-[#00261b] pb-1 hover:text-[#396756] hover:border-[#396756] transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to all stories
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 mb-8">
                {results.blogs.length} bloom{results.blogs.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {results.blogs.map(blog => (
                  <BlogPostCard key={blog._id} post={blog} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
