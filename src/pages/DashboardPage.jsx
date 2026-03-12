import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs } from '../services/uesrService';
import { deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { Plus, Heart, Edit, Trash2, Eye, TrendingUp, Calendar, MoreVertical, LayoutDashboard, User } from 'lucide-react';

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
        <div key={i} className="bg-white border text-left border-slate-200 p-6 animate-pulse">
          <div className="h-6 bg-slate-100 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/4 mb-4"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-slate-100 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full font-sans pt-10">

      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage your publications and track your performance.</p>
        </div>
        <Link
          to="/create-post"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Write a story</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Stories</div>
          <div className="text-3xl font-serif font-bold text-slate-900">{myBlogs.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Views</div>
          <div className="text-3xl font-serif font-bold text-slate-900">{totalViews}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Likes</div>
          <div className="text-3xl font-serif font-bold text-slate-900">{totalLikes}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Published</div>
          <div className="text-3xl font-serif font-bold text-teal-700">{publishedBlogs.length}</div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 mb-8 font-medium">
          {error}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-12">

        {/* Left Side: Story List */}
        <div>
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200 mb-8 overflow-x-auto">
            {[
              { key: 'all', label: 'All filter', count: myBlogs.length },
              { key: 'published', label: 'Published', count: publishedBlogs.length },
              { key: 'draft', label: 'Drafts', count: draftBlogs.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.key
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
              >
                <span>{tab.label === 'All filter' ? 'All Stories' : tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key ? 'bg-slate-100 text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredBlogs.length > 0 ? (
            <div className="space-y-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white border border-slate-200 p-6 transition-all hover:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {blog.status === 'published' ? (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2 py-1 rounded">Published</span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-1 rounded">Draft</span>
                        )}
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors">
                        <Link to={`/blog/${blog.slug}`}>{blog.title || 'Untitled Story'}</Link>
                      </h2>

                      <div className="flex items-center gap-4 text-slate-500 text-sm font-medium mt-4">
                        <div className="flex items-center gap-1.5" title="Views">
                          <Eye size={16} /> <span>{blog.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Likes">
                          <Heart size={16} /> <span>{blog.likes || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0 shrink-0">
                      <Link
                        to={`/edit-post/${blog._id}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Edit size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-200 border-dashed rounded-xl">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">No stories yet.</h3>
              <p className="text-slate-500 mb-6 font-medium">Get started by writing your first article.</p>
              <Link
                to="/create-post"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Write a story
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Quick Profile */}
        <div className="hidden xl:block">
          <div className="sticky top-28 bg-white border border-slate-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-slate-100">
                <img
                  src={user?.avatar || "https://i.pravatar.cc/150"}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{user?.fullName}</h3>
              <p className="text-sm font-bold text-teal-700 mb-6">@{user?.username}</p>

              <div className="w-full space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium py-2 border-b border-slate-100">
                  <span className="text-slate-500">Stories</span>
                  <span className="text-slate-900">{myBlogs.length}</span>
                </div>
                <div className="flex justify-between text-sm font-medium py-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Views</span>
                  <span className="text-slate-900">{totalViews}</span>
                </div>
              </div>

              <Link
                to={`/my-profile`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <User size={16} /> View Profile
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;