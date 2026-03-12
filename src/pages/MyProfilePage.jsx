import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Smartphone, Calendar, Edit, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  const profileDetails = [
    { icon: <User size={18} className="text-slate-400" />, label: "Username", value: `@${user.username}` },
    { icon: <Mail size={18} className="text-slate-400" />, label: "Email Address", value: user.email },
    { icon: <Smartphone size={18} className="text-slate-400" />, label: "Mobile Number", value: user.mobileNumber || "Not provided" },
    { icon: <Calendar size={18} className="text-slate-400" />, label: "Joined On", value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ];

  return (
    <div className="max-w-4xl mx-auto font-sans">

      {/* Page Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and account settings.</p>
        </div>
        <Link
          to="/edit-profile"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-sm text-sm"
        >
          <Edit size={16} />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-12">

        {/* Banner Area */}
        <div className="h-32 md:h-48 bg-slate-100 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1400')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-10 relative">
          {/* Avatar Dropting down from banner */}
          <div className="relative -mt-16 sm:-mt-20 mb-6 flex justify-between items-end">
            <div className="p-1.5 bg-white rounded-full inline-block shadow-sm">
              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt={user.fullName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover bg-slate-100"
              />
            </div>
            <div className="mb-4">
              <Link to={`/profile/${user.username}`} className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 group">
                View public profile <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight mb-1">{user.fullName}</h2>
            <p className="text-slate-500 font-medium text-lg">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Account Details Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-4">
          <span>Account Details</span>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileDetails.map((detail, index) => (
            <div key={index} className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex items-start gap-4 hover:border-slate-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-teal-700">
                {detail.icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{detail.label}</p>
                <p className="text-slate-900 font-medium font-sans">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MyProfilePage;
