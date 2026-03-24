import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toggleLikeOnBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';
import Footer from '../components/Footer';
import BlogPostSkeleton from '../components/BlogPostSkeleton';
import useBlog from '../hooks/useBlog';
import { Heart, MessageCircle, Bookmark, Share2, ArrowRight, List, ChevronDown, Check } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuth();

  // Custom hook encapsulates all data fetching (Antigravity: extract to hooks/)
  const { blog, setBlog, relatedBlogs, comments, setComments, loading, error } = useBlog(slug);

  const [isLiking, setIsLiking] = useState(false);
  const [scrollProgress, setScrollProgress] = useState('0%');
  const [isSaved, setIsSaved] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = `${Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100))}%`;
      setScrollProgress(scrollValue);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useCallback: prevents handler recreation on re-render (Antigravity: INP <200ms)
  const handleLike = useCallback(async () => {
    if (!isAuthenticated) return alert('Please log in to like a post.');
    if (isLiking) return;
    try {
      setIsLiking(true);
      const response = await toggleLikeOnBlog(blog._id);
      if (response.success) {
        setBlog(prevBlog => ({
          ...prevBlog,
          likes: response.data.likes,
          likedBy: response.data.isLiked
            ? [...prevBlog.likedBy, user._id]
            : prevBlog.likedBy.filter(id => id !== user._id)
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  }, [isAuthenticated, isLiking, blog, user, setBlog]);

  useEffect(() => {
    if (blog) {
      const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      setIsSaved(saved.some(p => p._id === blog._id));
    }
  }, [blog]);

  const toggleSave = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (isSaved) {
      localStorage.setItem('savedPosts', JSON.stringify(saved.filter(p => p._id !== blog._id)));
      setIsSaved(false);
    } else {
      saved.push({ _id: blog._id, title: blog.title, slug: blog.slug, coverImage: blog.coverImage, category: blog.category, createdAt: blog.createdAt });
      localStorage.setItem('savedPosts', JSON.stringify(saved));
      setIsSaved(true);
    }
  }, [isSaved, blog]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, []);

  // Skill: Skeleton Loader that mimics the layout instead of spinner
  if (loading) return <BlogPostSkeleton />;

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-12 rounded-3xl border border-[#c0c8c3]/20 shadow-xl">
          <h1 className="text-3xl font-newsreader font-black text-[#00261b] mb-4">Withered Bloom</h1>
          <p className="text-[#414944] mb-8 font-manrope">{error || "This article couldn't be loaded."}</p>
          <Link to="/home" className="inline-block bg-[#00261b] text-white px-8 py-3 rounded-full font-manrope text-sm font-bold uppercase tracking-widest hover:bg-[#214f3f] transition-colors">Return to Garden</Link>
        </div>
      </div>
    );
  }

  const isLikedByUser = user && blog.likedBy.includes(user._id);

  const headings = blog?.body
    ? Array.from(new DOMParser().parseFromString(blog.body, 'text/html').querySelectorAll('h2, h3'))
        .map((h, i) => ({ 
          id: `section-${i}`, 
          text: h.innerText,
          level: h.tagName.toLowerCase() 
        }))
    : [];

  let hIndex = 0;
  const processedBody = blog?.body?.replace(/<h([23])>(.*?)<\/h[23]>/g, (match, level, content) => {
    return `<h${level} id="section-${hIndex++}" class="scroll-mt-24 clear-both break-words">${content}</h${level}>`;
  });

  const wordCount = blog?.body ? blog.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length : 0;
  const minutesRead = Math.max(1, Math.ceil(wordCount / 225));

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const plainTextSummary = blog.summary || (blog.body ? blog.body.replace(/<[^>]*>/g, '').slice(0, 160) : '');

  return (
    <>
      <div className="bg-[var(--background)] text-[#1b1c1a] min-h-screen font-manrope selection:bg-[#ffdad9] selection:text-[#2f1314] overflow-x-hidden relative" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,38,27,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        
        <Helmet>
          <title>{blog.title} | Scribloom</title>
          <meta name="description" content={plainTextSummary} />
        </Helmet>

        {/* Top Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[#e4e2de]">
          <div className="h-full bg-gradient-to-r from-[#00261b] to-[#79a894] transition-all duration-150 ease-out" style={{ width: scrollProgress }}></div>
        </div>

        {/* Article Header */}
        <header className="pt-16 md:pt-24 pb-12 md:pb-16 px-6 max-w-5xl mx-auto flex flex-col items-start md:items-center md:text-center text-left">
          <nav className="mb-8 md:mb-12 w-full text-left md:text-center">
            <Link to="/home" className="font-newsreader text-3xl md:text-4xl text-[#00261b] tracking-tighter">Scribloom</Link>
          </nav>
          <div className="flex w-full justify-start md:justify-center mb-6">
            <span className="bg-[#ffdad9] text-[#613d3e] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              {blog.category?.name || 'General Insight'}
            </span>
          </div>
          <h1 className="font-newsreader text-4xl md:text-6xl lg:text-[72px] font-bold text-[#00261b] leading-[1.1] tracking-tight mb-8 md:mb-10 text-left md:text-center">
            {blog.title}
          </h1>
          <div className="flex items-center justify-start md:justify-center gap-4 w-full text-sm font-manrope">
            <div className="flex items-center md:gap-4 gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#e4e2de]">
                <img src={blog.createdBy?.avatar || `https://i.pravatar.cc/150?u=${blog.createdBy?.username}`} loading="lazy" className="w-full h-full object-cover" alt="Author" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4 text-left">
                <span className="font-bold text-[#00261b] text-sm md:text-base">{blog.createdBy?.fullName || 'Anonymous'}</span>
                <span className="hidden md:inline text-[#c0c8c3]">•</span>
                <span className="text-xs md:text-sm text-[#414944]">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="hidden md:inline text-[#c0c8c3]">•</span>
                <span className="text-xs md:text-sm text-[#414944]">{minutesRead} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.coverImage && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
            <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden group bg-[#eae8e4] shadow-[0_20px_40px_rgba(0,38,27,0.06)]">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00261b]/20 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <main className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-12 lg:gap-16 pb-32">
          
          {/* Mobile Collapsible TOC */}
          {headings.length > 0 && (
            <div className="lg:hidden col-span-1 mb-12">
              <details className="bg-[#f5f3ef] rounded-2xl p-6 group shadow-sm border border-[#c0c8c3]/20 transition-all duration-300">
                <summary className="list-none flex items-center justify-between cursor-pointer focus:outline-none outline-none">
                  <span className="font-manrope font-bold text-[#00261b] flex items-center gap-3">
                    <List size={20} className="text-[#396756]" /> Table of Contents
                  </span>
                  <ChevronDown size={20} className="text-[#414944] transition-transform group-open:rotate-180" />
                </summary>
                <nav className="mt-6 flex flex-col gap-4 border-l-2 border-[#c0c8c3]/30 ml-2 pl-5">
                  {headings.map((h, i) => (
                    <a key={i} href={`#${h.id}`} className="font-manrope text-sm font-medium text-[#414944] hover:text-[#00261b] transition-colors">{h.text}</a>
                  ))}
                </nav>
              </details>
            </div>
          )}

          {/* Desktop Left Sidebar (TOC & Subscribe) */}
          <aside className="hidden lg:block lg:col-span-3 pb-8 relative">
            <div className="sticky top-24 space-y-12">
              {headings.length > 0 && (
                <div>
                  <h3 className="font-manrope text-xs uppercase tracking-[0.25em] text-[#717974] mb-8 font-black">On this page</h3>
                  <ul className="space-y-4 text-sm font-manrope">
                    {headings.map((h, i) => (
                      <li key={i}>
                        <a href={`#${h.id}`} className="text-[#414944] hover:text-[#00261b] font-bold transition-all border-l-2 hover:border-[#00261b] border-transparent pl-4 block py-1.5 opacity-70 hover:opacity-100">{h.text}</a>
                      </li>
                    ))}
                    <li>
                      <a href="#comments-section" className="text-[#396756] hover:text-[#00261b] font-black transition-all border-l-2 hover:border-[#00261b] border-transparent pl-4 block mt-8 py-1.5">
                        Discourse ({comments.length})
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="p-8 rounded-3xl bg-[#f5f3ef] border border-[#c0c8c3]/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#bcedd7]/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                <h4 className="font-newsreader text-2xl font-bold text-[#00261b] mb-3 relative z-10">Subscribe</h4>
                <p className="text-xs text-[#414944] mb-6 font-manrope leading-relaxed relative z-10">Get the latest botanical tech insights directly to your greenhouse.</p>
                <div className="relative z-10">
                  <input type="email" placeholder="Email address" className="w-full bg-transparent border-none border-b border-[#c0c8c3] focus:ring-0 focus:border-[#00261b] px-0 py-2 text-sm text-[#00261b] placeholder:text-[#717974] outline-none font-bold" />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#00261b] hover:text-[#396756] transition-transform hover:translate-x-1 p-2">
                    <ArrowRight size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Article Prose Content */}
          <div className="lg:col-span-7 w-full overflow-hidden shrink-0">
            <article 
              className="font-manrope text-lg lg:text-[19px] leading-loose text-[#1b1c1a]/90 break-words
              prose-p:mb-8 prose-p:font-medium
              prose-headings:font-newsreader prose-headings:font-bold prose-headings:text-[#00261b] prose-headings:tracking-tight prose-headings:break-words
              prose-blockquote:my-16 prose-blockquote:py-6 prose-blockquote:pl-8 prose-blockquote:border-l-[6px] prose-blockquote:border-[#7b5455]/20 prose-blockquote:not-italic prose-blockquote:font-newsreader prose-blockquote:text-2xl md:prose-blockquote:text-3xl prose-blockquote:text-[#00261b] prose-blockquote:leading-snug
              prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-16 
              prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-12
              prose-img:rounded-2xl prose-img:w-full prose-img:shadow-lg prose-img:my-12 prose-img:mx-0 
              prose-a:text-[#396756] prose-a:font-bold prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#00261b]
              max-w-none w-full"
              dangerouslySetInnerHTML={{ __html: processedBody }} 
            />

            {/* Author Bio Box */}
            <div className="mt-24 p-8 md:p-12 rounded-[2rem] bg-[#efeeea] border-t-4 border-[#00261b]/10 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 border-4 border-[var(--background)] shadow-lg">
                <img src={blog.createdBy?.avatar || `https://i.pravatar.cc/150?u=${blog.createdBy?.username}`} className="w-full h-full object-cover" alt={blog.createdBy?.fullName} />
              </div>
              <div className="text-center md:text-left flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b5455] mb-1 block">The Cultivator</span>
                <h4 className="font-newsreader text-2xl md:text-3xl font-bold text-[#00261b] mb-4">{blog.createdBy?.fullName || 'Anonymous'}</h4>
                <p className="text-[15px] text-[#414944] font-manrope font-medium leading-relaxed mb-8 max-w-xl">
                  Digital author and active contributor at Scribloom. Documenting the intersection of structured systems and organic creativity.
                </p>
                <div className="flex items-center justify-center md:justify-start">
                  <Link to={`/profile/${blog.createdBy?.username}`} className="text-[#00261b] font-manrope text-[11px] uppercase tracking-widest font-black hover:text-[#396756] transition-colors border-b-2 border-[#00261b] pb-1 hover:border-[#396756]">
                    Follow Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Discourse Section */}
            <div id="comments-section" className="mt-32 scroll-mt-32 border-t border-[#c0c8c3]/30 pt-16">
              <h3 className="font-newsreader text-4xl font-bold text-[#00261b] mb-12 flex items-center justify-between">
                <span>Discourse</span>
                <span className="text-xl bg-[#e4e2de] w-12 h-12 flex items-center justify-center rounded-full text-[#414944]">{comments.length}</span>
              </h3>
              <CommentSection blogId={blog._id} initialComments={comments} setComments={setComments} />
            </div>
          </div>

          <aside className="hidden lg:block lg:col-span-2 relative">
             {/* Right sidebar filler space or ads */}
          </aside>
        </main>
        
        {/* Related Articles - Expanding the Canopy */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="bg-[#f5f3ef] py-24 md:py-32 w-full border-t border-[#e4e2de]">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="font-newsreader text-3xl md:text-5xl font-bold text-[#00261b] mb-16 px-2">Expanding the Canopy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {relatedBlogs.map((related) => (
                  <Link to={`/blog/${related.slug}`} key={related._id} className="group block bg-[var(--background)] rounded-[2rem] p-4 sm:p-5 transition-transform duration-500 hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(0,38,27,0.06)] border border-[#e4e2de]">
                    <div className="aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden mb-6 md:mb-8 bg-[#e4e2de] shadow-inner">
                      {related.coverImage ? (
                        <img src={related.coverImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.34,1.56,0.64,1]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#eae8e4] text-[#00261b]/20">Empty Bloom</div>
                      )}
                    </div>
                    <div className="px-2 pb-4">
                      <span className="font-manrope text-[10px] uppercase tracking-[0.25em] text-[#7b5455] font-black block mb-3 opacity-90 group-hover:opacity-100">{related.category?.name || 'Read'}</span>
                      <h4 className="font-newsreader text-2xl font-bold text-[#00261b] group-hover:text-[#396756] transition-colors leading-[1.2]">{related.title}</h4>
                      <p className="mt-4 text-[#414944] text-sm font-medium line-clamp-2 leading-relaxed opacity-80">{related.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Floating Bottom Action Bar (Mobile & Desktop) */}
        <div className="fixed bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto z-[90]">
          <div className="bg-[var(--background)]/85 backdrop-blur-xl rounded-full px-6 py-3 lg:py-3.5 shadow-[0_20px_40px_rgba(0,38,27,0.1)] border border-white/60 flex items-center justify-between sm:justify-center gap-2 sm:gap-6 w-full relative">
            
            <button onClick={handleLike} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors active:scale-90 ${isLikedByUser ? 'text-[#00261b] bg-[#bcedd7]' : 'text-[#00261b] hover:bg-black/5'}`}>
              <Heart size={20} className={isLikedByUser ? 'fill-[#00261b]' : ''} strokeWidth={isLikedByUser ? 2 : 1.5} />
              <span className="font-manrope text-sm font-bold">{blog.likes.toLocaleString()}</span>
            </button>

            <div className="w-[1px] h-4 bg-[#c0c8c3] opacity-50 shrink-0"></div>

            <a href="#comments-section" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[#00261b] hover:bg-black/5 transition-colors active:scale-90">
              <MessageCircle size={20} strokeWidth={1.5} />
              <span className="font-manrope text-sm font-bold">{comments.length}</span>
            </a>

            <div className="w-[1px] h-4 bg-[#c0c8c3] opacity-50 shrink-0"></div>

            <button onClick={toggleSave} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors active:scale-90 ${isSaved ? 'text-[#00261b] bg-[#e6e5b9]' : 'text-[#00261b] hover:bg-black/5'}`}>
              <Bookmark size={20} className={isSaved ? 'fill-[#00261b]' : ''} strokeWidth={isSaved ? 2 : 1.5} />
            </button>

            <div className="w-[1px] h-4 bg-[#c0c8c3] opacity-50 shrink-0"></div>

            <button onClick={copyToClipboard} className="bg-[#00261b] text-white p-2.5 sm:p-3 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative shrink-0 shadow-lg shadow-[#00261b]/20">
              {copySuccess ? <Check size={18} strokeWidth={2.5} className="text-[#bcedd7]" /> : <Share2 size={18} strokeWidth={2} />}
              {copySuccess && <span className="absolute -top-12 bg-[#00261b] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap animate-bounce shadow-xl">Copied!</span>}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default BlogPostPage;
