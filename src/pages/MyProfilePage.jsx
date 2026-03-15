import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Smartphone, Calendar, Edit, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-100 rounded-[2rem] mb-4"></div>
          <div className="h-6 w-48 bg-slate-100 rounded-lg mb-2"></div>
          <div className="h-4 w-32 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const profileDetails = [
    { icon: <User size={18} className="text-teal-500" />, label: "Username", value: `@${user.username}` },
    { icon: <Mail size={18} className="text-teal-500" />, label: "Email Address", value: user.email },
    { icon: <Smartphone size={18} className="text-teal-500" />, label: "Mobile Number", value: user.mobileNumber || "Not provided" },
    { icon: <Calendar size={18} className="text-teal-500" />, label: "Joined On", value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto font-sans pt-12 pb-24 px-6"
    >
      {/* Page Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 mb-2">My Profile</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-600">Account Configuration</p>
        </div>
        <Link
          to="/edit-profile"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all text-sm shadow-sm"
        >
          <Edit size={16} />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden mb-16 shadow-xl shadow-slate-200/50 relative group">
        
        {/* Banner Area */}
        <div className="h-40 md:h-56 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1400')] bg-cover bg-center opacity-30 grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="px-8 sm:px-12 pb-12 relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="relative -mt-20 md:-mt-24 inline-block z-10 w-max">
            <div className="p-2 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50">
              <img
                src={user.avatar || `https://i.pravatar.cc/150?u=${user.username}`}
                alt={user.fullName}
                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover bg-slate-50 ring-1 ring-slate-100"
              />
            </div>
          </div>
          
          <div className="flex-1 md:pr-4 pt-4 md:pt-0">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 leading-[1.1] mb-2">{user.fullName}</h2>
            <p className="text-[14px] font-bold text-teal-600 uppercase tracking-widest">@{user.username}</p>
          </div>

          <div className="mt-4 md:mt-0 pb-2">
            <Link to={`/profile/${user.username}`} className="inline-flex items-center gap-2 text-sm font-bold bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group/link">
              View Public <MoveRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Account Details Grid */}
      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-4">
          <span>Identity Details</span>
          <div className="h-px bg-slate-100 flex-grow"></div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileDetails.map((detail, index) => (
            <div key={index} className="flex flex-col gap-3 group/item">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover/item:bg-teal-50 group-hover/item:scale-110 transition-all border border-slate-100">
                {detail.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">{detail.label}</p>
                <p className="text-lg font-bold text-slate-900 tracking-tight">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default MyProfilePage;
