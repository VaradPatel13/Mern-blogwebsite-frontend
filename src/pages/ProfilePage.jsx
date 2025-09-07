// src/pages/ProfilePage.jsx (REDESIGNED FLOATING THEME)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../services/uesrService';
import { getPostsByUserId } from '../services/blogService';
import BlogPostCard from '../components/BlogPostCard';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

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
        // console.log('Profile Response:', profileRes);
        if (profileRes.success) {
          setProfile(profileRes.data);
          const blogsRes = await getPostsByUserId(profileRes.data._id);
          // console.log('Blogs Response:', blogsRes);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-amber-600 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800">User not found</h2>
        <p className="text-gray-500">The profile you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-10 px-4 sm:px-8 lg:px-16">
      {/* Floating Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      {/* Profile Header */}
      <Card className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 h-40" />
        <div className="p-6 flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-24">
          <img
            src={profile.avatar}
            alt={profile.fullName}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-white"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 drop-shadow-md">{profile.fullName}</h1>
            <p className="text-md text-gray-600">@{profile.username}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 mt-2">
              <Calendar size={16} />
              <span>Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Blogs Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Stories by {profile.fullName}</h2>
        {blogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogPostCard key={post._id} post={{ ...post, author: profile }} />
            ))}

          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white/70 backdrop-blur-lg rounded-3xl border border-amber-200 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800">No Posts Yet</h3>
            <p className="text-gray-500 mt-2">This user hasn’t published any stories yet.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfilePage;
