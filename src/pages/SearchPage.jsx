import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { searchSite } from '../services/searchService';
import BlogPostCard from '../components/BlogPostCard';
import { Search, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SearchResultSkeleton = () => (
  <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="flex flex-col gap-4">
        <div className="aspect-[16/10] bg-[#eae8e4] rounded-[24px]"></div>
        <div className="h-4 bg-[#eae8e4] rounded-lg w-1/3"></div>
        <div className="h-7 bg-[#e4e2de] rounded-lg w-full"></div>
        <div className="h-7 bg-[#e4e2de] rounded-lg w-4/5"></div>
      </div>
    ))}
  </div>
);

const SearchPage = () => {
  const navigate = useNavigate();
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

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#eae8e4] rounded-2xl flex items-center justify-center shrink-0">
                  <Search size={18} className="text-[#00261b]" aria-hidden="true" />
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
            </div>

            <div className="w-full md:max-w-sm">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = e.target.q.value.trim();
                  if (q) {
                    navigate(`/search?q=${encodeURIComponent(q)}`);
                  }
                }}
                className="relative group"
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#00261b]/30 pointer-events-none group-focus-within:text-[#00261b] transition-colors" strokeWidth={2.5} />
                <input
                  type="text"
                  name="q"
                  defaultValue={query || ''}
                  placeholder="Type your search..."
                  className="w-full pl-14 pr-4 py-4 text-lg bg-white border border-[#eae8e4] rounded-[2rem] font-bold text-[#00261b] placeholder:text-[#00261b]/10 focus:outline-none focus:ring-4 focus:ring-[#a0d1bc]/20 focus:border-[#00261b] transition-all shadow-xl shadow-black/5"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#00261b] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1a382c] transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-wait flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    'Find'
                  )}
                </button>
              </form>
            </div>
          </div>
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
