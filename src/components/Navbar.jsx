import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { Search, Edit, ChevronDown, User, LogOut, LayoutDashboard, Settings, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MainNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logoutUser();
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

        {/* Left: Brand & Search */}
        <div className="flex items-center gap-12 flex-1">
          <Link to="/home" className="text-2xl font-black tracking-tighter text-slate-900 shrink-0">
            MindLoom<span className="text-teal-500">.</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-teal-500 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-[13px] bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-400/50 transition-all"
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/create-post"
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <PenLine size={16} />
                <span>Write</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-1.5 py-1.5 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    <img
                      src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.username}`}
                      alt={user?.username || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40" 
                        onClick={() => setDropdownOpen(false)}
                      ></motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden z-50 p-2"
                      >
                        {/* User Summary */}
                        <div className="px-5 py-4 mb-2 bg-slate-50 rounded-[1.25rem]">
                          <p className="font-bold text-slate-900 text-sm truncate">{user?.fullName}</p>
                          <p className="text-[11px] font-bold text-teal-600 truncate uppercase tracking-widest mt-0.5">@{user?.username}</p>
                        </div>

                        {/* Links */}
                        <div className="space-y-1">
                          {[
                            { to: "/my-profile", icon: <User size={16} />, label: "Profile" },
                            { to: "/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
                            { to: "/edit-profile", icon: <Settings size={16} />, label: "Settings" }
                          ].map((item, idx) => (
                            <Link 
                                key={idx} 
                                to={item.to} 
                                onClick={() => setDropdownOpen(false)} 
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                {item.icon} {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className="mt-2 pt-2 border-t border-slate-50 px-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <LogOut size={16} /> Sign out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Sign In</Link>
              <Link to="/register" className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-sm">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
