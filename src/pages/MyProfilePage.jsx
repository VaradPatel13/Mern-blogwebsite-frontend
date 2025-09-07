

// src/pages/MyProfilePage.jsx (NEW FILE)
// The main page for viewing the logged-in user's profile.

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Smartphone, Calendar, Eye, Heart, FileText } from 'lucide-react';
// import { getUserStats } from '../services/uesrService';

const MyProfilePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, totalLikes: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getUserStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!user) {
    return <p className="text-center text-lg mt-8">Loading user data...</p>;
  }

  const profileDetails = [
    { icon: <User size={20} className="text-amber-600" />, label: "Username", value: `@${user.username}` },
    { icon: <Mail size={20} className="text-amber-600" />, label: "Email Address", value: user.email },
    { icon: <Smartphone size={20} className="text-amber-600" />, label: "Mobile Number", value: user.mobileNumber || "Not provided" },
    { icon: <Calendar size={20} className="text-amber-600" />, label: "Joined On", value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ];

  const formatStat = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <Card className="shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 h-32" />
        <div className="p-6 flex items-end -mt-16">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-800">{user.fullName}</h1>
            <p className="text-md text-gray-500">Your personal account</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats Card */}
          {/* <Card className="shadow-lg md:col-span-1">
            <CardHeader>
              <CardTitle className="text-amber-800">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="flex items-center text-gray-600"><FileText size={20} className="mr-3 text-amber-500" /> Total Posts</span>
                <span className="font-bold text-gray-800">{loadingStats ? '...' : stats.totalPosts}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="flex items-center text-gray-600"><Eye size={20} className="mr-3 text-amber-500" /> Total Views</span>
                <span className="font-bold text-gray-800">{loadingStats ? '...' : formatStat(stats.totalViews)}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="flex items-center text-gray-600"><Heart size={20} className="mr-3 text-amber-500" /> Total Likes</span>
                <span className="font-bold text-gray-800">{loadingStats ? '...' : formatStat(stats.totalLikes)}</span>
              </div>
            </CardContent>
          </Card> */}

        {/* Profile Details Card */}
        <Card className="shadow-lg md:col-span-3">
          <CardHeader>
            <CardTitle className="text-amber-800">Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {profileDetails.map((detail, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-100 rounded-full">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">{detail.label}</p>
                    <p className="text-lg text-gray-800">{detail.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfilePage;
