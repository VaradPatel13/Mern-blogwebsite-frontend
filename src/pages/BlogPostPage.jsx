// src/pages/BlogPostPage.jsx (REDESIGNED WITH AMBER-500 THEME)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlug, toggleLikeOnBlog } from '../services/blogService';
import { getCommentsForBlog } from '../services/commentService';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';
import { formatTimeAgo } from '../utils/timeUtils';
import EyeIcon from '../components/icons/EyeIcon';
import HeartIcon from '../components/icons/HeartIcon';
import CommentIcon from '../components/icons/CommentIcon';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const blogResponse = await getBlogBySlug(slug);
        if (blogResponse.success) {
          setBlog(blogResponse.data);
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

    fetchBlogAndComments();
  }, [slug]);

  const handleLike = async () => {
    if (!isAuthenticated) return alert('Please log in to like a post.');
    if (isLiking) return; // Prevent double clicks

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

  // Loading state with modern skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            {/* Title skeleton */}
            <div className="h-12 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg mb-6"></div>

            {/* Meta skeleton */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-amber-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-amber-200 rounded w-32"></div>
                <div className="h-3 bg-amber-100 rounded w-24"></div>
              </div>
            </div>

            {/* Image skeleton */}
            <div className="h-64 sm:h-80 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl mb-8"></div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-amber-100 rounded w-full"></div>
              <div className="h-4 bg-amber-100 rounded w-5/6"></div>
              <div className="h-4 bg-amber-100 rounded w-4/6"></div>
            </div>
          </div>

          {/* Loading spinner */}
          <div className="flex justify-center mt-8">
            <div className="relative">
              <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
              <p className="text-amber-600 font-medium mt-4 text-center">Loading amazing content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Post not found
  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isLikedByUser = user && blog.likedBy.includes(user._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 32V0h32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-amber-600" />
          </svg>
        </div>

        <article className="relative max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <a href="/home" className="hover:text-amber-600 transition-colors duration-200">Home</a>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <a href="/dashboard" className="hover:text-amber-600 transition-colors duration-200">Blog</a>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 font-medium truncate">{blog.title}</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              {blog.title}
            </span>
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="relative">
                <img
                  src={blog.createdBy.avatar}
                  alt={blog.createdBy.fullName}
                  className="w-14 h-14 rounded-full object-cover border-3 border-amber-400 shadow-md transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">{blog.createdBy.fullName}</p>
                <p className="text-sm text-gray-600">Posted {formatTimeAgo(blog.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-lg">
                <EyeIcon className="w-5 h-5 text-amber-500" />
                <span className="font-medium text-gray-700">{blog.views.toLocaleString()}</span>
              </div>

              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isLikedByUser
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                  } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
              >
                <HeartIcon className={`w-5 h-5 ${isLiking ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{blog.likes.toLocaleString()}</span>
              </button>

              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <CommentIcon className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">{comments.length}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative mb-10 group">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Featured Image
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-amber-100">
            <div
              className="prose prose-lg max-w-none break-words whitespace-pre-wrap
             prose-headings:text-gray-900 prose-headings:font-bold
             prose-h1:text-amber-700 prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
             prose-h2:text-amber-600 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-b prose-h2:border-amber-200 prose-h2:pb-2
             prose-h3:text-amber-600 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
             prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
             prose-a:text-amber-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-amber-700 hover:prose-a:underline prose-a:transition-all
             prose-strong:text-amber-700 prose-strong:font-semibold
             prose-em:text-gray-600
             prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
             prose-code:bg-gray-100 prose-code:text-amber-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
             prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:shadow-lg
             prose-ul:space-y-2 prose-ol:space-y-2
             prose-li:text-gray-700
             prose-img:rounded-lg prose-img:shadow-md prose-img:border prose-img:border-amber-100"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </div>

          {/* Article Footer */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img
                  src={blog.createdBy.avatar}
                  alt={blog.createdBy.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h3 className="font-semibold text-lg">Written by {blog.createdBy.fullName}</h3>
                  <p className="text-amber-100">Thank you for reading!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 font-medium" onClick={() => window.location.href = `/profile/${blog.createdBy.username}`}>
                  Check Profile
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: blog.title,
                        text: "Check out this blog post!",
                        url: window.location.href,
                      }).catch(err => console.log("Share failed:", err));
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Share Article
                </button>

              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-2 text-sm font-medium text-amber-600 rounded-full border border-amber-200">
                Join the Discussion
              </span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">
                Comments ({comments.length})
              </h2>
              <p className="text-amber-100 mt-1">Share your thoughts about this article</p>
            </div>
            <div className="p-8">
              <CommentSection
                blogId={blog._id}
                initialComments={comments}
                setComments={setComments}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;