import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { Search, ChevronDown, User, LogOut, LayoutDashboard, Settings, PenLine, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MainNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = useCallback(async () => {
    await logoutUser();
    logout();
    setDropdownOpen(false);
    navigate("/");
  }, [logout, navigate]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  }, [searchQuery, navigate]);

  // Keyboard: close dropdown on Escape
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setDropdownOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full bg-transparent font-manrope">
      <div className="max-w-[1400px] mx-auto px-6 h-16 md:h-18 flex items-center justify-between gap-8">

        {/* Left: Brand */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/home" className="flex items-center gap-2.5 group">
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5">
              <img src="/icon.png" alt="Scribloom Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-[#1a382c] leading-none font-newsreader">
              Scribloom
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center w-full">
          <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-[600px] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a382c]/60 pointer-events-none" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-2.5 text-[14px] bg-[#f7f6f4] border-none rounded-full font-medium text-[#1a382c] placeholder:text-[#1a382c]/40 focus:outline-none focus:ring-2 focus:ring-[#1a382c]/10 transition-all font-manrope shadow-inner shadow-black/5"
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {isAuthenticated ? (
            <>
              {/* Action Icons */}
              <div className="flex items-center gap-6 pr-2">
                <Link
                  to="/create-post"
                  className="text-[#55816c] hover:text-[#1a382c] transition-colors"
                  aria-label="Create new post"
                >
                  <PenLine size={20} strokeWidth={2.2} aria-hidden="true" />
                </Link>
                <button
                  className="text-[#55816c] hover:text-[#1a382c] transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} strokeWidth={2.2} aria-hidden="true" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#8b5a5a] rounded-full border-2 border-white" aria-hidden="true"></span>
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center rounded-full hover:ring-4 hover:ring-[#f7f6f4] transition-all"
                  aria-label="Open user menu"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-[34px] h-[34px] rounded-full overflow-hidden border-[1.5px] border-[#efeeea] bg-[#f7f6f4]">
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                      alt={`${user?.username || 'User'} avatar`}
                      loading="lazy"
                      width="34"
                      height="34"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                          className="absolute right-0 mt-3 w-[280px] glass-surface rounded-[2rem] ambient-shadow overflow-hidden z-50 p-2"
                          role="menu"
                          aria-label="User navigation menu"
                        >
                        {/* User Summary */}
                        <div className="px-5 py-4 mb-2 bg-[var(--background)] rounded-[18px] border border-[#efeeea]/50">
                          <p className="font-black text-[#111] text-[13px] truncate">{user?.fullName}</p>
                          <p className="text-[10px] font-black text-[#a0d1bc] truncate uppercase tracking-widest mt-0.5">@{user?.username}</p>
                        </div>

                        {/* Links */}
                        <div className="space-y-1">
                          {[
                            { to: "/my-profile", icon: <User size={16} />, label: "Personal Space" },
                            { to: "/dashboard", icon: <LayoutDashboard size={16} />, label: "Archives Dashboard" },
                            { to: "/edit-profile", icon: <Settings size={16} />, label: "Curation Settings" }
                          ].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.to}
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-[#111]/60 hover:text-[#111] hover:bg-[var(--background)] rounded-[14px] transition-all group"
                              role="menuitem"
                            >
                              <span className="text-[#111]/30 group-hover:text-[#a0d1bc] transition-colors">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className="mt-2 pt-2 border-t border-[#efeeea] px-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-[14px] transition-all"
                            role="menuitem"
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
              <Link to="/login" className="text-[12px] font-black text-[#111]/40 hover:text-[#111] transition-colors uppercase tracking-widest">Sign In</Link>
              <Link to="/register" className="px-6 py-2.5 text-[12px] font-black text-white gradient-primary rounded-full hover:scale-105 transition-all ambient-shadow uppercase tracking-widest">Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;

