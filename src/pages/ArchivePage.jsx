import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getAllBlogs } from '../services/blogService';
import BlogPostCard from '../components/BlogPostCard';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const ArchivePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response.success) setBlogs(response.data.blogs || response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = filter
    ? blogs.filter(b => b.title?.toLowerCase().includes(filter.toLowerCase()))
    : blogs;

  // Group by month/year
  const grouped = filteredBlogs.reduce((acc, blog) => {
    const date = new Date(blog.createdAt);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(blog);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>Archive | Scribloom</title>
        <meta name="description" content="Browse the complete archive of stories published on Scribloom." />
      </Helmet>

      <div className="max-w-[1000px] mx-auto px-6 py-16 lg:py-24">

        {/* Back */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 hover:text-[#00261b] transition-colors mb-16 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Garden
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header variants={fadeIn} initial="hidden" animate="visible" custom={1} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#eae8e4] rounded-2xl flex items-center justify-center">
              <Calendar size={20} className="text-[#00261b]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">
              Story Archive
            </span>
          </div>
          <h1 className="font-newsreader text-5xl md:text-6xl lg:text-[72px] font-bold text-[#00261b] tracking-tighter leading-[1.05] mb-6">
            Every story, organized.
          </h1>
          <p className="text-lg text-[#414944] font-medium leading-relaxed max-w-2xl">
            Browse all published stories sorted by date. Find something new or revisit an old favorite.
          </p>
        </motion.header>

        {/* Search */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={2} className="mb-12">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00261b]/30" />
            <input
              type="text"
              placeholder="Filter stories..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-14 pr-4 py-3.5 bg-white border border-[#c0c8c3]/30 rounded-xl text-sm font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#a0d1bc]/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-5 w-32 bg-[#eae8e4] rounded mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map(j => (
                    <div key={j} className="h-48 bg-[#eae8e4] rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-24 bg-[#f5f3ef] rounded-[2rem] border border-[#c0c8c3]/20">
            <p className="font-newsreader text-2xl font-bold text-[#00261b] mb-2">No stories yet</p>
            <p className="text-[#414944] text-sm">Stories will appear here as they are published.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(grouped).map(([period, periodBlogs]) => (
              <motion.section key={period} variants={fadeIn} initial="hidden" animate="visible" custom={3}>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#7b5455] mb-6 flex items-center gap-3">
                  <span>{period}</span>
                  <span className="h-px flex-1 bg-[#c0c8c3]/30" />
                  <span className="text-[#00261b]/30">{periodBlogs.length} {periodBlogs.length === 1 ? 'story' : 'stories'}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {periodBlogs.map(blog => (
                    <BlogPostCard key={blog._id} post={blog} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivePage;
