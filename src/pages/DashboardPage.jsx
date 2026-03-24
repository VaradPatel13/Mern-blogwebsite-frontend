import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs } from '../services/uesrService';
import { deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { Brain, TrendingUp, FileEdit, Settings, Plus, Leaf, Eye, Heart, ArrowRight, Menu, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const fetchMyBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMyBlogs();
      if (response.success) {
        setMyBlogs(response.data.docs);
      }
    } catch (err) {
      setError(err.message || 'Could not fetch your blogs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyBlogs();
  }, [fetchMyBlogs]);

  const handleDelete = useCallback(async (blogId) => {
    if (window.confirm('Are you sure you want to permanently prune this bloom?')) {
      try {
        await deleteBlog(blogId);
        fetchMyBlogs();
      } catch (err) {
        setError(err.message || 'Failed to delete post.');
      }
    }
  }, [fetchMyBlogs]);

  // useMemo: derive stats once from myBlogs, not on every render
  const totalViews = useMemo(() => myBlogs.reduce((acc, blog) => acc + (blog.views || 0), 0), [myBlogs]);
  const totalLikes = useMemo(() => myBlogs.reduce((acc, blog) => acc + (blog.likes || 0), 0), [myBlogs]);
  const publishedBlogs = useMemo(() => myBlogs.filter(blog => blog.status === 'published'), [myBlogs]);
  const draftBlogs = useMemo(() => myBlogs.filter(blog => blog.status === 'draft'), [myBlogs]);

  // useMemo: filteredBlogs only changes when tab or data changes
  const filteredBlogs = useMemo(() =>
    activeTab === 'all' ? myBlogs :
    activeTab === 'published' ? publishedBlogs :
    draftBlogs
  , [activeTab, myBlogs, publishedBlogs, draftBlogs]);

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[var(--background)] font-manrope selection:bg-[#bcedd7] selection:text-[#002116] w-full">
      
      {/* Main Content Canvas */}
      <main className="flex-1 relative overflow-hidden flex flex-col pt-8 lg:pt-16 pb-20 max-w-[1400px] mx-auto w-full">
        {/* Asymmetric Decorative Element */}
        <div className="absolute -top-24 -right-24 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#bcedd7]/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
        
        <div className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-12 pt-8 lg:pt-16 pb-24 relative z-10">
          
          {/* Header Section */}
          <header className="mb-16 flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#7b5455] mb-2 md:mb-3">Welcome back, Curator</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-newsreader font-bold text-[#00261b] tracking-tighter leading-none">Your Garden.</h2>
            </div>
            <div className="text-left md:text-right hidden sm:block">
              <Link to="/my-profile" className="inline-block w-16 h-16 rounded-full overflow-hidden border-2 border-[#eae8e4] hover:scale-110 transition-transform bg-[#eae8e4]">
                <img 
                   src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.username || 'user'}`} 
                   alt="Profile" 
                   className="w-full h-full object-cover" 
                />
              </Link>
            </div>
          </header>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="md:col-span-2 bg-[#f5f3ef] p-8 md:p-10 rounded-2xl flex items-center justify-between overflow-hidden relative group shadow-[0_20px_40px_rgba(0,38,27,0.02)]">
              <div className="relative z-10">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#414944] mb-4">Total Cultivations</p>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-5xl md:text-7xl font-newsreader font-bold text-[#00261b]">{myBlogs.length}</span>
                  <span className="text-[#00261b]/40 font-newsreader text-xl md:text-3xl">Blooms</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-[0.03] translate-y-1/4 group-hover:-translate-y-4 group-hover:opacity-[0.06] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <Leaf size={320} strokeWidth={0.5} className="text-[#00261b]" />
              </div>
            </div>
            
            <div className="bg-[#00261b] text-[#bcedd7] p-8 md:p-10 rounded-2xl relative overflow-hidden group shadow-[0_20px_40px_rgba(0,38,27,0.06)]">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#bcedd7]/60 mb-4">Total Reach</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-newsreader font-bold -tracking-wider">{totalViews}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Eye size={16} />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Organic Views</span>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </section>

          {/* Blog Feed Section */}
          <section>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setActiveTab('all')} 
                  className={`px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm ${activeTab === 'all' ? 'bg-[#00261b] text-white' : 'bg-[#eae8e4] text-[#414944] hover:bg-[#d6d4d0]'}`}
                >
                  All Blooms ({myBlogs.length})
                </button>
                <button 
                  onClick={() => setActiveTab('published')} 
                  className={`px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm ${activeTab === 'published' ? 'bg-[#00261b] text-white' : 'bg-[#eae8e4] text-[#414944] hover:bg-[#d6d4d0]'}`}
                >
                  Published ({publishedBlogs.length})
                </button>
                <button 
                  onClick={() => setActiveTab('draft')} 
                  className={`px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm ${activeTab === 'draft' ? 'bg-[#00261b] text-white' : 'bg-[#eae8e4] text-[#414944] hover:bg-[#d6d4d0]'}`}
                >
                  Drafts ({draftBlogs.length})
                </button>
              </div>

              <Link to="/create-post" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a251c] text-white text-[12px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#1a382c] transition-all shadow-md active:scale-95">
                <Plus size={16} strokeWidth={2.5} /> New Post
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <span className="h-px flex-1 bg-[#c0c8c3]/30"></span>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#414944]">Recent Growth</h3>
              <span className="h-px flex-1 bg-[#c0c8c3]/30"></span>
            </div>

            {loading ? (
               <div className="flex justify-center items-center py-20 min-h-[300px]">
                 <div className="w-12 h-12 border-4 border-[#c0c8c3]/20 border-t-[#00261b] rounded-full animate-spin"></div>
               </div>
            ) : error ? (
               <div className="text-center py-10 text-[#ba1a1a] bg-[#ffdad6]/20 font-bold rounded-2xl border border-[#ffdad6]">{error}</div>
            ) : filteredBlogs.length === 0 ? (
               <div className="text-center py-24 bg-[#f5f3ef]/50 border border-[#c0c8c3]/20 border-dashed rounded-[2rem] flex flex-col items-center">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-[#c0c8c3]">
                    <Leaf size={40} strokeWidth={1.5} />
                 </div>
                 <h4 className="text-2xl font-newsreader font-bold text-[#00261b] mb-2 tracking-tighter">No blooms found in this section.</h4>
                 <p className="text-[#414944] font-medium mb-8 max-w-sm">When you publish or draft a story, it will naturally take root here.</p>
                 <Link to="/create-post" className="inline-flex items-center gap-2 px-8 py-4 bg-[#00261b] text-white font-bold rounded-2xl hover:bg-[#214f3f] hover:-translate-y-1 transition-all shadow-xl shadow-[#00261b]/10 hover:shadow-2xl">
                   <Plus size={18} /> Start Writing
                 </Link>
               </div>
            ) : (
              <div className="space-y-16 lg:space-y-24">
                {filteredBlogs.map((blog, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <article key={blog._id} className={`group relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                      
                      {/* Image Thumbnail */}
                      <div className="w-full lg:w-2/5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-[#e4e2de] transition-transform duration-500 ease-[0.34,1.56,0.64,1] group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#00261b]/10 shrink-0 border border-[#c0c8c3]/10 relative">
                        {blog.coverImage ? (
                           <img loading="lazy" src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f3ef] text-[#00261b]/20">
                             <Leaf size={48} className="mb-2" />
                           </div>
                        )}
                        <Link to={`/blog/${blog.slug}`} className="absolute inset-0" aria-label="View blog" />
                      </div>
                      
                      {/* Content Body */}
                      <div className={`flex-1 py-2 w-full ${isEven ? 'text-left' : 'lg:text-right text-left'}`}>
                        
                        {/* Meta Tags */}
                        <div className={`flex items-center gap-4 mb-4 md:mb-6 ${isEven ? '' : 'lg:justify-end'}`}>
                          {blog.status === 'published' ? (
                            <span className="px-4 py-1.5 bg-[#bcedd7] text-[#002116] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">Published</span>
                          ) : (
                            <span className="px-4 py-1.5 bg-[#eae8e4] text-[#414944] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">Draft</span>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#414944]/60">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h4 className="text-3xl md:text-4xl lg:text-[40px] font-newsreader font-black text-[#00261b] mb-4 md:mb-6 leading-[1.1] transition-colors group-hover:text-[#396756] tracking-tighter">
                          <Link to={`/blog/${blog.slug}`} className="hover:underline decoration-[#bcedd7] decoration-[3px] underline-offset-4 overflow-wrap break-word">{blog.title || 'Untitled Bloom'}</Link>
                        </h4>
                        
                        {/* Stats */}
                        <div className={`flex gap-6 items-center text-[#414944]/80 ${isEven ? '' : 'lg:justify-end'} mb-8`}>
                          <div className="flex items-center gap-2">
                            <Eye size={18} strokeWidth={2.5} />
                            <span className="font-bold text-sm bg-[#f5f3ef] px-2 py-0.5 rounded-md">{blog.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart size={18} strokeWidth={2.5} />
                            <span className="font-bold text-sm bg-[#f5f3ef] px-2 py-0.5 rounded-md">{blog.likes || 0}</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className={`flex items-center gap-6 ${isEven ? '' : 'lg:justify-end'}`}>
                          <Link 
                             to={`/edit-post/${blog._id}`} 
                             className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00261b] hover:text-[#396756] transition-colors group/edit"
                          >
                            Edit Bloom <ArrowRight size={16} className="group-hover/edit:translate-x-1 transition-transform" />
                          </Link>
                          
                          <button 
                             onClick={() => handleDelete(blog._id)}
                             className="inline-flex items-center justify-center p-2 text-[#414944]/30 hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-xl transition-all"
                             title="Prune this bloom"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
