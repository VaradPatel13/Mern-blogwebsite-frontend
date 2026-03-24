import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, CalendarIcon, ShieldCheck, Edit3 } from 'lucide-react';

const MyProfilePage = () => {
  const { user } = useAuth();

  const displayUser = {
    fullName: user?.fullName || "Good",
    handle: user?.username || "@gooddd1842865",
    email: user?.email || "gooddd1842865@gmail.com",
    avatarInitial: user?.fullName ? user.fullName.charAt(0).toUpperCase() : "G",
    createdAt: user?.createdAt || new Date("2026-03-01"),
    status: "Not Verified"
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] font-manrope selection:bg-[#bcedd7] selection:text-[#002116] pb-24 relative flex flex-col pt-8 lg:pt-16 w-full">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-[1000px] w-full px-6 lg:px-16 relative z-10"
      >

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#c0c8c3]/30">
          <div>
            <h1 className="text-4xl lg:text-5xl font-newsreader font-black tracking-tighter text-[#00261b] leading-none mb-2">Your Profile</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7b5455]">Public Identity</p>
          </div>
          <Link
            to="/edit-profile"
            className="inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-widest font-black text-[#00261b] hover:text-[#bcedd7] bg-[#eae8e4] border border-transparent hover:border-[#00261b] hover:bg-[#00261b] rounded-full transition-all shadow-sm"
          >
            <Edit3 size={14} strokeWidth={2.5} /> Edit Settings
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          
          {/* Main Identity (Left) */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-[#c0c8c3]/40 bg-[#eae8e4] flex items-center justify-center text-[#00261b] font-newsreader font-black text-6xl shadow-sm overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayUser.fullName} className="w-full h-full object-cover" />
              ) : (
                displayUser.avatarInitial
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-[32px] font-newsreader font-black text-[#00261b] leading-tight tracking-tight mb-1">
                {displayUser.fullName}
              </h2>
              <p className="text-[14px] font-bold text-[#7b5455] tracking-wider">
                {displayUser.handle}
              </p>
            </div>
          </div>

          {/* Core Info (Right) */}
          <div className="flex-1 w-full space-y-10 md:pt-4">
            
            <div className="pb-8 border-b border-[#c0c8c3]/30">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#414944]/50 mb-4">Email Address</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#00261b]">
                  <Mail size={16} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-bold text-[#00261b]">{displayUser.email}</p>
              </div>
            </div>

            <div className="pb-8 border-b border-[#c0c8c3]/30">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#414944]/50 mb-4">Account Creation</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#00261b]">
                  <CalendarIcon size={16} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-bold text-[#00261b]">Joined {new Date(displayUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#414944]/50 mb-4">Verification Status</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#00261b]">
                  <ShieldCheck size={16} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-bold text-[#00261b] capitalize">{displayUser.status}</p>
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default MyProfilePage;
