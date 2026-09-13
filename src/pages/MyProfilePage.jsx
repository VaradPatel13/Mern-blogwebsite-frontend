import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, CalendarIcon, ShieldCheck, Edit3, LogIn, Lock } from 'lucide-react';
import MobileBottomNav from '../components/MobileBottomNav';

const MyProfilePage = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-[#eae8e4] animate-pulse"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#eae8e4] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#c0c8c3]/20">
            <Lock size={24} className="text-[#c0c8c3]" />
          </div>
          <h2 className="text-2xl font-newsreader font-bold text-[#00261b] mb-2 tracking-tight">Sign in required</h2>
          <p className="text-[#414944] font-medium text-sm mb-6 max-w-xs mx-auto">Sign in to view and manage your profile.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00261b] text-white font-manrope font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#214f3f] transition-all shadow-md"
          >
            <LogIn size={14} /> Sign in
          </Link>
        </div>
      </div>
    );
  }

  const avatarInitial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : '?';

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
        <div className="flex flex-col gap-10 items-center">
          
          {/* Main Identity (Centered) */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-[#c0c8c3]/40 bg-[#eae8e4] flex items-center justify-center text-[#00261b] font-newsreader font-black text-7xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[#a0d1bc]/5 animate-pulse"></div>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover relative z-10" />
              ) : (
                <span className="relative z-10">{avatarInitial}</span>
              )}
            </div>
            
            <div className="max-w-xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-newsreader font-black text-[#00261b] leading-tight tracking-tighter mb-2">
                {user?.fullName}
              </h2>
              <p className="text-[16px] font-bold text-[#7b5455] tracking-[0.2em] uppercase">
                @{user?.username}
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
                <p className="text-xl font-bold text-[#00261b]">{user?.email}</p>
              </div>
            </div>

            <div className="pb-8 border-b border-[#c0c8c3]/30">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#414944]/50 mb-4">Account Creation</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#00261b]">
                  <CalendarIcon size={16} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-bold text-[#00261b]">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#414944]/50 mb-4">Verification Status</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#00261b]">
                  <ShieldCheck size={16} strokeWidth={2.5} />
                </div>
                <p className="text-xl font-bold text-[#00261b] capitalize">{user?.isMobileVerified ? 'Verified' : 'Not Verified'}</p>
              </div>
            </div>

          </div>

        </div>

      </motion.div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MyProfilePage;
