import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogBySlug, toggleLikeOnBlog, getAllBlogs } from '../services/blogService';
import { getCommentsForBlog } from '../services/commentService';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';
import { formatTimeAgo } from '../utils/timeUtils';
import { Eye, Heart, MessageCircle, Share2, Link as LinkIcon, Bookmark, X, Copy, Check, Play } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [scrollProgress, setScrollProgress] = useState('0%');
  const { isAuthenticated, user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const topShareMenuRef = useRef(null);
  const bottomShareMenuRef = useRef(null);

  useEffect(() => {
    const fetchBlogAndData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const blogResponse = await getBlogBySlug(slug);
        if (blogResponse.success) {
          setBlog(blogResponse.data);
          
          const allBlogsResponse = await getAllBlogs();
          if (allBlogsResponse.success) {
            setRelatedBlogs(allBlogsResponse.data.docs.filter(b => b._id !== blogResponse.data._id).slice(0, 3));
          }

          const commentsResponse = await getCommentsForBlog(blogResponse.data._id);
          if (commentsResponse.success) {
            setComments(commentsResponse.data.docs);
          }
        }
      } catch (err) {
        setError(err.message || 'Could not fetch the blog post.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scrollValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = async () => {
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
  };

  useEffect(() => {
    if (blog) {
      const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      setIsSaved(saved.some(p => p._id === blog._id));
    }
  }, [blog]);

  const toggleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (isSaved) {
      const filtered = saved.filter(p => p._id !== blog._id);
      localStorage.setItem('savedPosts', JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      saved.push({
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        coverImage: blog.coverImage,
        category: blog.category,
        createdAt: blog.createdAt
      });
      localStorage.setItem('savedPosts', JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
      setShareMenuOpen(false);
    }, 2000);
  };

  // Close share menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (topShareMenuRef.current && !topShareMenuRef.current.contains(event.target)) &&
        (bottomShareMenuRef.current && !bottomShareMenuRef.current.contains(event.target))
      ) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF4D00] border-r-2"></div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black text-black mb-2">Oops! Something went wrong</h1>
          <p className="text-[#6B6B6B] mb-6">{error || "Post not found"}</p>
          <Link to="/home" className="text-[#FF4D00] font-bold underline">Go Back Home</Link>
        </div>
      </div>
    );
  }

  const isLikedByUser = user && blog.likedBy.includes(user._id);

  // Extract headings for Table of Contents
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
    return `<h${level} id="section-${hIndex++}" class="scroll-mt-24">${content}</h${level}>`;
  });

  const wordCount = blog?.body ? blog.body.replace(/<[^>]*>/g, '').trim().split(/\s+/).length : 0;
  const minutesRead = Math.max(1, Math.ceil(wordCount / 225));
  const hoursRead = Math.floor(minutesRead / 60);
  const remainingMinutes = minutesRead % 60;

  // SEO helpers
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const plainTextSummary = blog.summary || (blog.body ? blog.body.replace(/<[^>]*>/g, '').slice(0, 160) : '');
  const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : '';
  const updateDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishDate;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": plainTextSummary,
    "image": blog.coverImage || '',
    "datePublished": publishDate,
    "dateModified": updateDate,
    "author": {
      "@type": "Person",
      "name": blog.createdBy?.fullName || "Anonymous"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bolify",
      "logo": {
        "@type": "ImageObject",
        "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "wordCount": wordCount,
    "articleSection": blog.category?.name || "General",
    "interactionStatistic": [
      { "@type": "InteractionCounter", "interactionType": "https://schema.org/LikeAction", "userInteractionCount": blog.likes },
      { "@type": "InteractionCounter", "interactionType": "https://schema.org/CommentAction", "userInteractionCount": comments.length }
    ]
  };

  return (
    <article className="bg-[#FFFFFF] text-[#1A1A1A] min-h-screen font-inter selection:bg-[#FF4D00] selection:text-white" itemScope itemType="https://schema.org/Article">
      {/* SEO Head */}
      <Helmet>
        <title>{blog.title} | Bolify</title>
        <meta name="description" content={plainTextSummary} />
        <meta name="author" content={blog.createdBy?.fullName || 'Anonymous'} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={plainTextSummary} />
        <meta property="og:url" content={pageUrl} />
        {blog.coverImage && <meta property="og:image" content={blog.coverImage} />}
        <meta property="og:site_name" content="Bolify" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={updateDate} />
        <meta property="article:author" content={blog.createdBy?.fullName || 'Anonymous'} />
        {blog.category?.name && <meta property="article:section" content={blog.category.name} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={plainTextSummary} />
        {blog.coverImage && <meta name="twitter:image" content={blog.coverImage} />}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Sticky Top Nav (Glassmorphic) */}
      <nav className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12" aria-label="Article navigation">
        <div className="flex items-center gap-3 truncate max-w-[55%] md:max-w-[60%]">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#999] truncate">
            {blog.title}
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6 relative" ref={topShareMenuRef}>
          <button 
            onClick={toggleSave}
            className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 md:gap-2 group ${isSaved ? 'text-[#D4AF37]' : 'text-[#999] hover:text-[#D4AF37]'}`}
            aria-label={isSaved ? 'Unsave article' : 'Save article for later'}
          >
            <Bookmark size={14} className={isSaved ? 'fill-[#D4AF37]' : 'group-hover:fill-[#D4AF37] transition-all'} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save for later'}</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="p-2 text-[#999] hover:text-black transition-colors"
              aria-label="Share article"
              aria-expanded={shareMenuOpen}
            >
              <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            {/* Share Dropdown Menu */}
            {shareMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 md:w-64 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-[100]" role="menu">
                <button 
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 text-sm font-medium text-[#444] hover:bg-gray-50 transition-colors"
                  role="menuitem"
                >
                  {copySuccess ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} className="text-gray-400" />}
                  <span>{copySuccess ? 'Copied!' : 'Copy link'}</span>
                </button>
                
                <div className="border-t border-gray-50 my-1"></div>

                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(blog.title)}%20${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 text-sm font-medium text-[#444] hover:bg-gray-50 transition-colors"
                  role="menuitem"
                >
                  <MessageCircle size={18} className="text-gray-400" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div className="editorial-progress-bar" style={{ width: scrollProgress }} />
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 relative">
          
          {/* Main Content Area */}
          <main className="col-span-12 lg:col-span-8 lg:col-start-1">
            
            <header id="story-top" className="mb-8 md:mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-black text-black leading-[1.1] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.03em] mb-3 md:mb-4" itemProp="headline">
                {blog.title}
              </h1>
              
              {blog.summary && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#6B6B6B] font-medium leading-relaxed mb-6 md:mb-8" itemProp="abstract">
                  {blog.summary}
                </p>
              )}

              <div className="flex items-center gap-3 mt-4 md:mt-6" itemProp="author" itemScope itemType="https://schema.org/Person">
                <img
                  src={blog.createdBy.avatar || "https://i.pravatar.cc/150"}
                  alt={`${blog.createdBy.fullName}'s avatar`}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  itemProp="image"
                />
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <span className="text-sm font-medium text-black" itemProp="name">{blog.createdBy.fullName}</span>
                  <button className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                    Follow
                  </button>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#6B6B6B]">
                    <span>
                      {hoursRead > 0 
                        ? `${hoursRead}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}` 
                        : `${minutesRead} min`} read
                    </span>
                    <span>·</span>
                    <time dateTime={publishDate} itemProp="datePublished">{formatTimeAgo(blog.createdAt)}</time>
                  </div>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {blog.coverImage && (
              <figure className="mb-8 md:mb-12 lg:mb-16">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-auto block rounded-sm"
                  itemProp="image"
                  loading="eager"
                />
              </figure>
            )}

            {/* Long-form Content */}
            <section
              className="prose prose-base sm:prose-lg md:prose-xl max-w-none 
                font-inter prose-p:text-[#333] prose-p:leading-[1.8] md:prose-p:leading-[1.9] prose-p:mb-6 md:prose-p:mb-8 lg:prose-p:mb-10
                prose-headings:font-playfair prose-headings:font-black prose-headings:text-black prose-headings:tracking-tighter
                prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mt-12 md:prose-h2:mt-16 lg:prose-h2:mt-20 prose-h2:mb-6 md:prose-h2:mb-8
                prose-img:rounded-sm prose-img:border prose-img:border-gray-100
                prose-blockquote:pull-quote overflow-visible"
              dangerouslySetInnerHTML={{ __html: processedBody }}
              itemProp="articleBody"
            />

            {/* Divider */}
            <div className="h-px bg-gray-100 w-full my-12 md:my-16 lg:my-20" role="separator" />

            {/* Action Bar & Stats */}
            <section className="flex flex-row items-center justify-between gap-4 mb-12 md:mb-16 lg:mb-20" aria-label="Article actions">
              <div className="flex items-center gap-6 md:gap-8 lg:gap-12">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center gap-2 md:gap-3 transition-all ${isLikedByUser ? 'text-[#FF4D00]' : 'text-[#BBB] hover:text-black'}`}
                  aria-label={`Like article, ${blog.likes} likes`}
                >
                  <Heart size={20} className={`md:w-6 md:h-6 ${isLikedByUser ? 'fill-[#FF4D00]' : ''}`} />
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{blog.likes.toLocaleString()}</span>
                </button>
                <div className="flex items-center gap-2 md:gap-3 text-[#BBB]" aria-label={`${blog.views} views`}>
                  <Eye size={20} className="md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{blog.views.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-6 relative">
                <button 
                   onClick={toggleSave}
                   className={`p-1 md:p-1.5 transition-all ${isSaved ? 'text-[#D4AF37]' : 'text-[#BBB] hover:text-black'}`}
                   aria-label={isSaved ? 'Unsave article' : 'Save article'}
                >
                  <Bookmark size={20} className={`md:w-6 md:h-6 ${isSaved ? 'fill-[#D4AF37]' : ''}`} />
                </button>

                <div className="relative" ref={bottomShareMenuRef}>
                  <button 
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="p-1 md:p-1.5 text-[#BBB] hover:text-black transition-colors"
                    aria-label="Share article"
                    aria-expanded={shareMenuOpen}
                  >
                    <Share2 size={20} className="md:w-6 md:h-6" />
                  </button>

                  {/* Bottom Share Dropdown */}
                  {shareMenuOpen && (
                    <div className="absolute bottom-full right-0 mb-3 w-56 md:w-64 bg-white border border-gray-100 rounded-xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-[100]" role="menu">
                      <button 
                        onClick={copyToClipboard}
                        className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 text-sm font-medium text-[#444] hover:bg-gray-50 transition-colors"
                        role="menuitem"
                      >
                        {copySuccess ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} className="text-gray-400" />}
                        <span>{copySuccess ? 'Copied!' : 'Copy link'}</span>
                      </button>
                      
                      <div className="border-t border-gray-50 my-1"></div>

                      <a 
                        href={`https://wa.me/?text=${encodeURIComponent(blog.title)}%20${encodeURIComponent(pageUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 text-sm font-medium text-[#444] hover:bg-gray-50 transition-colors"
                        role="menuitem"
                      >
                        <MessageCircle size={18} className="text-gray-400" />
                        <span>Share on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Comments Section */}
            <div id="comments-section" className="scroll-mt-24">
              <CommentSection
                blogId={blog._id}
                initialComments={comments}
                setComments={setComments}
              />
            </div>
          </main>

          {/* Right Sidebar: Table of Contents (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 lg:col-start-10 relative bg-gray-50 min-h-full rounded-l-2xl -mr-6 lg:-mr-16 pl-8 pr-6 pt-8" aria-label="Table of contents">
            <nav className="sticky top-32 space-y-10">
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-[#999] border-b border-gray-200 pb-4">Contents</h2>
                <div className="flex flex-col gap-5">
                  {/* Top Level Link to Title */}
                  <a 
                    href="#story-top"
                    className="text-[13px] font-bold text-[#777] hover:text-black transition-colors leading-tight"
                  >
                    {blog.title}
                  </a>
                  
                  <div className="flex flex-col gap-3.5 border-l border-gray-200 ml-0.5">
                    {headings.map((h, i) => (
                      <a 
                        key={i} 
                        href={`#${h.id}`} 
                        className={`pl-4 text-[12px] font-medium transition-all leading-relaxed hover:text-black hover:border-l-2 hover:border-[#FF4D00] -ml-[2px] ${
                          h.level === 'h3' ? 'ml-4 text-[#B0B0B0] italic scale-95 origin-left' : 'text-[#999]'
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </div>

                  {/* Discussion Link */}
                  <a 
                    href="#comments-section"
                    className="text-[12px] font-black uppercase tracking-wider text-[#B0B0B0] hover:text-black pt-3 transition-colors"
                  >
                    Discussion
                  </a>
                </div>
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* Share Overlay Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-white/90 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Share article">
          <div className="w-full max-w-lg md:max-w-2xl text-center relative">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 p-3 md:p-4 text-black hover:scale-110 transition-transform bg-gray-50 rounded-full shadow-sm"
              aria-label="Close share modal"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>
            
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF4D00] mb-4 block">Spread the Insight</span>
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-playfair font-black mb-8 md:mb-12 text-black leading-tight">
              Share this dialogue with your world.
            </h3>
            
            <div className="max-w-md mx-auto space-y-8 md:space-y-12">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#999]">Copy Editorial Link</span>
                <div className="group relative">
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-2 border-black rounded-xl md:rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none mb-4">
                    <span className="flex-1 truncate text-xs md:text-sm font-bold text-black text-left">{pageUrl}</span>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 md:px-6 py-2 bg-black text-white rounded-lg md:rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF4D00] transition-colors shrink-0"
                    >
                      {copySuccess ? (
                        <>
                          <Check size={16} /> <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <button 
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(blog.title)}%20${encodeURIComponent(pageUrl)}`, '_blank')}
                  className="w-full sm:w-48 flex items-center justify-center gap-3 py-3 md:py-4 border-2 border-black rounded-xl md:rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <MessageCircle size={18} /> WhatsApp
                </button>
              </div>

              <button 
                onClick={() => setShowShareModal(false)}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BBB] hover:text-black transition-colors"
              >
                Continue Reading →
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostPage;
