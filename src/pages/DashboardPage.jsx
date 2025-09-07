import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs } from '../services/uesrService';
import { deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { Plus, Heart, Edit, Trash2, Eye, BookOpen, TrendingUp, Users, Calendar, Clock, Share2, MoreVertical } from 'lucide-react';
import { PenTool, Lightbulb, Star, ArrowRight } from 'lucide-react';

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
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
          <div className="flex space-x-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30">
      <div className="container mx-auto px-4 py-8 mt-7 max-w-7xl">
        {/* Enhanced Header with gradient background */}
        <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 rounded-3xl p-8 mb-8 overflow-hidden shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="text-white mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                Your Stories
              </h1>
              <p className="text-amber-100 text-lg lg:text-xl">
                Create, manage and share your incredible stories with the world
              </p>
            </div>
            
            <Link
              to="/create-post"
              className="group bg-white text-amber-600 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 font-semibold hover:scale-105"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <Plus size={20} />
              </div>
              <span>Write New Story</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{myBlogs.length}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Stories</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{totalViews}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Views</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{totalLikes}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Likes</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{publishedBlogs.length}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Published</h3>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start space-x-3">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'all', label: 'All Stories', count: myBlogs.length },
                { key: 'published', label: 'Published', count: publishedBlogs.length },
                { key: 'draft', label: 'Drafts', count: draftBlogs.length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'bg-amber-100 text-amber-800 shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    activeTab === tab.key ? 'bg-amber-200' : 'bg-gray-100'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : filteredBlogs.length > 0 ? (
              <div className="space-y-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            blog.status === 'published' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          }`}>
                            {blog.status === 'published' ? '✓ Published' : '📝 Draft'}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                          {blog.title}
                        </h2>
                      </div>
                      
                      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-gray-600">
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Eye size={16} className="text-gray-500" />
                          <span className="font-medium">{blog.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Heart size={16} className="text-gray-500" />
                          <span className="font-medium">{blog.likes || 0}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link 
                          to={`/edit-post/${blog._id}`} 
                          className="flex items-center space-x-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </Link>
                        <button 
                          onClick={() => handleDelete(blog._id)} 
                          className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State Design
              <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl shadow-sm border border-amber-100 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-200/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-16 right-20 w-6 h-6 border-2 border-amber-300/40 rotate-12 rounded-sm"></div>
                  <div className="absolute bottom-20 left-16 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 right-12 w-8 h-1 bg-amber-300/50 rounded-full transform rotate-45"></div>
                </div>

                <div className="relative px-8 py-16 text-center">
                  <div className="mb-8 relative">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg mb-6 relative">
                      <PenTool className="w-12 h-12 text-amber-600" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce">
                        <Star className="w-3 h-3 text-amber-500" />
                      </div>
                      <div className="absolute -bottom-1 -left-2 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center animate-bounce delay-500">
                        <Lightbulb className="w-2.5 h-2.5 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-10 max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      Your Story Journey
                      <span className="text-amber-600"> Starts Here</span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Transform your ideas into captivating stories that inspire, educate, and connect with readers around the world.
                    </p>
                  </div>

                  <div className="mb-12">
                    <Link
                      to="/create-post"
                      className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      Write Your First Story
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img 
                      src={user?.avatar} 
                      alt={user?.fullName} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-200" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{user?.fullName}</h3>
                    <Link 
                      to={`/profile/${user?.username}`} 
                      className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1 mt-1"
                    >
                      <span>View Public Profile</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Stories</span>
                    <span className="text-xl font-bold text-gray-800">{myBlogs.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Views</span>
                    <span className="text-xl font-bold text-gray-800">{totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Likes</span>
                    <span className="text-xl font-bold text-gray-800">{totalLikes}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-3"></div>
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <Link
                    to="/create-post"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-amber-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <Plus size={18} className="text-amber-600" />
                    </div>
                    <span className="font-medium text-gray-700">New Story</span>
                  </Link>
                  <Link
                    to="/my-profile"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">Edit Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;