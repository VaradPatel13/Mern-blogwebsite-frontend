// src/components/MainNavbar.jsx (REDESIGNED with Floating UI)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { Search, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MainNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logoutUser();
    logout();
    setShowLogoutDialog(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* 1. Floating Header Container */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-7xl">
        <div className="rounded-2xl shadow-lg backdrop-blur-lg bg-gradient-to-r from-amber-400/80 via-amber-500/80 to-orange-500/80 border border-white/20">
          <div className="container h-16 flex items-center justify-between px-4">
            
            {/* Logo + Search */}
            <div className="flex items-center space-x-4">
              <Link to="/home" className="text-2xl font-bold text-white drop-shadow-md">
                Bolify
              </Link>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="pl-10 pr-4 py-2 w-48 lg:w-64 rounded-full bg-white/20 text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 text-white">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-post"
                    className="hidden sm:flex items-center space-x-2 hover:text-orange-200 transition"
                  >
                    <Edit size={20} />
                    <span>Write</span>
                  </Link>

                  {/* Avatar with Dropdown */}
                  <div className="relative">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full cursor-pointer border-2 border-white/50 shadow-sm"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200/50"
                        >
                           <div className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200/80">
                               <p className="font-semibold truncate">{user.fullName}</p>
                               <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                           </div>
                           <div className="py-1">
                                <Link to="/my-profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500/20">My Profile</Link>
                                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500/20">Dashboard</Link>
                                <Link to="/edit-profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500/20">Edit Profile</Link>
                           </div>
                           <div className="border-t border-gray-200/80"></div>
                           <button onClick={() => { setDropdownOpen(false); setShowLogoutDialog(true); }} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-500/10">
                                Logout
                           </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="px-4 py-2 rounded-md hover:bg-white/20 transition">Login</Link>
                  <Link to="/register" className="bg-white text-amber-600 font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 w-80 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
              <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
              <div className="mt-6 flex justify-center space-x-3">
                <button onClick={() => setShowLogoutDialog(false)} className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition">Cancel</button>
                <button onClick={handleLogout} className="px-6 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition">Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavbar;

