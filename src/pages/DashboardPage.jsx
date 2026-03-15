import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs } from '../services/uesrService';
import { deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { Plus, Heart, Edit, Trash2, Eye, Calendar, LayoutDashboard, User } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
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
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to permanently delete this post?')) {
      try {
        await deleteBlog(blogId);
        fetchMyBlogs();
      } catch (err) {
        setError(err.message || 'Failed to delete post.');
      }
    }
  };

  const totalViews = myBlogs.reduce((acc, blog) => acc + (blog.views || 0), 0);
  const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes || 0), 0);
  const publishedBlogs = myBlogs.filter(blog => blog.status === 'published');
  const draftBlogs = myBlogs.filter(blog => blog.status === 'draft');

  const filteredBlogs = activeTab === 'all' ? myBlogs :
    activeTab === 'published' ? publishedBlogs :
      draftBlogs;

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white border rounded-[2rem] border-slate-100 p-8 animate-pulse shadow-sm">
          <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-100 rounded-lg w-1/4 mb-4"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-slate-100 rounded-lg w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full font-sans pt-12"
    >
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-3">Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage your publications and track your performance.</p>
        </div>
        <Link
          to="/create-post"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-sm"
        >
          <Plus size={18} />
          <span>Write a story</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col hover:shadow-teal-900/5 transition-shadow">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Stories</div>
          <div className="text-4xl font-bold tracking-tighter text-slate-900">{myBlogs.length}</div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col hover:shadow-teal-900/5 transition-shadow">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Views</div>
          <div className="text-4xl font-bold tracking-tighter text-slate-900">{totalViews}</div>
        </div>
        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col hover:shadow-teal-900/5 transition-shadow">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Likes</div>
          <div className="text-4xl font-bold tracking-tighter text-slate-900">{totalLikes}</div>
        </div>
        <div className="bg-white border border-teal-100 p-8 rounded-[2rem] shadow-xl shadow-teal-500/10 flex flex-col bg-teal-50/50 hover:shadow-teal-500/20 transition-shadow">
          <div className="text-[11px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">Published</div>
          <div className="text-4xl font-bold tracking-tighter text-teal-600">{publishedBlogs.length}</div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-8 text-[11px] font-bold tracking-wider uppercase">
          {error}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-12">
        {/* Left Side: Story List */}
        <div>
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-100 mb-8 overflow-x-auto">
            {[
              { key: 'all', label: 'All filter', count: myBlogs.length },
              { key: 'published', label: 'Published', count: publishedBlogs.length },
              { key: 'draft', label: 'Drafts', count: draftBlogs.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${activeTab === tab.key
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-900'
                  }`}
              >
                <span>{tab.label === 'All filter' ? 'All Stories' : tab.label}</span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-black tracking-widest ${activeTab === tab.key ? 'bg-slate-100 text-slate-900' : 'bg-slate-50 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredBlogs.length > 0 ? (
            <div className="space-y-6">
              {filteredBlogs.map((blog, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={blog._id}
                  className="group bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:bg-slate-50/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {blog.status === 'published' ? (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 bg-teal-50 px-2 py-1.5 rounded-md">Published</span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-100 px-2 py-1.5 rounded-md">Draft</span>
                        )}
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-300" />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tighter text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                        <Link to={`/blog/${blog.slug}`}>{blog.title || 'Untitled Story'}</Link>
                      </h2>

                      <div className="flex items-center gap-6 text-slate-400 text-sm font-bold mt-6">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg" title="Views">
                          <Eye size={16} /> <span>{blog.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg" title="Likes">
                          <Heart size={16} /> <span>{blog.likes || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t sm:border-t-0 border-slate-100 pt-6 sm:pt-0 shrink-0">
                      <Link
                        to={`/edit-post/${blog._id}`}
                        className="flex items-center justify-center w-12 h-12 text-slate-500 bg-slate-50 border border-slate-100 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-2xl transition-all"
                        title="Edit Story"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex items-center justify-center w-12 h-12 text-red-500 bg-red-50 border border-red-100 hover:text-red-700 hover:bg-red-100 rounded-2xl transition-all"
                        title="Delete Story"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 border border-slate-100 border-dashed rounded-[3rem]">
              <div className="w-20 h-20 bg-white shadow-xl shadow-slate-200/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <LayoutDashboard className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tighter">No stories yet.</h3>
              <p className="text-slate-500 mb-8 font-medium">Get started by weaving your first idea.</p>
              <Link
                to="/create-post"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Write a story
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Quick Profile */}
        <div className="hidden xl:block">
          <div className="sticky top-28 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-slate-100 bg-white">
                <img
                  src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.username}`}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">{user?.fullName}</h3>
              <p className="text-[11px] font-black text-teal-600 mb-8 uppercase tracking-[0.2em] mt-1">@{user?.username}</p>

              <div className="w-full space-y-2 mb-8 bg-slate-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center text-sm font-bold py-2 border-b border-slate-200/50 last:border-0 last:pb-0">
                  <span className="text-slate-400">Stories</span>
                  <span className="text-slate-900 bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-100">{myBlogs.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold py-2 border-b border-slate-200/50 last:border-0 last:pb-0">
                  <span className="text-slate-400">Total Views</span>
                  <span className="text-slate-900 bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-100">{totalViews}</span>
                </div>
              </div>

              <Link
                to={`/my-profile`}
                className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl shadow-sm"
              >
                <User size={16} /> View Profile
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default DashboardPage;