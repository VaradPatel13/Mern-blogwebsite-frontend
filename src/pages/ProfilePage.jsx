import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile } from '../services/uesrService';
import { getPostsByUserId } from '../services/blogService';
import BlogPostCard from '../components/BlogPostCard';
import { ArrowLeft, MapPin } from 'lucide-react';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!username) return;
      try {
        setLoading(true);
        setError('');
        const profileRes = await getUserProfile(username);
        if (profileRes.success) {
          setProfile(profileRes.data);
          const blogsRes = await getPostsByUserId(profileRes.data._id);
          if (blogsRes.success) setBlogs(blogsRes.data);
        }

      } catch (err) {
        setError(err.message || 'Could not load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-24 h-24 rounded-full bg-slate-200 animate-pulse"></div>
        <div className="h-6 w-48 bg-slate-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center px-4">
        <div>
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <span className="font-serif text-3xl font-bold text-slate-400">?</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Writer not found</h2>
          <p className="text-slate-500 mb-6 font-medium">{error || "This profile doesn't exist or was removed."}</p>
          <Link to="/home" className="inline-flex font-bold text-teal-700 hover:text-teal-800 transition-colors">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto font-sans">

      {/* Header Back Link */}
      <div className="mb-10">
        <Link to="/home" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to feed
        </Link>
      </div>

      {/* Profile Header Block */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 pb-12 mb-12 border-b border-slate-200 pt-4">
        <div className="shrink-0">
          <img
            src={profile.avatar || "https://i.pravatar.cc/150"}
            alt={profile.fullName}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover bg-slate-100 border border-slate-200 shadow-sm"
          />
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-slate-900 leading-tight mb-2 tracking-tight">
            {profile.fullName}
          </h1>
          <p className="text-lg font-bold text-teal-700 mb-4">@{profile.username}</p>

          <p className="text-slate-600 font-medium leading-relaxed max-w-xl mx-auto sm:mx-0">
            MindLoom Writer since {new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.
          </p>
        </div>
      </div>

      {/* Writer's Stories Feed */}
      <div>
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Latest from {profile.fullName.split(' ')[0]}
          </h2>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{blogs.length} Stories</span>
        </div>

        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((post) => (
              <BlogPostCard key={post._id} post={{ ...post, author: profile }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">No Stories Yet</h3>
            <p className="text-slate-500 font-medium">This writer hasn't published anything yet. Check back soon.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfilePage;
